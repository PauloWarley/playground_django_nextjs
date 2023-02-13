import React, { useState, useEffect } from 'react'
import axios from 'axios'
import cookie from 'cookie'
import jwt_decode from 'jwt-decode';


import styles from '../styles/Home.module.css' 

const ChatPage = ({bearerToken}) => {
  const [ messages, setMessages ] = useState([])
  const [ input, setInput ] = useState('')
  const [ modal, setModal ] = useState(<></>)

  const user_id = jwt_decode(bearerToken).user_id

  const loginModal = () => {
    return (
      <div style={{ 
        position: "absolute",
        left: "20%",
        top: "10%",
        zIndex:99,
        width: "60%",
        height: "30%",
        backgroundColor: "black"
      }}>

      </div>
    )
  }


  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const res = await axios.post('http://pwarley.pythonanywhere.com/', {
        phrase: input,
        user: user_id
      }, {
        headers: {
          'Authorization': `Bearer ${getCookie('bearerToken')}`
          // 'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc2MjQ5ODEwLCJpYXQiOjE2NzYyMTY5MzksImp0aSI6Ijg1NTRmYjIwMzhmMzQyYjVhMzE4YmYzMzliMWI0YmZhIiwidXNlcl9pZCI6MX0.nkZc7Q7nRcj5ZPf6pj3Bx0QUmEm-5EqimeMfetZ01HU`
        }
      })
      setInput('')
    } catch (error) {
      // setModal(loginModal())

    }
  }

  useEffect(() => {
    try {
      axios.get('http://pwarley.pythonanywhere.com/?format=json',
      {
        headers: {
          'Authorization': `Bearer ${getCookie('bearerToken')}`
          // 'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc2MjQ5ODEwLCJpYXQiOjE2NzYyMTY5MzksImp0aSI6Ijg1NTRmYjIwMzhmMzQyYjVhMzE4YmYzMzliMWI0YmZhIiwidXNlcl9pZCI6MX0.nkZc7Q7nRcj5ZPf6pj3Bx0QUmEm-5EqimeMfetZ01HU`
        }
      }
      )
      .then((response) => {
        setMessages(response.data)
      })
    } catch (error) {
      // setModal(loginModal())
      
    }

  }, [input])

  function getCookie(name) {
    const cookies = cookie.parse(document.cookie)

    if(cookies[name]){
      return cookies[name]
    }

    // setModal(loginModal())

  }

  return (
    <main className={styles.main}>
      {modal}
      
      <section className={styles.messages}>
        <ul>
        { messages?.map((message, index) => (
            <li key={index}>
              <div className={message.user==user_id?styles.message_client:styles.message_server}>
                <div>
                  <div className={styles.icon_profile_chat}></div>
                  <span className={styles.name_profile_chat}>{message?.user?.username}</span>
                </div>
                <div className={styles.message}>
                  <span>{message?.phrase}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>

      </section>
      
      <form onSubmit={handleSubmit} className={styles.form_chat}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button type="submit">
          <svg width="40" height="40" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    </main>
  )
}

ChatPage.getInitialProps = async (ctx) => {

    // while (!ctx.req){}

    const cookies = cookie.parse(ctx.req.headers.cookie || '')
    const bearerToken = cookies['bearerToken']

      if (ctx.res && !bearerToken) {
        ctx.res.writeHead(302, {
          Location: '/login'
        })
        ctx.res.end()
      } else {
        return { bearerToken: bearerToken }
      }
  }

export default ChatPage
