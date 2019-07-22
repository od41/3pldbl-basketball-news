import React, {Component} from 'react'
import ReactDOM from 'react-dom'

// DATA
import JSON from './db.json'

// COMPONENTS
import Header from './components/header'
import NewsList from './components/news_list'
import Filters from './components/filters'
import Order from './components/order'


class App extends Component {

    state = {
        news: JSON
    }

    getKeyword = (event) => {
        console.log(event.target.value)
    }
    
    render() {
        return (
            <div>
                <div>
                    <Header keywords={this.getKeyword} />
                </div>
                <section className="main">
                    <aside>
                        <div className="sources">
                            <h3>News Sources</h3>
                            <Filters/>
                        </div>
                        <hr />
                        <div className="order">
                            <h3>Order by:</h3>
                            <Order />
                        </div>
                    </aside>
                    
                    <section className="news-list">
                        <NewsList newsData={this.state.news} />
                    </section>
                </section>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.querySelector("#root"))