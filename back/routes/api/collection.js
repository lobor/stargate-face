import fs from 'fs';

export default [
	{
		'name': 'fr:collections:new',
		'depPlugin': ['tableCollections'],
		'call': function(data, fc){
      let pathToSaveImg = process.cwd() + '/tmp/collections/' + data.name;
			var img, passage = 0;

			try {
		    fs.accessSync(pathToSaveImg, fs.F_OK);
			} catch (e) {
		    fs.mkdirSync(pathToSaveImg, '0777');
				// this.visio.addCollection(data.name);
			}

			data.files.forEach((file, i) => {
				img = data.files[i].data.replace(/^data:image\/\w+;base64,/, '');
	      fs.writeFile(pathToSaveImg + '/' + file.name, img, {encoding: 'base64'}, function(err){
					passage++;
					if(passage === data.files.length){
						fc({'state': true});
					}
	      });
			});
      this.tableCollections.push({
        name: data.name
      });
      this.tableCollections.save();
		}
	},
	{
		'name': 'fr:collections:get',
		'depPlugin': ['tableCollections'],
		'call': function(data, fc){
			fc(this.tableCollections.findById(data.id));
		}
	},
	{
		'name': 'fr:collections:get:image',
		'depPlugin': ['tableCollections'],
		'call': function(data, fc){
			let model = this.tableCollections.findById(data.id);

			if(model){
				let imagesModel = fs.readdirSync(process.cwd() + '/tmp/collections/' + model.name);
				fc({
					success: true,
					datas: imagesModel
				})
			}
			else{
				fc({error: true})
			}
			// fc(this.tableCollections.findById(data.id));
		}
	},
	{
		'name': 'fr:collections:list',
		'depPlugin': ['tableCollections'],
		'call': function(data, fc){
			fc(this.tableCollections.list());
		}
	},
	{
		'name': 'fr:collections:train',
		'depPlugin': ['launchTrain'],
		'call': function(data, fc){
			this.launchTrain();
			fc({success: true});
		}
	},
];
