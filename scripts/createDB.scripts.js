const mysql = require('mysql2/promise')
const configDevelop = require('../server/config/config.json').development
const configTest = require('../server/config/config.json').test
const configProduction = require('../server/config/config.json').production

mysql
	.createConnection({
		host: configDevelop.host || '127.0.0.1',
		port: configDevelop.port || '3306',
		user: configDevelop.username || 'root',
		password: configDevelop.password || 'root'
	})
	.then((connection) => {
		connection.query(`CREATE DATABASE IF NOT EXISTS ${configDevelop.database};`).then((res) => {
			console.info('Database create or successfully checked')
			process.exit(0)
		})
	})

mysql
	.createConnection({
		host: configTest.host || '127.0.0.1',
		port: configTest.port || '3306',
		user: configTest.username || 'root',
		password: configTest.password || 'root'
	})
	.then((connection) => {
		connection.query(`CREATE DATABASE IF NOT EXISTS ${configTest.database};`).then((res) => {
			console.info('Database create or successfully checked')
			process.exit(0)
		})
	})

mysql
	.createConnection({
		host: configProduction.host || '127.0.0.1',
		port: configProduction.port || '3306',
		user: configProduction.username || 'root',
		password: configProduction.password || 'root'
	})
	.then((connection) => {
		connection.query(`CREATE DATABASE IF NOT EXISTS ${configProduction.database};`).then((res) => {
			console.info('Database create or successfully checked')
			process.exit(0)
		})
	})
