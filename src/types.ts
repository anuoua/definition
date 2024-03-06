import * as varname from "varname";

export type KeyFormat = Exclude<keyof typeof varname, "default" | "split">;

export interface Resource {
  records: Record<string, any>[];
  utils: string;
  identify: string;
  out: string;
  valueField: string;
  keyFormat: KeyFormat;
  keyField: string;
  keyGen: (record: Record<string, any>) => string;
}

export interface ConfigOptions {
  dir: string;
  output: string;
  valueField?: string;
  keyField?: string;
  keyFormat?: KeyFormat;
  keyGen?: (record: Record<string, any>) => string;
}
