import { useState, useCallback } from 'react'
import './App.css'
import Header from './components/Header/Header.jsx';
import SearchBar from './components/SearchBar/SearchBar.jsx';
import SearchResults from './components/SearchResults/SearchResults.jsx'
import Playlist from './components/Playlist/Playlist.jsx'
import { search, savePlaylist } from './Spotify.js';


function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState('');

  const handleSearch = useCallback((term) => {
    search(term).then(setSearchResults)
  }, []);

  const addTrack = useCallback((track) => {
    if(playlistTracks.some((savedTrack) => savedTrack.id === track.id))
      return; 
    
    setPlaylistTracks((prevTracks) => [...prevTracks, track]);
  }, [playlistTracks]);

  const removeTrack = useCallback((track) => {
    setPlaylistTracks((prevTracks) => {
      prevTracks.filter((currentTrack) => currentTrack.id !== track.id)
    });
  }, []);

  const updatePlaylistName = useCallback((name) => {
    setPlaylistName(name);
  }, []);

  const handleSavePlaylist = useCallback(() => {
    const trackUris = playlistTracks.map((track) => track.uri);
    savePlaylist(playlistName, trackUris).then(() => {
      setPlaylistName("New Playlist");
      setPlaylistTracks([]);
    });
  }, [playlistName, playlistTracks]);

  return (
    <>
      <div>
        <Header />
        <SearchBar onSearch={handleSearch}/>
        <div>
          <SearchResults searchResults={searchResults} ondAdd={addTrack} />
          <Playlist 
            playlistName = {playlistName}
            playlistTracks = {playlistTracks}
            onNameChange = {updatePlaylistName}
            onSave = {handleSavePlaylist}
            onRemove = {removeTrack}
          />
        </div>
      </div>
    </>
  )
}

export default App;