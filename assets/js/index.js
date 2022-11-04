document.addEventListener('DOMContentLoaded', async function () {
    const data = await getData()
    data.forEach((item) => addBlock(item))

    checkedFunction()
    filterPosts(data)
    clearFilters(data)

})

async function getData() {
    let response = await fetch('https://jsonplaceholder.typicode.com/posts/?_start=0&_limit=7')
    let posts = await response.json()
    return posts
}

const addBlock = (item) => {
    const posts = document.querySelector('.posts')

    const card = document.createElement('div')
    card.classList.add('card-post')
    posts.appendChild(card)

    const title = document.createElement('h5')
    title.innerText = item.title
    card.appendChild(title)

    const body = document.createElement('p')
    body.innerText = item.body
    body.classList.add('text')
    card.appendChild(body)

    const checkBox = document.createElement('input')
    checkBox.type = 'checkbox'
    checkBox.classList.add('checkbox')
    card.appendChild(checkBox)
}

const checkedFunction = () => {
    const checkBoxes = document.querySelectorAll('.checkbox')
    checkBoxes.forEach((item) => {
        item.addEventListener('change', function () {
            item.parentNode.classList.toggle('active')
        })
    })
}

function updateURL(value) {
    var baseUrl = window.location.href
    var newUrl = baseUrl + `filter?title=${value}`;
    history.pushState(null, null, newUrl);
}

function clearURL() {
    const newUrl = window.location.origin
    history.pushState(null, null, newUrl);
}


const filterPosts = () => {
    const input = document.querySelector('.input-filter')
    const btnSearch = document.querySelector('.btn-search')
    const btnClear = document.querySelector('.clear-filters')
    const allBlocks = document.querySelectorAll('.card-post')

    btnSearch.addEventListener('click', function () {
        clearURL()
        updateURL(input.value)

        allBlocks.forEach((item) => {
            item.classList.remove('hidden')
            if (item.querySelector('h5').innerText.toLowerCase().indexOf(input.value.toLowerCase()) === -1) {
                item.classList.add('hidden')
            }
        })
        btnClear.style.display = 'block'
    })


}

const clearFilters = () => {
    const btnClear = document.querySelector('.clear-filters')
    const input = document.querySelector('.input-filter')
    const allBlocks = document.querySelectorAll('.card-post')

    btnClear.addEventListener('click', function () {
        clearURL()

        allBlocks.forEach((item) => {
            item.classList.remove('hidden')
        })
        btnClear.style.display = 'none'
        input.value = ''
    })


}


