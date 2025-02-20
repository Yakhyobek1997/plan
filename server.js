// Backend serverni qurish (express dan foydalangan holda)
// Serverni 4 ta bosqichi bor

console.log('web serverni boshlash')
const express = require('express')
const app = express()
const http = require('http')
const { text } = require('stream/consumers')
// 1 KIrish codes
app.use(express.static('public')) // Xar qanday browserdan kiradigan so'rovlar uchun ochiq public
app.use(express.json()) // Kirib kelyotkan json datani object xolatiga ogirib beradi
app.use(express.urlencoded({ extended: true })) // form requestdan nimadirni post qilsak express qabul qiladi

// Sessiya va rendering sozlamalari
app.set('views', 'views')
app.set('view engine', 'ejs')

// Routing
app.post('/create-item', (req, res) => {
	// malumotni olib kelib data basega yozadi
	console.log(req)
	res.json({ test: 'success' })
})

app.get('/', function (req, res) {
	// malumot olish uhcun
	res.render('harid')
})

// Serverni ishga tushirish
const server = http.createServer(app)
let PORT = 3000
server.listen(PORT, function () {
	console.log(`Server muvaffaqiyatli ishga tushdi: ${PORT}`)
})
