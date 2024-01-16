import React, { useEffect, useState } from 'react'
import Container from '../../components/Shared/Container'
import Header from '../../components/Rooms/Header'
import RoomInfo from '../../components/Rooms/RoomInfo'
import RoomReservation from '../../components/Rooms/RoomReservation'
import { useLoaderData } from 'react-router-dom'
import Card from '../../components/Rooms/Card'
import { getAllRooms } from '../../api/rooms'

const RoomDetails = () => {
  const roomData = useLoaderData()
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    getAllRooms()
      .then(data => {
        const filtered1 = data?.filter(room => room?.location === roomData?.location)
        const filtered2 = filtered1?.filter(room => room?._id !== roomData?._id)
        setRooms(filtered2)
      })
      .catch(err => console.log(err))
  }, [roomData])

  console.log(rooms);
  return (
    <Container>
      <div className='max-w-screen-lg mx-auto '>
        <div className='flex flex-col gap-6'>
          <Header roomData={roomData} />
          <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
            <RoomInfo roomData={roomData} />
            <div className='mb-10 md:col-span-3 order-first md:order-last'>
              <RoomReservation roomData={roomData} />
            </div>
          </div>
          {
            rooms[0] && <div>
              <div className='font-bold text-2xl text-center mt-5'>Same Location Others Room!</div>
              <div className='pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8'>
                {rooms?.map((room, index) => (
                  <Card key={index} room={room} />
                ))}
              </div>
            </div>
          }
        </div>
      </div>
    </Container>
  )
}

export default RoomDetails
