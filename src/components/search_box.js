/** @jsx jsx */


// import React from 'react';
import { jsx } from '@emotion/core'


const SearchBox = (props) => {

    const $brandPrimaryDarker = '#1a201b'


    const searchField = {
        width: '100%',
        padding: '1em 20px',
        border: '1px solid',
        borderColor: $brandPrimaryDarker,
        borderRadius: '25px'
    }

    return (
        <div>
            <input css={searchField} type='search' onChange={props.keywords}  placeholder="Search" />
        </div>
    )
}

export default SearchBox;