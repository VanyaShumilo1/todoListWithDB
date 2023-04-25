const input = document.querySelector('.addInput')
const addButton = document.querySelector('.addButton')
const list = document.querySelector('.list')

let todos = []
let id = 0

const render = (todos = []) => {

    while (list.firstChild) {
        list.removeChild(list.firstChild)
    }

    todos.forEach((item, index) => {
        const listItem = document.createElement('div')
        listItem.classList = 'list-item'

        const html =
            `
                    <div class="status">
                        <input id="${index}" class="input-checkbox" type="checkbox" hidden="hidden">
                        <label data-id=${item._id} for="${index}" class="checkbox ${item.status && "active"}"></label>
                    </div>
                    <div class="list-item-text">
                        <label data-id=${item._id} for="${index}">${item.text}</label>
                    </div>
            `
        listItem.innerHTML = html
        list.appendChild(listItem)
    })
}

render()

document.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        addButton.click();
    }
})

addButton.addEventListener('click', async () => {
    if (input.value.trim() !== "") {
        console.log(todos)

        await createTodoInDB(input.value.trim())
        await getTodosFromDB()
        render(todos)
    } else {
        alert(123)
    }
})

document.addEventListener('click', async (event) => {
    if (event.target.tagName === "LABEL") {

        const todoID = event.target.dataset.id

        todos[Number(event.target.htmlFor)].status = !todos[Number(event.target.htmlFor)].status
        await changeTodoStatusInDB(todoID, todos[Number(event.target.htmlFor)].status)

        render(todos)
    }

})


const getTodosFromDB = async () => {
    fetch('http://localhost:5000/todo', {method: 'get'}).then(res => res.json()).then(res => {
        console.log(res.todos)
        todos = res.todos
        render(todos)
    })
}

const createTodoInDB = async (text) => {
    await fetch('http://localhost:5000/todo', {
        method: 'post',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            text: text,
            status: false,
        })
    })
}

const changeTodoStatusInDB = async (todoID, status) => {
    await fetch(`http://localhost:5000/todo/${todoID}`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            status: status,
        })
    })
}

getTodosFromDB()