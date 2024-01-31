let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveBtn = document.getElementById("saveBtn");

function gettodoList() {
    let gettodo = localStorage.getItem("todoList");
    let parse = JSON.parse(gettodo);
    if (parse === null) {
        return [];
    } else {
        return parse;
    }

}
let todoList = gettodoList();
saveBtn.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

let todosCount = todoList.length;

function onTodoStatusChange(checkboxId, labelId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");

    let todoObjectIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    let todoObject = todoList[todoObjectIndex];
    console.log(todoObject);
    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }

    //console.log(checkboxElement.checked);
}

function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);
    let deleteIndexElement = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(deleteIndexElement, 1);
}


function createAndAppendTodo(todo) {
    let todoId = "todo" + todo.uniqueNo;
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;



    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);


    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;
    inputElement.onclick = function() {
        onTodoStatusChange(checkboxId, labelId, todoId);
    };

    inputElement.classList.add("checkbox-input");
    todoElement.appendChild(inputElement);


    let labelContainer = document.createElement("div");
    labelContainer.classList.add('d-flex', 'flex-row', "label-container");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);

    let deleteIconCont = document.createElement("div");
    deleteIconCont.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconCont);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");

    deleteIcon.onclick = function() {
        onDeleteTodo(todoId);
    };
    deleteIconCont.appendChild(deleteIcon);

}

for (let todo of todoList) {
    createAndAppendTodo(todo);
}

function onAddTodo() {
    let input = document.getElementById("todoUserInput");
    let value = input.value;
    //console.log(value);
    if (value === "") {
        alert("Enter Valid Text");
        return;
    }
    todosCount += 1;
    let newTodo = {
        text: value,
        uniqueNo: todosCount,
        isChecked: false
    };
    todoList.push(newTodo);
    console.log(todoList);
    createAndAppendTodo(newTodo);
    input.value = "";
}

addTodoButton.onclick = function() {
    onAddTodo();
}
