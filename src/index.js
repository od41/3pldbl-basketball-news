/** @jsx jsx */
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import './css/styles.css'
import { jsx } from '@emotion/core'
// import parser from 'rss-parser'


// DATA
// import newsJSON from './db.json'
import sourcesJSON from './sources.json'

// COMPONENTS
import Header from './components/header'
import NewsList from './components/news_list'
import Filters from './components/filters'
import Order from './components/order'
import SearchBox from './components/search_box'

// RSS Feed Parser
let Parser = require('rss-parser');

// Parse xml abstraction function
const parseMyXML = (options, xmlString) => {
    let parserObject = new Parser(options)
    return parserObject.parseString(xmlString)
}

class App extends Component {

    state = {
        // news: newsJSON,
        sources: sourcesJSON,
        dataEspn: {},
        dataEuroleague: {},
        dataTalkbasket: {},
        dataSi: {},
        dataNcaaMale: {},
        dataNcaaFemale: {},

        // the search state
        searchInput: ""
    }

    // rss feed parser custom options

    // espn feed media content custom options
    espnOptions = {
        customFields: {
            item: [
                [ 'image', 'imageURL' ]
            ]
          }
    }

    // Euroleague feed media content custom options
    euroleagueOptions = {
        customFields: {
            // feed: [ ''],
            item: [
                ['webportal:mainteamnew', 'imageURL', {keepArray: true}]
            ]
          }
    }

    // Euroleague feed media content custom options
    talkbasketOptions = {
        customFields: {
            // feed: [ ''],
            item: [
                ['description', 'meta', {keepArray: true}]
            ]
          }
    }

    // make the output of all rss feeds the same
    rssNormalizer = (feedOption, rssFeed) => {
        let normalizedFeed = []
        const rssArray = Array.from(rssFeed)

        switch(feedOption){
            case 'espn': {

                normalizedFeed = rssArray.map((item) => {
                    return(
                       {
                        'date': item.pubDate,
                        'source': 'ESPN',
                        'imageURL': item.imageURL,
                        'title': item.title,
                        'contentSnippet': item.contentSnippet,
                        'link': item.link
                       }
                    )
                })

                return normalizedFeed
            }
            case 'euroleague': {
                normalizedFeed = rssArray.map((item) => {

                    let image = item['imageURL'][0]['webportal:file'][0]['webportal:url'][0]

                    return(
                       {
                        'date': item.pubDate,
                        'source': 'Euroleague',
                        'imageURL': image,
                        'title': item.title,
                        'contentSnippet': item.contentSnippet,
                        'link': item.link
                       }
                    )
                })
                
                return normalizedFeed
            }
            case 'talkbasket': {
                normalizedFeed = rssArray.map((item) => {
                    let regex = /src\s*=\s*"(.+?)"/g
                    let image = item['meta'][0]
                    let srcFound = image.match(regex)

                    srcFound = srcFound[0].substr(4)

                    srcFound = srcFound.toString().replace(/"/g, "");

                    return(
                       {
                        'date': item.pubDate,
                        'source': 'Talkbasket',
                        'imageURL': srcFound,
                        'title': item.title,
                        'contentSnippet': item.contentSnippet,
                        'link': item.link
                       }
                    )
                })
                
                return normalizedFeed
            }
        }
    }


    // colours
    $brandPrimary = '#334036'
    $brandPrimaryDarker = '#1a201b'
    $brandBackground = '#F6F7FB'

    // font sizes
    $bodyFont = '.9em'
    $h3 = '1.2em'
    $h2 = '1.6em'
    $h1 = '3em'

    // styling
    main = {
        display: 'grid',
        gridTemplateColumns: '20% 50%',
        margin: '4em'
    }

    filters = {
        padding: '2em',
        fontSize: this.$bodyFont,
        background: '#fff',
        marginRight: '1em',
        height: '40vh',
        minWidth: '150px',
        minHeight: '300px'
    }

    separator = {
        margin: '2em auto',
        width: '100%',
        color: this.$brandPrimaryDarker,
        opacity: '0.4'
    }


    componentDidMount() {

        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        // https://www.ncaa.com/news/basketball-women/d1/rss.xml
        // https://www.ncaa.com/news/basketball-men/d1/rss.xml
        // https://www.si.com/rss/si_nba.rss
        // https://www.eurobasket.com/reports/RSS/rssfeed_US_W.xml
        // https://www.eurobasket.com/reports/RSS/rssfeed_EU_W.xml
        // https://www.eurobasket.com/reports/RSS/rssfeed_AF_M.xml
        // https://www.eurobasket.com/reports/RSS/rssfeed_AF_W.xml

        // fetch ESPN
        fetch(`https://www.espn.com/espn/rss/nba/news`)
          .then(res => res.text())
          .then(cleanedString => cleanedString.replace("\ufeff", ""))
          .then(textXML => parseMyXML(this.espnOptions, textXML))
          .then(news => {this.setState( {dataEspn: this.rssNormalizer('espn', news.items)} )} )
          .catch(error => console.error('Error: ', error) );
          

        // fetch WNBA
        // fetch(`https://www.espn.com/espn/rss/nba/news`)
        //   .then(res => res.text())
        //   .then(cleanedString => cleanedString.replace("\ufeff", ""))
        //   .then(textXML => parser.parseString(textXML))
        //   .then(news => {this.setState({ data: news.items})});


        //   fetch talkbasket feed
        fetch(proxyurl + `https://www.talkbasket.net/feed`)
          .then(res => res.text())
          .then(cleanedString => cleanedString.replace("\ufeff", ""))
          .then(textXML => parseMyXML(this.talkbasketOptions, textXML))
          .then(news => this.setState( {dataTalkbasket: this.rssNormalizer('talkbasket', news.items)} ))
          .catch(error => console.error('Error: ', error) );

        

        //   fetch anyother feed that works
        const url = "https://www.euroleague.net/rssfeed/27/180.xml"; // site that doesn’t send Access-Control-*
        fetch(proxyurl + url)
          .then(res => res.text())
          .then(cleanedString => cleanedString.replace("\ufeff", ""))
          .then(textXML => parseMyXML(this.euroleagueOptions, textXML) )
          .then(news => this.setState( {dataEuroleague: this.rssNormalizer('euroleague', news.items)} ))
          .catch(error => console.error('Error:', error) );

      }

 

    getKeyword = (event) => {
        // the search function
        this.setState( {searchInput: event.target.value} )
        // console.log(this.searchInput)
        console.log(event.target.value)
        const filteredFeed = this.state.dataEspn.filter(dataEspn => {
            return dataEspn.title.toLowerCase().includes(event.target.value.toLowerCase() )
        })
    }
    
    render() {
        // console.log('ESPN Source: ',this.state.dataEspn)
        
        // console.log('Euroleague Source: ', this.state.dataEuroleague)

        // console.log('Normalized Espn Source: ', this.state.dataEspn)


        

        return (
            <div>
                <Header keywords={this.getKeyword} />
                <section css={this.main}>
                    <aside css={this.filters}>
                        <div>
                            <Filters newsSources={this.state.sources}/>
                        </div>
                        <hr css={this.separator} />
                        <div>
                            <Order />
                        </div>
                    </aside>
                    
                    <section className="news-list">
                        <NewsList newsData={this.state.dataEspn} />
                        <NewsList newsData={this.state.dataEuroleague} />
                        <NewsList newsData={this.state.dataTalkbasket} />
                    </section>
                </section>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.querySelector("#root"))