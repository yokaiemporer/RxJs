// module.exports={
//     entry:"./main",
//     output:{filename:"app.js"},
//     module:{
//         loaders:[
//             {
//                 test:/.ts$/,
//                 loader:"ts-loader"
//             }
//         ]
//     },
//     resolve:{
//         extensions:["",".ts",".js"]
//     }
// }
var path = require('path');

module.exports = {
entry: './main.ts',
resolve: {
extensions: ['.webpack.js', '.web.js', '.ts', '.js']
},
module: {
rules: [
{ test: /.ts$/, loader: 'ts-loader' }
]
},
output: {
filename: 'app.js',
path: path.resolve(__dirname, 'dist')
}
};