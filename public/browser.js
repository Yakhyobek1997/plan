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


// Rest Api ni qurvotti
  axios // method
  .post("/create-item", { reja: createField.value }) // 'create-item' URL manziliga 'POST' so'rovini yuboradi, so'rov tanasida 'reja' sifatida 'createField.value' ni yuboradi
  .then((response) => { // So'rov muvaffaqiyatli amalga oshirilsa, kelgan javob bilan ishlash uchun funksiyani chaqiradi
    document
      .getElementById("item-list") // HTML hujjatidagi 'item-list' identifikatoriga ega elementni topadi
      .insertAdjacentHTML("beforeend", itemTemplate(response.data)); // 'itemTemplat' yordamida yaratilgan HTML kodini 'item-list' elementining oxiriga qo'shadi
    createField.value = ""; // 'createField' elementining qiymatini bo'shatadi
    createField.focus(); // 'createField' elementiga fokusni qaytaradi
  })
  .catch((err) => { // Agar so'rovda xatolik yuzaga kelsa, xatolikni ushlab, funksiyani chaqiradi
    console.log("iltimos qaytadan harakat qiling!"); // Konsolda "iltimos qaytadan harakat qiling!" xabarini chiqaradi
  });
});


// Step - 2 (Delete operation)

document.addEventListener("click", function (e) { // Butun hujjatda "click" event ni tinglaydi
  
  // delete oper
  console.log(e.target); // Ekranga bosilgan elementni konsolda chiqaradi
  if (e.target.classList.contains("delete-me")) { // Agar bosilgan element "delete-me" classiga ega bo'lsa, shartni bajaradi
    if (confirm("Aniq ochirmoqchimisiz?")) { // Foydalanuvchidan o'chirishni tasdiqlashni so'raydi
      axios
        .post("/delete-item", { id: e.target.getAttribute("data-id") }) // '/delete-item' URL manziliga POST so'rovini yuboradi, so'rov tanasida "id" ni yuboradi
        .then((response) => { // So'rov muvaffaqiyatli amalga oshirilsa, kelgan javob bilan ishlash uchun funksiyani chaqiradi
          console.log(response.data); // Javobni konsolda chiqaradi
          e.target.parentElement.parentElement.remove(); // HTML hujjatidan elementni o'chiradi
        })
        .catch((err) => { // Agar so'rovda xatolik yuzaga kelsa, xatolikni ushlab, funksiyani chaqiradi
          console.log("Iltimos qaytadan harakat qiling!", err); // Konsolda xatolik xabarini chiqaradi
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
