const followers = document.querySelector('.followers');
const following = document.querySelector('.following');
const input = document.querySelector('input');
const image = document.querySelector('.image-user');
const userName = document.querySelector('h3');
const userId = document.querySelector('p');
const imageCat = document.querySelector('.image-cat');
const button = document.querySelector('button');

function displayUI(data) {
  image.src = data.avatar_url;
  userName.innerText = data.name;
  userId.innerText = '@'+ data.login;
  following.innerText = `Following: ${data.following}`;
  followers.innerText = `Followers: ${data.followers}`;
}

function handleChange(event) {
  if(event.keyCode === 1) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.github.com/users/${event.target.value}`);
    xhr.onload = function () {
      let userData = JSON.parse(xhr.response);
      displayUI(userData);
    };
    xhr.onerror = function () {
      console.log('something went wrong ...');
    };
    xhr.send();
    event.target.value = '';
  }
}
input.addEventListener('keyup', handleChange);



button.addEventListener('click', () => {
  let xhr = new XMLHttpRequest();

  xhr.open(
    'GET',
    `https://api.thecatapi.com/v1/images/search?limit=1&size=full`
  );
  xhr.onload = function() {
    let imageData = JSON.parse(xhr.response);
    imageCat.src = imageData[0].url;
  };
  xhr.onerror = function () {
    console.log('something went wrong ....')
  };
  xhr.send();

})




