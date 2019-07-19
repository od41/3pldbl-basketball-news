import React from 'react'
import '../css/styles.css'

import NewsItem from './news_list_item'

const NewsList = (props) => {

    

    return(
        <section>
            <NewsItem newsData={props.newsData} />
        </section>
    )
    
}

export default NewsList