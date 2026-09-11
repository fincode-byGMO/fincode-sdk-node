import { readFileSync, readdirSync } from "fs"
import { join } from "path"

/**
 * npm test が回す範囲の取り決めを守る。
 *
 * 実APIを叩くテストは認証情報が要るのでCIでは回せない。package.json の
 * test スクリプトでそれらを除外しているが、テストを足したときに除外の
 * 指定が追随しないと、CIで落ちるか、逆に回るべきテストが漏れる。
 */
const DIR = join(__dirname)

const SELF = "testScope.test.ts"

/**
 * このファイル自身は判定から外す。認証情報の要否を調べる正規表現を
 * 文字列として持っているため、自分を調べると要ると誤判定する。
 */
const testFiles = () => readdirSync(DIR).filter((f) => f.endsWith(".test.ts") && f !== SELF)

const needsCredentials = (file: string) =>
    /dotenv|process\.env/.test(readFileSync(join(DIR, file), "utf-8"))

const ignorePattern = () => {
    const pkg = JSON.parse(readFileSync(join(DIR, "../../../package.json"), "utf-8"))
    const m = /--testPathIgnorePatterns "([^"]+)"/.exec(pkg.scripts.test)
    if (!m) throw new Error("test スクリプトに testPathIgnorePatterns がない")
    return new RegExp(m[1])
}

describe("npm test の対象範囲", () => {
    it("認証情報が要るテストはすべて除外されている", () => {
        const notExcluded = testFiles()
            .filter(needsCredentials)
            .filter((f) => !ignorePattern().test(`src/api/v1/${f}`))

        expect(notExcluded).toEqual([])
    })

    it("認証情報が要らないテストは除外されていない", () => {
        const excluded = testFiles()
            .filter((f) => !needsCredentials(f))
            .filter((f) => ignorePattern().test(`src/api/v1/${f}`))

        expect(excluded).toEqual([])
    })
})
