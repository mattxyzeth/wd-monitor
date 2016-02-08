import AppConstants from '../constants/app-constants';
import { dispatch } from '../dispatchers/app-dispatcher';
import DataService from '../services/data-service';
import jQuery from 'jquery';

let host;
switch(window.env) {
  case 'development':
    host = 'http://localhost:3000';
    break;
  default:
    host = window.location.origin;
    break;
}

const dataService = new DataService(host, 'monitor');

export default {
  streamData() {
    dataService.listen('monitor', (data)=> {
      dispatch({
        actionType: AppConstants.STREAM_DATA, data
      });
    });
  },

  listenForMessages() {
    dataService.listen('message', (data)=> {
      console.log(data);
      if (data) {
        dispatch({
          actionType: AppConstants.MESSAGE_RECEIVED, data
        });
      }
    });
  },

  clearMessages() {
    jQuery.ajax({
      url: [host, 'messages'].join('/'),
      type: 'delete',
      success: ()=> {
        dispatch({
          actionType: AppConstants.CLEAR_MESSAGES
        });
      }
    });
  }
}
