/** @jsx jsx */
// import React from 'react'
import { jsx } from '@emotion/core'

const NewsItem = ({item}) => {

    // colours
    const $brandPrimary = '#334036'
    // const $brandPrimaryDarker = '#1a201b'
    // const $brandBackground = '#F6F7FB'

    // font sizes
    const $bodyFont = '.9em'
    // const $h3 = '1.2em'
    const $h2 = '1.6em'
    // const $h1 = '3em'
   

    const list_item = {
        background: '#fff',
        margin: '2em 0',
        padding: '2em',
        display: 'grid',
        gridTemplateColumns: '40% auto',
        gridTemplateRows: 'auto',
        gridTemplateAreas: `
                            "news-image title"
                            "news-image excerpt"
                            "news-image read-more"
                            `
      
    }

    
    const image = {
        gridArea: 'news-image',
        marginRight: '1em',
        width: '80%',
        height: 'auto'
    }

    const title = {
        gridArea: 'title',
        fontSize: $h2,
        marginBottom: '.5em'
    }

    const excerpt = {
        gridArea: 'excerpt',
        fontSize: $bodyFont,
        textAlign: 'justify',
        marginBottom: '.5em'
    }

    const read_more = {
        gridArea: 'read-more',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        texDecoration: 'none',
        fontWeight: 'bold',
        color: $brandPrimary
    }

    
    return(
        
        <div css={list_item} className="news" id={item.id} >
            <img src={item.imageURL} css={image} alt="thumbnail" />
            <h3 css={title}>{item.title}</h3>
            <span>{item.date}</span>
            <p css={excerpt}>{item.contentSnippet}</p>
            <a css={read_more} href={item.link} target="_blank" rel="noopener noreferrer" >Read more</a>
            <span>{item.source}</span>
            
        </div>
        
    )
}

export default NewsItem