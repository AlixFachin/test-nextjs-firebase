import { useState } from 'react'

import LoginHeader from '../components/header'
import PageFooter from '../components/footer'
import Sidebar from './sidebar';

export default function Main() {

    const [ currentUser, setCurrentUser ] = useState(null);

    return (
        <>
        <LoginHeader />
            <div className="app-container">                
                <Sidebar setCurrentUser={ setCurrentUser } currentUser={ currentUser }/>
                <main>
                    { currentUser ? <div>CURRENT USER</div> : '' }
                </main>
            </div>
        <PageFooter />
      </>
    );
}