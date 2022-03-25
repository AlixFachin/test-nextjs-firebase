import AuthStatus from "./authStatus";
import UserSettings from "./userSettings";

import styles from '../styles/sidebar.module.css';

export default function Sidebar({ setCurrentUser, currentUser }) {

    return (
        <aside className={ styles.sideBar }>
            <AuthStatus setCurrentUser={ setCurrentUser }/>
            <UserSettings currentUser={ currentUser }/>
        </aside>
    );
}