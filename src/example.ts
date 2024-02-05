import { vrMap } from "./utils/vr-map";
import { krMap } from "./utils/kr-map";
import { kvMap } from "./utils/kv-map";

export const TEST_records = [
  { key: "k-1", value: "value-1" },
  { key: "k-2", value: "value-3" },
] as const;
export type TEST_Records = typeof TEST_records;
export type TEST_Values = TEST_Records[number]["value"];
export enum TEST_Keys {
  K1 = "K1",
  K2 = "K2",
}
export const TEST_keys = [TEST_Keys.K1, TEST_Keys.K2] as const;
export const TEST_kr = krMap(TEST_records, TEST_keys);
export const TEST_vr = vrMap(TEST_records, TEST_keys);
export const TEST_kv = kvMap(TEST_records, TEST_keys);
