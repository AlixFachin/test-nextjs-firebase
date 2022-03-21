import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import styles from '../styles/login.module.css'

import { useState, useRef } from "react/cjs/react.development";

const googleProvider = new GoogleAuthProvider();

function LoginDialog( { auth, hideDialog }) {

    const [ loginOrRegister, setLoginOrRegister ] = useState('login');
    const [ errorMsg, setErrorMsg ] = useState('');

    const emailInput = useRef(null);
    const pwdInput = useRef(null);
    const newEmailInput = useRef(null);
    const newPwdInput = useRef(null);

    if (!auth) {
        console.error('auth object not properly defined!');
        return <div>Error! Pls look at the log</div>
    }

    const showRegister = () => {
        setErrorMsg('');
        setLoginOrRegister('register');
    }
 
    const showLogin = () => {
        setErrorMsg('');
        setLoginOrRegister('login');
    }

    const validateNewUser = event => {
        
        event.preventDefault();
        
        // need to insert some validation steps (email regexp)
        const newUserEmail = newEmailInput.current.value;
        const newUserPwd = newPwdInput.current.value;

        createUserWithEmailAndPassword(auth, newUserEmail, newUserPwd)
            .then( () => {
                // everything goes well - we can hide the form
                hideDialog();
            })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMsg(`Error ${errorCode} : ${errorMessage} `);
            });
    }

    const validateLogin = () => {
        // insert some validation
        const userEmail = emailInput.current.value;
        const userPwd = pwdInput.current.value;

        signInWithEmailAndPassword(auth, userEmail, userPwd)
            .then( () => {
                hideDialog();
            })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMsg(`Error ${errorCode} : ${errorMessage} `);
            })

    }

    const openGoogleAuth = () => {
        signInWithPopup(auth, googleProvider)
        .then(result => {
            setErrorMsg('Login success!');
            hideDialog();
        })
        .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMsg(`Error ${errorCode} : ${errorMessage} `);
        })
    }

    const loginContent = <>
            <form className={ styles.loginForm } onSubmit={ validateLogin } >
                <p className={styles.formTitle}>Login for returning User</p>
                { errorMsg !== '' ? <p className={ styles.formError }> { errorMsg } </p> : '' } 
                <label> 
                    <p>E-mail:</p>
                    <input ref={ emailInput } name="email" type="email" />
                </label>
                <label>
                    <p>Password:</p>
                    <input ref={ pwdInput } name="pwd" type="password" />
                </label>
                <div className={ styles.buttonRow }>
                    <button type="button" onClick={ hideDialog }>Cancel</button>
                    <button type="button" onClick={ validateLogin }>Submit</button>
                </div>
                <p>New to this place? <a className={ styles.flushLink } onClick={ showRegister }>Register</a></p>
            </form>
        </>;

const registerContent = <>
            <form className={ styles.registerForm } onSubmit={ validateNewUser } >
                <p className={styles.formTitle}>Register a new user</p>
                { errorMsg !== '' ? <p className={ styles.formError }>errorMsg</p> : '' } 
                <label> 
                    <p>E-mail:</p>
                    <input ref={ newEmailInput } name="email" type="email" />
                </label>
                <label>
                    <p>Password:</p>
                    <input ref={ newPwdInput } name="pwd" type="password" />
                </label>
                <div className={ styles.buttonRow }>
                    <button type="button" onClick={ hideDialog }>Cancel</button>
                    <button type="button" onClick={ validateNewUser }>Submit</button>
                </div>
                <p>Already registered? <a className={ styles.flushLink } onClick={ showLogin }>Log In</a></p>
            </form>            
    </>;


    return (
        <div className={ styles.wrapper }>
            <div className={ styles.dialogWrapper }>
                { loginOrRegister === 'login' ? loginContent : '' }
                { loginOrRegister === 'register' ? registerContent : '' }
                <div className="buttonRow">
                    <a onClick={ openGoogleAuth }>Google</a>
                </div>
            </div>
        </div>
        )
}

export default LoginDialog
