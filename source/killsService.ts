import { parse, format } from 'date-fns';
import { DateString, IKill, KillVictim } from './coreTypes';

export function convertKillDate(killDate: string): DateString {
  const parsed = parse(killDate, 'dd/MM/yyyy', new Date());
  return format(parsed, 'yyyy-MM-dd') as DateString;
}

export function mapResponseRow([killDate, killVictim]: any[]): IKill {
  return {
    killDate: convertKillDate(killDate),
    victim: killVictim as KillVictim,
  };
}
