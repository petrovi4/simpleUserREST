import Dashboard from './views/Dashboard/Dashboard';

// A convenient approach when developing large complex projects with many pages
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
	{ path: '/', exact: true, name: 'Main' },
	{ path: '/dashboard', name: 'Dashboard', component: Dashboard },
];

export default routes;
