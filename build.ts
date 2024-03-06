await Bun.build({
  entrypoints: ["./src/index.ts", "./src/cli.ts"],
  target: "node",
  external: ["commander", "config", "glob", "lodash", "typescript", "varname"],
  outdir: "./dist",
});
