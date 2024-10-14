
async function checkUserIsUnique() {
  try {
    let resp = await fetch('http://localhost:4567/users', {
     method: 'GET',
     credentials: 'include',
     headers: {
      'X-Requested-With': 'XMLHttpRequest', 
    }
    })
    if (!resp.ok) {
     throw new Error(`Error: ${resp.status} ${resp.statusText}`);
    }
    const data = await resp.json();
    return data; 
  } catch(error) {
    return 'Error fetching users';
  };
}

function postNewUser(formData: FormData) {
  (document.getElementById('password_message') as HTMLElement).innerHTML = '';
  (document.getElementById('user_message') as HTMLElement).innerHTML = '';
  fetch('http://localhost:4567/signup', {
    method: 'POST', 
    credentials: 'include', 
    headers: {
        'X-Requested-With': 'XMLHttpRequest', 
    },
    body: formData
  })
  .then(response => {
    if (response.ok) {
       return response.json()
    } else {
        throw new Error(`Error: ${response.status} ${response.statusText}`); 
    }
  })
  .then(response => {
  console.log(response.message) 
  window.location.href = "/index.html";
  })
  .catch(error => {
    console.error(`Error during the request: ${error.message}`);
  });
} 

function usernameIsUnique(user: string[], username: string) {
  return !user.includes(username)
}

function correctSignin(username: string, password: string): boolean {
   return correctFormatUsername(username) && correctFormatPassword(password) 
}

function correctFormatUsername(username: string) {
  const regex = /^(?=.*[A-Z])(?!.*\s)(?!.*[\W])[A-Za-z0-9_]{6,50}$/;
  return regex.test(username)
}

function correctFormatPassword(password: string): boolean {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])(?!.*\s)[A-Za-z\d\W_]{6,50}$/;
  return regex.test(password);
}


document.addEventListener('DOMContentLoaded', () => {
  let form = document.querySelector('form');

  (form as HTMLElement).addEventListener('submit', async event => {
    event.preventDefault();

    const formData = new FormData(form as HTMLFormElement);
    const username = formData.get('username') as string;
    const password = formData.get('password_digest') as string;

    console.log('Username:', username);   //delete this when done with this page
    console.log('Password:', password);   //delete this when done with this page
    let user = await checkUserIsUnique()
    usernameIsUnique(user, username) 
    if (correctSignin(username, password) && usernameIsUnique(user, username)) {
      postNewUser(formData)
    } else {
      let user_message = ''
      let password_message = ''
      if (!correctFormatUsername(username)) {
        (document.getElementById('username') as HTMLInputElement).value = '';
        user_message += 'The username must between 6-50 characters and include at least one uppercase letter and can only consist of letters, numbers, and underscores (_).  '
      }
      if (!correctFormatPassword(password)) {
        (document.getElementById('password_digest') as HTMLInputElement).value = '';
        password_message += 'The password must between 6-50 characters and include at least one uppercase letter, one number, and one special character.  '
      }
      if (!usernameIsUnique(user, username)) {
        (document.getElementById('username') as HTMLInputElement).value = '';
        user_message += 'This username is already in use'
      }
      (document.getElementById('password_message') as HTMLElement).innerHTML = password_message;
      (document.getElementById('user_message') as HTMLElement).innerHTML = user_message;
    }
  })  
})







