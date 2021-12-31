import typescript from "rollup-plugin-typescript";

const userScriptBanner = `// BANNER`;

export default [
    {
        input: "index.ts",
        output: {
            banner: userScriptBanner,
            file: "dist/dist.js"
        },
        plugins: [
            typescript()
        ]
    }
];