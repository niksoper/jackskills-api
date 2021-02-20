import { DateString, IKill, KillVictim } from './coreTypes';
import { convertKillDate, sortKillsByLatest } from './killsService';

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

describe('sortKillsByLatest', () => {
  it('when passed empty, returns empty', () => {
    expect(sortKillsByLatest([])).toEqual([]);
  });

  it('when kills are ordered, returns kills in order', () => {
    const unsorted: IKill[] = [
      {
        killDate: '2020-11-10' as DateString,
        victim: 'Animal' as KillVictim,
      },
      {
        killDate: '2020-11-09' as DateString,
        victim: 'Animal' as KillVictim,
      },
    ];

    expect(sortKillsByLatest(unsorted)).toEqual([
      {
        killDate: '2020-11-10' as DateString,
        victim: 'Animal' as KillVictim,
      },
      {
        killDate: '2020-11-09' as DateString,
        victim: 'Animal' as KillVictim,
      },
    ]);
  });

  it('when kills are not ordered, returns kills in order', () => {
    const unsorted: IKill[] = [
      {
        killDate: '2020-11-08' as DateString,
        victim: 'Animal' as KillVictim,
      },
      {
        killDate: '2020-11-09' as DateString,
        victim: 'Animal' as KillVictim,
      },
    ];

    expect(sortKillsByLatest(unsorted)).toEqual([
      {
        killDate: '2020-11-09' as DateString,
        victim: 'Animal' as KillVictim,
      },
      {
        killDate: '2020-11-08' as DateString,
        victim: 'Animal' as KillVictim,
      },
    ]);
  });

  it('when there are multiple kills on the same day, returns kills in order of date then victim', () => {
    const unsorted: IKill[] = [
      {
        killDate: '2020-11-08' as DateString,
        victim: 'Badger' as KillVictim,
      },
      {
        killDate: '2020-11-08' as DateString,
        victim: 'Asp' as KillVictim,
      },
      {
        killDate: '2020-12-08' as DateString,
        victim: 'Zebra' as KillVictim,
      },
    ];

    expect(sortKillsByLatest(unsorted)).toEqual([
      {
        killDate: '2020-12-08' as DateString,
        victim: 'Zebra' as KillVictim,
      },
      {
        killDate: '2020-11-08' as DateString,
        victim: 'Asp' as KillVictim,
      },
      {
        killDate: '2020-11-08' as DateString,
        victim: 'Badger' as KillVictim,
      },
    ]);
  });
});
