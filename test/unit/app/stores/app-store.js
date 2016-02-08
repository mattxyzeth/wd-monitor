import expect from 'expect';
import AppStore from '../../../../app/stores/app-store';

describe('Unit - AppStore', function() {

  it('registers a listener', (done)=> {
    AppStore.addChangeListener(()=> {
      expect(true).toEqual(true);
      done();
    });

    AppStore.emitChange();
  });

  it('pushes received data/messages to the store', ()=> {
    AppStore.messages = [5,6,7];

    AppStore.addMessages(4);

    expect(AppStore.messages.length).toEqual(4, 'Should push a single object to the messages store');
    expect(AppStore.messages[0]).toEqual(4, 'Should push the new item to the beginning of the store');

    AppStore.addMessages([1,2,3]);

    expect(AppStore.messages.length).toEqual(7, 'Should push multiple objects to the messages store');
    expect(AppStore.messages[0]).toEqual(1, 'Should push the new items to the beginning of the store');

    AppStore.addData(new Array(60).fill(0));
    expect(AppStore.data.length).toEqual(60, 'Should limit the store length to 60');
  });

  it('clears the messages', ()=> {
    AppStore.addMessages(new Array(60).fill(0));

    AppStore.clearMessages();

    expect(AppStore.messages.length).toEqual(0);
  });

});
