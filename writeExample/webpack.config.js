const openBrowser = require('open-browser-webpack-plugin')

module.exports = {
    entry: __dirname+'/src/index.js',
    output: __dirname+'/web/bundle.js',
    module: {
        loaders : [{
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        },{
            test: /\.css$/,
            loader: 'style!css',
            exclude: /node_modules/
        }]
    },
    solove: ['','js','jsx'],
    plugins: [
        new openBrowser({
            url: 'http://localhost:3008',
            app: 'google chrome'
        })
    ],
    devServer : {
        contentBase: './',
        colors: true,
        inline: true,
        // open: {
        //     type: true,
        //     app: 'google chrome'
        // },
        historyApiFallback: true
    }
}