// console.log('web serverni boshlash')
const express = require('express') // Express.js modulini o'zgarmas (constant) o'zgaruvchi sifatida chaqiradi va `express` ga saqlaydi
const http = require('http') // HTTP modulini o'zgarmas o'zgaruvchi sifatida chaqiradi va `http` ga saqlaydi
const fs = require('fs') // Fayl tizimi (File System) modulini o'zgarmas o'zgaruvchi sifatida chaqiradi va `fs` ga saqlaydi
const app = express() // `express` funksiyasini chaqirib, `app` nomli Express ilovasini yaratadi


// mongoDB call qilamiz
const db = require('./server').db() // 'server' modulidan `db` funksiyasini chaqiradi va `db` nomli o'zgaruvchiga saqlaydi
const mongodb = require('mongodb') // 'mongodb' modulini o'zgarmas o'zgaruvchi sifatida chaqiradi va `mongodb` ga saqlaydi


//1.kirish kodlari
app.use(express.static('public'))
// 'public' papkasidagi statik fayllarni xizmat qilish uchun Express middleware-funksiyasini qo'shadi (masalan, HTML, CSS, va JavaScript fayllari)
app.use(express.json())
// JSON ma'lumotlarni qabul qilish va ular bilan ishlash uchun Express middleware-funksiyasini qo'shadi
app.use(express.urlencoded({ extended: true }))
// URL-kodlangan ma'lumotlarni qabul qilish va ular bilan ishlash uchun Express middleware-funksiyasini qo'shadi, 'extended: true' esa kompleks ob'ektlarni qo'llab-quvvatlaydi


//2.session code

//3.views code
app.set('views', 'views')
// `views` papkasini Express ilovasidagi view shablonlarini saqlaydigan joy sifatida belgilaydi
app.set('view engine', 'ejs')
// Express ilovasi uchun `ejs` (Embedded JavaScript) shablonlash dvigatelini o'rnatadi


//4.routing code 

app.post('/create-item', (req, res) => { // '/create-item' endpointi uchun POST so'rovini oladi va unga ishlov beradi
    console.log('user entered /create-item') // Konsolda foydalanuvchi '/create-item'ga kirgani haqida xabar chiqaradi
    const new_reja = req.body.reja // `req.body.reja` dan yangi reja qiymatini oladi va `new_reja` o'zgaruvchiga saqlaydi
    db.collection('plans').insertOne({ reja: new_reja }, (err, data) => { // 'plans' kolleksiyasiga yangi reja hujjatini qo'shadi
        console.log(data.ops) // Konsolda operatsiya natijasini chiqaradi
        res.json(data.ops[0]) // Mijozga yaratilgan yangi reja hujjatini JSON formatida jo'natadi
    })
})




// Delete section 
// STEP 2 (Backendga kirish)
app.post('/delete-item', (req, res) => { 
// '/delete-item' endpointi uchun POST so'rovini olib ishlov beradi
    const id = req.body.id
// So'rov(body) 'id' ni oladi va `id` o'zgaruvchiga saqlaydi

// STEP 3 (Backend => Database delete amalga oshirish)  
    db.collection('plans').deleteOne(
// 'plans' kolleksiyasidan bir hujjatni o'chiradi
        { _id: new mongodb.ObjectId(id) },
// '_id' teng bo'lgan hujjatni tanlaydi va yangi `ObjectId` yaratiladi
        function (err, data) { // Callback funksiyasi, o'chirish operatsiyasi tugagach chaqiriladi
// STEP 4 DataBase yana qayta backendga qaytmoqda
            res.json({ state: 'success' })
// Mijozga JSON formatida javob yuboradi, bu muvaffaqiyatni ko'rsatadi
        }
    )
})





app.post('/delete-all', (req, res) => { // '/delete-all' endpointi uchun POST so'rovini oladi va unga ishlov beradi
    if (req.body.delete_all) { // So'rov tanasidan (body) 'delete_all' mavjudligini tekshiradi
        db.collection('plans').deleteMany(() => { // 'plans' kolleksiyasidagi barcha hujjatlarni o'chiradi
            res.json({ state: 'delete all' }) // Mijozga JSON formatida javob yuboradi, bu barcha hujjatlar o'chirilganini ko'rsatadi
        })
    }
})

app.get('/author', (req, res) => { // '/author' endpointi uchun GET so'rovini oladi va unga ishlov beradi
    res.render('author', { user: user }) // 'author' view shablonini render qiladi va `user` ob'ektini unga o'tkazadi
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

