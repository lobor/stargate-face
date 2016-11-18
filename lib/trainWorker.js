var spawn = require("child_process").spawn;


var basePath = process.cwd();
module.exports = function (callback) {
  // callback(false, 'toto')
  // python2.7 -u ./plugins/face/back/scripts/train.py /home/lobor/Documents/PERSO/stargate
  const ls = spawn('python2.7', ['-u', basePath + '/plugins/face/back/scripts/train.py',  basePath]);
  ls.stdout.on('data', (data) => {
    // data = JSON.parse(data.toString('utf8'));
    console.log(data.toString('utf8'));
    callback(data);
  });
}
