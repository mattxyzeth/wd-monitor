import AppConstants from '../constants/app-constants';
import { register } from '../dispatchers/app-dispatcher';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

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

  dispatcherIndex: register(function(payload) {   
    const { actionType, data } = payload;


    AppStore.emitChange();

    return true;
  })
});

export default AppStore;
