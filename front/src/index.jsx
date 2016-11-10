import { setNavigation, setRoutes, deleteNavigation, deleteRoutes } from './../../../../core/toolboxFront.js';
//
import Routes from './routes/routes';
import Navigation from './routes/navigation';
var conf = require('./../../config/config');
require('./languages/languages');

setNavigation(Navigation, conf.name);
setRoutes(Routes);

// event for delete plugin
window.addEventListener('face:delete', function (e) {
  deleteRoutes(Routes);
  deleteNavigation(Navigation);
}, false);
