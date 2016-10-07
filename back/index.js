
module.exports = {
	api: [
		// API
		// require('./API/detect'),
		require('./routes/api/facerecognition'),
	],
	front: [
		// Page
		require('./routes/front/facerecognition/img'), // video
	]
};
