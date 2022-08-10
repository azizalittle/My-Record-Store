console.log('JS is here boo!');
const search = document.createElement('div');

let input = document.createElement('input');
input.type = 'text';
search.appendChild(input);

let searchBaseUrl = 'https://itunes.apple.com/search?term=';

let searchForm = document.querySelector('#search-form')
searchForm.addEventListener('submit', (event) => {
    event.preventDefault()
    console.log('submitted!')
    let searchBox = document.querySelector('#search-box')
    let searchUrl = `${searchBaseUrl}${searchBox.value}`
    console.log('search url', searchUrl)
    getSearchResults(searchUrl)
})

function getSearchResults(url) {
fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
})
//response is whatever the fetch returns
.then(response => {
    if(!response.ok){
        throw Error(response.status);
    } else {
        console.log(response);
        return response.json();
    }
})
// data is whatever the above code returns, in this case response.json()
.then(data => {
    let songs = data.results;
    showResults(songs);
}).catch(error => {
    console.log(error);
    alert(`Your request failed, for the reason: ${error}`);
})
}

let resultsDiv = document.querySelector('#results');
console.log('results div', resultsDiv);

function showResults(songArray) {
    resultsDiv.innerHTML = ('')
    console.log(songArray);
    if (songArray.length === 0) {
        resultsDiv.innerText = `Uh oh! I couldn't find music to match your search. Please try again`;
    } else {
    for (let song of songArray){
        let recordDiv = document.createElement('div');
        recordDiv.classList.add('record');

        let imageDiv = document.createElement('img');
        imageDiv.classList.add('image');
        imageDiv.src = song.artworkUrl100;

        let titleDiv = document.createElement('div');
        titleDiv.classList.add('div');
        titleDiv.innerText = `${song.trackName}`;

        let artistDiv = document.createElement('div');
        artistDiv.classList.add('div');
        artistDiv.innerText = `${song.artistName}`;

        resultsDiv.appendChild(recordDiv);
        recordDiv.appendChild(imageDiv);
        recordDiv.appendChild(titleDiv);
        recordDiv.appendChild(artistDiv);

        let audio = document.querySelector('#audio-preview')
        let currentSong = document.querySelector('.current-song')

        recordDiv.addEventListener('click', playCrackle);
        function playCrackle() {
            const crackle = new Audio('resources/crackle.mp3');
            crackle.play();
        }

        function playAudio() {
            audio.src = song.previewUrl
            currentSong.innerText = `Currently playing: ${song.trackName} by ${song.artistName}`
            audio.play();
        }
        recordDiv.addEventListener('click', e =>
        setTimeout(playAudio, 1800)
    )}
    }
    }