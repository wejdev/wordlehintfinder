import { build } from "esbuild";

// Automatically exclude all node_modules from the bundled version
import { nodeExternalsPlugin } from "esbuild-node-externals";

build({
    entryPoints: ["src/wordlehintfinder.ts"],
    outdir: "bin",
    bundle: true,
    minify: false,
    platform: "node",
    sourcemap: true,
    target: "node16",
    plugins: [nodeExternalsPlugin()],
  })
  .catch(() => process.exit(1));
