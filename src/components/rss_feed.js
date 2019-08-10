import React, { Component } from 'react';
import { connect } from 'react-redux';



// ACTIONS
import { setRssFeed } from '../actions'


const mapStateToProps = (state) => {
    return {
        // searchInput: state.searchFeed.searchInput,
        combinedFeed: state.grabCombinedFeed.combinedFeed
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        grabCombinedFeed: (feed) => dispatch(setRssFeed(feed))
    }
}

let theCombinedFeed = []

// RSS Feed Parser
let Parser = require('rss-parser');

// Parse xml abstraction function
const parseMyXML = (options, xmlString) => {
    let parserObject = new Parser(options)
    return parserObject.parseString(xmlString)
}

class RssFeed extends Component {

    state = {
        dataEspn: {},
        dataEuroleague: {},
        dataTalkbasket: {},
        dataSi: {},
        dataNcaaMale: {},
        dataNcaaFemale: {},

        // aggregate
        dataAggregate: []
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

            default: {
                return normalizedFeed
            }
        }
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

      aggregateFeed = () => {
        let aggregate = []
        // joins all the normalized feeds into a single array
        aggregate = [].concat( this.state.dataEspn, this.state.dataEuroleague, this.state.dataTalkbasket, this.state.dataNcaaFemale) 
        return aggregate
      } 


    render() {
        // theCombinedFeed = this.aggregateFeed()
        // grabCombinedFeed(theCombinedFeed)

        const {combinedFeed, grabCombinedFeed} = this.props
        return (
            <div> 
            </div>
        )
        
    }

    
 }

 export default connect(mapStateToProps, mapDispatchToProps)(RssFeed);