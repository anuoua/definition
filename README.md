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
  { "key": "hello-1", "value": "hello", "label": "cba" },
  { "key": "hello-2", "value": "hello2", "label": "cba2" }
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
import { krMap, vrMap, kvMap } from "../utils";
export const ROUTES_records_readonly = [{ "key": "hello-1", "value": "hello", "label": "cba" }, { "key": "hello-2", "value": "hello2", "label": "cba2" }] as const;
export const ROUTES_records = ROUTES_records_readonly.concat();
export type ROUTES_Records = typeof ROUTES_records_readonly;
export type ROUTES_Values = ROUTES_Records[number]["value"];
export const ROUTES_Keys = {
    Hello1: "Hello1",
    Hello2: "Hello2"
} as const;
export const ROUTES_key_list = [ROUTES_Keys.Hello1, ROUTES_Keys.Hello2] as const;
export const ROUTES_kr = krMap(ROUTES_records_readonly, ROUTES_key_list);
export const ROUTES_vr = vrMap(ROUTES_records_readonly, ROUTES_key_list, "value");
export const ROUTES_kv = kvMap(ROUTES_records_readonly, ROUTES_key_list, "value");
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
