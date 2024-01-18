
// save a Albums
export const saveAlbumsData = async (albumsData) => {
  const response = await fetch(`http://localhost:5005/createAlbums`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('access-token')}`,
    },
    body: JSON.stringify(albumsData),
  })
  const data = await response.json()
  return data
}

// getAll a Albums
export const getAlbums = async () => {
  const response = await fetch(`http://localhost:5005/getAlbums`)
  const albums = await response.json()
  return albums
}

// getSpecific a Albums
export const getSpecificAlbums = async (email) => {
  const response = await fetch(`http://localhost:5005/getSpecificAlbums/${email}`)
  const SpecificAlbums = await response.json()
  return SpecificAlbums
}

// update a Albums
export const updateAlbums = async (id, albumsUpdateData) => {
  const response = await fetch(
    `http://localhost:5005/updateAlbums/${id}`,
    {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
      body: JSON.stringify(albumsUpdateData),
    }
  )
  const data = await response.json()
  return data
}

// delete a Albums
export const deleteAlbums = async id => {
  const response = await fetch(
    `http://localhost:5005/deleteAlbums/${id}`,
    {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
    }
  )
  const data = await response.json()
  return data
}




// become a host
export const becomeHost = email => {
  const currentUser = {
    role: 'host',
  }

  return fetch(`http://localhost:5005/users/${email}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(currentUser),
  }).then(res => res.json())
}
// Get role
export const getRole = async email => {
  const response = await fetch(`http://localhost:5005/usersRole/${email}`)
  const user = await response.json()
  return user?.role
}
