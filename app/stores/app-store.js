import AppConstants from '../constants/app-constants';
import { register } from '../dispatchers/app-dispatcher';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

//let messages = [{ status: 'danger', load: '12.234', timestamp: new Date().getTime() }];
let messages = [];
let currentLoad = {};

function addMessages(data) {
  if (data.constructor !== Array) {
    data = [data];
  }

  messages = [...data, ...messages];
}

function clearMessages() {
  messages = [];
}

const AppStore = Object.assign(EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getMessages() {
    return messages;
  },

  getLoad() {
    return currentLoad;
  },

  dispatcherIndex: register(function(payload) {   
    const { actionType, data } = payload;

    switch (actionType) {
      case AppConstants.MESSAGE_RECEIVED:
        addMessages(data);
        break;
      case AppConstants.STREAM_DATA:
        currentLoad = data;
        break;
      case AppConstants.CLEAR_MESSAGES:
        clearMessages();
        break;
    }

    AppStore.emitChange();

    return true;
  })
});

export default AppStore;
