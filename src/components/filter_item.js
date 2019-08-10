/** @jsx jsx */
// import React from 'react';
import { jsx } from '@emotion/core';

const FilterItem = ({item}) => {

    // styling
    const filterItem = {
        marginRight: '10px'
    }

    const inputMargin = {
        marginRight: '10px'
    }

    return (
        <div css={filterItem} id={item.id}>
            <input css={inputMargin} type="checkbox" name={item.channel} />{item.channel}
        </div>
    )
    
}

export default FilterItem