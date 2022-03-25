import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react';

import styles from '../styles/authStatus.module.css';

import LoginDialog from './loginDialog';

import { firebaseAuth } from '../firebase/clientApp';

export default function AuthStatus( props ) {
    const [ currentUser, setCurrentUser ] = useState(null);
    const [ isLoginDialogVisible, setLoginDialogVisibility ] = useState(false);
    const [ statusMessage, setStatusMessage ] = useState('');

    const authChangedCallBack = (user) => {
            setCurrentUser(user? user : '');
            props.setCurrentUser(user? user : '');
    };

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, authChangedCallBack);
    }, []);

    function showLoginDialog() {
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
        buttonContent = (<><p>👋</p><button type="button" onClick={ logOut }>Logout</button> </>);
    } else {
        buttonContent = (<><p>🚫</p><button onClick={ showLoginDialog }> Login </button> </>);
    }

    return (
        <div>
            { statusMessage !== '' ? <div> { statusMessage } </div> : '' }
            <div className={ styles.authComponent }>{ buttonContent } </div>
            { isLoginDialogVisible ? <LoginDialog auth={ firebaseAuth } hideDialog={ hideLoginDialog } />  : '' }
        </div>
    );
}