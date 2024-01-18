// save a user to database
export const saveUser = (user, password) => {
  const currentUsers = {
    name: user.displayName,
    email: user.email,
    pic: user.photoURL,
    password: (password || 'googlePassword'),
  }

  fetch(`http://localhost:5005/createUsers`, {
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
  const response = await fetch(`http://localhost:5005/getUsers`)
  const user = await response.json()
  return user
}

// getSpecific a user
export const getSpecificUser = async (email) => {
  const response = await fetch(`http://localhost:5005/getSpecificUser/${email}`)
  const SpecificUser = await response.json()
  return SpecificUser
}