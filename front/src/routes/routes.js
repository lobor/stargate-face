import Face from './../views/face/Face.jsx';
import EditCollection  from './../views/face/subViews/collections/EditCollection';

module.exports = [
	{
		pattern: '/face',
		component: Face,
		name: 'face',
		exactly: false
	},
	{
		pattern: '/face/collections/edit/:id',
		component: EditCollection,
		name: 'edit_collection',
		exactly: false
	}
]
