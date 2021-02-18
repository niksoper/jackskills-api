import { convertKillDate } from './killsService';

describe('convertKillDate', () => {
  it('when passed 1st Jan 2000, returns correctly', () => {
    expect(convertKillDate('01/01/2000')).toEqual('2000-01-01');
  });

  it('when passed 29th Feb in a leap year, returns correctly', () => {
    expect(convertKillDate('29/02/2020')).toEqual('2020-02-29');
  });

  it('when passed 29th Feb not in a leap year, throws', () => {
    expect(() => convertKillDate('29/02/2021')).toThrow();
  });

  it('when leading zero is not used for month, returns correctly', () => {
    expect(convertKillDate('15/2/1994')).toEqual('1994-02-15');
  });

  it('when leading zero is not used for day, returns correctly', () => {
    expect(convertKillDate('9/02/1955')).toEqual('1955-02-09');
  });
});
