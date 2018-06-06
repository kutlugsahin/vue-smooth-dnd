'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve(dir) {
	return path.join(__dirname, '..', dir)
}

const libName = 'vue-smooth-dnd';
const libPath = path.join(libName, 'index.js');

const outputPath = path.resolve(path.join(__dirname, '..', libName, 'dist'));

module.exports = {
	entry: './vue-smooth-dnd/index.js',
	output: {
		path: outputPath, // eslint-disable-line
		filename: 'vue-smooth-dnd.js',
		library: 'VueSmoothDnD',
		libraryTarget: "umd",
	},
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
		}
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: vueLoaderConfig
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				options: {
					presets: ['env']
				},
				include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
			}
		]
	},
	externals: {
		vue: {
			commonjs: 'vue',
			commonjs2: 'vue',
			amd: 'vue',
			root: 'Vue'
		},
		'smooth-dnd': {
			commonjs: 'smooth-dnd',
			commonjs2: 'smooth-dnd',
			amd: 'smooth-dnd',
			root: 'SmoothDnD'
		}
	},
	node: {
		// prevent webpack from injecting useless setImmediate polyfill because Vue
		// source contains it (although only uses it if it's native).
		setImmediate: false,
		// prevent webpack from injecting mocks to Node native modules
		// that does not make sense for the client
		dgram: 'empty',
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
		child_process: 'empty'
	}
}
