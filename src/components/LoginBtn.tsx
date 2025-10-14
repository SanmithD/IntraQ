"use client";

import { signIn, signOut, useSession } from 'next-auth/react';

function LoginBtn() {
    const { data: session } = useSession();
    if(!session?.user){
        return(
            <button onClick={()=>signIn("google")} className='border px-4 py-2' >Login with Google</button>
        )
    }
  return (
    <button onClick={()=>signOut()} className='rounded-md px-4 py-2 bg-red-500 hover:bg-red-800 active:animate-ping cursor-pointer'>Log out</button>
  )
}

export default LoginBtn