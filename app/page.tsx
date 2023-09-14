'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Main() {

  const router = useRouter();

  useEffect(() => {
    router.push('/signin');
  }, [router]); // The empty dependency array ensures this effect only runs once, similar to componentDidMount

  function routerOut() {
    router.push('/signin');
  }
  
  return (
    <>
      <button onClick={routerOut}></button>
    </>
  )
}
