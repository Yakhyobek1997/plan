console.log("FrontEnd JS ishga tushdi");

function itemTemplate(item) {
  return ` <li 
          class="list-group-item list-group-item-info d-flex align-items-center justify-content-between">
          <span class="item-text">${item.reja}</span>
          <div>
            <button
              data-id="${item._id}"
              class="edit-me btn btn-secondary btn-sm mr-1"
            >
              Edit
            </button>
            <button
              data-id="${item._id}"
              class="delete-me btn btn-danger btn-sm">
              Delete
            </button>
          </div>
        </li>`;
}


//new_reja degan value ni endi qabul qilishimiz kk
let createField = document.getElementById("create-field");

//create formni qolga olamiz
document.getElementById("create-form").addEventListener("submit", function (e) {
  e.preventDefault(); // boshqa pagega o'tib ketmasligi uchun
}); // Missing closing parenthesis added here

// Rest Api ni qurvotti

axios // axios yordamida serverga POST so'rovi yuboriladi , User Library(Http so'rovlarini)
      // yuborishda server bilan easy connection qilish uchun ishlatiladi.
  .post("/create-item", { reja: createField.value }) // '/create-item' URL manziliga 'reja' qiymati bilan POST so'rovi yuboriladi
  .then((response) => { // Agar so'rov muvaffaqiyatli amalga oshirilsa
    // 'item-list' identifikatoriga ega elementni topib, unga yangi element qo'shamiz
    document
      .getElementById("item-list") // Sahifadagi 'item-list' ID-siga ega elementni topadi
      .insertAdjacentHTML("beforeend", itemTemplate(response.data)); // Yangi elementni ro'yxat oxiriga qo'shadi
    createField.value = ""; // Kiritish maydonini tozalaydi
    createField.focus(); // Kiritish maydoniga fokusni qaytaradi
  })
  .catch((err) => { // Agar so'rovda xatolik yuzaga kelsa
    console.log("Iltimos, qaytadan harakat qiling!", err); // Xatolik haqida xabarni konsolga chiqaradi
  });


// STEP - 1 (Delete operation)

document.addEventListener("click", function (e) {
  // "click" hodisasini tinglaydi (sahifadagi istalgan joy bosilganda ishga tushadi)
  
  console.log(e.target); // Bosilgan elementni konsolga chiqaradi

  // Agar bosilgan element "delete-me" classiga ega bo'lsa, ya'ni foydalanuvchi "oʻchirish" tugmachasini bossa
  if (e.target.classList.contains("delete-me")) { 

    // Foydalanuvchidan o'chirishni tasdiqlashni so'raydi
    if (confirm("Aniq o‘chirmoqchimisiz?")) { 

      // `data-id` atributidan elementning ID sini oladi va serverga yuboradi
      axios.post("/delete-item", { id: e.target.getAttribute("data-id") }) 
      
        .then((response) => { // Agar so‘rov muvaffaqiyatli bajarilsa:
          console.log(response.data); // Serverdan kelgan javobni konsolga chiqaradi
          
          // HTML sahifasidan o‘chirilayotgan elementning ikki qavat yuqori (ota-bobosi) elementini olib tashlaydi
          e.target.parentElement.parentElement.remove(); 
        })
        
        .catch((err) => { // Agar xatolik yuzaga kelsa:
          console.log("Iltimos, qaytadan harakat qiling!", err); // Xatolik xabarini chiqaradi
        });
    }
  }


  //edit oper
  if (e.target.classList.contains("edit-me")) { // Agar e.target 'edit-me' classiga ega bo'lsa, shartni bajaradi
    let userInput = prompt( // Foydalanuvchiga pop-up oynada ma'lumot kiritishni so'raydi
      "O'zgartirishni kiriting", // Prompt oynasida ko'rsatiladigan matn
      e.target.parentElement.parentElement.querySelector(".item-text").innerHTML // Hozirgi matnni o'qish uchun, 'item-text' classiga ega elementning ichki matnini olib beradi
    );
    if (userInput) { // Agar foydalanuvchi ma'lumot kiritsa, shartni bajaradi
      axios
        .post("/edit-item", { // '/edit-item' URL manziliga 'POST' so'rovini yuboradi
          id: e.target.getAttribute("data-id"), // So'rov tanasida 'id' ni yuboradi, bu elementning 'data-id' atributidan olinadi
          new_input: userInput, // So'rov tanasida 'new_input' ni yuboradi, bu foydalanuvchi kiritgan ma'lumot
        })
        .then((response) => { // So'rov muvaffaqiyatli amalga oshirilsa, kelgan javob bilan ishlash uchun funksiyani chaqiradi
          e.target.parentElement.parentElement.querySelector(
            ".item-text"
          ).innerHTML = userInput; // 'item-text' classiga ega elementning ichki matnini foydalanuvchi kiritgan yangi ma'lumot bilan yangilaydi
        })
        .catch((err) => { // Agar so'rovda xatolik yuzaga kelsa, xatolikni ushlab, funksiyani chaqiradi
          console.log("iltimos qaytadan harakat qiling!", err); // Konsolda "iltimos qaytadan harakat qiling!" xabarini va xatolikni chiqaradi
        });
    }
  }
});


// Clean All Operation
document.getElementById("clean-all").addEventListener("click", function () {
  axios
    .post("/delete-all", { delete_all: true })
    .then((response) => {
      alert(response.data.state);
      // Remove all items
      document.querySelectorAll(".list-group-item").forEach((item) => {
        item.remove();
      });
    })
    .catch((err) => {
      console.log("Iltimos qaytadan harakat qiling!");
    });
});
 