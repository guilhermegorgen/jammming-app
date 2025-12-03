import { useState } from 'react';
import Playlist from '../playlist/Playlist.jsx';
import styles from './SearchResults.module.css';


function SearchResults(props) {
    const results = [props];

    //add songs of search results to new playlist
    const [playlist, setPlaylist] = useState([]);
    const addToPlaylist = ({target}) => {
        const selectedSong = target.value;
        //check if selected song is already in playlist
        setPlaylist((prev) => {
            if(prev.includes(selectedSong)){
                //filter the song is already selected
                return prev.filter(song => song !== selectedSong);
            } else {
                // add the selected song to our state
                return [selectedSong, ...prev];
            }
        });
    };

    return (
        <>
            <div className={styles.mainDiv}>
                <div className={styles.listDiv}>
                    <ul>
                        {results.forEach((result) => {(
                            <li>
                                <h6>{result.music}</h6>
                                <span>{result.artist}</span>
                                <span>{result.album}</span>
                                <button onClick={addToPlaylist}>+</button>
                            </li>
                        )})}
                    </ul>
                </div>
                <div className={styles.playlistDiv}>
                    <Playlist playlist={playlist}/>
                </div>
            </div>
        </>
    )

};

export default SearchResults;