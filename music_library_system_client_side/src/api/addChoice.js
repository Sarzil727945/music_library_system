// Add a Choice Rooms
export const addChoiceRooms = async (addChoice) => {
     const response = await fetch(`${import.meta.env.VITE_API_URL}/addChoiceRooms`, {
          method: 'POST',
          headers: {
               'content-type': 'application/json',
          },
          body: JSON.stringify(addChoice),
     })
     const data = await response.json()
     return data
}

//get filtered getChoiceRooms for hosts
export const getChoiceRooms = async (email) => {
     const response = await fetch(`${import.meta.env.VITE_API_URL}/getChoiceRooms/${email}`)
     const data = await response.json()
     return data
}

// Delete a Choice Rooms
export const deleteChoiceRooms = async id => {
     const response = await fetch(`${import.meta.env.VITE_API_URL}/deleteChoiceRoom/${id}`, {
       method: 'DELETE',
       headers: {
         'content-type': 'application/json',
       },
     })
     const result = await response.json()
     return result
   }