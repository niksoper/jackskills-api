type OpaqueString<Key extends string> = string & { __opaque: Key };
export type DateString = OpaqueString<'DateString'>;
export type KillVictim = OpaqueString<'KillVictim'>;

export interface IKill {
  killDate: DateString;
  victim: KillVictim;
}
