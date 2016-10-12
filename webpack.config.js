var webpack = require(process.cwd() + '/webpack.config.js');

webpack.entry = "./plugins/face/front/src/index.jsx";
webpack.output = {
	path: "./plugins/face/front/assets",
	filename: "face.js"
}

module.exports = webpack;
