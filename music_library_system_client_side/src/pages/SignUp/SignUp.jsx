import { Link, useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { FcGoogle } from 'react-icons/fc'
import { useContext, useEffect, useRef, useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { AuthContext } from '../../providers/AuthProvider'
import { TbFidgetSpinner } from 'react-icons/tb'
import { saveUser } from '../../api/auth'
import Stats from 'stats.js';


const generateRandomColor = () => Math.floor(Math.random() * 16777215).toString(16);

const SignUp = () => {

  const {
    loading,
    setLoading,
    signInWithGoogle,
    createUser,
    updateUserProfile,
  } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordIcon, setPasswordIcon] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
    setPasswordIcon(!passwordIcon)
  };

  const [conformPasswordIcon, setConformPasswordIcon] = useState(false)
  const [conformPasswordShown, setConformPasswordShown] = useState(false);
  const toggleConformPassword = () => {
    setConformPasswordShown(!conformPasswordShown);
    setConformPasswordIcon(!conformPasswordIcon)
  }

  // Handle user registration
  const handleSubmit = event => {

    event.preventDefault()
    const form = event.target
    const name = form?.name.value
    const email = form?.email.value
    const password = form?.password.value
    const conformPassword = form?.conformPassword.value
    setLoading(true)
    if (password !== conformPassword) {
      setLoading(false)
      toast.error("Don't mach this password")
      return
    }


    // Image Upload
    const image = form?.image.files[0]
    const formData = new FormData()
    formData.append('image', image)

    if (name && email && password && image) {
      const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY
        }`
      fetch(url, {
        method: 'POST',
        body: formData,
      })
        .then(res => res.json())
        .then(imageData => {
          const imageUrl = imageData.data.display_url
          createUser(email, password)
            .then(result => {
              updateUserProfile(name, imageUrl)
                .then(() => {
                  // save user to db
                  saveUser(result.user, password)
                  toast.success('SignUp successful')
                  navigate(from, { replace: true })
                })
                .catch(err => {
                  setLoading(false)
                  toast.error(err.message)
                })
            })
            .catch(err => {
              setLoading(false)
              toast.error(err.message)
            })
        })
        .catch(err => {
          setLoading(false)
          toast.error(err.message)
        })
    }
    else {
      toast.error('Please fill up this all form')
    }

    return
  }

  // Handle google signin
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(result => {
        // save user to db
        saveUser(result.user)
        toast.success('SignUp successful')
        navigate(from, { replace: true })
      })
      .catch(err => {
        setLoading(false)
        toast.error(err.message)
      })
  }


  // background part start 
  const countParticlesRef = useRef(null);

  useEffect(() => {
    const loadParticlesJS = async () => {
      // Load particles.js script dynamically
      const particlesScript = document.createElement('script');
      particlesScript.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
      particlesScript.async = true;
      document.body.appendChild(particlesScript);

      // Wait for the script to load before calling particlesJS
      await new Promise(resolve => particlesScript.onload = resolve);

      // particlesJS is now defined
      particlesJS('particles-js', {
        "particles": {
          "number": {
            "value": 80,
            "density": {
              "enable": true,
              "value_area": 800
            }
          },
          "color": {
            "value": "#ffffff"
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 0,
              "color": "#000000"
            },
            "polygon": {
              "nb_sides": 5
            },
            "image": {
              "src": "img/github.svg",
              "width": 100,
              "height": 100
            }
          },
          "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
              "enable": false,
              "speed": 1,
              "opacity_min": 0.1,
              "sync": false
            }
          },
          "size": {
            "value": 5,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 40,
              "size_min": 0.1,
              "sync": false
            }
          },
          "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 6,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "repulse"
            },
            "onclick": {
              "enable": true,
              "mode": "push"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 400,
              "line_linked": {
                "opacity": 1
              }
            },
            "bubble": {
              "distance": 400,
              "size": 40,
              "duration": 2,
              "opacity": 8,
              "speed": 3
            },
            "repulse": {
              "distance": 200
            },
            "push": {
              "particles_nb": 4
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": true,
        "config_demo": {
          "hide_card": false,
          "background_color": "#b61924",
          "background_image": "",
          "background_position": "50% 50%",
          "background_repeat": "no-repeat",
          "background_size": "cover"
        }
      });
    };

    loadParticlesJS();

    var stats, update;
    stats = new Stats();

    update = function () {
      stats.begin();
      stats.end();
      // Check if countParticlesRef.current is defined before setting innerText
      const particlesArrayLength = (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS && window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) ? window.pJSDom[0].pJS.particles.array.length : 0;

      if (countParticlesRef.current) {
        countParticlesRef.current.innerText = particlesArrayLength;
      }
      requestAnimationFrame(update);
    };
    // Use querySelector to find the element and update the ref
    countParticlesRef.current = document.querySelector('.js-count-particles');
    requestAnimationFrame(update);
    return () => {
      // Cleanup function if needed
    };
  }, []);
  // background part end

  return (
    <div className=' relative'>

      <div id="particles-js" style={{
        background: `linear-gradient(to left, #${generateRandomColor()}, #${generateRandomColor()})`,
        height: '100vh',
      }}>
      </div>
      
      <div className=' absolute w-full h-full top-4' style={{
        bottom: '0px'
      }} >

        <div className='fdb-block bg-transparent flex justify-center items-center my-3' >
          <div className='flex flex-col lg:w-2/5 w-11/12 p-5 rounded-md sm:p-8 bg-gray-100 text-gray-900'>
            <div className=' px-3'>
              <div className='mb-5 text-center'>
                <h1 className='mb-2 animate-text bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent font-black text-xl w-full lg:leading-tight sm:text-4xl lg:text-5xl lg:max-w-2xl' >Sign Up</h1>
                <p className='text-lg text-gray-400 font-bold'>Welcome to Sign Up AirCNC</p>
              </div>
              <form
                onSubmit={handleSubmit}
                noValidate=''
                action=''
                className='space-y-6 ng-untouched ng-pristine ng-valid'
              >
                <div className='space-y-4'>
                  <div>
                    <div className=' relative '>
                      <input
                        required
                        type='text'
                        name='name'
                        id='name'
                        placeholder='Enter Your Name Here'
                        className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                        data-temp-mail-org='0'
                      />
                    </div>

                  </div>
                  <div>
                    <div className=' relative '>
                      <label htmlFor='image' className='block mb-2 text-sm'>
                        Select Image:
                      </label>
                      <input
                        type='file'
                        id='image'
                        name='image'
                        accept='image/*'
                      />
                    </div>

                  </div>
                  <div>
                    <div className='flex justify-between'>
                    </div>
                    <div className=' relative my-2'>
                      <input
                        type='email'
                        name='email'
                        id='email'
                        required
                        placeholder='Enter Your Email Here'
                        className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                        data-temp-mail-org='0'
                      />
                    </div>
                  </div>

                  <div>
                    <div className='flex justify-between'>
                    </div>
                    <div className=' relative my-2'>
                      <input
                        type={passwordShown ? "text" : "password"}
                        name='password'
                        id='password'
                        required
                        placeholder='Enter Your Password'
                        className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                      />
                      <div className=' absolute end-4 top-3'>
                        <p className=' text-lg' onClick={togglePassword} >{
                          passwordIcon ? <AiFillEye /> : <AiFillEyeInvisible />
                        }</p>
                      </div>


                    </div>
                  </div>

                  <div>
                    <div className='flex justify-between'>
                      {/* <label htmlFor='password' className='text-sm mb-2'>
                      Conform Password
                    </label> */}
                    </div>
                    <div className=' relative '>
                      <input
                        type={conformPasswordShown ? "text" : "password"}
                        name='conformPassword'
                        id='conformPassword'
                        required
                        placeholder='Enter Your Conform Password'
                        className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                      />
                      <div className=' absolute end-4 top-3'>
                        <p className=' text-lg' onClick={toggleConformPassword} >{
                          conformPasswordShown ? <AiFillEye /> : <AiFillEyeInvisible />
                        }</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className=' relative'>
                    <button
                      type='submit'
                      className='bg-rose-500 w-full rounded-md py-3 text-white'
                    >
                      {loading ? (
                        <TbFidgetSpinner className='m-auto animate-spin' size={24} />
                      ) : (
                        'Continue'
                      )}
                    </button>
                  </div>
                </div>
              </form>
              <div className='flex items-center pt-4 space-x-1'>
                <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                <p className='px-3 text-sm dark:text-gray-400'>
                  Signup with social accounts
                </p>
                <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
              </div>
              <div className=' relative'>
                <div
                  onClick={handleGoogleSignIn}
                  className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'
                >
                  <FcGoogle size={32} />

                  <p>Continue with Google</p>
                </div>
              </div>
              <div className=' relative'>
                <p className='px-6 text-sm text-center text-gray-400'>
                  Already have an account?{' '}
                  <Link
                    to='/login'
                    className='hover:underline hover:text-rose-500 text-gray-600'
                  >
                    Login
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
