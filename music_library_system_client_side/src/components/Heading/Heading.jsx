import { MdBookmarkAdded } from "react-icons/md"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../providers/AuthProvider"
import { useContext } from "react"
import { addChoiceRooms, getChoiceRooms } from "../../api/addChoice"

const Heading = ({ title, subtitle, roomData, center }) => {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  const cardAdd = ()=>{
    const addChoice = {choiceUserEmail: user?.email, roomDataId: roomData?._id};
    getChoiceRooms(user?.email).then((data) => {
      const roomCheck = data?.filter(d => d?.roomDataId === roomData?._id);
      if (roomCheck[0]) {
        navigate('/dashboard/my-choices')
      }
      else {
        addChoiceRooms(addChoice).then(data => {
          console.log(data);
          navigate('/dashboard/my-choices')
        })
      }
    })
  }

  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <div className=" flex justify-between items-center">
        <div>
          <div className='text-2xl font-bold'>{title}</div>
          <div className='font-light text-neutral-500 mt-2'>{subtitle}</div>
        </div>
        {
          (title !='No Rooms Available In This Category!') &&  <div>
          <button className="btn" 
            onClick={cardAdd}
            disabled={roomData?.host?.email === user?.email}
            label='Reserve'
            >
              <MdBookmarkAdded className=" w-5 h-5" /> Add
            </button>
        </div>
        }
       
      </div>
    </div>
  )
}

export default Heading
