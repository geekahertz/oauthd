module.exports = {
	host_url: 'https://' + process.env.OPENSHIFT_APP_DNS,	// mounted on this url
	base: "/",								// add a base url path. e.g: "/auth"
	base_api: "/api",					// api base path
	port: process.env.OPENSHIFT_NODEJS_PORT || 8080,
	bind: process.env.OPENSHIFT_NODEJS_IP,			// bind to an ip

	debug: false,							// add stack trace & infos in errors

	/* uncomment to use ssl
	ssl: {
		key: '/path/to/key',
		certificate: '/path/to/crt',
		ca: '/path/to/ca'
	},
	*/

	staticsalt: 'i m a random string, change me.',
	publicsalt: 'i m another random string, change me.',

	redis: {
		port: process.env.OPENSHIFT_REDIS_PORT,
		host: process.env.OPENSHIFT_REDIS_HOST,
		password: process.env.REDIS_PASSWORD,
		// database: ...0~15...
		// options: {...other options...}
	},

	plugins: [
		'server.statistics',
		'server.admin.auth',
		'server.request',
		'server.admin'
	]
}
if (require('fs').existsSync(__dirname + '/config.local.js')) {
	var override = require('./config.local.js');
	for (var i in override)
		module.exports[i] = override[i];
}
