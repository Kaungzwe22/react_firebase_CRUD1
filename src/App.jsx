
import { useEffect, useState } from 'react';
import {db} from './firebase-config';
import {collection, getDocs, addDoc, updateDoc, doc, deleteDoc} from 'firebase/firestore';

import React from 'react'
import "./App.css";
import Update from './Update';

export default function App() {

  const [users, setUsers] = useState([]); // to store and reuse data from firestore
  const usersCollectionRef = collection(db, "users"); // recieve data from firebase-config.js which is exported

  // function to fetch data
  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef); // use getDocs bez data from firestore come from docs / check in console
    // console.log(data);
    setUsers(data.docs.map((docs) => ({  ...docs.data(), id:docs.id }))); // docs -> document / store in useState to reuse 
  };

  useEffect(() => { // use useEffect to fetch data from fireStore when the page is loaded
    getUsers();
  }, [])

  // adding new users
  const [newName, setNewName] = useState(""); // to add new data 
  const [newAge, setNewAge] = useState(0);
  const [newId, setNewId] = useState(0);

  const createUser = async () => { // adding new user    
    await addDoc(usersCollectionRef, {user_id: newId, name: newName, age: Number(newAge)});
    getUsers();
  }

  // upate user 
  const updateUser = async (id, updatedUser) => {

    const userDoc = doc(db,"users", id); // this will get id of the record from users db / id is autoGenerate in firestore for each record
    
    await updateDoc(userDoc, {
      name: updatedUser.name,
      age: updatedUser.age
    }); // id is from firestore doc and we will get data for UpdatedUser from Update.jsx
    getUsers();

  }
  
  // delete user
  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    getUsers();

  }

  // to show edit box and pass userdata
  const [ selectedUser, setSelectedUser ] = useState(null);
  const [ showBox, setShowBox] = useState(false);
  const showEditBox = (status,user ) => {
    setShowBox(status == "show" ? true: false) // setShowBox become true 
    setSelectedUser(user);
  }

  return (
    <div className='App'>
      <div>
        <input type="number" placeholder='Id...' onChange={(event) => {setNewId(event.target.value)}} />
        <input type="text" placeholder='Username...' onChange={(event) => {setNewName(event.target.value)}}/>
        <input type="number"  placeholder='Age...' onChange={(event) => {setNewAge(event.target.value)}}/>
        <button className='btn btn-success' onClick={(event) => {createUser()}}>Add User</button>
      </div>
     { showBox == 1 ? <Update showEditBox={showEditBox} selectedUser={selectedUser} updateUser={updateUser}/> : null} 
     {/* pass showEditBox as parameter to child component with same name  */}
      
        <div >
          <table className='table w-50 m-auto mt-3'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>

            {
              users.map((user) => {
                return( 
                <tr>
                  <td>{user.user_id}</td>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>
                    {/* <button className='btn btn-outline-primary mx-1' onClick={(event) => {updateUser(user.id, user.age)}}>Edit</button> */}
                    <button className='btn btn-outline-primary mx-1' onClick={(event) => {showEditBox("show", user)}}>Edit</button>
                    <button className='btn btn-danger mx-1' onClick={(event) => { deleteUser(user.id) }}>Delete</button>
                  </td>
                </tr>
                  )
                })
              }

            </tbody>
          </table>
        </div>
    </div>
  )
}
