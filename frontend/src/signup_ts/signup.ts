function errorMessage(username: string, password: string): string {
  return 'wrong username/password'
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

  (form as HTMLElement).addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(form as HTMLFormElement);
    const username = formData.get('username') as string;
    const password = formData.get('password_digest') as string;

    console.log('Username:', username);
    console.log('Password:', password);

    if (correctSignin(username, password)) {
      let request = new XMLHttpRequest();
      request.open('POST', 'http://localhost:4567/signup');

      request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      request.setRequestHeader('Access-Control-Allow-Origin', '*');

      
      request.addEventListener('load', () => {
        console.log('success');
      });
      request.addEventListener('error', function() {
        console.error(`Error during the request: 
        Status: ${request.status}, 
        Status Text: ${request.statusText}, 
        Response: ${request.responseText}`);
      });

      request.send(formData);
    } else {
      (document.getElementById('message') as HTMLElement).innerHTML = errorMessage(username, password)
    }
   
  })

})