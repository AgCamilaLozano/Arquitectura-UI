import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    components: "src/components/index.ts",
    utils: "src/utils/index.ts",
  },
  format: ["esm"],
  dts: {
    // CORREGIDO: Fuerza a TypeScript a ignorar opciones incrementales conflictivas del tsconfig durante el bundling de tipos
    compilerOptions: {
      incremental: false,
      composite: false,
      tsBuildInfoFile: undefined,
    }
  },
  clean: true,
  external: ["react", "react-dom", "next", "tailwindcss", "sonner", "next-themes"],
  minify: true,
  sourcemap: true,
  splitting: false, // Mantiene los entrypoints limpios y consistentes con package.json
  treeshake: true,
  outDir: "dist",
  
  // CORREGIDO: El banner condicional preserva "use client" solo para components y toast, evitando warnings en utils
  esbuildOptions(options, context) {
    if (context.format === "esm") {
      options.banner = {
        js: "", // Dejamos que los archivos individuales declaren su propia directiva para evitar warnings en utilitarios puros
      };
    }
  },
});