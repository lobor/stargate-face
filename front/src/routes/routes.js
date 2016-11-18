import Face from './../views/face/Face.jsx';
import EditCollection  from './../views/face/subViews/collections/EditCollection';
import NewCollection  from './../views/face/subViews/collections/NewCollection';
import Stream  from './../views/stream/Stream';

module.exports = [
	{
		pattern: '/face',
		component: Face,
		name: 'face',
		exactly: true
	},
	{
		pattern: '/face/collections/edit/:id',
		component: EditCollection,
		name: 'edit_collection',
		exactly: true
	},
	{
		pattern: '/face/collections/new',
		component: NewCollection,
		name: 'new_collection',
		exactly: true
	},
	{
		pattern: '/face/streams',
		component: Stream,
		name: 'stream',
		exactly: true
	}
]
