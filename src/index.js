import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

/* Redux Saga */
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

/* Reducer */
import rootReducer from './Reducers/store/rootReducer';

/* Sagas */
import watchAll from './Sagas/index';

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(watchAll);

ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
document.getElementById('root'));


serviceWorker.unregister();