// Serverni ishga tushirish
const http = require('http')
const mongodb = require('mongodb')
let db
const connectionString =
	'mongodb+srv://harrry19971999:4234tgs54gs@cluster0.hju4p.mongodb.net/reja'

mongodb.connect(
	connectionString,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	(err, client) => {
		//agar yaxshi ulanmas error boladi
		if (err) console.log('ERROR on connection MongDB')
		else {
			console.log('MongoDB connection succeed')
			module.exports = client

			const app = require('./app')

			const server = http.createServer(app) //server (object)
			let PORT = 3000
			server.listen(PORT, function () {
				console.log(
					`The server is running successfully on port:${PORT},http://localhost:${PORT}`
				)
			})
		}
	}
)
