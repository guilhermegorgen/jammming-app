import Track from './components/Track/Track.jsx';

const Tracklist = (props) => {
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
    )
}