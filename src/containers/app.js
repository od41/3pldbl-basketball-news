/** @jsx jsx */
import  {Component} from 'react';
import { connect } from 'react-redux';
// import ReactDOM from 'react-dom';
import '../css/styles.css';
import { jsx } from '@emotion/core';


// ACTIONS
import { requestFeed, setSearchField, setSources} from '../actions'


// DATA
// import newsJSON from './db.json'
import sourcesJSON from '../sources.json'

// COMPONENTS
// import RssFeed from '../components/rss_feed'
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
        onSourceChange: (event) => dispatch(setSources(event.target.checked)),
        onRequestFeed: () => dispatch(requestFeed())
    }
}

class App extends Component {

    constructor() {
        super()
        this.state = {
            // news: newsJSON,
            sources: sourcesJSON,
            isViewEspn: true,
            isViewEuroleague: true,
            isViewTalkbasket: true
        }

        this.changeTheSource = this.changeTheSource.bind(this)
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

    changeTheSource(event) {
        // alert(event.target.id + event.target.checked)
        switch(event.target.id) {
            case 'espn':
                this.setState( {isViewEspn: event.target.checked} )
                break

            case 'euroleague':
                this.setState ( {isViewEuroleague: event.target.checked} )
                break

            case 'talkbasket':
                this.setState ( {isViewTalkbasket: event.target.checked} )
                break
            default:
                // do nothing
        }      
    }

    toggleSource(isSelected, newsSource) {
        if(isSelected) {
            return newsSource
        } else {
            return {}
        }
    }
    
    render() {        

        const { isPending, searchInput, onSearchChange, espnFeed, euroleagueFeed, talkbasketFeed, onRequestFeed } = this.props;
        // display the results that match the search query
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
                <Header keywords={onSearchChange} updateFeed={onRequestFeed} />
                <section css={this.main}>
                    <aside css={this.filters}>
                        <div>
                            <Filters newsSources={this.state.sources} sources={this.changeTheSource} 
                            isSelectedEspn={this.state.isViewEspn}
                            isSelectedEuroleague={this.state.isViewEuroleague}
                            isSelectedTalkbasket={this.state.isViewTalkbasket}
                            />
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
                            {/* a single newslist object to help with the news sorting by time */}
                            <NewsList  newsData={[this.toggleSource(this.state.isViewEspn, filteredEspnFeed), 
                                this.toggleSource(this.state.isViewEuroleague, filteredEuroleagueFeed), 
                                this.toggleSource(this.state.isViewTalkbasket, filteredTalkbasketFeed)] } />
                            {/* <NewsList isSelected={this.state.isViewEuroleague} newsData={filteredEuroleagueFeed} />
                            <NewsList isSelected={this.state.isViewTalkbasket} newsData={filteredTalkbasketFeed} /> */}
                        </section>
                    )}
                        
                    
                </section>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);