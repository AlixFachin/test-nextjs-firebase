import { setDoc, doc } from 'firebase/firestore';
import { useState, useRef } from 'react';
import styles from '../styles/userSettings.module.css';

import { firebaseStore } from '../firebase/clientApp';

function UserSettings( { currentUser }) {

    const basicProperties = [ 'email', 'displayName', 'phoneNumber' ];

    const [ userNickname, setUserNickname ] = useState('');
    const [ errorMsg, setErrorMsg ] = useState('');

    const nicknameInput = useRef(null);

    // Function to send to FireStore database the value of the current user
    const validateInput = async () => {
        if (!currentUser) {
            return;
        }
        
        try {
            const docRef = await setDoc(doc(firebaseStore, "users", currentUser.uid), {
                nickname: nicknameInput.current.value,
            });
            console.log('Document added successfully in the database!')

        } catch (e) {
            setErrorMsg('Error Adding document:' + e);
        }

    };

    if (currentUser && basicProperties instanceof Array) {
        console.log(basicProperties.map(x => currentUser[x]).join(','));
    }

    if (!currentUser) {
        return <p>No user logged!</p>;
    }

    return (
        <div className={styles.mainPanel}>
            <div className={styles.dataPanel}>
                { basicProperties.map((userProperty, index) => (
                    <div className={styles.dataRow} key={index}>
                        <span>{userProperty}: </span>
                        <span>{ currentUser[userProperty] }</span>
                    </div>
                )) }                
            </div>
            <div className={styles.dataPanel}>
                <form className={ styles.inputForm } >
                    <p className={styles.formTitle}>Some user data</p>
                    { errorMsg !== '' ? <p className={ styles.formError }> { errorMsg } </p> : '' } 
                    <label> 
                        <p>Nickname:</p>
                        <input ref={ nicknameInput } name="nickname"/>
                    </label>
                    <div className={ styles.buttonRow }>
                        <button type="button" onClick={ validateInput }>Submit</button>
                    </div>
                </form>
            </div>
        </div>);
}

export default UserSettings;