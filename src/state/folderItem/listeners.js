import * as repositories from '../../repositories';

import * as actionTypes from './actionTypes';

export default {
  [actionTypes.FETCH_BOOKMARKS]: (action, dispatch) => {
    repositories.bookmarkRepository.findAll(bookmarkFolders => dispatch({
      type: actionTypes.RECEIVE_BOOKMARKS,
      bookmarkFolders
    }));
  },

  [actionTypes.FETCH_CHROME_APPS]: (action, dispatch) => {
    repositories.chromeAppRepository.findFolders(chromeAppFolders => dispatch({
      type: actionTypes.RECEIVE_CHROME_APPS,
      chromeAppFolders
    }))
  },

  [actionTypes.FETCH_TOP_SITES]: (action, dispatch) => {
    repositories.topSiteRepository.findAll(topSites => dispatch({
      type: actionTypes.RECEIVE_TOP_SITES,
      topSites,
    }));
  },
};
