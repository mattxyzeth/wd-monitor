import AppConstants from '../constants/app-constants';
import { register } from '../dispatchers/app-dispatcher';
import { EventEmitter } from 'events';

const {
  MESSAGE_RECEIVED,
  STREAM_DATA,
  CLEAR_MESSAGES,
  CHANGE_EVENT
} = AppConstants;


const AppStore = Object.assign(EventEmitter.prototype, {
  messages: [],
  data: [],

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  /**
   * Merge new messages with the current store of messages.
   *
   * @method addMessages
   * @param data {Object|Array} The message or messages to merge
   * @return undefined
   */
  addMessages(data) {
    if (data.constructor !== Array) {
      data = [data];
    }

    this.messages = [...data, ...this.messages];
  },

  /**
   * Resets the messages store to an empty array
   * 
   * @method clearMessages
   * @return undefinfed
   */
  clearMessages() {
    this.messages = [];
  },

  addData(newData) {
    if (newData.constructor !== Array) {
      newData = [newData];
    }

    this.data = [...newData, ...this.data].slice(0,60);
  },

  getMessages() {
    return this.messages;
  },

  getData() {
    return this.data;
  },

  dispatcherIndex: register(function(payload) {   
    const { actionType, data } = payload;

    switch (actionType) {
      case MESSAGE_RECEIVED:
        AppStore.addMessages(data);
        break;
      case STREAM_DATA:
        AppStore.addData(data);
        break;
      case CLEAR_MESSAGES:
        AppStore.clearMessages();
        break;
    }

    AppStore.emitChange();

    return true;
  })
});

export default AppStore;
