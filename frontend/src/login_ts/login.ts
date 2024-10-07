document.addEventListener('DOMContentLoaded', () => {
  let request = new XMLHttpRequest();
  request.open('GET', 'http://localhost:4567/');
  request.addEventListener('load', event => {
    console.log(request.response)
  }) 
  request.addEventListener('error', () => [
    console.log('error')
  ])
  request.send()

});
