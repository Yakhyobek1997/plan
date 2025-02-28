// Asinxron funktsiyalar (async/await) haqida to'liq va kerakli ma'lumotlar
// Asinxron u kodning
// to‘xtatmasdan bajarilishi uchun ishlatiladi. Asinxronlik ko‘pincha
// server bilan ishlash, fayllarni yuklash, timer funksiyalar,
// va odatda uzoq vaqt oladigan operatsiyalarda kerak bo‘ladi.
// ________________________________________
// 1. async va await nima?
// async va await ECMAScript 2017 (ES8) dan boshlab JavaScriptga kiritilgan. Ular Promises asosida ishlaydi va kodni o‘qish va tushunish uchun soddalashtiradi.
// async - Asinxron funksiyani belgilaydi
// •	Funksiya async bilan boshlansa, u doimo Promise qaytaradi.
// •	Agar funksiya return qilsa, u avtomatik ravishda Promise.resolve() ga o‘raladi.
// javascript
//____________________________________________________1)

// async function test() {
//     return "Hello, Async!";
// }

// test().then(console.log); // Hello, Async!
// ________________________________________
// await - Promise'ni kutish
// •	await faqat async funksiyalar ichida ishlaydi.
// •	U Promise tugashini kutadi va natijasini qaytaradi.
// •	await ishlayotgan vaqtida boshqa kodlar bajarilishi davom etadi.
// javascript
// 복사편집
// async function fetchData() {
//     let promise = new Promise((resolve) => {
//         setTimeout(() => resolve("Ma'lumot yuklandi"), 2000);
//     });

//     let result = await promise; // 2 soniya kutadi
//     console.log(result);
// }

// fetchData(); // 2 soniyadan keyin "Ma'lumot yuklandi" chiqariladi
// ________________________________________
// 2. async/await bilan fetch API ishlatish
// Ko‘pincha, asinxron kod serverga so‘rov yuborishda qo‘llanadi. Quyida API'dan ma'lumot olish uchun misol keltirilgan:
// javascript
// 복사편집
// async function getUser() {
//     try {
//         let response = await fetch("https://jsonplaceholder.typicode.com/users/1");
//         let user = await response.json(); // JSON formatga o‘girish
//         console.log(user);
//     } catch (error) {
//         console.log("Xatolik yuz berdi:", error);
//     }
// }

// getUser();
// 🔹 try...catch yordamida xatolarni ushlash muhim! Chunki tarmoqda muammo bo‘lsa, fetch ishlamaydi.
// ________________________________________
// 3. Bir nechta await ni parallel bajarish
// Agar siz bir nechta so‘rovlarni ketma-ket bajaradigan bo‘lsangiz, ular ketma-ket ishlaydi va ortiqcha vaqt sarflaydi:
// javascript
// 복사편집
// async function getData() {
//     let user = await fetch("https://jsonplaceholder.typicode.com/users/1").then(res => res.json());
//     let posts = await fetch("https://jsonplaceholder.typicode.com/posts?userId=1").then(res => res.json());

//     console.log(user, posts);
// }
// getData();
// Bu usulda user uchun fetch bajarilgandan keyin posts uchun fetch boshlanadi.
// Lekin ikkita so‘rovni bir vaqtda parallel bajarish uchun Promise.all() ishlatish mumkin:
// javascript
// 복사편집
// async function getDataParallel() {
//     let [user, posts] = await Promise.all([
//         fetch("https://jsonplaceholder.typicode.com/users/1").then(res => res.json()),
//         fetch("https://jsonplaceholder.typicode.com/posts?userId=1").then(res => res.json())
//     ]);

//     console.log(user, posts);
// }
// getDataParallel();
// Bunday yondashuv ikki so‘rovni parallel bajaradi va vaqtni tejaydi.
// ________________________________________
// 4. async/await bilan Loop (for/foreach) ishlatish
// Agar siz forEach ichida await ishlatmoqchi bo‘lsangiz, u ishlamaydi, chunki forEach Promise qaytarmaydi. Shuning uchun for...of ishlatish tavsiya etiladi:
// ✅ To‘g‘ri usul (for...of):
// javascript
// 복사편집
// async function processArray() {
//     let arr = [1, 2, 3];

//     for (let num of arr) {
//         let result = await new Promise(resolve => setTimeout(() => resolve(num * 2), 1000));
//         console.log(result);
//     }
// }

// processArray();
// ❌ Noto‘g‘ri usul (forEach ishlamaydi):
// javascript
// 복사편집
// async function processArray() {
//     let arr = [1, 2, 3];

//     arr.forEach(async (num) => {
//         let result = await new Promise(resolve => setTimeout(() => resolve(num * 2), 1000));
//         console.log(result);
//     });
// }

// processArray();
// Yuqoridagi kod noto‘g‘ri, chunki forEach await ni e’tiborga olmaydi va sikl oxirigacha kutmasdan davom etadi.
// ________________________________________
// 5. async/await va setTimeout
// Agar setTimeout ni async/await bilan ishlatmoqchi bo‘lsangiz, uni Promise ga o‘rab olish kerak:
// javascript
// 복사편집
// function delay(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

// async function run() {
//     console.log("Boshlash...");
//     await delay(2000); // 2 soniya kutadi
//     console.log("2 soniyadan keyin!");
// }

// run();
// ________________________________________
// 6. async/await ni qayerda ishlatish kerak?
// ✅ Asinxron operatsiyalarni soddalashtirish uchun ishlating:
// •	API so‘rovlari (fetch)
// •	Ma’lumotlar bazasi bilan ishlash
// •	Fayllarni yuklash yoki o‘qish (FileReader, fs Node.js da)
// •	setTimeout, setInterval bilan ishlash
// ❌ Asinxron bo‘lmagan operatsiyalar uchun ishlatish kerak emas!
// •	Oddiy hisob-kitob (matematik operatsiyalar)
// •	DOM elementlarga oddiy o‘zgartirishlar kiritish
// ________________________________________
// Xulosa
// •	async funksiya doim Promise qaytaradi.
// •	await yordamida Promise natijasini kutib olish mumkin.
// •	API bilan ishlash uchun async/await juda qulay.
// •	Promise.all() yordamida parallel bajarish mumkin.
// •	forEach await ni e’tiborga olmaydi, for...of ishlatish tavsiya etiladi.
// •	setTimeout yoki boshqa vaqtinchalik kechiktirishlarni Promise orqali bajarish mumkin.
// ________________________________________
// Amaliy mashq
// Quyidagi kodni yozib, qanday ishlashini tushunishga harakat qiling:
// javascript
// 복사편집
// async function example() {
//     console.log("1: Boshlanish");

//     await new Promise(resolve => setTimeout(resolve, 2000));

//     console.log("2: 2 soniyadan keyin bajarildi");

//     let data = await fetch("https://jsonplaceholder.typicode.com/todos/1").then(res => res.json());

//     console.log("3: API ma’lumoti:", data);
// }

// example();
// console.log("4: Asinxron kod bajarilayotgan paytda boshqa kod ishlaydi");
// ❓ Savollaringiz bo‘lsa, so‘rashingiz mumkin! 😊
// 4o
// 나의 말:
// setTimeout setInterval manosi nima
// ChatGPT의 말:
// setTimeout va setInterval haqida batafsil tushuncha
// setTimeout va setInterval JavaScript da vaqt bilan bog‘liq funksiyalar bo‘lib, ular asosiy to‘xtatib turish (delay) va intervalni boshqarish uchun ishlatiladi. Ikkalasi ham asosiy kod bajarilishiga to‘sqinlik qilmaydi va asinxron tarzda ishlaydi.
// ________________________________________
// 1. setTimeout - Kechiktirilgan bajarish
// setTimeout berilgan vaqt o‘tgandan keyin faqat bir marta bajariladi.
// 📌 Sintaksis:
// javascript
// 복사편집
// setTimeout(callback, delay);
// •	callback – bajarilishi kerak bo‘lgan funksiya.
// •	delay – vaqt (millisekundlarda), ya'ni necha millisekunddan keyin funksiya bajarilishi.
// Misol 1: 3 soniyadan keyin xabar chiqarish
// javascript
// 복사편집
// setTimeout(() => {
//     console.log("3 soniyadan keyin chiqarildi!");
// }, 3000);
// ⏳ 3000 ms (3 sekund) dan keyin ekranga "3 soniyadan keyin chiqarildi!" chiqadi.
// ________________________________________
// Misol 2: setTimeout ni bekor qilish - clearTimeout
// Agar setTimeout ni bajarilishidan oldin bekor qilish kerak bo‘lsa, clearTimeout ishlatiladi.
// javascript
// 복사편집
// let timer = setTimeout(() => {
//     console.log("Bu xabar hech qachon chiqmaydi!");
// }, 5000);

// clearTimeout(timer); // `setTimeout` ni bekor qiladi
// 🚫 clearTimeout(timer) bajarilgandan keyin, "Bu xabar hech qachon chiqmaydi!" chiqmaydi.
// ________________________________________
// 2. setInterval - Takrorlanadigan bajarish
// setInterval berilgan vaqt oralig‘ida takroran bajariladi.
// 📌 Sintaksis:
// javascript
// 복사편집
// setInterval(callback, interval);
// •	callback – har bir interval o‘tgandan keyin bajarilishi kerak bo‘lgan funksiya.
// •	interval – necha millisekundda bir takrorlanishi.
// Misol 1: Har 2 soniyada xabar chiqarish
// javascript
// 복사편집
// setInterval(() => {
//     console.log("Har 2 soniyada ishlayman!");
// }, 2000);
// 🔄 Bu funksiya har 2 soniyada bir marta bajariladi.
// ________________________________________
// Misol 2: setInterval ni bekor qilish - clearInterval
// Agar setInterval ni to‘xtatish kerak bo‘lsa, clearInterval ishlatiladi.
// javascript
// 복사편집
// let counter = 0;

// let interval = setInterval(() => {
//     counter++;
//     console.log(`Takrorlanish: ${counter}`);

//     if (counter === 5) {
//         clearInterval(interval); // 5 marta ishlaganidan keyin to‘xtaydi
//         console.log("Tugatildi!");
//     }
// }, 1000);
// 🛑 Bu kod har 1 soniyada counter qiymatini oshirib boradi va 5 marta ishga tushgandan keyin clearInterval bilan to‘xtatiladi.
// ________________________________________
// 3. setTimeout bilan rekursiv chaqirish (setInterval o‘rniga)
// setInterval ishlaganda funksiya aniq vaqtda ishga tushadi, lekin agar funksiya bajarilishi kechiksa, keyingi ishga tushirish kechikmaydi.
// Shu sababli setTimeout rekursiv chaqirish orqali interval ta’sirini yaratish mumkin.
// javascript
// 복사편집
// function repeatFunction() {
//     console.log("Takroriy ishga tushirish!");
//     setTimeout(repeatFunction, 2000);
// }

// repeatFunction();
// 💡 Bu setInterval kabi ishlaydi, lekin har safar funksiya tugashini kutadi, keyin yangi setTimeout boshlaydi.
// ________________________________________
// 4. setTimeout va setInterval ni async/await bilan ishlatish
// Agar setTimeout ni async/await bilan ishlatmoqchi bo‘lsangiz, uni Promise ga o‘rash kerak.
// javascript
// 복사편집
// function delay(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

// async function asyncFunction() {
//     console.log("Boshlash...");
//     await delay(2000); // 2 soniya kutish
//     console.log("2 soniyadan keyin ishladi!");
// }

// asyncFunction();
// ⏳ Bu kod 2 soniya kutadi va keyin "2 soniyadan keyin ishladi!" chiqaradi.
// ________________________________________
// Xulosa
// Funksiya	Vazifasi
// setTimeout	Berilgan vaqt o‘tib bir marta bajariladi
// clearTimeout	setTimeout ni bekor qiladi
// setInterval	Berilgan vaqt oralig‘ida takroriy bajariladi
// clearInterval	setInterval ni bekor qiladi
// ✅ setTimeout bir martalik kechiktirish uchun ishlatiladi.
// ✅ setInterval doimiy ravishda bajarish uchun ishlatiladi.
// ✅ clearTimeout va clearInterval kodni to‘xtatish uchun kerak bo‘ladi.
// ❓ Yana savollaringiz bo‘lsa, so‘rashingiz mumkin! 😊
