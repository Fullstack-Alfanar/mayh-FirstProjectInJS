const arr = JSON.parse(localStorage.getItem("List")) || [];
//let taskID = JSON.parse(localStorage.getItem("List")) || 0;

let taskID = arr.length ? arr[arr.length - 1].task_id + 1 : 1;

console.log(taskID);
function myFunction() {
  var x = document.getElementById("add-Task");
  if (x.style.display === "none") {
    x.style.display = "flex";
  } else {
    x.style.display = "none";
  }
}

if (localStorage.getItem("List")) {
  let arrData = JSON.parse(localStorage.getItem("List"));
  fill(arrData);
}

function addNewTask() {
  const dEl = document.getElementById("data").value;
  const dateEl = document.getElementById("date").value;
  const tEl = document.getElementById("time").value;

  // make sure inputs are not empty
  if (dEl != "" && dateEl != "" && tEl != "") {
    const obj = {
      task_data: dEl,
      task_date: dateEl,
      task_time: tEl,
      task_id: taskID++,
    };

    arr.push(obj);
    //console.log(arr);
    localStorage.setItem("List", JSON.stringify(arr));

    if (localStorage.getItem("List")) {
      let arrData = JSON.parse(localStorage.getItem("List"));
      fill(arrData);
    }
  }
}

function fill(arrData) {
  var tbody = document.getElementById("tbody");

  tbody.innerHTML = "";
  for (let i = 0; i < arrData.length; i++) {
    const newTaskData = arrData[i].task_data;
    const newTaskDate = arrData[i].task_date;
    const newTaskTime = arrData[i].task_time;
    const newTaskID = arrData[i].task_id;

    let elem = [];
    elem[0] = document.createElement("label");
    elem[1] = document.createElement("label");
    elem[2] = document.createElement("label");
    elem[3] = document.createElement("button");
    elem[3].classList.add("delete-data-btn");
    elem[3].innerHTML = "x";
    elem[3].addEventListener("click", deleteTask);

    let td = [];
    td[0] = document.createElement("td");
    td[1] = document.createElement("td");
    td[2] = document.createElement("td");
    td[3] = document.createElement("td");

    let tr = document.createElement("tr");

    elem[0].textContent = newTaskData;
    elem[1].textContent = newTaskDate;
    elem[2].textContent = newTaskTime;

    const inputHidden = document.createElement("input");
    inputHidden.setAttribute("type", "hidden");
    inputHidden.value = newTaskID;

    tr.appendChild(inputHidden);

    td[0].appendChild(elem[0]);
    td[1].appendChild(elem[1]);
    td[2].appendChild(elem[2]);
    td[3].appendChild(elem[3]);

    tr.appendChild(td[0]);
    tr.appendChild(td[1]);
    tr.appendChild(td[2]);
    tr.appendChild(td[3]);
    tbody.appendChild(tr);

    document
      .getElementById("add-Task")
      .querySelectorAll("input")
      .forEach(function (input) {
        input.value = "";
      });
  }
}
function deleteTask(e) {
  const tr = e.target.closest("tr");
  const TaskId = tr.querySelector('input[type="hidden"]').value;

  console.log(TaskId);
  if (localStorage.getItem("List")) {
    let arr = JSON.parse(localStorage.getItem("List"));
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].task_id == TaskId) {
        arr.splice(i, 1);
        break;
      }
    }
    localStorage.setItem("List", JSON.stringify(arr));
    fill(arr);
  }
}

//localStorage.clear();
