export type Key = number | string | symbol;

export type Indices<T extends readonly any[]> = Exclude<
  Partial<T>["length"],
  T["length"]
>;

export type Tuple<T, N extends number> = N extends N
  ? number extends N
    ? T[]
    : _TupleOf<T, N, []>
  : never;
type _TupleOf<T, N extends number, R extends unknown[]> = R["length"] extends N
  ? R
  : _TupleOf<T, N, [T, ...R]>;

export type InferKR<
  Records extends readonly Record<string, any>[],
  Keys extends readonly [...Key[]]
> = {
  [K in keyof Records as K extends `${Indices<Records>}`
    ? K extends keyof Keys
      ? Keys[K] extends string | number | symbol
        ? Keys[K]
        : never
      : never
    : never]: Records[K];
};
