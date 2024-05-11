const jokeText = document.querySelector('.text_of_joke');
const nextJokeBtn = document.querySelector('.next_btn');
const shareBtn = document.querySelector('.share_btn');

const toggleFirstBtn = document.getElementById("first_btn");
const toggleSecondBtn = document.getElementById("second_btn");

let bgColorFirst = 'burlywood';
let textColorFirst = 'Black';
let bgColorSecond = 'Black';
let textColorSecond = 'white';

function toggleBgColors() {
    [bgColorFirst, bgColorSecond] = [bgColorSecond, bgColorFirst];
    [textColorFirst, textColorSecond] = [textColorSecond, textColorFirst];
    toggleFirstBtn.style.backgroundColor = bgColorFirst;
    toggleFirstBtn.style.color = textColorFirst;

    toggleSecondBtn.style.backgroundColor = bgColorSecond;
    toggleSecondBtn.style.color = textColorSecond;
}

toggleFirstBtn.addEventListener('click', toggleBgColors);
toggleSecondBtn.addEventListener('click', toggleBgColors);

nextJokeBtn.addEventListener('click', function () {
    // alert('testing code');
    fetch('https://icanhazdadjoke.com', {
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new TypeError('Expected JSON response from server');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            jokeText.textContent = data.joke;

            // const shareFacebookLink = `https://www.facebook.com/sharer.php?u=${data.joke}`; 
            // shareBtn.setAttribute('href', shareFacebookLink);
        })
        .catch(error => {
            console.error('Fetch error:', error);
            jokeText.textContent = "404!";
        });
});


function shareFacebook() {
    const currentUrl = encodeURIComponent(document.location.href);
    const pageTitle = encodeURIComponent(document.title);
    const shareUrl = `https://www.facebook.com/sharer.php?u=${currentUrl}&t=${pageTitle}`;

    window.open(shareUrl, '_blank', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
    return false;
}
