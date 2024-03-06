import { KeyFormat } from "../types";
import * as varname from "varname";

export const defaultKeyGen = (
  record: Record<string, any>,
  keyField: string,
  keyFormat: KeyFormat
) => {
  if (!(keyField in record))
    throw new Error(`There is no \`${keyField}\` field in definition record`);
  return varname[keyFormat](record[keyField]);
};
