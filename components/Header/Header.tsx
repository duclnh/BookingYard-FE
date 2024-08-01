"use client"
import React from 'react'
import { Avatar, Button, Dropdown, MegaMenu, Navbar } from "flowbite-react";
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';


function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();
  return (
    <header id='top' className='pt-8 px-5 top-0 z-50 items-center'>
      <Navbar className='lg:mx-14 fluid rounded'>
        <Navbar.Brand href="/">
          <img className='h-20 mr-5 sm:mr-20' src={"assets/images/logo.png"} alt='logo' />
        </Navbar.Brand>
        <div className="flex flex-row items-center gap-4 md:order-2">
          <p>{session?.user.name}</p>
          {true ?
            <Dropdown
              label={
                <>
                  <Avatar className='hidden md:block' size="md" img={session?.user.imageUrl || "assets/images/avatar-default.png"} alt={session?.user.name} rounded />
                  <p className='mx-3'>dsadsdadsadasdsaasddadsadsa</p>
                </>
              }
              arrowIcon={true}
              inline
            >
              <Dropdown.Header>
                <span className="block text-sm">Bonnie Green</span>
                <span className="block truncate text-sm font-medium">name@flowbite.com</span>
              </Dropdown.Header>
              <Dropdown.Item>Dashboard</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Earnings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href='/signin'>Đăng xuất</Dropdown.Item>
            </Dropdown>
            :
            <Link href="/signin" className='lg:visible md:visible invisible'>
              <Button className='text-lg font-semiBold h-10 w-[164px] focus:ring-transparent'>ĐĂNG NHẬP</Button>
            </Link>}
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link className='text-lg font-semibold navbar-link' href="/" active={pathname == "/"}>
            TRANG CHỦ
          </Navbar.Link>
          <Navbar.Link className='text-lg font-semibold navbar-link' href="/partner" active={pathname == "/partner"}>ĐỐI TÁC</Navbar.Link>
          <Navbar.Link className='text-lg font-semibold navbar-link' href="/contact" active={pathname == "/contact"}>LIÊN HỆ</Navbar.Link>
          {/* <Navbar.Link className='mt-1'>
            <MegaMenu.Dropdown toggle={<></>}>
              <ul className="grid grid-cols-2">
                <div className="space-y-4 p-4">
                  <li>
                    <a href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                      Library
                    </a>
                  </li>
                </div>
              </ul>
            </MegaMenu.Dropdown>
          </Navbar.Link> */}
        </Navbar.Collapse>
      </Navbar>
    </header>
  )
}
export default Header;
