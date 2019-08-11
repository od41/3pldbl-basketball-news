/** @jsx jsx */
import React, {Component} from 'react';
import { connect } from 'react-redux';
// import ReactDOM from 'react-dom';
import '../css/styles.css';
import { jsx } from '@emotion/core';


// ACTIONS
import { requestFeed, setSearchField} from '../actions'


// DATA
// import newsJSON from './db.json'
import sourcesJSON from '../sources.json'

// COMPONENTS
import RssFeed from '../components/rss_feed'
import Header from '../components/header'
import NewsList from '../components/news_list'
import Filters from '../components/filters'
import Order from '../components/order'

const mapStateToProps = (state) => {
    return {
        searchInput: state.searchFeed.searchInput,
        espnFeed: state.requestFeed.espnFeed, // I changed this to espnFeed from combinedFeed... take note
        euroleagueFeed: state.requestFeed.euroleagueFeed, 
        talkbasketFeed: state.requestFeed.talkbasketFeed, 
        isPending: state.requestFeed.isPending,
        error: state.requestFeed.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestFeed: () => dispatch(requestFeed())
    }
}

class App extends Component {

    constructor() {
        super()
        this.state = {
            // news: newsJSON,
            sources: sourcesJSON,
        }
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

        this.props.onRequestFeed()
        
      }
    
    render() {        

        const { isPending, searchInput, onSearchChange, espnFeed, euroleagueFeed, talkbasketFeed } = this.props;
        const filteredEspnFeed = espnFeed.filter(item =>{
            return item.title.toLowerCase().includes(searchInput.toLowerCase());
          })
        
        const filteredEuroleagueFeed = euroleagueFeed.filter(item =>{
            return item.title.toLowerCase().includes(searchInput.toLowerCase());
        })

        const filteredTalkbasketFeed = talkbasketFeed.filter(item =>{
            return item.title.toLowerCase().includes(searchInput.toLowerCase());
        })

        return (
            <div>
                <Header keywords={onSearchChange} />
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
                    
                    { isPending ? (
                        <h1>Loading</h1>
                    ) : (
                        <section className="news-list">
                            <NewsList newsData={filteredEspnFeed} />
                            <NewsList newsData={filteredEuroleagueFeed} />
                            <NewsList newsData={filteredTalkbasketFeed} />
                        </section>
                    )}
                        
                    
                </section>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);