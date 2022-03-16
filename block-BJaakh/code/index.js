let input = document.querySelector('input');
let root = document.querySelector('ul');
let myUrl = `https://sleepy-falls-37563.herokuapp.com/api/todo`;

function handleDelete(event, todo, arr) {
  console.log(event.target);
  arr.forEach((elem) => {
    if (todo._id === elem._id) {
      fetch(myUrl + `/${todo._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(() => {
        fetchData(myUrl);
      });
    }
  });
}

function displayUI(array) {
  root.innerHTML = '';
  array.forEach((elem, ind, arr) => {
    let li = document.createElement('li');
    let input = document.createElement('input');
    input.type = `checkbox`;
    input.checked = elem.isCompleted;
    input.setAttribute('data-id', elem._id);
    let label = document.createElement('label');
    label.innerText = elem.title;
    let span = document.createElement('span');
    span.innerText = `❌`;
    span.addEventListener('click', (event) => handleDelete(event, elem, arr));
    li.append(input, label, span);
    root.append(li);
  });
}

function fetchData(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayUI(data.todos);
    });
}

function handleInput(event, url) {
  let value = event.target.value;
  if (event.keyCode === 13 && value.trim('') !== '') {
    let sentData = {
      todo: {
        title: value,
        isCompleted: false,
      },
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sentData),
    }).then(() => {
      fetchData(myUrl);
    });
    event.target.value = '';
  }
}

fetchData(myUrl);

input.addEventListener('keyup', (event) => handleInput(event, myUrl));
