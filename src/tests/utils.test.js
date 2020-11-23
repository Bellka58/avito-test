import { getFormattedTime } from '../utils/time';

it('getFormattedTime', function () {
  const expectedValue = '1 November 18:56';

  expect(getFormattedTime(1606146996)).toEqual(expectedValue);
});

it('getFormattedTime', function () {
  expect(getFormattedTime()).toEqual('');
});
