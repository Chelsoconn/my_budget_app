document.addEventListener('DOMContentLoaded', () => {
  
  
  
  
  fetch('http://localhost:4567/', {
    method: 'GET', 
    credentials: 'include', 
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    }
})
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    console.log(data);
})
.catch(err => {
    console.error('An error occurred:', err);
});

  
  
  

});
