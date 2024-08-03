"use client"
import React from 'react'
import { Avatar, Button, Dropdown, MegaMenu, Navbar } from "flowbite-react";
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { FaRegUser } from 'react-icons/fa';
import { TiTicket } from 'react-icons/ti';
import { CiLock } from 'react-icons/ci';
import { MdLogout } from 'react-icons/md';


function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();
  return (
    <header id='top' className='pt-8 px-5 top-0 z-50 items-center'>
      <Navbar className='lg:mx-14 fluid rounded'>
        <Navbar.Brand href="/">
          <img height={60} width={60} className='mr-5 sm:mr-20' src={"assets/images/logo.png"} alt='logo' />
        </Navbar.Brand>
        <div className="flex flex-row items-center gap-4 md:order-2">
          <p>{session?.user.name}</p>
          {true ?
            <Dropdown
              label={
                <>
                  <Avatar id='avatar' className='hidden md:block' size="md" img={session?.user.imageUrl || "assets/images/avatar-default.png"} alt={session?.user.name} rounded /> 
                </>
              }
              arrowIcon={false}
              inline
            >
              <Dropdown.Item href='/profile'>
                <FaRegUser className='mr-2' />
                Hồ sơ
              </Dropdown.Item>
              <Dropdown.Item href='/my-booking'>
                <TiTicket className='mr-2' />
                Đặt lịch của tôi
              </Dropdown.Item>
              <Dropdown.Item href='change-password'>
                <CiLock className='mr-2' />
                Đổi mật khẩu
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href='/sign-in'>
                <MdLogout className='mr-2' />
                Đăng xuất
              </Dropdown.Item>
            </Dropdown>
            :
            <Link href="/sign-in" className='lg:visible md:visible invisible'>
              <Button className='text-lg font-semiBold h-10 w-[164px] focus:ring-transparent'>ĐĂNG NHẬP</Button>
            </Link>}
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link className='text-lg font-semibold navbar-link' href="/" active={pathname == "/"}>
            TRANG CHỦ
          </Navbar.Link>
          <Navbar.Link className='text-lg font-semibold navbar-link' href="/booking" active={pathname == "/booking"}>ĐẶT LỊCH HẸN</Navbar.Link>
          <Navbar.Link className='text-lg font-semibold navbar-link' href="/partner" active={pathname == "/partner"}>ĐỐI TÁC</Navbar.Link>
          <Navbar.Link className='text-lg font-semibold navbar-link' href="/contact" active={pathname == "/contact"}>LIÊN HỆ</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </header>
  )
}
export default Header;
