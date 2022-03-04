const input = document.querySelector('input');
const div = document.querySelector('.image-search');

function inputHandle(event){
    if (event.keyCode === 13) {
        div.innerHTML = '';
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `https://api.unsplash.com/search/photos/?query=${event.target.value}&client_id=dtlnopKr27OpKnoa34PRKY219a68_v31br_ZE-O_6B4`);
        xhr.onload = function () {
            let dataImg = JSON.parse(xhr.response);
            for(let i = 0; i < dataImg.results.length; i++){
                div.innerHTML += `<img src='${dataImg.results[i].urls.small}'/>`;
            }
        };
        xhr.send();
        event.target.value = '';
    }
}

input.addEventListener('keyup', inputHandle);