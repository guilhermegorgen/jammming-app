import Track from '../Track/Track.jsx';

const TrackList = (props) => {
    return (
        <>
            <div>
                {props.tracks.map((track) => {
                    return(
                        <Track 
                            track={track}
                            key={track.id}
                            onAdd={props.onAdd}
                            isRemoval={props.isRemoval}
                            onRemove={props.onRemove}
                        />
                    );
                })};
            </div>
        </>
    );
}

export default TrackList;