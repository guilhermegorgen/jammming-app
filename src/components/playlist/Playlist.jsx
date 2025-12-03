import { useState } from 'react';
import styles from './Playlist.module.css';

function Playlist(props) {
    //Playlist name changes
    const [name, setName] = useState('Set your playlist name here');

    const handleChange = ({target}) => {
        setName(target.value);
    };
    
    //button to remove song of playlist
    const [playlist, setPlaylist] = useState([props]);
    const removeOfPlaylist = ({target}) => {
        const selectedSong = target.value;
        setPlaylist((prev) => {
            if(prev.includes(selectedSong))
                return prev.filter(song => song !== selectedSong)
        })

    }
    return (
        <>
            <div>
                <input className={styles.inputText} onChange={handleChange} type="text" value={name} />
                <ul>
                    {playlist.forEach(song => {(
                         <li>
                            <h6>{playlist.music}</h6>
                            <span>{playlist.artist}</span>
                            <span>{playlist.album}</span>
                            <button onClick={removeOfPlaylist}>+</button>
                        </li>
                    )})}
                </ul>
                <button className={styles.saveButton}>SAVE</button>
            </div>
        </>
    )
};

export default Playlist;