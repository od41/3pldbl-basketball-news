/** @jsx jsx */
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import './css/styles.css'
import { jsx } from '@emotion/core'
// import parser from 'rss-parser'


// DATA
import newsJSON from './db.json'
import sourcesJSON from './sources.json'

// COMPONENTS
import Header from './components/header'
import NewsList from './components/news_list'
import Filters from './components/filters'
import Order from './components/order'

// RSS Feed Parser
let Parser = require('rss-parser');
let parser = new Parser({
    customFields: {
        item: [[ 'image', 'imageURL' ]]
      }
});

class App extends Component {

    state = {
        news: newsJSON,
        sources: sourcesJSON,
        data: {}
    }

    // colours
    $brandPrimary = '#334036'
    $brandPrimaryDarker = '#1a201b'
    $brandBackground = '#F6F7FB'

    // font sizes
    $bodyFont = '.9em'
    $h3 = '1.2em'
    $h2 = '1.6em'
    $h1 = '3em'

    // styling
    main = {
        display: 'grid',
        gridTemplateColumns: '20% 50%',
        margin: '4em'
    }

    filters = {
        padding: '2em',
        fontSize: this.$bodyFont,
        background: '#fff',
        marginRight: '1em',
        height: '40vh',
        minWidth: '150px',
        minHeight: '300px'
    }

    separator = {
        margin: '2em auto',
        width: '100%',
        color: this.$brandPrimaryDarker,
        opacity: '0.4'
    }


    componentDidMount() {
        fetch(`https://www.espn.com/espn/rss/nba/news`)
          .then(res => res.text())
          .then(cleanedString => cleanedString.replace("\ufeff", ""))
          .then(textXML => parser.parseString(textXML))
          .then(news => {this.setState({ data: news.items})})
      }

    // componentDidMount() {
    //     fetch(`https://www.espn.com/espn/rss/nba/news`)
    //       .then(res => res.text())
    //       .then(news => console.log('COMPONENET DID MOUNT: ' + news))
    //   }

    getKeyword = (event) => {
        console.log(event.target.value)
    }
    
    render() {
        console.log(this.state.data)

        return (
            <div>
                <Header keywords={this.getKeyword} />
                <section css={this.main}>
                    <aside css={this.filters}>
                        <div>
                            <Filters newsSources={this.state.sources}/>
                        </div>
                        <hr css={this.separator} />
                        <div>
                            <Order />
                        </div>
                    </aside>
                    
                    <section className="news-list">
                        <NewsList newsData={this.state.data} />
                    </section>
                </section>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.querySelector("#root"))