// Add a comment
export const addMessage = async (add) => {
     const response = await fetch(`${import.meta.env.VITE_API_URL}/message`, {
          method: 'POST',
          headers: {
               'content-type': 'application/json',
          },
          body: JSON.stringify(add),
     })
     const data = await response.json()
     return data
}

// Get all bookings for a user by email
export const getMessages = async () => {
     const response = await fetch(`${import.meta.env.VITE_API_URL}/message`)
     const data = await response.json()
     return data
}