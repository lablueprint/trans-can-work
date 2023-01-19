import { useState } from 'react';
import { doc, setDoc } from "firebase/firestore";
import firebase from '../firebase';
var db = firebase

const AddUser = () => {
    const [navEmail, setNavEmail] = useState('');
    const [navName, setNavName] = useState('');
    const [seekEmail, setSeekEmail] = useState('');
    const [seekName, setSeekName] = useState('');
    const [adminEmail, setAdminEmail] = useState('');
    const [adminName, setAdminName] = useState('');

    const handleChangeNavEmail = (event) => {
        setNavEmail(event.target.value);
    }
    const handleChangeNavName = (event) => {
        setNavName(event.target.value);
    }
    const handleChangeSeekEmail = (event) => {
        setSeekEmail(event.target.value);
    }
    const handleChangeSeekName = (event) => {
        setSeekName(event.target.value);
    }
    const handleChangeAdminEmail = (event) => {
        setAdminEmail(event.target.value);
    }
    const handleChangeAdminName = (event) => {
        setAdminName(event.target.value);
    }

    const addNavigator = async (event) => {
        event.preventDefault();
        await setDoc(doc(db, "navigators", navEmail), {
            name: navName,
        }).then(function () {
            console.log(`saved navigator`);
        }).catch(function (err) {
            alert(err.stack);
        });
    }

    const addSeeker = async (event) => {
        event.preventDefault();
        await setDoc(doc(db, "job seekers", seekEmail), {
            name: seekName,
        }).then(function () {
            console.log(`saved job seeker`);
        }).catch(function (err) {
            alert(err.stack);
        });
    }

    const addAdmin = async (event) => {
        event.preventDefault();
        await setDoc(doc(db, "admin", adminEmail), {
            name: adminName,
        }).then(function () {
            console.log(`saved navigator`);
        }).catch(function (err) {
            alert(err.stack);
        });
    }

    return (
        <section>
            <div>
                <h1>Add Navigator</h1>
                <form onSubmit={addNavigator}>
                    <input
                        type="text"
                        placeholder="email"
                        value={navEmail}
                        onChange={handleChangeNavEmail}
                    />
                    <input
                        type="text"
                        placeholder="name"
                        value={navName}
                        onChange={handleChangeNavName}
                    />
                    <button type="submit">Add</button>
                </form>
            </div>
            <div>
                <h1>Add Job Seeker</h1>
                <form onSubmit={addSeeker}>
                    <input
                        type="text"
                        placeholder="email"
                        value={seekEmail}
                        onChange={handleChangeSeekEmail}
                    />
                    <input
                        type="text"
                        placeholder="name"
                        value={seekName}
                        onChange={handleChangeSeekName}
                    />
                    <button type="submit">Add</button>
                </form>
            </div>
            <div>
                <h1>Add Admin</h1>
                <form onSubmit={addAdmin}>
                    <input
                        type="text"
                        placeholder="email"
                        value={adminEmail}
                        onChange={handleChangeAdminEmail}
                    />
                    <input
                        type="text"
                        placeholder="name"
                        value={adminName}
                        onChange={handleChangeAdminName}
                    />
                    <button type="submit">Add</button>
                </form>
            </div>
        </section>
    );
}

export default AddUser;