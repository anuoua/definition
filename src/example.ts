enum Keys {
  A = 'a',
  B = 'b'
}

enum Values {
  A = 'a',
  B = 'b'
}

const records = [
  { key: Keys.A, value: Values.A, label: 'a'},
  { key: Keys.B, value: Values.B, label: 'b'},
] as const;

type Records = typeof records;


type KR = {
  [Keys.A]: Records[0];
  [Keys.B]: Records[1];
}

const kr = records.reduce((pre, cur) => {
  pre[cur.key] = cur;
}, ({}) as any) as KR;

type VR = {
  [Values.A]: Records[0];
  [Values.B]: Records[1];
}

const vr = records.reduce((pre, cur) => {
  pre[cur.value] = cur;
}, ({}) as any) as VR;


