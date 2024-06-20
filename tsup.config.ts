import { defineConfig } from "tsup"

// 参照： https://tsup.egoist.dev/
export default defineConfig({
    entry: ["src/main.ts"],
    format: [
        "cjs",
        "esm"
    ], // CommonJSとES Moduleの両方を出力
    dts: true, // .d.tsファイルを出力
    clean: true, // ビルド前にdistディレクトリをクリア
    minify: true, // ファイルを圧縮
})
