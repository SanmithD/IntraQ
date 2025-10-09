"use client";

import { signIn, useSession } from 'next-auth/react';

function LoginBtn() {
    const { data: session } = useSession();
    if(!session?.user){
        return(
            <button onClick={()=>signIn()} className='border px-4 py-2' >Login with Google</button>
        )
    }
  return
}

export default LoginBtn