import TrackList from "./TrackList/TrackList.jsx";


function SearchResults(props) {
    return (
        <div>
            <h2>Results</h2>
            <TrackList tracks={props.searchResults} onAdd={props.onAdd} />
        </div>
    );
};

export default SearchResults;