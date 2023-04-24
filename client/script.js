
const input = document.querySelector('.addInput')
const addButton = document.querySelector('.addButton')
const list = document.querySelector('.list')

let todos = []
let id = 0

const render = (todos = []) => {

    while(list.firstChild) {
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

addButton.addEventListener('click', () => {
    if(input.value.trim() !== "") {
        console.log(todos)
        todos.push({
            text: input.value.trim(),
            status: false,
        })
        render(todos)
    } else {
        alert(123)
    }
})

document.addEventListener('click', (event) => {
    if(event.target.tagName === "LABEL") {
        todos[Number(event.target.htmlFor)].status = !todos[Number(event.target.htmlFor)].status
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

getTodosFromDB()