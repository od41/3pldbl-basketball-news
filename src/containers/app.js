/** @jsx jsx */
import React, {Component} from 'react';
import { connect } from 'react-redux';
// import ReactDOM from 'react-dom';
import '../css/styles.css';
import { jsx } from '@emotion/core';


// ACTIONS
import { setRssFeed, setSearchField} from '../actions'


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
        combinedFeed: state.grabCombinedFeed.combinedFeed
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        // onRssFeedUpdate: () => dispatch(setRssFeed())
    }
}

class App extends Component {

    constructor() {
        super()
        this.state = {
            // news: newsJSON,
            sources: sourcesJSON,
    
            // the search state
            searchInput: "",
    
            // filtered feeds
            filteredEspn: {},
    
            // combined Rss feed
            combinedFeed: []
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

    
    // getKeyword = (event) => {
    //     // the search function
    //     this.setState( {searchInput: event.target.value} )
    //     // console.log(this.state.searchInput)
    //     const filteredFeedEspn = this.state.dataEspn.filter(dataEspn => {
    //         return dataEspn.title.toLowerCase().includes(this.state.searchInput.toLowerCase() )
    //     })
    //     this.setState( {filteredEspn: filteredFeedEspn})
    // }
    
    render() {        

        const { searchInput, onSearchChange, combinedFeed } = this.props;

        console.log('combinedFeed: ', combinedFeed)
        console.log('searchInput: ', searchInput)
        
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
                    
                    <section className="news-list">
                        <RssFeed>
                            <NewsList newsData={combinedFeed} />
                            {/* <NewsList newsData={this.state.dataEuroleague} />
                            <NewsList newsData={this.state.dataTalkbasket} /> */}
                        </RssFeed>
                    </section>
                </section>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);