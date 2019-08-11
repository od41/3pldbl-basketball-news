import React, { Component } from 'react';
import { connect } from 'react-redux';



// ACTIONS
import { requestFeed } from '../actions'


const mapStateToProps = (state) => {
    return {
        // searchInput: state.searchFeed.searchInput,
        combinedFeed: state.requestFeed.combinedFeed,
        isPending: state.requestFeed.isPending,
        error: state.requestFeed.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onRequestFeed: () => dispatch(requestFeed())
    }
}


class RssFeed extends Component {

    componentDidMount() {
        this.props.onRequestFeed()
        
      }

    render() {

        const {combinedFeed, onRequestFeed} = this.props
        return (
            <div> 
            </div>
        )
        
    }

    
 }

 export default connect(mapStateToProps, mapDispatchToProps)(RssFeed);