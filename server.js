const http = require('http') // HTTP server yaratish uchun modulni chaqiramiz
const mongodb = require('mongodb') // MongoDB bilan ishlash uchun modulni chaqiramiz

let db // MongoDB ulanishi saqlanadigan o'zgaruvchi

const connectionString =
	'mongodb+srv://harrry19971999:4234tgs54gs@cluster0.hju4p.mongodb.net/reja'
// MongoDB Atlas serveriga ulanish uchun connection string

mongodb.connect(
	connectionString,
	{
		useNewUrlParser: true, // Yangi parserni ishlatish
		useUnifiedTopology: true, // Yangi topology dvijogini ishlatish
	},
	(err, client) => {
		if (err) console.log('ERROR on connection MongDB')
		// Agar MongoDB ulanishida xatolik bo'lsa, xabar chiqaramiz
		else {
			console.log('MongoDB connection succeed')
			// Ulanish muvaffaqiyatli bo'lsa, konsolga xabar chiqaramiz
			module.exports = client
			// MongoDB ulanishini boshqa fayllarga eksport qilamiz

			const app = require('./app')
			// Express yoki boshqa backend kodini o'z ichiga olgan app.js faylini yuklaymiz

			const server = http.createServer(app)
			// HTTP server yaratamiz va unga app (Express yoki boshqa) ni ulaymiz

			let PORT = 3000 // Server ishlaydigan port raqami
			server.listen(PORT, function () {
				console.log(
					`The server is running successfully on port:${PORT}, http://localhost:${PORT}`
				)
				// Server ishga tushganini va qaysi portda ekanligini konsolga chiqaramiz
			})
		}
	}
)

// RDBS - malumotlarni tablisa ko'rinishda , (Jadval ko'rinishda) saqlaydi.

// NoSQL (Not Only SQL) database hisoblanadi.
// RDBMS (Relational Database Management System)

// NoSql relatsion bo‘lmagan, yuqori tezlikda ishlovchi va
// katta hajmdagi ma’lumotlarni saqlash uchun mo‘ljallangan.
