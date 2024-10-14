import Helpers from '../common_ts/common.js';
let helpers = new Helpers()

document.addEventListener('submit', event => {
  event.preventDefault();
  
  let form = document.querySelector('form')
  const formData = new FormData(form as HTMLFormElement);
  const username = (formData.get('username') as string).trim();
  
  for (let [key, value] of formData.entries()) {
    if (key === username) {
      const trimmedValue = (value as string).trim();
      formData.delete(key);
      formData.append(key, trimmedValue);
    }
  }
  
  fetch('http://localhost:4567/', {
    method: 'POST', 
    credentials: 'include', 
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    body: formData
    })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
    if (data.message === 'successful login') {
      window.location.href = "/views/dashboard.html";
    } else {
      helpers.sessionDataMessage("login_error_message");
      (document.getElementById('password_digest') as HTMLInputElement).value = ''
    }
  })
  .catch(err => {
      console.error('An error occurred:', err);
  });


})