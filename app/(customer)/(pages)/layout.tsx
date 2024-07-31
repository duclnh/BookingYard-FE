
import FooterComponent from '@components/Footer/Footer'
import Header from '@components/Header/Header'
import { ChatBox } from '@components/index'
import Link from 'next/link'
import React from 'react'
import { IoIosArrowDropup } from 'react-icons/io'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <ChatBox />
      <Link href="#top" className='fixed bottom-5 right-5 text-orange-500'>
        <IoIosArrowDropup size={40} />
      </Link>
      <FooterComponent />
    </>
  )
}
