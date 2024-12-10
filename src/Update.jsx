import React, { useState } from 'react'

export default function Update( {showEditBox, selectedUser, updateUser} ) {

    const [updatedName, setUpdatedName] = useState(selectedUser.name);
    const [updatedAge, setUpdatedAge] = useState(selectedUser.age); // selected data from app.jsx 

    const handleUpdate = () => {
        const updatedUser = {
            id: selectedUser.id,
            name: updatedName,
            age: Number(updatedAge)
        }
        updateUser(selectedUser.id, updatedUser);
        showEditBox("hide");
    }

  return (
    <div className='card w-25 m-auto'>
        <input className='form-control' type="text" value={updatedName} onChange={(event) => {setUpdatedName(event.target.value)}}/>
        <input className='form-control' type="number" value={updatedAge} onChange={(event) => {setUpdatedAge(event.target.value)}}/>

        <div>
            <button className='btn btn-success m-1' onClick={(event) => {handleUpdate()}}>Update</button>
            <button onClick={(event) => {showEditBox("hide")}} className='btn btn-outline-danger m-1'>Cancel</button>
        </div>
    </div>
  )
}
