import React from 'react'
import ReactDOM from 'react-dom'

// COMPONENTS
import Header from './componenets/header'

const App = () => {
    return (
        <div>
            <Header/>
        </div>
    )
}

ReactDOM.render(<App/>, document.querySelector("#root"))