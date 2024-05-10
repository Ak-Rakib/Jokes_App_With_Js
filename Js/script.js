const jokeText = document.querySelector('.text_of_joke');
const nextJokeBtn = document.querySelector('.next_btn');
const shareBtn = document.querySelector('.share_btn');

nextJokeBtn.addEventListener('click', function () {
    // alert('testing code');
    fetch('https://icanhazdadjoke.com', {
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => {
            // Check if the response is successful (status code between 200 and 299)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Check if the response content type is JSON
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new TypeError('Expected JSON response from server');
            }
            // Parse the response body as JSON
            return response.json();
        })
        .then(data => {
            // Do something with the JSON data
            console.log(data);
            // Assuming 'text_of_joke' is a class for displaying the joke text
            jokeText.textContent = data.joke;
        })
        .catch(error => {
            // Handle any errors that occur during the fetch
            console.error('Fetch error:', error);
        });
});
