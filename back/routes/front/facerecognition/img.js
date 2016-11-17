export default [
	{
		'url': '/facerecognition/img/:nameCollection/:img',
		'type': 'get',
		'call': function(req, res){
      // req.params
      res.sendFile(process.cwd() + '/tmp/collections/' + req.params.nameCollection + '/' + req.params.img);
		}
	},
	{
		'url': '/face/img/:img',
		'type': 'get',
		'call': function(req, res){
      // req.params
      res.sendFile(process.cwd() + '/tmp/notRecognize/' + req.params.img);
		}
	},
	{
		'url': '/face/img/collection/:collection/:img',
		'type': 'get',
		'call': function(req, res){
      // req.params
      res.sendFile(process.cwd() + '/tmp/collections/' + req.params.collection + '/' + req.params.img);
		}
	}
];
