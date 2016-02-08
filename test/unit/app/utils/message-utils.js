import expect from 'expect';
import { message, label, formatTime } from '../../../../app/utils/message-utils';

describe('Unit - Message Utils', ()=> {

  it('message function returns the correct message', ()=> {
    const data = {
      status: 'danger',
      load: '10'
    };

    expect(message(data)).toEqual('High load generated an alert - load = 10', 'The alert message should be returned with the load');

    data.status = 'normal';
    
    expect(message(data)).toEqual('All is well once again...', 'The normal status should be returned');
  });

  it('label function returns the correct label', ()=> {
    const danger = label({ status: 'danger' });

    expect(danger.props.className).toEqual('label label-danger');
    expect(danger.props.children).toEqual('danger');

    const normal = label({ status: 'normal' });

    expect(normal.props.className).toEqual('label label-success');
    expect(normal.props.children).toEqual('normal');
  });

  it('formatTime function properly formats a timestamp', ()=> {
    const time = 454864266363;
    const timeString = formatTime(time);

    expect(timeString).toEqual('Thursday, May 31st at 11:11:06 am');
  });

});
