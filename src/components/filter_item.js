/** @jsx jsx */
// import React from 'react';
import { jsx } from '@emotion/core';

const FilterItem = ({item, sources, isSelected}) => {

    // styling
    const filterItem = {
        marginRight: '10px'
    }

    const inputMargin = {
        marginRight: '10px'
    }

    return (
        <div css={filterItem} id={"source-" + item.id} key={"source-" + item.id}>
            <input css={inputMargin} type="checkbox" name="source" id={item.channel.toLowerCase()}  onChange={sources} checked={isSelected ? "checked": ""} />
            <label htmlFor={item.channel.toLowerCase()} > {item.channel} </label>
        </div>
    )
    
}

export default FilterItem