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
  axios
    .post("/create-item", { reja: createField.value })
    .then((response) => {
      document
        .getElementById("item-list")
        .insertAdjacentHTML("beforeend", itemTemplate(response.data));
      createField.value = "";
      createField.focus();
    })
    .catch((err) => {
      console.log("Iltimos, qaytadan harakat qiling!", err);
    });
});

// STEP - 1 (Delete operation)
document.addEventListener("click", function (e) {
  console.log(e.target); // Bosilgan elementni konsolga chiqaradi

  // Agar bosilgan element "delete-me" classiga ega bo'lsa
  if (e.target.classList.contains("delete-me")) {
    if (confirm("Aniq o‘chirmoqchimisiz?")) {
      axios
        .post("/delete-item", { id: e.target.getAttribute("data-id") })
        .then((response) => {
          e.target.parentElement.parentElement.remove();
        })
        .catch((err) => {
          console.log("Iltimos, qaytadan harakat qiling!", err);
        });
    }
  }

  //edit oper
  if (e.target.classList.contains("edit-me")) {
    let userInput = prompt(
      "O'zgartirishni kiriting",
      e.target.parentElement.parentElement.querySelector(".item-text")
        .innerHTML
    );
    if (userInput) {
      axios
        .post("/edit-item", {
          id: e.target.getAttribute("data-id"),
          new_input: userInput,
        })
        .then((response) => {
          e.target.parentElement.parentElement.querySelector(
            ".item-text"
          ).innerHTML = userInput;
        })
        .catch((err) => {
          console.log("iltimos qaytadan harakat qiling!", err);
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
      document.querySelectorAll(".list-group-item").forEach((item) => {
        item.remove();
      });
    })
    .catch((err) => {
      console.log("Iltimos qaytadan harakat qiling!");
    });
});

 