//_________________________________________

// E-Task

function getReverse(str) {
    return str.split("").reverse().join("");
  }
  
  // logda ko'ramiz
  console.log(getReverse("hello")); // olleh qiladi
  

// D-Task

// class Shop {
//     constructor(non, lagmon, cola) {
//         this.products = {
//             non: non,
//             lagmon: lagmon,
//             cola: cola
//         };
//     }

//     // Hozirgi vaqtni olish uchun helper function
//    getCurrentTime() {
//     const now = new Date();
//     return `${now.getHours()}:${now.getMinutes()}`;
// }


//     // Mahsulot qoldig'ini chiqarish
//     qoldiq() {
//         const time = this.getCurrentTime();
//         console.log(`Hozir ${time}da ${this.products.non}ta non, ${this.products.lagmon}ta lagmon va ${this.products.cola}ta cola mavjud`);
//     }

//     // Mahsulot sotish
//     sotish(nomi, soni) {
//         if (this.products[nomi] >= soni) {
//             this.products[nomi] -= soni;
//             const time = this.getCurrentTime();
//             console.log(`Hozir ${time}da ${soni}ta ${nomi} sotildi`);
//         } else {
//             console.log(`Hozir ${this.getCurrentTime()}da xatolik: ${nomi} yetarli emas`);
//         }
//     }

//     // Mahsulot qabul qilish
//     qabul(nomi, soni) {
//         this.products[nomi] += soni;
//         const time = this.getCurrentTime();
//         console.log(`Hozir ${time}da ${soni}ta ${nomi} qabul qilindi`);
//     }
// }

// const shop = new Shop(4, 5, 2); // 4 ta non, 5 ta lagmon, 2 ta cola

// shop.qoldiq();      
// shop.sotish('non', 3); 
// shop.qabul('cola', 4); 
// shop.qoldiq();  




// C-TASK:

// Shunday function tuzing, u 2ta string parametr
// ega bolsin, hamda agar har ikkala string bir hil
// harflardan iborat bolsa true aks holda false qaytarsin
// MASALAN checkContent("mitgroup", "gmtiprou") return qiladi true;

// function checkContent(string1, string2) {
// 	// Ikkala stringni massivga ajratamiz, tartiblaymiz va qayta birlashtiramiz
// 	const sorted1 = string1.split('').sort().join('')
// 	const sorted2 = string2.split('').sort().join('')

// 	// Tartiblangan stringlar bir xil bo'lsa, true, aks holda false qaytariladi
// 	return sorted1 === sorted2
// }

// // Misollar
// console.log(checkContent('mitgroup', 'gmtiprou')) // true
// console.log(checkContent('hello', 'olhel')) // true
// console.log(checkContent('test', 'tseta')) // false
// console.log(checkContent('abcd', 'dcba')) // true

//___________________________________________________________________________________

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

//__________________________________________________________END

//______________________________ASYNC function START

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
// 		return new Promise((resolve, reject) => {
// 			//
// 			setInterval(() => {
// 				resolve(list[5])
// 			}, 1000)
// 		})
// 	}
// }

// // then vs catch

// console.log('passed here 0')
// maslaxatBering(25)
// 	.then(data => {
// 		console.log('javob', data)
// 	})
// 	.catch(err => {
// 		console.log('ERROR', err)
// 	})

// console.log('passed here 1')

// // asyn / await
// async function run() {
// 	let javob = await maslaxatBering(65)
// 	console.log(javob)
// }

// run()

// //_______________callback _ Set interval bilan bo'lsa

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

// MIT TASK 1)
// Shunday 2 parametrli function tuzing,
// hamda birinchi parametrdagi letterni ikkinchi
//  parametrdagi sozdan qatnashga sonini return qilishi kerak boladi.
// MASALAN countLetter("e", "engineer") 3ni return qiladi

// function countLetter(letter, word) {
// 	return word.split(letter).length - 1
// }

// console.log(countLetter('e', 'engineer')) // 3

// MIT TASK 2)

// function countDigits(str) {
// 	return str.split('').filter(char => !isNaN(char) && char !== ' ').length
// }

// console.log(countDigits('ad2a54y79wet0sfgb9')) // 7 ni return qiladi




///________________________________PATTERNLAR_________________________________

// Dizayn Patternlari: (Malum bir qismi bajaradi) , 
// Dizayn patternlari dasturiy ta'minotning aniq muammolarini hal qilish uchun oldindan aniqlangan shablonlar.


// Arxitektura Patternlari: (Suyagi dep tushunamiz), 
// Arxitektura patternlari dasturiy tizimning umumiy tuzilishini aniqlaydi va komponentlar qanday o'zaro bog'lanishini belgilaydi.



// API -3 typelari  (Methodlari:  2 xil get va post)
// 1) REST
// 2) Graph
// 3) Traditional

// Backend Server site rendering (BSSR)
// 