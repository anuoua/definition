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

See [ConfigOptions](#configoptions) Options for details.

### Create json records in target directory.

`./jsons/hello.json`

```json
[
  { "key": "hello-1", "value": "hello", "label": "cba" },
  { "key": "hello-2", "value": "hello2", "label": "cba2" }
]
```

Records is extendable, for example `{ "key": "hello-1", "value": "hello", "label": "cba", "createBy": "god" },` is okay.

`value` should be string or number.

`key` and `value` are required, and `key` can be customized via the configuration file.

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
definitions
├── hello.ts
└── utils
    ├── index.ts
    ├── kr-map.ts
    ├── kv-map.ts
    ├── types.ts
    └── vr-map.ts
```

`./definitions/hello.ts`

```typescript
import { krMap, vrMap, kvMap } from "../utils";
export const ROUTES_records_readonly = [{ "key": "hello-1", "value": "hello", "label": "cba" }, { "key": "hello-2", "value": "hello2", "label": "cba2" }] as const;
export const ROUTES_records = ROUTES_records_readonly.concat(); // mutable records
export type ROUTES_Records = typeof ROUTES_records_readonly; // record type
export type ROUTES_Values = ROUTES_Records[number]["value"]; // values's type
export const ROUTES_Keys = {
    Hello1: "Hello1",
    Hello2: "Hello2"
} as const;
export const ROUTES_key_list = [ROUTES_Keys.Hello1, ROUTES_Keys.Hello2] as const; // key list
export const ROUTES_kr = krMap(ROUTES_records_readonly, ROUTES_key_list); // key -> record map
export const ROUTES_vr = vrMap(ROUTES_records_readonly, ROUTES_key_list, "value"); // value -> record map
export const ROUTES_kv = kvMap(ROUTES_records_readonly, ROUTES_key_list, "value"); // key -> value map
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

## License

MIT
