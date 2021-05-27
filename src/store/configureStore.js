if(process.env.NODE_ENV === 'production') {
	console.info('configureStore.prod');
	module.exports = require('./configureStore.dev');
} else {
	console.info('configureStore.dev');
	module.exports = require('./configureStore.dev');
}