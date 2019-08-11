import { 
    CHANGE_SEARCH_FIELD,
    REQUEST_FEED_PENDING,
    REQUEST_ESPN_FEED_SUCCESS,
    REQUEST_EUROLEAGUE_FEED_SUCCESS,
    REQUEST_TALKBASKET_FEED_SUCCESS,
    REQUEST_FEED_FAILED
} from './constants';


// RSS Feed Parser
let Parser = require('rss-parser');

// Parse xml abstraction function
const parseMyXML = (options, xmlString) => {
    let parserObject = new Parser(options)
    return parserObject.parseString(xmlString)
}

// rss feed parser custom options

    // espn feed media content custom options
    const espnOptions = {
        customFields: {
            item: [
                [ 'image', 'imageURL' ]
            ]
          }
    }

    // Euroleague feed media content custom options
    const euroleagueOptions = {
        customFields: {
            // feed: [ ''],
            item: [
                ['webportal:mainteamnew', 'imageURL', {keepArray: true}]
            ]
          }
    }

    // Euroleague feed media content custom options
    const talkbasketOptions = {
        customFields: {
            // feed: [ ''],
            item: [
                ['description', 'meta', {keepArray: true}]
            ]
          }
    }

    // make the output of all rss feeds the same
    const rssNormalizer = (feedOption, rssFeed) => {
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

    
    const aggregateFeed = (...args) => {
        let aggregate = []
        // joins all the normalized feeds into a single array
        aggregate = [].concat( ...args) 
        return aggregate
      } 



export const requestFeed = () => (dispatch) => {
    // console.log('Dispatch: ', dispatch)
    dispatch({type: REQUEST_FEED_PENDING});

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    // https://www.ncaa.com/news/basketball-women/d1/rss.xml
    // https://www.ncaa.com/news/basketball-men/d1/rss.xml
    // https://www.si.com/rss/si_nba.rss
    // https://www.eurobasket.com/reports/RSS/rssfeed_US_W.xml
    // https://www.eurobasket.com/reports/RSS/rssfeed_EU_W.xml
    // https://www.eurobasket.com/reports/RSS/rssfeed_AF_M.xml
    // https://www.eurobasket.com/reports/RSS/rssfeed_AF_W.xml

    let dataEspn = [], dataTalkbasket = [], dataEuroleague = []
    

    // fetch ESPN a test
    fetch(`https://www.espn.com/espn/rss/nba/news`)
        .then(res => res.text())
        .then(cleanedString => cleanedString.replace("\ufeff", ""))
        .then(textXML => parseMyXML(espnOptions, textXML))
        .then(news =>  dispatch({type: REQUEST_ESPN_FEED_SUCCESS, payload: rssNormalizer('espn', news.items) }) )
        .catch(error => dispatch({ type: REQUEST_FEED_FAILED, payload: error }) );
    
    //   fetch talkbasket feed
    fetch(proxyurl + `https://www.talkbasket.net/feed`)
    .then(res => res.text())
    .then(cleanedString => cleanedString.replace("\ufeff", ""))
    .then(textXML => parseMyXML(talkbasketOptions, textXML))
    .then(news =>  dispatch({type: REQUEST_TALKBASKET_FEED_SUCCESS, payload: rssNormalizer('talkbasket', news.items) }) )
    .catch(error => dispatch({ type: REQUEST_FEED_FAILED, payload: error }) );
    

    //   fetch anyother feed that works
    const url = "https://www.euroleague.net/rssfeed/27/180.xml"; // site that doesn’t send Access-Control-*
    fetch(proxyurl + url)
        .then(res => res.text())
        .then(cleanedString => cleanedString.replace("\ufeff", ""))
        .then(textXML => parseMyXML(euroleagueOptions, textXML) )
        .then(news => dispatch({type: REQUEST_EUROLEAGUE_FEED_SUCCESS, payload: rssNormalizer('euroleague', news.items) }) )
        .catch(error => dispatch({ type: REQUEST_FEED_FAILED, payload: error }) );



};

export const setSearchField = (text) => ({
    type: CHANGE_SEARCH_FIELD,
    payload: text
});