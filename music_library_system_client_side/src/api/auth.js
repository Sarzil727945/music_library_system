// save a user to database
export const saveUser = (user, password )=> {
  const currentUsers = {
    name: user.displayName,
    email: user.email,
    pic: user.photoURL,
    password: (password || 'googlePassword'),
  }

  fetch(`${import.meta.env.VITE_API_URL}/createUsers`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(currentUsers),
  })
    .then(res => res.json())
    .then(data => console.log(data))
}

// getAll user 
export const getUsers = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/getUsers`)
  const user = await response.json()
  return user
}



// become a host
export const becomeHost = email => {
  const currentUser = {
    role: 'host',
  }

  return fetch(`${import.meta.env.VITE_API_URL}/users/${email}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(currentUser),
  }).then(res => res.json())
}

// Get role
export const getRole = async email => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${email}`)
  const user = await response.json()
  return user?.role
}
