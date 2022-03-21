import styles from '../styles/Home.module.css'

import LoginHeader from '../components/header'
import PageFooter from '../components/footer'
import AuthStatus from '../components/authStatus'

export default function Home() {
  
  return ( 
    <>
      <LoginHeader />
      <main>
        <AuthStatus />
        <p> This is the main content</p>
      </main>
      <PageFooter />
    </>
  )
}
