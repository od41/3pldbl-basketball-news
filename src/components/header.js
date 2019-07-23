/** @jsx jsx */
import React from 'react'
import { jsx } from '@emotion/core'
import logo_url from '../assets/img/logo.png'

const Header = (props) => {

    // colours
    const $brandPrimary = '#334036'
    const $brandPrimaryDarker = '#1a201b'
    const $brandBackground = '#F6F7FB'

    // font sizes
    const $bodyFont = '.9em'
    const $h3 = '1.2em'
    const $h2 = '1.6em'
    const $h1 = '3em'

    // styling
    const header = {
        padding: '30px 4em',
        display: 'grid',
        gridTemplateColumns: '20% 30% 20%',
        width: 'calc(100% - 8em)',
        boxShadow: '0px 1px 4px rgba(0,0,0,0.1)',
        background: '#fff',
        alignContent: 'center',
        justifyContent: 'space-between'
    }

    const logo = {
        width: '140px',
        minWidth: '130px',
        height: 'auto'
    }

    const updateBtn = {
        alignSelf: 'center',
        background: $brandPrimary,
        color: 'white',
        padding: '5px 20px',
        border: 'none',
        height: '40px',
        borderRadius: '25px',
        '&:hover': {
            zIndex: 1,
            cursor: 'pointer',
            boxShadow: '0px 1px 5px rgba(0,0,0,0.6)',
            backgroundColor: $brandPrimaryDarker
    
        }
    }

    const searchField = {
        width: '100%',
        padding: '1em 20px',
        border: '1px solid',
        borderColor: $brandPrimaryDarker,
        borderRadius: '25px'
    }


    return (
        <header css={header}>
            <img src={logo_url} css={logo} alt="3PLDBL Logo" />
            <input css={searchField} type='text' onChange={props.keywords}  placeholder="Search" />
            <button id="update" css={updateBtn} >Crash the boards</button>
        </header>
    )
    
}

export default Header