/** @jsx jsx */
// import React from 'react'
import { jsx } from '@emotion/core';

import NewsItem from './news_list_item';

const NewsList = (props) => {

    // colours
    // const $brandPrimary = '#334036'
    // const $brandPrimaryDarker = '#1a201b'
    // const $brandBackground = '#F6F7FB'

    // font sizes
    // const $bodyFont = '.9em'
    // const $h3 = '1.2em'
    // const $h2 = '1.6em'
    // const $h1 = '3em'

    // styles
    const container = {
        margin: '0 2em'
    }

    const sortByNewest = (news) => {
        return news.slice().sort(function(a, b){
          return new Date(b.date) - new Date(a.date);
        });
      }

    
    
    console.log("props.newsdata: ", props.newsData)


    let newsDataArray = props.newsData.flat();

    //sort the news array by the most recent news
    const sortedNews = sortByNewest(newsDataArray)

    const news = sortedNews.map((newsItem) => {
        let i = 0
        return(
            <NewsItem key={"news-" + i++} newsItem={newsItem} />
        )
    })

    return(

        
        <section css={container}>
            {/* {console.log('before conversion: ' + props.newsData)}
            {console.log('after conversion: ' + newsDataArray)} */}

           {news}
        </section>
    )
    
}

export default NewsList