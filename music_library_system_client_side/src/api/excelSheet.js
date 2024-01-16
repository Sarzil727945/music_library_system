// Add a Excel Sheet data
export const addExcelSheet = async (postValue) => {
     const response = await fetch(`${import.meta.env.VITE_API_URL}/excelSheet`, {
          method: 'POST',
          headers: {
               'content-type': 'application/json',
          },
          body: JSON.stringify(postValue),
     })
     const data = await response.json()
     return data
}

// get all Excel Sheet data
export const getAllExcelSheet = async () => {
     const response = await fetch(`${import.meta.env.VITE_API_URL}/excelSheet`)
     const data = await response.json()
     return data
   }