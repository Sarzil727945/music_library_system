
// Get role
export const getUsers = async email => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${email}`)
  const user = await response.json()
  return user
}

// update a user
export const upDataUser = (user, upDataUserInfo) => {
  fetch(`${import.meta.env.VITE_API_URL}/users/${user?.email}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(upDataUserInfo),
  })
    .then(res => res.json())
    .then(data => console.log(data))
}