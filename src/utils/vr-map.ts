import { InferKR, Key } from "./types";

export const vrMap = <
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

  type VR = {
    [K in keyof KV as KV[K]]: KR[K];
  };

  return records.reduce((pre, cur) => {
    pre[cur.value] = cur;
  }, {} as any) as VR;
};
