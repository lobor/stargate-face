export default [
	{
		'url': '/facerecognition/img/:nameCollection/:img',
		'type': 'get',
		'call': function(req, res){
      // req.params
      res.sendFile(process.cwd() + '/visio/collections/' + req.params.nameCollection + '/' + req.params.img);
		}
	},
	{
		'url': '/face/img/:img',
		'type': 'get',
		'call': function(req, res){
      // req.params
      res.sendFile(process.cwd() + '/plugins/face/tmp/notRecognize/' + req.params.img);
		}
	},
	{
		'url': '/face/img/collection/:collection/:img',
		'type': 'get',
		'call': function(req, res){
      // req.params
      res.sendFile(process.cwd() + '/plugins/face/collections/' + req.params.collection + '/' + req.params.img);
		}
	}
];
