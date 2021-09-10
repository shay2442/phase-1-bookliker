document.addEventListener("DOMContentLoaded", function() {

const baseUrl = 'http://localhost:3000/books'

const list = document.querySelector('#list')
const show = document.querySelector('#show-panel')

function showBook(e) {
    getBook(e).then(book => {
        const container = `<div>
            <img src='${book.img_url}'>
            <h1>${book.title}</h1>
            <h2>${book.author}</h2>
            <p>${book.description}</p>
            <ul>
            ${book.users.map(user => `<li>${user.username}</li>`).join('')}
            </ul>
        </div>`
        const button = document.createElement('button')
        button.innerHTML == 'LIKE' ? button.innerHTML = 'UNLIKE' : button.innerHTML = 'LIKE'
        button.dataset.bookId = book.id
        show.innerHTML = container
        show.appendChild(button)

    })
}

function getBook(e) {
    return fetch(baseUrl + `/${e.target.dataset.bookId}`)
        .then(r => r.json())
}


function listBooks(books) {
    books.forEach(book => {
        const item = document.createElement('li')
        item.dataset.bookId = book.id 
        item.textContent = book.title
        item.addEventListener('click', showBook)
        list.appendChild(item)

    })
}

function getBooks() {
    fetch(baseUrl)
    .then (r => r.json())
    .then(books => listBooks(books))

}

function changeLikes(e, id, body) {
    fetch(baseUrl + `/${id}` , {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(() => showBook(e))
}

getBooks()

function handleClick(e) {
    if(e.target.tagName=='BUTTON')
    console.log(e.target)
    if(e.target.innerText == 'LIKE') {
        const id = e.target.dataset.bookId
        getBook(e).then(book => {
            const users = book.users
            const body = { users: [...users, { "id": 1, "username": "pouros" }]}
            changeLikes(e, id, body)
        })
        e.target.innerText = 'UNLIKE'
    } else {
        console.log('unlike the book')

    }
}

show.addEventListener('click', handleClick)







});
