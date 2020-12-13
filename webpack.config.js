const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
    entry: ["@babel/polyfill", "./app/index.js"],
    devtool: "#eval-source-map",
    output: {
        path: path.join(__dirname, "/dist/meals-calendar"),
        filename: "bundle.js"
    },
    devServer: {
        publicPath: "/meals-calendar",
        historyApiFallback: true,
        compress: true,
        port: 9000,
        open: {
            app: ["chrome", "--incognito"]
        },
        openPage: "meals-calendar/"
    },
    module: {
        rules: [
            {
                use: "babel-loader",
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CopyPlugin([
            { from: "index.html" },
            { from: "css/", to: "css/" },
        ])
        //,new BundleAnalyzerPlugin()
    ]
};
