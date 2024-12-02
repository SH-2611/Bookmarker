var nameInput = document.getElementById("formName");
var urlInput = document.getElementById("formUrl");

var dataList;

if (localStorage.getItem("data") == null) {
  dataList = [];
} else {
  dataList = JSON.parse(localStorage.getItem("data"));
  display();
}
function addData() {
  if (
    nameInput.classList.contains("is-valid") &&
    urlInput.classList.contains("is-valid")
  ) {
    var data = {
      name: nameInput.value,
      url: urlInput.value,
    };

    dataList.push(data);
    localStorage.setItem("data", JSON.stringify(dataList));
    clear();

    console.log(data);
    display();
  } else {
    alert();
  }
}

function clear() {
  nameInput.value = null;
  urlInput.value = null;
  if (
    nameInput.classList.contains("is-valid") &&
    urlInput.classList.contains("is-valid")
  ) {
    nameInput.classList.remove("is-valid", "is-invalid");
    urlInput.classList.remove("is-valid", "is-invalid");
  }
}
function display() {
  var cartona = "";
  for (var i = 0; i < dataList.length; i++) {
    cartona += `<tr>
                <td>${i + 1}</td>
                <td>${dataList[i].name}</td>
                <td>
                  <button onclick="visit(${i})" class="btn btn-success">
                    <i class="fa-regular fa-eye"></i> View
                  </button>
                </td>
                <td>
                  <button onclick="deleted(${i})" class="btn btn-danger">
                    <i class="bi bi-trash3-fill"></i> Delete
                  </button>
                </td>
              </tr>`;
  }
  document.getElementById("myData").innerHTML = cartona;
}

function deleted(deletedIndex) {
  dataList.splice(deletedIndex, 1);

  if (dataList.length > 0) {
    localStorage.setItem("data", JSON.stringify(dataList));
  } else {
    localStorage.removeItem("data");
  }
  display();
}

function validNameInput(element) {
  var validate = {
    formName: /^\w{3,}$/,
    formUrl: /^(https?:\/\/)?(www\.)?\w+\.[\w]{2,}\/?$/gi,
  };

  if (validate[element.id].test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}

function visit(index) {
  var url = dataList[index].url;

  if (!/^https?:\/\//.test(url)) {
    url = "https://" + url;
  }

  window.open(url, "_blank");
}

var notif = document.querySelector("#exit");
var layer = document.querySelector(".layer-box");

function alert() {
  if (
    nameInput.classList.contains("is-invalid") ||
    urlInput.classList.contains("is-invalid") ||
    nameInput.value === "" ||
    urlInput.value === ""
  ) {
    layer.classList.replace("d-none", "d-flex");
  }
}

notif.addEventListener("click", function () {
  layer.classList.replace("d-flex", "d-none");
});
