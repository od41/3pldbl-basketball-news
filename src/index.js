import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './containers/app';

// REDUX
import { rootReducer } from './reducers';

const store = createStore(rootReducer)

ReactDOM.render(<Provider store={store} >
                    <App />
                </Provider>, document.querySelector("#root"))