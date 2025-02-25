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

			const server = http.createServer(app) //server ham object
			let PORT = 3000
			//-8- serverga <listen> qil degan metoodi orqali buyuruq beryapmiz
			//<listen> ichida 2 ta orgemnt bor. Bu callback. 1.PORT 2.Function
			// 3000 chi portni eshitib deb majburlayapmiz
			server.listen(PORT, function () {
				console.log(
					// va 3000 chi portni eshitgan payti <localhost 3000> malumotni ber diyapmiz
					`The server is running successfully on port:${PORT},http://localhost:${PORT}`
				)
				//server shu bilan 3000 prtda ishga tushyapti
			})
		}
	}
)
