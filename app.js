const searchMusic = async() => {
    const searchText = document.getElementById('searchText').value
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    try {
        const response = await fetch(url);
        const data = await response.json();
        displaySong(data.data)
    } catch (error) {
        errorMessage("Someting Wrong ! Please Try Again !");
    }
}


const displaySong = songs => {
    const songsContainer = document.getElementById('search-container')
    songsContainer.innerHTML = '';
    songs.forEach(song => {
        const songsDiv = document.createElement('div')
        songsDiv.className = 'single-result row align-items-center my-3 p-3'
        songsDiv.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>
                    <source src="${song.preview}" type="audio/mp3">
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button class="btn btn-success" onclick="getLyrics('${song.artist.name}','${song.title}')">Get Lyrics</button>
            </div>
        `
        songsContainer.appendChild(songsDiv)
    });
}


const getLyrics = async(artist, title) => {
    const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
    try {
        const data = await response.json();
        displayLyrics(data.lyrics);
    } catch (error) {
        errorMessage("Someting Wrong to load Lyrics Please Try Later!")
    }

}


const displayLyrics = lyrics => {
    const songLyrics = document.getElementById('song-lyrics')
    songLyrics.innerText = lyrics
}

const errorMessage = error => {
    const eMessage = document.getElementById('error-message')
    eMessage.innerText = error
}
