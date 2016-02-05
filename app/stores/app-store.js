import AppConstants from '../constants/app-constants';
import { register } from '../dispatchers/app-dispatcher';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let messages = [{ status: 'danger', load: '12.234', timestamp: new Date().getTime() }];
//let messages = [];
let currentLoad = {};

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
    console.log(messages);
    return messages;
  },

  clearMessages() {
    messages = [];
    AppStore.emitChange(); 
  },

  getLoad() {
    return currentLoad;
  },

  dispatcherIndex: register(function(payload) {   
    const { actionType, data } = payload;

    switch (actionType) {
      case AppConstants.MESSAGE_RECEIVED:
        console.log(data);
        messages.unshift(data);
        break;
      case AppConstants.STREAM_DATA:
        currentLoad = data;
        break;
    }

    AppStore.emitChange();

    return true;
  })
});

export default AppStore;
