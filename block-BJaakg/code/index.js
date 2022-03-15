let root = document.querySelector('ul');
let main = document.querySelector('body');
let box = document.querySelector('.box');
let list = document.querySelector('.list');
let close = document.querySelector('.close');
let characters = document.querySelector('.characters');

function handleSpinner(status = false) {
  if (status) {
    root.innerHTML = `<div style="text-aligm:center;"><div class="spinner"></div></div>`;
  }
}

function handleClick(event, item) {
  box.style.display = 'block';
  characters.innerText = ` Characters: ${item.characters.length}`;
  item.characters.forEach((url) => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        let char = document.createElement('div');
        char.style.border = '2px solid white';
        char.style.padding = '1rem';
        char.style.color = 'white';
        char.style.marginBottom = '.5rem';
        char.innerText = `${res.name} (${res.titles})`;
        list.append(char);
      });
  });
}

function displayUI(array) {
  root.innerHTML = '';
  array.forEach((item) => {
    let li = document.createElement(`li`);
    let h2 = document.createElement(`h2`);
    h2.innerText = item.name;
    let cite = document.createElement(`cite`);
    cite.innerText = item.authors;
    let button = document.createElement(`button`);
    button.innerText = `Show Charactors (${item.characters.length})`;
    button.addEventListener('click', (event) => handleClick(event, item));
    li.append(h2, cite, button);
    root.append(li);
  });
}

function fetchData(url) {
  handleSpinner(true);
  fetch(url)
    .then((response) => response.json())
    .then((res) => {
      handleSpinner(false);
      displayUI(res);
    })
    .catch((err) => {
      root.innerHTML = `${err}`;
    })
    .finally(() => {
      handleSpinner(false);
    });
}

close.addEventListener('click', () => {
  box.style.display = 'none';
});

fetchData(`https://www.anapioficeandfire.com/api/books`);