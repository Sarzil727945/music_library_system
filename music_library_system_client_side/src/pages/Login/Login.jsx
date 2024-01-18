import { Link, useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { FcGoogle } from 'react-icons/fc'
import { useContext, useEffect, useRef } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { AuthContext } from '../../providers/AuthProvider';
import { TbFidgetSpinner } from 'react-icons/tb';
import { useState } from 'react';
import { saveUser } from '../../api/users';

const Login = () => {
  const { loading, setLoading, signIn, signInWithGoogle, resetPassword } =
    useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/dashboard/my-dashboard'
  const emailRef = useRef()
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordIcon, setPasswordIcon] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
    setPasswordIcon(!passwordIcon)
  };

  // Handle submit
  const handleSubmit = event => {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value
    if (email && password) {
      signIn(email, password)
        .then(result => {
          toast.success('SignIn successful')
          navigate(from, { replace: true })
        })
        .catch(err => {
          setLoading(false)
          toast.error(err.message)
        })
    }
    else {
      toast.error('Please fill up this all form')
    }
  }

  // Handle google signin
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(result => {
        console.log(result.user)
        // save user to db
        saveUser(result.user)
        toast.success('SignIn successful')
        navigate(from, { replace: true })
      })
      .catch(err => {
        setLoading(false)
        toast.error(err.message)
      })
  }

  //   handle password reset
  const handleReset = () => {
    const email = emailRef.current.value

    resetPassword(email)
      .then(() => {
        toast.success('Please check your email for reset link')
        setLoading(false)
      })
      .catch(err => {
        setLoading(false)
        console.log(err.message)
        toast.error(err.message)
      })
  }


    useEffect(() => {
      const c = document.getElementById('c');
      let w = (c.width = window.innerWidth);
      let h = (c.height = window.innerHeight);
      const ctx = c.getContext('2d');

      const minDist = 11;
      const maxDist = 33;
      const initialWidth = 11;
      const maxLines = 111;
      const initialLines = 5;
      const speed = 5;

      let lines = [];
      let frame = 0;
      let timeSinceLast = 0;

      const dirs = [
          [0, 1],
          [1, 0],
          [0, -1],
          [-1, 0],
          [0.7, 0.7],
          [0.7, -0.7],
          [-0.7, 0.7],
          [-0.7, -0.7],
      ];

      const starter = {
          x: w / 2,
          y: h / 2,
          vx: 0,
          vy: 0,
          width: initialWidth,
      };

      function init() {
          lines = [];
          for (let i = 0; i < initialLines; ++i) lines.push(new Line(starter));
          ctx.fillStyle = '#222';
          ctx.fillRect(0, 0, w, h);
      }

      function getColor(x) {
          return `hsl( ${x / w * 360 + frame}, 80%, 50% )`;
      }

      function anim() {
          window.requestAnimationFrame(anim);
          ++frame;
          ctx.shadowBlur = 0;
          ctx.fillStyle = 'rgba(0,0,0,.02)';
          ctx.fillRect(0, 0, w, h);
          ctx.shadowBlur = 0.5;

          for (let i = 0; i < lines.length; ++i)
              if (lines[i].step()) {
                  lines.splice(i, 1);
                  --i;
              }

          ++timeSinceLast;

          if (lines.length < maxLines && timeSinceLast > 10 && Math.random() < 0.5) {
              timeSinceLast = 0;
              lines.push(new Line(starter));
              ctx.fillStyle = ctx.shadowColor = getColor(starter.x);
              ctx.beginPath();
              ctx.arc(starter.x, starter.y, initialWidth, 0, Math.PI * 2);
              ctx.fill();
          }
      }

      function Line(parent) {
          this.x = parent.x | 0;
          this.y = parent.y | 0;
          this.width = parent.width / 1.25;

          do {
              const dir = dirs[(Math.random() * dirs.length) | 0];
              this.vx = dir[0];
              this.vy = dir[1];
          } while (
              (this.vx === -parent.vx && this.vy === -parent.vy) ||
              (this.vx === parent.vx && this.vy === parent.vy)
          );

          this.vx *= speed;
          this.vy *= speed;

          this.dist = Math.random() * (maxDist - minDist) + minDist;
      }

      Line.prototype.step = function () {
          let dead = false;

          const prevX = this.x;
          const prevY = this.y;

          this.x += this.vx;
          this.y += this.vy;

          --this.dist;

          if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) dead = true;

          if (this.dist <= 0 && this.width > 1) {
              this.dist = Math.random() * (maxDist - minDist) + minDist;

              if (lines.length < maxLines) lines.push(new Line(this));
              if (lines.length < maxLines && Math.random() < 0.5) lines.push(new Line(this));

              if (Math.random() < 0.2) dead = true;
          }

          ctx.strokeStyle = ctx.shadowColor = getColor(this.x);
          ctx.beginPath();
          ctx.lineWidth = this.width;
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(prevX, prevY);
          ctx.stroke();

          if (dead) return true;
      };

      init();
      anim();

      window.addEventListener('resize', function () {
          w = c.width = window.innerWidth;
          h = c.height = window.innerHeight;
          starter.x = w / 2;
          starter.y = h / 2;

          init();
      });
  }, []);
  // background style end

  return (
    <div className=' relative'>
      <canvas id="c" style={{ width: "100%", height: '100% !important' }}>
      </canvas>

      <div className=' absolute w-full top-0'>
        <div className='flex justify-center items-center min-h-screen fdb-block bg-transparent'>
          <div className='flex flex-col lg:w-1/3 w-11/12 p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
            <div className='mb-8 text-center '>
              <h1 className='my-3 animate-text bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent font-black text-xl w-full lg:leading-tight sm:text-4xl lg:text-5xl lg:max-w-2xl'>Log In</h1>
              <p className='text-lg text-gray-400 font-bold'>
                Sign in to access your account
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              noValidate=''
              action=''
              className='space-y-6 ng-untouched ng-pristine ng-valid'
            >
              <div className='space-y-4'>
                <div>
                  <label htmlFor='email' className='block mb-2 text-sm'>
                    Email address
                  </label>
                  <input
                    ref={emailRef}
                    type='email'
                    name='email'
                    id='email'
                    required
                    placeholder='Enter Your Email Here'
                    className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                    data-temp-mail-org='0'
                  />
                </div>
                <div>
                  <div className='flex justify-between'>
                    <label htmlFor='password' className='text-sm mb-2'>
                      Password
                    </label>
                  </div>

                  <div className=' relative '>
                    <input
                      type={passwordShown ? "text" : "password"}
                      name='password'
                      id='password'
                      required
                      placeholder='*******'
                      className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                    />
                    <div className=' absolute end-4 top-3'>
                      <p className=' text-lg' onClick={togglePassword} >{
                        passwordIcon ? <AiFillEye /> : <AiFillEyeInvisible />
                      }</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
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
            </form>
            <div className='space-y-1'>
              <button
                onClick={handleReset}
                className='text-xs hover:underline hover:text-rose-500 text-gray-400 pt-2'
              >
                Forgot password?
              </button>
            </div>
            <div className='flex items-center pt-4 space-x-1'>
              <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
              <p className='px-3 text-sm dark:text-gray-400'>
                Login with social accounts
              </p>
              <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
            </div>
            <div
              onClick={handleGoogleSignIn}
              className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'
            >
              <FcGoogle size={32} />

              <p>Continue with Google</p>
            </div>
            <p className='px-6 text-sm text-center text-gray-400'>
              Don't have an account yet?{' '}
              <Link
                to='/'
                className='hover:underline hover:text-rose-500 text-gray-600'
              >
                Sign up
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
