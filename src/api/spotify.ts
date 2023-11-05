const url = 'https://api.spotify.com/v1/'

export type SpotifyGetAccessToken = {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export const getAccessToken = async ():Promise<SpotifyGetAccessToken> => {
  const url = 'https://accounts.spotify.com/api/token';
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=client_credentials&client_id=${process.env.SPOTIFY_CLIENT_ID}&client_secret=${process.env.SPOTIFY_CLIENT_SECRET}`,
  });
  return await res.json();
};

export type SpotifySearchMusic = {
  tracks: {
    items: {
      name: string;
      duration_ms: number;
      preview_url: string;
      artists: {
        name: string;
      }[];
      album: {
        name: string;
        images: {
          url: string;
        }[];
      };
    }[];
  };
}

export const searchMusic = async (query: string):Promise<SpotifySearchMusic> => {
  const req = await fetch(`${url}search?q=${query}&type=track`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('spotify_access_token')}`,
    },
  });

  const res = await req.json();
  return res;
}