import { InferKR, Key } from "./types";

export const krMap = <
  Records extends readonly Record<string, any>[],
  Keys extends readonly [...Key[]]
>(
  records: Records,
  keys: Keys
) => {
  type KR = InferKR<Records, Keys>;
  return records.reduce((pre, cur, index) => {
    pre[keys[index]] = cur;
  }, {} as any) as KR;
};
