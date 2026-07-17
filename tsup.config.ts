import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    components: "src/components/index.ts",
    primitives: "src/primitives/index.ts",
    utils: "src/utils/index.ts",
  },
  format: ["esm"],
  dts: {
    compilerOptions: {
      incremental: false,
      composite: false,
      tsBuildInfoFile: undefined,
    }
  },
  clean: true,
  external: [
    "react", 
    "react-dom", 
    "next", 
    "tailwindcss", 
    "sonner", 
    "next-themes",
    "date-holidays",
    /^@radix-ui\/.*$/ 
  ],
  minify: true,
  sourcemap: true,
  splitting: false,
  treeshake: true,
  outDir: "dist",
  esbuildOptions(options, context) {
    if (context.format === "esm") {
      options.banner = {
        js: (context.entryName === "components" || context.entryName === "primitives") 
          ? '"use client";' 
          : "",
      };
    }
  },
});