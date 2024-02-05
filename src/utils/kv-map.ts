import { Indices, InferKR, Key, Tuple } from "./types";

export const kvMap = <
  Records extends readonly Record<string, any>[],
  Keys extends readonly [...Key[]]
>(
  records: Records,
  keys: Keys
) => {
  type KR = InferKR<Records, Keys>;

  type KV = {
    [K in keyof KR]: KR[K]["value"];
  };

  return records.reduce((pre, cur, index) => {
    pre[keys[index]] = cur.value;
  }, {} as any) as KV;
};
