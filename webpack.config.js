const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    devtool: "inline-source-map",
    plugins: [
        new HtmlWebpackPlugin({
            title: "Output Management",
            title: "Development",
            template: "./src/index.html",
        }),
    ],
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ["@babel/preset-env", { targets: "defaults" }],
                        ],
                    },
                },
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            sources: {
                                list: [
                                    {
                                        tag: "source",
                                        attribute: "src",
                                        type: "src",
                                    },
                                ],
                            },
                        },
                    },
                ],
            },

            {
                test: /\.(mov|mp4)$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]",
                    publicPath: "./src/assets/images",
                    outputPath: "./src/assets/videos",
                },
            },
        ],
    },
};
