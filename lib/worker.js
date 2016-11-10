var spawn = require("child_process").spawn;


var basePath = process.cwd();
module.exports = function (stream, collections, callback) {
  // callback(false, 'toto')
  let url = '';
  if(typeof stream === 'string' || typeof stream === 'number'){
    url = stream;
  }
  else{
    url = 'http://localhost:' + stream.stream_port + '/ ';
  }
  const ls = spawn('python2.7', ['-u', basePath + '/plugins/face/back/scripts/recognizer.py',  basePath + '/plugins/face', url, collections.join(',')]);
  ls.stdout.on('data', (data) => {
    data = JSON.parse(data.toString('utf8'));
    callback(true, data);
  });
}
