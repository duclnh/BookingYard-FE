"use client"
import BackToTop from '@components/BackToTop/BackToTop'
import FooterComponent from '@components/Footer/Footer'
import Header from '@components/Header/Header'
import { ChatBox, Loading } from '@components/index'
import React, { useEffect, useState } from 'react'
import { getUser } from '@services/userService'
import { setUser } from '@hooks/userStore'
import { User } from 'types'
import toast from 'react-hot-toast'
import { signOut, useSession } from 'next-auth/react'
import { useAppDispatch, useAppSelector } from '@hooks/hooks'

export default function CustomerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session, status: status } = useSession();
  const user = useAppSelector(state => state.user.value)
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (session?.user && user == undefined) {
      if (session?.user.isVerification) {
        window.location.href = "/verify"
      }
      getUser(session.user.userID)
        .then(x => {
          if (x.status === 200) {
            return x.data
          } else if (x.status === 401) {
            toast.error("Đã hết phiên đăng nhập")
            signOut({ callbackUrl: "/sign-in" });
          } else {
            toast.error("Lỗi lấy thông tin người dùng")
          }
        })
        .then((u: User) => dispatch(setUser(u)))
        .catch(() => toast.error("Lỗi hệ thống"))
    }

  }, [status])
  if (status === "loading" || (session?.user != null && user === undefined)) {
    return <Loading />
  }

  return (
    <>
      <Header />
      {children}
      <ChatBox />
      <BackToTop />
      <FooterComponent />
    </>
  )
}
