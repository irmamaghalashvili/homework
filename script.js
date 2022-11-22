
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






let mainWraper = document.getElementById('postWraper');

function ajax() {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'GET'
    })
    .then(function(asText){
        if (asText.status !== 200) {
            throw asText.status;
        }
            return asText.json();
    })
    .then(function(asJs) {
        asJs.forEach(item => {
           creatPosts(item);
        });
    })
    .catch(function() {

    });
}
function creatPosts(item) {
    let divWraper = document.createElement('div');
    divWraper.classList.add('posts');

    let h4Tag = document.createElement('h4');
    h4Tag.innerText = item.id;

    let h2Tag = document.createElement('h2');
    h2Tag.innerText = item.title;

    divWraper.appendChild(h4Tag);
    divWraper.appendChild(h2Tag);

    mainWraper.appendChild(divWraper);
    console.log(divWraper);
}
ajax();
