import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [users, setUsers] = useState([])
  useEffect(()=>{
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUsers(data))
  },[])

  const handleAddUser = event =>{
    event.preventDefault()
    const from = event.target
    const name = from.name.value 
    const email = from.email.value 
    const user = {name,email}
    fetch('http://localhost:5000/users', {
      method:'post',
      headers:{
        'content-type' : 'applications/json'
      },
      body: JSON.stringify(user)
  })
  .then(res => res.json())
  .then(data =>{
    const newuser = [...users ,data]
    setUsers(newuser)
  })
  from.reset()
  }
  console.log(users)

  return (
    <>
    <form onSubmit={handleAddUser}>
      <input type="text" name="name" id="" />
      <br />
      <input type="email" name="email" id="" />
      <input type="submit" value="add user" />
    </form>
      
      <h1>clinet site running </h1>
      <h1>clinet site data in {users.length} </h1>
      {
        users.map((user, index) => <p key={index} > 
        {index} : {user.name} : {user.email}
        
        </p>)
      }
      
      
    </>
  )
}

export default App
