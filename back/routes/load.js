
module.exports = {
	api: [
		// API
		// require('./API/detect'),
		require('./api/facerecognition'),
	],
	front: [
		// Page
		require('./front/facerecognition/img'), // video
	]
};
