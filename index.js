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
    this.tableRecognition = db.use('Recognition');
    this.tableNotRecognition = db.use('NotRecognition');
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
          this.launchRecognize(cam);
        }
      });
    }
    else{
      this.loadCamera((cams)=>{
        // for(let cam in cams){
        this.createServerCam(cams);
          this.launchRecognize(cams);
        // }
      });
    }

    // this.launchWorker()
    // console.log(this.dependencies.motion.motion.getCam());
  }

  createServerCam(cams){
    workers = workerFarm(basePath + '/plugins/face/lib/serverCam.js');
    workers(cams, (data) => {
      workerFarm.end(workers);
    });
  }

  loadCollections(){
    // this.tableCollections = {list: function(){return []}}
    let collections = this.tableCollections.list();
    let collectionsPath = fs.readdirSync(basePath + '/tmp/collections');

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
  }

  loadCamera(cb){
    exec('ls /dev/video*', (error, stdout, stderr) => {
      let webCam = stdout.split('\n'); // output => ['/dev/video0', '/dev/video1', '']
      let camera = [];
    	// Hack last item
    	webCam.pop();

      webCam.forEach((item)=>{
        cb(item.replace('/dev/video', ''));
      })
      // camera = webCam.length - 1;
      // cb(camera);
    });
  }


  launchTrain(){
    workers = workerFarm(basePath + '/plugins/face/lib/trainWorker.js');
    workers((data) => {
      workerFarm.end(workers);
    });
  }


  launchRecognize(stream){
    workers = workerFarm(basePath + '/plugins/face/lib/recognizeWorker.js');
    let collections = this.tableCollections.list();

    collections = collections.map(function(item){
      return item.name;
    })

    workers(stream, collections, (data) => {
      workerFarm.end(workers);
      this.launchRecognize(stream);
      this.logResultsFaceRecognition(data);
    });
  }

  logResultsFaceRecognition(datas){
    let table = {};
    for(let label in datas){
      if(label !== 'unknown'){
        this.tableRecognition.push({
          date: new Date(),
          prediction: datas[label],
          who: label
        });
      }
      else if(label === 'unknown' || datas[label] > 15){
        let dataToSave = {}
        if(label === 'unknown'){
          dataToSave = {
            date: new Date(),
            prediction: datas[label].prediction,
            img: datas[label].img,
            who: label
          }
        }
        else{
          dataToSave = {
            date: new Date(),
            prediction: datas[label],
            who: label
          }
        }
        this.tableNotRecognition.push(dataToSave);
      }
    }
    this.tableRecognition.save();
    this.tableNotRecognition.save();
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
