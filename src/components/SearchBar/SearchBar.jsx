import { useState } from 'react';
import SearchResults from '../SearchResults/SearchResults';
import styles from './SearchBar.module.css';
function SearchBar() {
    //handle input change
    const [inputValue, setInputValue] = useState("Enter A Song, Album, or Artist");

    let result = [];
    
    function handleChange({target}){
        setInputValue(target.value);
    }

    //handle submit search
    function handleSubmit({target}){
        //Request an access token
        const getAcessToken = async () => {
            //Infos to reach the API
            const url = "https://accounts.spotify.com/api/token";
            const clientID = "e27bcceb0b7643ea9fb07295db107f0e";
            const clientSecret = "6579cea59aae4d5195ad8191cdaea1e3";
            const data = `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`;
            
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: data
                });
                if(response.ok){
                    const jsonResponse = await response.json();
                    return jsonResponse;
                }
            } catch(error){console.log(error)}
        }
    
        //GET to request user search
        const getData = async () => {
            //get the access token
            const token = await getAcessToken();

            //Information to reach API
            const url = "https://api.spotify.com/v1/search?q=";
            const params = "&type=track&limit=10"
            const endpoint = url + target.value + params;
            try {
                const response = await fetch(endpoint, {
                    header: `Authorization: ${token.token_type} ${token.access_token}`});
                if(response.ok){
                    const jsonResponse = await jsonResponse.json()
                    return jsonResponse
                }
            } catch(error) {console.log(error)};
        };
        return result = getData;
    }

    return (
        <>
            <form method="POST" className={styles.form}>
                <input className={styles.inputText} onChange={handleChange} type="text" placeholder={inputValue} />
                <input className={styles.inputSubmit} type="submit" onSubmit={handleSubmit} value='SEARCH' />
            </form>
            <SearchResults result={result} />
        </>
    )
}

export default SearchBar;