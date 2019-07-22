import React from 'react'
import { css } from 'glamor'

const NewsItem = ({item}) => {

    let news_item = css({
        padding: '20px',
        boxSizing: 'border-box',
        borderBottom: '1px solid grey'
    })

    let news_grey = css({
        ':hover': {
            color: 'red',
        }
    })

    return(
        <div {...news_item} className="news" id={item.id}>
            <img src="https://picsum.photos/200" className="news-image" />
            <h3 {...news_grey}>{item.title}</h3>
            <p>{item.feed}</p>
            <a href="#" target="_blank" rel="noopener noreferrer" class="read-more">Read more</a>
        </div>
        
    )
}

export default NewsItem