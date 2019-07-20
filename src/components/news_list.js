import React from 'react'
import '../css/styles.css'

import NewsItem from './news_list_item'

const NewsList = (props) => {

    const items = props.newsData.map((item) => {
        return(
            <NewsItem key={item.id} item={item} />
        )
    })

    return(
        <section className='news-list'>
           {items}
        </section>
    )
    
}

export default NewsList