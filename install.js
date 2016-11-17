var spawn = require('child_process').spawn;
var fs = require('fs');
var cs = require('./../../core/console');
var rootPath = './../..';

try {
  fs.accessSync(rootPath + '/tmp/', fs.F_OK);
} catch (e) {
  fs.mkdirSync(rootPath + '/tmp/', '0777');
}

try {
  fs.accessSync(rootPath + '/tmp/models', fs.F_OK);
} catch (e) {
  fs.mkdirSync(rootPath + '/tmp/models', '0777');
}

try {
  fs.accessSync(rootPath + '/tmp/notRecognize', fs.F_OK);
} catch (e) {
  fs.mkdirSync(rootPath + '/tmp/notRecognize', '0777');
}

try {

  fs.accessSync(rootPath + '/db/FaceRecognition', fs.F_OK);
} catch (e) {
  fs.mkdirSync(rootPath + '/db/FaceRecognition', '0777');
}


let ls = spawn('apt-get', ['install', 'libopencv-dev', 'python-opencv', 'python2.7']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});

// sudo apt-get install libopencv-dev python-opencv python2.7
