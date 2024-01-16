import React, { useContext } from 'react';
import { useState } from 'react';
import { BiSolidSend } from 'react-icons/bi';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { addMessage, getMessages } from '../../api/comment';


const Comments = ({ id }) => {
     const { user } = useContext(AuthContext)
     const displayName = user?.displayName;
     const email = user?.email;
     const userPic = user?.photoURL;
     const messageId = id;
     const navigate = useNavigate()
     const [isLoading, setIsLoading] = useState(true);
     const [input1Value, setInput1Value] = useState('');
     const [messageData, setMessageData] = useState([]);
     const handleInput1Change = (e) => {
          setInput1Value(e.target.value);
     };
     const isButtonDisabled = !(input1Value);

     // server allMessage data get start
     useEffect(() => {
          fetchData();
     }, []);

     const fetchData = async () => {
          getMessages()
               .then(data => {
                    const sameMassageID = data?.filter(d => d.messageId === id)
                    setMessageData(sameMassageID);
                    setIsLoading(false);
               })


     };
     // // server allMessage data get exit

     //  allMessage post server start 
     const handelFrom = (event) => {
          event.preventDefault();
          const form = event.target;
          const message = form.message.value;

          const add = { messageId, displayName, email, userPic, message }
          addMessage(add).then(data => {
               fetchData();
               console.log(data);
          })

          form.reset();

     }
     //  allMessage post server end

     return (
          <div>
               <div className=' relative' style={{border:'2px solid #e8e8e8', padding: "25px 0px", borderRadius: "10px"}}>
                    <div className=' mx-5 h-[255px] overflow-scroll pb-32'>
                         {
                              isLoading &&
                              <div className="text-center mt-5">
                                   <span> loading....</span>
                              </div>
                         }
                         {
                              messageData.map(data => <div key={data._id}>
                                   <div className=' flex items-center mb-5'>
                                        <div>
                                             <img className=' w-8 h-8 rounded-full me-2' src={data.userPic} alt="" />
                                        </div>
                                        <div className=' bg-[#e8e3e3] rounded-[18px] mx-2'>
                                             <div className=' px-4 pb-2 '>
                                                  <p className=' pt-2'>{data.displayName}</p>
                                                  <h2 className=' text-[17px]'>{data.message}</h2>
                                             </div>
                                        </div>
                                   </div>
                              </div>)
                         }
                    </div>

                    <div className=' absolute w-full bottom-[-10px]'>
                         <form onSubmit={handelFrom}>
                              <div>
                                   <div className=' mb-6 mx-auto' style={{width:'93%'}}>
                                        <div>
                                             <textarea name='message' placeholder="Write a public comment..." className="textarea textarea-bordered  w-full pe-[10%] rounded-[18px]" onChange={handleInput1Change}></textarea>
                                        </div>
                                        <div className=' absolute bottom-0 right-[0] lg:me-11 pb-8 me-7'>
                                             {
                                                  isButtonDisabled ? <button type="submit" className="  w-full text-[25px]" disabled={isButtonDisabled}><BiSolidSend /></button> : <button type="submit" className=" w-full text-[25px] text-[#3e9dc2]" disabled={isButtonDisabled}><BiSolidSend /></button>
                                             }
                                        </div>
                                   </div>
                              </div>
                         </form>
                    </div>
               </div>
          </div>
     );
};

export default Comments;