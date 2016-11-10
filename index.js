var basePath = process.cwd();
import { Plugin } from './../../core/';
import { spawn, exec } from 'child_process'
import fs from 'fs';
let db = require(basePath + '/core/db')(basePath + '/db/FaceRecognition');

var workerFarm = require('worker-farm');
var workers = workerFarm(basePath + '/plugins/face/lib/worker.js');;
// var http = require("http");

// var spawn = require('child_process').spawn;


class Face extends Plugin {
  get props() {
    return {
      dependencies: ['motion'],
      conf: require('./config/config')
    };
  }

  constructor () {
    super();
    this.stream = [];
		this.pathCollection = null;

    // this.db = db;
    this.db = {};
    this.tableFace = db.use('FaceRecognition');
    // // console.log(db);
    this.tableCollections = db.use('Collections');

		this.isStarting = false;
	}

  onLoad(){
    this.loadCollections();
    if(this.dependencies.motion){
      this.dependencies.motion.on('start', ()=>{
        let cams = this.dependencies.motion.motion.getCam();
        for(let cam of cams){
          this.launchWorker(cam);
        }
      });
    }
    else{
      this.loadCamera((cams)=>{
        // for(let cam in cams){
          this.launchWorker(cams);
        // }
      });
    }

    // this.launchWorker()
    // console.log(this.dependencies.motion.motion.getCam());
  }

  loadCollections(){
    // this.tableCollections = {list: function(){return []}}
    let collections = this.tableCollections.list();
    let collectionsPath = fs.readdirSync(basePath + '/plugins/face/collections');

    if(collectionsPath.length){
      collectionsPath.forEach((model)=>{
        if(!this.tableCollections.find({name: model})){
          this.tableCollections.push({
            name: model
          });
        }
      })
    }

    this.tableCollections.save();
    // // else{
    // //
    // // }
    // //
    // //
    //
    // if(collections.length){
    //   collectionsPath.forEach((model)=>{
    //     if(!collectionsPath.indexOf(model.name)){
    //       this.tableCollections.push({
    //         name: model.name
    //       })
    //     }
    //   })
    // }
    // else{
    //
    // }

  }

  loadCamera(cb){
    exec('ls /dev/video*', (error, stdout, stderr) => {
      let webCam = stdout.split('\n'); // output => ['/dev/video0', '/dev/video1', '']
      let camera = [];

    	// Hack last item
    	webCam.pop();
      camera = webCam.length - 1;
      cb(camera);
      // console.log(this.props.conf.motion);
      // if(webCam.length){
      //   webCam.forEach((el, i) => {
      //     camera.push();
      //     this.createCamConf(configJson, 'cam' + 1);
      //
      //     this.motion.addCam(configJson);
      //   });
      //
      //   this.emit('addCam');
      //
      //   this.motion.setConfig(this.props.conf.motion);
      //
      //   this.motion.setConfigPath(__dirname + '/tmp/');
      //   this.writeConf({
      //     conf: this.props.conf.motion,
      //     path: __dirname + '/tmp/',
      //     name: 'confcam'
      //   });
      //   this.start();
      // }
    });
  }


  launchWorker(stream){
    workers = workerFarm(basePath + '/plugins/face/lib/worker.js');
    workers(stream, this.tableCollections.list(), (stop, data) => {
      if(stop){
        workerFarm.end(workers);
        this.launchWorker(stream);
        this.logResultsFaceRecognition(data);
      }
    });
  }

  logResultsFaceRecognition(datas){
    for(let label in datas){
      this.tableFace.push({
        date: new Date(),
        prediction: datas[label],
        who: label
      });
    }
    this.tableFace.save();
    // let tableFace = db.use('FaceRecognition');
    // tableFace.push({
    //   date: new date(),
    //   prediction:
    // })
  }

  // onConfig(error){
  //   // console.log('config', error);
  //
  //   // console.log('config', this.config);
  // }
  //
  // onDependencies(){
  //   if(this.dependencies.motion){
  //     this.dependencies.motion.on('addCam', ()=>{
  //       this.dependencies.motion.motion.camera;
  //     })
  //   }
  // }

  // onBack(error){
  //   // console.log('config', error);
  // }

	// addStream(config) {
	// 	this.stream.push(config);
	// }
  //
	// deleteCollection(id) {
	// 	this.collections = this.collections.filter(function (collection) {
	// 		return (collection !== id);
	// 	});
	// }
  //
	// addCollection(collection) {
	// 	let sizeCollection = this.collections.length;
	// 	this.collections.push(collection);
	// 	if (0 === sizeCollection && this.isStarting)
	// 		this.start();
	// }
  //
	// setPathCollection(path) {
	// 	this.pathCollection = path;
	// 	fs.readdir(path, (err, files) => {
  //     if(files.length)
  // 			files.forEach((file) => {
  // 				this.addCollection(file);
  // 			});
	// 	});
	// }
  //
	// stop() {
	// 	this.isStarting = false;
	// }
  //
	// start() {
	// 	var that = this;
	// 	if (!this.pathCollection && !this.collections.length && !this.stream.length) {
	// 		return;
	// 	}
	// 	this.isStarting = true;
  //
  //   this.stream.forEach((stream, index) => {
  //     this.launchWorker(index);
  //   });
	// }
  //

}


export default Face;
