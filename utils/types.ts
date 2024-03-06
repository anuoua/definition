export type Key = number | string | symbol;

export type Indices<T extends readonly any[]> = Exclude<
  Partial<T>["length"],
  T["length"]
>;

export type InferKR<
  Records extends readonly Record<string, any>[],
  Keys extends readonly [...Key[]]
> = {
  [K in Indices<Records> as K extends number
    ? Keys[K]
    : never]: K extends number ? Records[K] : never;
};
