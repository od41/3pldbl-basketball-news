import React from 'react'
import '../css/styles.css'

const NewsItem = (props) => {
    console.log(props)

    const items = props.newsData.map((item)=> {
        return(
            <div id={item.id}>
                <h3>{item.title}</h3>
                <p>{item.feed}</p>
            </div>
        )
    })

    return(
        <div>
            {items}
        </div>
    )
}

export default NewsItem