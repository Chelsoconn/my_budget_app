type Message = {
  message: string
}

export default class Helpers {

  sessionDataMessage(message: string) {
    fetch('http://localhost:4567/session_data', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
    .then(response => {
      return response.json();
    })
    .then(response => {
      let mess = document.getElementById(message) as HTMLElement
      console.log((response as unknown as Message).message)
      mess.innerHTML = (response as unknown as Message).message
    })
    .catch((err) => {
      return `Error accessing session data: ${err}`;
    })
  }

}