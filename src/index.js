import React, {Component} from 'react'
import ReactDOM from 'react-dom'

// DATA
import JSON from './db.json'

// COMPONENTS
import Header from './components/header'
import NewsList from './components/news_list'

class App extends Component {

    state = {
        news: JSON
    }
    
    render() {
        return (
            <div>
                <div>
                    <Header/>
                </div>
                <div>
                    <NewsList newsData={this.state.news} />
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.querySelector("#root"))