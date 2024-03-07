# Definition [![publish](https://github.com/anuoua/definition/actions/workflows/main.yml/badge.svg)](https://github.com/anuoua/definition/actions/workflows/main.yml)

Generate typescript type definitions and enumerations from business definition json records.

## Install

```shell
npm i definition
```

## Usage

### Create config file.

`definition.config.mjs`

```javascript
/**
 * @return {import('definition').ConfigOptions}
 */
export default () => {
  return {
    dir: "./jsons",
    output: "./definitions",
  };
};
```

### Create json records in target directory.

`./jsons/hello.json`

```json
[
  { "value": "hello", "key": "hello" },
  { "value": "world", "key": "world" }
]
```

### Run command

```shell
npx def generate # or npx def g
```

or add command to scripts with `npm run`

```json
{
  "scripts": {
    "definition": "def generate" // or def g
  }
}
```

### Result

```
.
├── hello.ts
└── utils
    ├── index.ts
    ├── kr-map.ts
    ├── kv-map.ts
    ├── types.ts
    └── vr-map.ts
```

`./definitions/hello.ts`

```
import { krMap, vrMap, kvMap } from "./utils";
export const HELLO_records = [{ "value": "hello", "key": "hello" }, { "value": "world", "key": "world" }] as const;
export type HELLO_Records = typeof HELLO_records;
export type HELLO_Values = HELLO_Records[number]["value"];
export enum HELLO_Keys {
    Hello = "Hello",
    World = "World"
}
export const HELLO_key_list = [HELLO_Keys.Hello, HELLO_Keys.World] as const;
export const HELLO_kr = krMap(HELLO_records, HELLO_key_list);
export const HELLO_vr = vrMap(HELLO_records, HELLO_key_list, "value");
export const HELLO_kv = kvMap(HELLO_records, HELLO_key_list, "value");
```

## CLI

```
Usage: cli [options] [command]

Options:
  -h, --help            display help for command

Commands:
  generate|g [options]
  help [command]        display help for command
```

command `generate`

```
sage: cli generate|g [options]

Options:
  -c, --config [path]  Config file path
  -h, --help           display help for command
```

## ConfigOptions

```typescript
interface ConfigOptions {
  dir: string; // Json records directory
  output: string; // Definitions output directory
  valueField?: string; // The value field key
  keyField?: string; // The key field key
  keyFormat?: "camelback" | "camelcase" | "underscore"; // The format of the generated key
  keyGen?: (record: Record<string, any>) => string; // Custom key generate function
}
```

**Note**: when `keyGen` is configured, `keyFormat` will be ignored.

## Liscence

MIT
