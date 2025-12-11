const clientId = 'e27bcceb0b7643ea9fb07295db107f0e';
const redirectUri = "http://127.0.0.1:8888/callback";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");
let accessToken;

const Spotify = {
    async getAcessToken(clientId, code) {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://127.0.0.1::5173/callback");
    params.append("code_verifier", verifier);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        methods: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params    
    });

    const { access_token } = await result.json();
    return access_token;
    },

    search(term){
        const accessToken = Spotify.getAcessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if(!jsonResponse.tracks){
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        });
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