// console.log('web serverni boshlash')
const express = require('express')
const http = require('http')
const fs = require('fs')
const app = express()

// mongoDB call qilamiz
const db = require('./server').db()
const mongodb = require('mongodb')

//1.kirish kodlari
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//2.session code

//3.views code
app.set('views', 'views')
app.set('view engine', 'ejs')

//4.routing code

app.post('/create-item', (req, res) => {
	console.log('user entered / create-item')
	const new_reja = req.body.reja
	db.collection('plans').insertOne({ reja: new_reja }, (err, data) => {
		console.log(data.ops)
		res.json(data.ops[0])
	})
})

app.post('/delete-item', (req, res) => {
	const id = req.body.id
	db.collection('plans').deleteOne(
		{ _id: new mongodb.ObjectId(id) },
		function (err, data) {
			res.json({ state: 'success' })
		}
	)
})

app.post('/delete-all', (req, res) => {
	if (req.body.delete_all) {
		db.collection('plans').deleteMany(() => {
			res.json({ state: 'delete all' })
		})
	}
})

app.get('/author', (req, res) => {
	res.render('author', { user: user })
})



// HTTP POST so'rovi uchun ishlatiladi "/edit-item"
app.post("/edit-item", (req, res) => {
    // So'rov tanasi (body)dan ma'lumotlarni olish
    const data = req.body;
    
    // "plans" kolleksiyasidagi hujjatni yangilash
    db.collection("plans").findOneAndUpdate(
        // Yangilanishi kerak bo'lgan hujjatni tanlash (_id orqali)
        { _id: new mongodb.ObjectId(data.id) },
        // Hujjatning "reja" qismini yangilash
        { $set: { reja: data.new_input } },
        // Callback funksiyasi (amaliyotdan so'ng chaqiriladi)
        function (err, data) {
            // Agar xato bo'lmasa, muvaffaqiyatli javobni qaytaring
            res.json({ state: "success" });
        }
    );
});

// HTTP GET so'rovi uchun ishlatiladi "/"
app.get('/', function (req, res) {
    console.log('user entered /');
    
    // "plans" kolleksiyasidagi barcha hujjatlarni olish
    db.collection('plans')
        .find()
        .toArray((err, data) => {
            if (err) {
        
                console.log(err);
                res.end('something went wrong');
            } else {
                // Ma'lumotlarni konsolga chop etish va "reja" shabloniga yuborish
                console.log(data);
                res.render('reja', { items: data });
            }
        });
});

module.exports = app;

