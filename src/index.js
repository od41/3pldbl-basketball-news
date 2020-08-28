import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import App from './containers/app';

// REDUX
import { rootReducer } from './reducers';

// enable logger when you want to debug
// const logger = createLogger()
// const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger))

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

ReactDOM.render(<Provider store={store} >
                    <App />
                </Provider>, document.querySelector("#root"))