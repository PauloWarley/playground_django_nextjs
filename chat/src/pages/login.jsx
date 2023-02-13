import axios from "axios"
import { useState } from "react"
import cookie from 'cookie'
import Link from 'next/link'

import styles from "../styles/Login.module.css"
import { Router, useRouter } from "next/router"



const Login = () => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ goto, setGoto ] = useState('')

  const router = useRouter()

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const res = await axios.post('http://pwarley.pythonanywhere.com/token/', {
        "username": username,
        "password": password
      }, {
        headers: { 
        'Content-Type': 'application/json'
        }
      })

      if(res.status==200){
        console.log(res.data.access)
        document.cookie = cookie.serialize('bearerToken', res.data.access, { path: '/' });
        document.cookie = cookie.serialize('bearerTokenRefresh', res.data.refresh, { path: '/' });
        // router.push('/')
        setGoto(<Link href="/">Vá para o chat</Link>)
      }
      
      // setInput('')
    } catch (error) {
      console.log(error)
    }
  }


  return(
    <main>
      <form onSubmit={handleSubmit} >
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">
          <svg width="10" height="10" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_422_2)">
            <path d="M62.4251 0.574854C62.6977 0.84785 62.884 1.19491 62.961 1.57292C63.038 1.95093 63.0023 2.34324 62.8582 2.7011L39.9459 59.9799C39.744 60.4843 39.4068 60.9233 38.9715 61.2485C38.5362 61.5736 38.0196 61.7724 37.4786 61.8228C36.9376 61.8733 36.3932 61.7736 35.9052 61.5345C35.4173 61.2955 35.0047 60.9265 34.713 60.4682L22.1996 40.8004L2.53177 28.287C2.07234 27.9955 1.70234 27.5828 1.46262 27.0944C1.2229 26.606 1.12277 26.0609 1.17328 25.5191C1.22378 24.9774 1.42296 24.4602 1.74884 24.0245C2.07472 23.5888 2.51463 23.2516 3.02002 23.0501L60.2988 0.145667C60.6567 0.00160263 61.049 -0.0341488 61.427 0.0428537C61.805 0.119856 62.1521 0.306219 62.4251 0.578792V0.574854ZM26.1292 39.6506L37.0006 56.7315L55.6368 10.143L26.1292 39.6506ZM52.853 7.35917L6.26452 25.9954L23.3493 36.8629L52.853 7.35917Z" fill="white"/>
            </g>
            <defs>
            <clipPath id="clip0_422_2">
            <rect width="63" height="63" fill="white"/>
            </clipPath>
            </defs>
          </svg>
        </button>
      </form>

      {goto}

    </main>
  )
}

export default Login 