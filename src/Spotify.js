const { Buffer } = require('node:buffer');

const clientId = 'e27bcceb0b7643ea9fb07295db107f0e';
const clientSecret = "6579cea59aae4d5195ad8191cdaea1e3";
const redirectUri = "http://127.0.0.1:8888/callback";
let accessToken;

const Spotify = {
    getUserAuhtorization(){
        const endpoint = "https://accounts.spotify.com/authorize?";
        const clientPoint = `client_id=${clientId}`;
        const responseType = `response_type=code`;
        const scope = 'user-read-private user-read-email';
        const url = `${endpoint}${clientPoint}&${responseType}&redirect_uri=${redirectUri}&scope=${scope}`;

        return window.location = url;
    },

    async getAccessToken() {
        Spotify.getUserAuhtorization();
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const url = "https://accounts.spotify.com/api/token";
        const grantType = "authrization_code";
        const data = JSON.stringify({garant_type: grantType, code: code, redirect_uri: redirectUri})
        
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Basic ${new Buffer.from(clientId + ":" + clientSecret).toString('base64')}`
            },
            body: data

        });

        const jsonResponse = await response.json();
        return jsonResponse 
    },

    async search(term){
        const getAccessInformations = Spotify.getAccessToken();
        const accessToken = getAccessInformations.access_token;
        const response = await fetch(`https://api.spotify.com/v1/search?q=${term}&type=track`, {
            methdod: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        const jsonResponse = await response.json();
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

        const accessToken = Spotify.getAccessToken();
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