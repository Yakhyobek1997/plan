// Backend serverni qurish (express dan foydalangan holda)
// Serverni 4 ta bosqichi bor

console.log('web serverni boshlash')
const express = require('express')
const app = express()
const http = require('http')
const fs = require('fs')

let user
fs.readFile('database/user.json', 'utf8', (err, data) => {
	if (err) {
		console.log('ERROR:', err)
	} else {
		user = JSON.parse(data) // JSON.parse() funksiyasiga data uzatildi
	}
})

// 1 KIrish codes
app.use(express.static('public')) // Xar qanday browserdan kiradigan so'rovlar uchun ochiq public
app.use(express.json()) // Kirib kelyotkan json datani object xolatiga ogirib beradi
app.use(express.urlencoded({ extended: true })) // form requestdan nimadirni post qilsak express qabul qiladi

// 2. Sessiya va rendering sozlamalari
// 3. Views code
app.set('views', 'views')
app.set('view engine', 'ejs')

// 4. Routing
app.post('/create-item', (req, res) => {
	// malumotni olib kelib data basega yozadi
	console.log(req)
	res.json({ test: 'success' })
})
app.get('/author', (req, res) => {
	// Noto'g'ri yo'l to'g'rilandi
	res.render('author', { user: user })
})

app.get('/', function (req, res) {
	// malumot olish uhcun
	res.render('reja')
})

// Serverni ishga tushirish
const server = http.createServer(app)
let PORT = 3000
server.listen(PORT, function () {
	console.log(
		`Server muvaffaqiyatli ishga tushdi: ${PORT}, http://localhost:${PORT}`
	)
})
