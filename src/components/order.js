/** @jsx jsx */
import React from 'react'
import { jsx } from '@emotion/core'

const Order = (props) => {

    // font sizes
    const $bodyFont = '.9em'
    const $h3 = '1.2em'
    const $h2 = '1.6em'
    const $h1 = '3em'

    // styling
    const heading = {
        fontSize: $bodyFont,
        letterSpacing: '2px',
        textTransform: 'uppercase',
        margin: '10px 0',
    }

    return (
        <div>
            <h3 css={heading}>Order by:</h3>
            <input type="radio" name="Newest" id="" />Newest
            <input type="radio" name="Oldest" id="" />Loudest
        </div>
    )
    
}

export default Order