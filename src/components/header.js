import React from 'react'
import '../css/styles.css'

const Header = (props) => {

        return (
            <header>
                <div className="logo">NewsLogo</div>
                <input type='text' onChange={props.keywords}/>
            </header>
        )
    
}

export default Header