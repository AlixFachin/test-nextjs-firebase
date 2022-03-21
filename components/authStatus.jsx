import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react';

import styles from '../styles/sidebar.module.css';

import LoginDialog from './loginDialog';

import { firebaseAuth } from '../firebase/clientApp';

export default function AuthStatus() {
    const [ currentUser, setCurrentUser ] = useState(null);
    const [ isLoginDialogVisible, setLoginDialogVisibility ] = useState(false);
    const [ statusMessage, setStatusMessage ] = useState('');

    useEffect(() => {

        onAuthStateChanged(firebaseAuth, user => {
            if (user) {
                // User is signed in...
                setCurrentUser(user);
            } else {
                // User is signed out...
                setCurrentUser('');
            }
        })
    }, [])

    const showLoginDialog = () => {
        setLoginDialogVisibility(true);
    }

    const hideLoginDialog = () => {
        setLoginDialogVisibility(false);
    }

    const logOut = () => [
        firebaseAuth.signOut()
        .then(() => {
            setStatusMessage('logout OK!');
        })
        .catch(error => {
            setStatusMessage(`Logout failed! ${error.message}`);
        })
    ]


    let buttonContent;
    if (currentUser) {
        buttonContent = <><p>{ currentUser.email }</p><button type="button" onClick={ logOut }>Logout</button> </>;
    } else {
        buttonContent = <><p>Not Logged!</p><button onClick={ showLoginDialog }> Login </button> </>
    }

    return (
        <div className={ styles.sidebox }>
            { statusMessage !== '' ? <div> { statusMessage } </div> : '' }
            <div>{ buttonContent } </div>
            { isLoginDialogVisible ? <LoginDialog auth={ firebaseAuth } hideDialog={ hideLoginDialog } />  : '' }
        </div>
    );
}