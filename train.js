//__________________________________________________________________________________________Call back funtion start
// console.log('Jeckma maslaxatlari')
// const list = [
// 	"Yaxshi talaba bo'ling", //10-20
// 	"To'g'ri boshliq tanlang va ko'proq xato qiling", //20-30
// 	"O'zingizga ishlashni boshlang", //30-40
// 	"Siz kuchli bo'lgan narsalar qilimg", //40-50
// 	'Yoshlarga investitsya qiling', //50-60
// 	"Endi dam oling foydasi yo'q", //60
// ]

// function maslaxatBering(a, callback) {
// 	if (typeof a !== 'number') callback('insert number', null)
// 	else if (a <= 20) callback(null, list[0])
// 	else if (a > 20 && a <= 30) callback(null, list[1])
// 	else if (a > 20 && a <= 40) callback(null, list[2])
// 	else if (a > 20 && a <= 50) callback(null, list[3])
// 	else if (a > 20 && a <= 60) callback(null, list[4])
// 	else {
// 		setTimeout(function () {
// 			callback(null, list[5])
// 		}, 5000)
// 	}
// }

// console.log('passed here 0')
// maslaxatBering(65, (err, data) => {
// 	if (err) console.log('ERROR', err)
// 	else {
// 		console.log('javob:', data)
// 	}
// })
// console.log('passed here 1')

//________________________________________________________________________________________________END

//________________________________________________________________________________________________ASYNC function START

// console.log('Jeckma maslaxatlari')
// const list = [
// 	"Yaxshi talaba bo'ling", //10-20
// 	"To'g'ri boshliq tanlang va ko'proq xato qiling", //20-30
// 	"O'zingizga ishlashni boshlang", //30-40
// 	"Siz kuchli bo'lgan narsalar qilimg", //40-50
// 	'Yoshlarga investitsya qiling', //50-60
// 	"Endi dam oling foydasi yo'q", //60
// ]

// async function maslaxatBering(a) {
// 	if (typeof a !== 'number') throw new Error('insert a number')
// 	else if (a <= 20) return list[0]
// 	else if (a > 20 && a <= 30) return list[1]
// 	else if (a > 20 && a <= 40) return list[2]
// 	else if (a > 20 && a <= 50) return list[3]
// 	else if (a > 20 && a <= 60) return list[4]
// 	else {
// 		return new Promise((resolve, reject) => { //
// 			setInterval(() => {
// 				resolve(list[5])
// 			}, 1000)
// 		})
// 	}
// }

// then vs catch

// console.log('passed here 0')
// maslaxatBering(25)
// 	.then(data => {
// 		console.log('javob', data)
// 	})
// 	.catch(err => {
// 		console.log('ERROR', err)
// 	})

// console.log('passed here 1')

// asyn / await
// async function run() {
// 	let javob = await maslaxatBering(65)
// 	console.log(javob)
// }

// run()

//______________________________________________________________________callback _ Set interval bilan bo'lsa

// console.log('Jeckma maslaxatlari')
// const list = [
// 	"Yaxshi talaba bo'ling", //10-20
// 	"To'g'ri boshliq tanlang va ko'proq xato qiling", //20-30
// 	"O'zingizga ishlashni boshlang", //30-40
// 	"Siz kuchli bo'lgan narsalar qilimg", //40-50
// 	'Yoshlarga investitsya qiling', //50-60
// 	"Endi dam oling foydasi yo'q", //60
// ]

// function maslaxatBering(a, callback) {
// 	if (typeof a !== 'number') callback('insert number', null)
// 	else if (a <= 20) callback(null, list[0])
// 	else if (a > 20 && a <= 30) callback(null, list[1])
// 	else if (a > 20 && a <= 40) callback(null, list[2])
// 	else if (a > 20 && a <= 50) callback(null, list[3])
// 	else if (a > 20 && a <= 60) callback(null, list[4])
// 	else {
// 		setInterval(function () {
// 			callback(null, list[5])
// 		}, 1000)
// 	}
// }

// console.log('passed here 0')
// maslaxatBering(65, (err, data) => {
// 	if (err) console.log('ERROR', err)
// 	else {
// 		console.log('javob:', data)
// 	}
// })
// console.log('passed here 1')

// MIT TASK
// Shunday 2 parametrli function tuzing,
// hamda birinchi parametrdagi letterni ikkinchi
//  parametrdagi sozdan qatnashga sonini return qilishi kerak boladi.
// MASALAN countLetter("e", "engineer") 3ni return qiladi

function countLetter(letter, word) {
	return word.split(letter).length - 1
}

console.log(countLetter('e', 'engineer')) // 3
