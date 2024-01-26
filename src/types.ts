export enum Export {
  ValueEnums = 'value_enums',
  KeyEnums = 'key_enums',
  Records = 'records',
  KeyValue = 'key_value',
  ValueKey = 'value_key',
  KeyRecord = 'key_record',
  ValueRecord = 'value_record',
}

export interface Definition<R = Record<string, any>> {
  keyField?: keyof R; // default is 'key'
  valueField?: keyof R; // default is 'value'
  keyGen?: (record: R) => string;
  records: R[];
  export: (`${Export}` | Export)[];
}