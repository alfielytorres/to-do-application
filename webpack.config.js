const path = require('path') // require library that allows us to combine paths in a global way


// in -> out
module.exports = {
    entry: {
        index:['babel-polyfill','./src/index.js'], // index.js (relative pathanme)
        edit:['babel-polyfill','./src/edit.js'] // edit.js (relative pathanme)
    },
    output: {
        path: path.resolve(__dirname, 'public/scripts'), // combines paths 
        filename: '[name]-bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/env']
                }
            }
        }]
    },
    devServer: {
        contentBase:path.resolve(__dirname, 'public'), //must be an absolute path
        publicPath:'/scripts/' // where webpack puts out assets 
    },
    devtool:'source-map'
}
