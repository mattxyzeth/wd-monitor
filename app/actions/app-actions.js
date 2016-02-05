import AppConstants from '../constants/app-constants';
import { dispatch } from '../dispatchers/app-dispatcher';
import DataService from '../services/data-service';
import $ from 'jquery';

const dataService = new DataService('http://localhost:3000', 'monitor');

export default {
  streamData() {
    dataService.listen('monitor', (data)=> {
      console.log(data);
      dispatch({
        actionType: AppConstants.STREAM_DATA, data
      });
    });
  },

  listenForMessages() {
    dataService.listen('message', (data)=> {
      if (data) {
        dispatch({
          actionType: AppConstants.MESSAGE_RECEIVED, data
        });
      }
    });
  },

  clearMessages() {
    $.ajax({
      url: 'http://localhost:3000/messages',
      type: 'delete',
      success: ()=> {
        dispatch({
          actionType: AppConstants.CLEAR_MESSAGES
        });
      }
    });
  }
}
