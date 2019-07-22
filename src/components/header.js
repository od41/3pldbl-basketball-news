import React from 'react'
import '../css/styles.css'

const Header = (props) => {

        return (
            <header>
                <img src="img/logo.png" className="logo" />
                <button id="update" className="update-btn button">Crash the boards</button>
                <input type='text' onChange={props.keywords}/>
            </header>
        )
    
}

export default Header