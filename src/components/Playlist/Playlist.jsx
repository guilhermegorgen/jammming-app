import { useCallback } from "react";
import styles from './Playlist.module.css';

const Playlist = (props) => {
    const handleNameChange = useCallback(({target}) => {
        props.onNameChange(target.value);
    }, [props.onNameChange]);
    
    return (
        <>
            <div>
                <input className={styles.inputText} onChange={handleNameChange} defaultValue={'Set you playlist name here'} />
                <TrackList 
                    tracks={props.playlistTracks}
                    isRemoval={true}
                    onRemove={props.onRemove}
                />
                <button className={styles.saveButton} onClick={props.onSave}>SAVE</button>
            </div>
        </>
    )
};

export default Playlist;