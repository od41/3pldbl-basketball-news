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


    const isSelected = props.isSelected
    let items = []

    if (isSelected){
        const newsDataArray = Array.from(props.newsData)

        items = newsDataArray.map((item) => {
            let i = 0
            return(
                <NewsItem key={"news-" + i++} item={item} />
            )
        })
    } else {
        // const items = []
    }

    return(

        
        <section css={container}>
            {/* {console.log('before conversion: ' + props.newsData)}
            {console.log('after conversion: ' + newsDataArray)} */}

           {items}
        </section>
    )
    
}

export default NewsList