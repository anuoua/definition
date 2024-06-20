import { InferKR, Key } from "./types";

export const vrMap = <
  Records extends readonly Record<string, any>[],
  Keys extends readonly [...Key[]],
  Field extends string
>(
  records: Records,
  keys: Keys,
  valueField: Field
) => {
  type KR = InferKR<Records, Keys>;

  type KV = {
    [K in keyof KR]: KR[K][Field];
  };

  type VR = {
    [K in keyof KV as KV[K]]: KR[K];
  };

  return records.reduce((pre, cur) => {
    pre[cur[valueField]] = cur;
    return pre;
  }, {} as any) as VR;
};
