/** @jsx jsx */
import React from 'react'
import { jsx } from '@emotion/core'

import FilterItem from './filter_item'

const Filters = (props) => {

    // colours
    const $brandPrimary = '#334036'
    const $brandPrimaryDarker = '#1a201b'
    const $brandBackground = '#F6F7FB'

    // font sizes
    const $bodyFont = '.9em'
    const $h3 = '1.2em'
    const $h2 = '1.6em'
    const $h1 = '3em'

    // styles
    const sources = {
        margin: '0 2em'
    }

    const items = props.newsSources.map((item) => {
        return(
            <FilterItem key={item.id} item={item} />
        )
    })

    return(
        
        <div css={sources}>
           {items}
        </div>
    )
    
}

export default Filters