const { Buffer } = require('node:buffer');

const clientId = 'e27bcceb0b7643ea9fb07295db107f0e';
const clientSecret = "6579cea59aae4d5195ad8191cdaea1e3";
const redirectUri = "redirect_uri=http://127.0.0.1:8888/callback";
let accessToken;

const Spotify = {
    getUserAuhtorization(){
        const endpoint = "https://accounts.spotify.com/authorize?";
        const clientPoint = `client_id=${clientId}`;
        const responseType = `response_type=code`;
        const scope = 'user-read-private user-read-email';
        const url = `${endpoint}&${clientPoint}&${responseType}&${redirectUri}&scope=${scope}`;
        
        try {
            if(accessToken){
                return accessToken;
            } else {
                return window.location = url;
            }
        } catch(e) {console.log(e)}  
    },

    getAccessToken() {
        Spotify.getUserAuhtorization();
        const urlParams = new URLSearchParams(window.location);
        const code = urlParams.get('code');
        const endpoint = "https://accounts.spotify.com/api/token";
        const grantType = "grant_type=authrization_code";
        const url = `${endpoint}&${grantType}&code=${code}&${redirectUri}`;
        
        const response = fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic " + (new Buffer.from(clientId + ":" + clientSecret).toString('base64'))
            }
        });

        const jsonResponse = response.json();
        return jsonResponse 
    },

    search(term){
        const getAccessInformations = Spotify.getAccessToken();
        const accessToken = getAccessInformations.access_token;
        const response = fetch(`https://api.spotify.com/v1/search?q=${term}&type=track`, {
            methdod: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        const jsonResponse = response.json();
        if (!jsonResponse.tracks) {
            return [];
        }
        return jsonResponse.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
        }));
    },

    savePlaylist(name, trackUris) {
        if(!name || !trackUris.length){
            return;
        }

        const accessToken = Spotify.getAcessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        let userId;

        return fetch('https://api.spotify.com/v1/me', {headers: headers}
        ).then(response => response.json()
        ).then(jsonResponse => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({name: name})
            }).then(response => response.json()
            ).then(jsonResponse => {
                const playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                    headers: headers,
                    methods: 'POST',
                    body: JSON.stringify({uris: trackUris})
                });
            });
        });
    }
};

export default Spotify;