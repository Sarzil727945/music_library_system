// getAll artists 
export const getArtists = async () => {
     const response = await fetch(`http://localhost:5005/getArtists`)
     const artists = await response.json()
     return artists
}