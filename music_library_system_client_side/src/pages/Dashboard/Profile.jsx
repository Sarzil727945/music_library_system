import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { imageUpload } from '../../api/utils';
import { getUsers, upDataUser } from '../../api/users';
import { TbFidgetSpinner } from 'react-icons/tb';
import bgImg from '../../../public/cover.jpg';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user } = useContext(AuthContext)
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [myInfo, setMyInfo] = useState()
  const [loading, setLoading] = useState(false)


  // profile image privew code start
  const profileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  // profile image privew code end

  // profile image privew code start
  const coverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  // profile image privew code end

  useEffect(() => {
    userDataGet()
  }, [])

  function userDataGet() {
    getUsers(user?.email)
      .then(d => {
        setMyInfo(d);
      })
  }


  const handelFrom = (event) => {
    event.preventDefault()
    setLoading(true);
    const from = event.target;
    const cover = from.cover.files[0];
    const profile = from.profile.files[0];
    const name = from.name.value;
    const email = from.email.value;

    imageUpload(cover)
      .then((data) => {
        const upDataCover = (data.data?.display_url || myInfo?.cover);
        imageUpload(profile)
          .then((data) => {
            const upDataProfile = (data.data?.display_url) || myInfo?.img;
            const upDataUserInfo = {
              cover: upDataCover,
              img: upDataProfile,
              name: name,
              email: email
            }
            upDataUser(user, upDataUserInfo)
          })
        setLoading(false)
        toast.success('Your Profile updated successfully')
      })

  }

  return (
    <>
      <form onSubmit={handelFrom}>
        <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="relative h-35 md:h-65">
            <img
              src={(coverImage || myInfo?.cover) || (bgImg)}
              alt="profile cover"
              className=" h-80 w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
            />
            <div className="absolute lg:bottom-3 bottom-64 z-10 lg:right-5 right-2">
              <label
                htmlFor="cover"
                className="flex cursor-pointer items-center justify-center gap-2 rounded bg-primary py-2 px-3 text-sm font-medium text-white hover:bg-opacity-80 xsm:px-5"
              >
                <input name="cover" id="cover" className="sr-only" type="file"
                  onChange={coverImageChange}
                />
                <span>
                  <svg
                    className="fill-current"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6.99992 5.83329C6.03342 5.83329 5.24992 6.61679 5.24992 7.58329C5.24992 8.54979 6.03342 9.33329 6.99992 9.33329C7.96642 9.33329 8.74992 8.54979 8.74992 7.58329C8.74992 6.61679 7.96642 5.83329 6.99992 5.83329ZM4.08325 7.58329C4.08325 5.97246 5.38909 4.66663 6.99992 4.66663C8.61075 4.66663 9.91659 5.97246 9.91659 7.58329C9.91659 9.19412 8.61075 10.5 6.99992 10.5C5.38909 10.5 4.08325 9.19412 4.08325 7.58329Z"
                      fill="white"
                    />
                  </svg>
                </span>
                <span>Edit</span>
              </label>
            </div>
          </div>
          <div className="avatar flex justify-center py-3 bottom-36">
            <div className=" w-60 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={profileImage || myInfo?.img} />
            </div>
          </div>
          <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
            <div className="relative mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
              <div className="relative drop-shadow-2">
                <label
                  htmlFor="profile"
                  className="absolute  left-[188px] top-[-205px] lg:left-[625px] flex h-[40px] w-[52px] cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90"
                >
                  <svg
                    className="fill-current"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                      fill=""
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
                      fill=""
                    />
                  </svg>
                  <input
                    name="profile"
                    id="profile"
                    className="sr-only"
                    type="file"
                    accept="image/*"
                    onChange={profileImageChange}
                  />
                </label>
              </div>
              <div className=' lg:flex lg:justify-center bottom-20 relative '>
                <div className=' lg:w-[33%] w-full'>
                  <input type="text" placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs"
                    name='name'
                    defaultValue={myInfo?.name}
                  />
                </div>
                <div className=' lg:w-[33%] w-full lg:mt-0 mt-8'>
                  <input type="text" placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs"
                    disabled
                    name='email'
                    defaultValue={user?.email}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className=' lg:absolute right-20 bottom-20'>
            <div className='text-center mt-[-40px] pb-10'>
              <button
                type='submit'
                className=' w-44 p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-rose-500 '
              >
                {loading ? (
                  <TbFidgetSpinner className='m-auto animate-spin' size={24} />
                ) : (
                  'Save & Continue'
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
export default Profile;

