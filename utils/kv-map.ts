import { InferKR, Key } from "./types";

export const kvMap = <
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
    // @ts-expect-error
    [K in keyof KR]: KR[K][Field];
  };

  return records.reduce((pre, cur, index) => {
    pre[keys[index]] = cur[valueField];
    return pre;
  }, {} as any) as KV;
};
