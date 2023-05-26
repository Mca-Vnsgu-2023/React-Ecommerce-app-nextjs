import Login from '@/components/UserLogin/Login'
import MainLayout from '@/layout/MainLayout'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const UserLogin = () => {

  const router = useRouter();

  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("Token")
    if (token != null) {
      setIsLogin(true)
      router.push('/')
    }
  },[isLogin])


  return (
    <div>
      <MainLayout>
        {isLogin == false &&
          <Login />
        }
      </MainLayout>
    </div>
  )
}

export default UserLogin