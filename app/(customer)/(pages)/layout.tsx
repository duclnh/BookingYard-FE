
import BackToTop from '@components/BackToTop/BackToTop'
import FooterComponent from '@components/Footer/Footer'
import Header from '@components/Header/Header'
import { ChatBox } from '@components/index'
import React from 'react'

export default function CustomerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
