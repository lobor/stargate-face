let facerecognition = require('./routes/api/facerecognition');
let collections = require('./routes/api/collection');

module.exports.routes = {
  api: facerecognition.concat(collections),
  front: require('./routes/front/facerecognition/img')
};
