// davaleba 1
function getNameAndYear() {
    fetch('https://reqres.in/api/unknown', {
        method: 'GET'
    })
    .then(function(gotAsText){
        if (gotAsText.status !== 200) {
            throw gotAsText.status;
        }
            return gotAsText.json();
    })
    .then(function(gotAsJs) {
        gotAsJs.data.forEach(item => {
            let li = document.createElement('li');
            li.innerText = `${item.name} ${item.year}`;
            li.classList = 'li-fetch';
    
            document.getElementById('fetch-ul').appendChild(li);
        });
    })
    .catch(function() {

    });
}
getNameAndYear();

// davaleba 2
let currentPage = 1;
let totalPages;

function getUsers(page) {
    let requist = new XMLHttpRequest();

requist.addEventListener('load', function() {
    let gotInfoText = requist.responseText;
    let gotIfoJs = JSON.parse(gotInfoText);

    const fragment = new DocumentFragment();
    gotIfoJs.data.forEach(item => {
        let li = document.createElement('li');
        li.classList = 'li-xml';
        let p = document.createElement('p');
        p.innerText = `${item.first_name} ${item.last_name}`;
        let image = document.createElement('img');
        image.src = item.avatar;
        image.setAttribute('alt', 'user');
        image.classList.add('image-user');
        
        
        li.appendChild(image);
        li.appendChild(p);
        
        fragment.appendChild(li);  
    });
    document.getElementById('ul-id').innerHTML = ' ';
    document.getElementById('ul-id').appendChild(fragment);

    totalPages = gotIfoJs.total_pages;
});

requist.addEventListener('error', function () {
    let p = document.createElement('p');
    p.innerText = 'Server Error';
    document.getElementById('div-id').appendChild(p);
});

requist.open('GET', 'https://reqres.in/api/users?page=' + page);
requist.send();
}

document.getElementById('prev-btn-id').addEventListener('click' , function() {
    if (currentPage == 1) {
        return;
    }
    currentPage --;
    getUsers(currentPage);
});
document.getElementById('next-btn-id').addEventListener('click' , function() {
    if (currentPage == totalPages) {
        return;
    }
    currentPage ++;
    getUsers(currentPage);
});
getUsers(currentPage);

// New Homework


let mainWraper = document.getElementById('postWraper');
let overlay = document.getElementById('overlay');
let content = document.getElementById('content');
let closeDiv = document.getElementById('close');

function ajax(url, callback) {
    fetch(url, {
        method: 'GET'
    })
    .then(function(asText){
        if (asText.status !== 200) {
            throw asText.status;
        }
            return asText.json();
    })
    .then(function(asJs) {
        callback(asJs);
    })
    .catch(function() {

    });
}
ajax('https://jsonplaceholder.typicode.com/posts', function(asJs) {
    asJs.forEach(item => {
        creatPosts(item);
     });
});


function creatPosts(item) {
    let divWraper = document.createElement('div');
    divWraper.classList.add('posts');
    divWraper.setAttribute('data-id',item.id);

    let h4Tag = document.createElement('h4');
    h4Tag.innerText = item.id;

    let h2Tag = document.createElement('h2');
    h2Tag.innerText = item.title;

    divWraper.appendChild(h4Tag);
    divWraper.appendChild(h2Tag);

    divWraper.addEventListener('click', function(event) {
        let id = event.target.getAttribute('data-id');
        overlay.classList.add('active');
        let newUrl = `https://jsonplaceholder.typicode.com/posts/${id}`;
        ajax(newUrl, function(asJs) {
            overlayFunction(asJs);
        });
    });

    mainWraper.appendChild(divWraper);
}

function overlayFunction(item) {
    let description = document.createElement('p');
    description.innerText = item.body;
    description.classList.add('overlayP');
    content.appendChild(description);
}

closeDiv.addEventListener('click', function() {
    overlay.classList.remove('active');
    content.innerHTML = ' ';
});
