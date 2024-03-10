import React from 'react'
import { auth } from "@/auth";
import HomeProfile from './HomeProfile';



export default async function Layout() {
  const session = await auth()
  if(!session || !session.user){
    return <div>loading...</div>
  }
  
  return (
    <>
      <HomeProfile 
      id={session.user.id}
      name={session.user.name}
      email={session.user.email}
      />
    </>
  )
}
