import React, {Component} from 'react'
import '../css/styles.css'

class Header extends Component {

    state = {
        keywords: ''
    }

    inputHandler = (event) => {
        this.setState({
            keywords: event.target.value
        })
    }

    render(){
        return (
            <header>
                <div className="logo">NewsLogo</div>
                <input type='text' onChange={this.inputHandler}/>
            </header>
        )
    }
}

export default Header