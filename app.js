fetch('https://api-gas-stations-mex.herokuapp.com/gasstations', { mode: 'no-cors'})
.then(response => response.json())
.then(data => {
  console.log(data) // Prints result from `response.json()` in getRequest
})  
.catch(error => console.error(error));