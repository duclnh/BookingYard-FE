"use client"
import React from 'react'
import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import Link from 'next/link';
import { useSession } from 'next-auth/react';


function Header() {
  const { data: session } = useSession();
  return (
    <header className='sticky top-0 z-50 bg-white items-center shadow-md'>
      <Navbar className='lg:mx-36' fluid rounded>
        <Navbar.Brand href="/">
          <img className='h-14' src={"assets/images/logo.png"} alt='logo' />
        </Navbar.Brand>
        <div className="flex flex-row items-center gap-4 md:order-2">
          <p>{session?.user.name}</p>
          {session?.user ?
            <Avatar className='cursor-pointer' img={session?.user.imageUrl || "assets/images/avatar-default.jpg"} alt={session?.user.name} rounded />
            :
            <Link href="/signin">
              <Button className='text-lg focus:ring-transparent'>Đăng nhập</Button>
            </Link>}
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link className='text-lg font-semibold' href="/" active>
            Trang chủ
          </Navbar.Link>
          <Navbar.Link className='text-lg font-semibold' href="#">Đặt sân</Navbar.Link>
          <Navbar.Link className='text-lg font-semibold' href="#">Pricing</Navbar.Link>
          <Navbar.Link className='text-lg font-semibold' href="#">Contact</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </header>
  )
}
export default Header;
