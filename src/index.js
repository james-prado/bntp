import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { initialize as initializeBookmarks } from './actions/bookmarks';
import { initialize as initializeTopsites } from './actions/topsites';
import { initialize as initializePreferences } from './actions/preferences';
import { initialize as initializeNotifications } from './actions/notifications';

import reducers from './reducers';
import { networkStatusManager } from './infrastructure';
import Manifest from './infrastructure/Manifest';

import RootContainer from './components/RootContainer';

import {
  chromePageRepository,
  folderPreferenceRepository,
  themeRepository,
  themePreferenceRepository,
  visibilityRepository,
} from './repositories';

import './index.css';

const devMiddlewares = [];
if (process.env.NODE_ENV === 'development') {
  devMiddlewares.push(require('redux-logger')());
}

const initialState = () => {
  const chromePageFolders = chromePageRepository.findFolders();
  const folderPreference = folderPreferenceRepository.get();
  const selectedTheme = themePreferenceRepository.getOrDefault();
  const themes = themeRepository.findAll();
  const visibilities = visibilityRepository.findAll();
  const online = networkStatusManager.isOnline();
  const manifest = Manifest.get();
  return {
    chromePageFolders,
    folderPreference,
    selectedTheme,
    themes,
    visibilities,
    online,
    manifest,
  };
};

const store = createStore(reducers, initialState(), applyMiddleware(thunk, ...devMiddlewares));

// Apply theme on the root element
const renderTheme = () => {
  const { selectedTheme } = store.getState();
  document.documentElement.className = `Theme__${selectedTheme.id}`;
};

// Prevent theme-less white page on loading
renderTheme();

store.subscribe(renderTheme);
store.subscribe(() => {
  const { folderPreference, selectedTheme, visibilities } = store.getState();
  folderPreferenceRepository.save(folderPreference);
  themePreferenceRepository.save(selectedTheme);
  visibilityRepository.save(visibilities);
});

store.dispatch(initializeBookmarks());
store.dispatch(initializeTopsites());
store.dispatch(initializePreferences());
store.dispatch(initializeNotifications());

render(
  <Provider store={store}>
    <RootContainer/>
  </Provider>,
  document.getElementById('root')
);
