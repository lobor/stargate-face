var spawn = require("child_process").spawn;


var basePath = process.cwd();
module.exports = function (cam, callback) {
  // callback(false, 'toto')
  // python2.7 -u ./plugins/face/back/scripts/train.py /home/lobor/Documents/PERSO/stargate
  const ls = spawn('python2.7', ['-u', basePath + '/plugins/face/back/scripts/stream.py',  cam, basePath]);
  ls.stdout.on('data', (data) => {
    // data = JSON.parse(data.toString('utf8'));
    callback(data);
  });
}
