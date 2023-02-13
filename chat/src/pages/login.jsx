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
      const res = await axios.post('https://pwarley.pythonanywhere.com/token/', {
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
        setGoto(<div><Link href="/">Clique aqui para ir ao chat</Link></div>)
      }
      
      // setInput('')
    } catch (error) {
      console.log(error)
    }
  }


  return(
    <main className={styles.main}>

      <p>Um pequeno projeto para praticar <br></br> Django Rest Framework Juntamente com NextJS  </p>  

      <div className={styles.login_form}>
        <h1>Login</h1>
        user: "krn" pass: "krn123"
        <form onSubmit={handleSubmit}>
          <div className={styles.login_field}>
            <input
              type="text"
              value={username}
              placeholder="Usuário"
              onChange={e => setUsername(e.target.value)}
            />

          </div>
          
          <div className={styles.login_field}>
            <input
              type="password"
              value={password}
              placeholder="Senha"

              onChange={e => setPassword(e.target.value)}
            />
          </div>
          
          <button type="submit">
            Login
          </button>
          {goto}

        </form>
      </div>
      

    </main>
  )
}

export default Login 