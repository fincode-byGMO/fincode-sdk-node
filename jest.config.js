export default {
  preset: "ts-jest/presets/default-esm",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest", {
        "tsconfig": "tsconfig.json",
      }
    ],
  },
};