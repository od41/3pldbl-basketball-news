/** @jsx jsx */
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import './css/styles.css'
import { jsx } from '@emotion/core'
// import parser from 'rss-parser'


// DATA
import newsJSON from './db.json'
import sourcesJSON from './sources.json'

// COMPONENTS
import Header from './components/header'
import NewsList from './components/news_list'
import Filters from './components/filters'
import Order from './components/order'

// RSS Feed Parser
let Parser = require('rss-parser');

// Parse xml abstraction fucntion
const parseMyXML = (options, xmlString) => {
    let parserObject = new Parser(options)
    return parserObject.parseString(xmlString)
}

class App extends Component {

    state = {
        news: newsJSON,
        sources: sourcesJSON,
        dataEspn: {},
        dataEuroleague: {},
        dataTalkbasket: {},
        dataSi: {},
        dataNcaaMale: {},
        dataNcaaFemale: {}
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

                    let image = item['meta'][0]

                    return(
                       {
                        'date': item.pubDate,
                        'source': 'Talkbasket',
                        'imageURL': image,
                        'title': item.title,
                        'contentSnippet': item.contentSnippet,
                        'link': item.link
                       }
                    )
                })

                console.log('Inside talkbasket rssNormalizer: ',  normalizedFeed)
                
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

        // fetch ESPN
        fetch(`https://www.espn.com/espn/rss/nba/news`)
          .then(res => res.text())
          .then(cleanedString => cleanedString.replace("\ufeff", ""))
          .then(textXML => parseMyXML(this.espnOptions, textXML))
          .then(news => {this.setState( {dataEspn: this.rssNormalizer('espn', news.items)} )} );

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
          .then(data => console.log('Inside fetch talkbasket: ', data.items));

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
        console.log(event.target.value)
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
                        {/* <NewsList newsData={this.state.dataEspn} />
                        <NewsList newsData={this.state.dataEuroleague} /> */}
                        <NewsList newsData={this.state.dataTalkbasket} />
                    </section>
                </section>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.querySelector("#root"))