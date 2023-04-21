const input = document.querySelector('.addInput')
const addButton = document.querySelector('.addButton')
const list = document.querySelector('.list')

const todos = []
let id = 0

const render = () => {

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
                        <label for="${index}" class="checkbox ${item.status && "active"}"></label>
                    </div>
                    <div class="list-item-text">
                        <label for="${index}">${item.text}</label>
                    </div>
            `
        listItem.innerHTML = html
        list.appendChild(listItem)
    })
}

render()

addButton.addEventListener('click', () => {
    if(input.value.trim() !== "") {
        console.log(todos)
        todos.push({
            text: input.value.trim(),
            status: false,
        })
        render()
    } else {
        alert(123)
    }
})

document.addEventListener('click', (event) => {
    if(event.target.tagName === "LABEL") {
        todos[Number(event.target.htmlFor)].status = !todos[Number(event.target.htmlFor)].status
        render()
    }

})