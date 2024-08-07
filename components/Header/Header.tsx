"use client"
import React from 'react'
import { Avatar, Button, Dropdown, Navbar, Popover } from "flowbite-react";
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { FaRegUser } from 'react-icons/fa';
import { TiTicket } from 'react-icons/ti';
import { CiLock } from 'react-icons/ci';
import { MdLogout } from 'react-icons/md';
import { IoMdNotificationsOutline } from 'react-icons/io';
import Image from 'next/image'

function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();
  return (
    <header id='top' className='pt-8 px-5 top-0 z-50 items-center'>
      <Navbar className='lg:mx-14 fluid rounded'>
        <Navbar.Brand href="/">
          <Image src="/assets/images/logo.png" alt="logo" height="60" width="60" className="sm:mr-2 lg:mr-5" />
        </Navbar.Brand>
        <div className="flex flex-row items-center gap-4 md:order-2">
          <p>{session?.user.name}</p>
          {true ?
            <>
              <Popover
                placement='bottom-start'
                aria-labelledby="profile-popover"
                trigger='hover'
                content={
                  <div className="w-64 p-3 z-20">
                    <div className="mb-2 flex items-center justify-between">
                      <a href="#">
                        <img
                          className="h-10 w-10 rounded-full"
                          src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                          alt="Jese Leos"
                        />
                      </a>
                      <div>
                        <button
                          type="button"
                          className="rounded-lg bg-blue-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Follow
                        </button>
                      </div>
                    </div>
                    <p id="profile-popover" className="text-base font-semibold leading-none text-gray-900 dark:text-white">
                      <a href="#">Jese Leos</a>
                    </p>
                    <p className="mb-3 text-sm font-normal">
                      <a href="#" className="hover:underline">
                        @jeseleos
                      </a>
                    </p>
                    <p className="mb-4 text-sm">
                      Open-source contributor. Building{' '}
                      <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">
                        flowbite.com
                      </a>
                      .
                    </p>
                    <ul className="flex text-sm">
                      <li className="me-2">
                        <a href="#" className="hover:underline">
                          <span className="font-semibold text-gray-900 dark:text-white">799</span>
                          <span>Following</span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="hover:underline">
                          <span className="font-semibold text-gray-900 dark:text-white">3,758</span>
                          <span>Followers</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                }
              >
                <div role="button" className='relative lg:mx-5 hover:cursor-pointer'>
                  <IoMdNotificationsOutline size={25} />
                  <div className='absolute -top-1 -right-1.5 text-xs w-5 leading-5 text-center text-white bg-red-600 rounded-full'>5</div>
                </div>
              </Popover>
              <Dropdown
                aria-haspopup="menu"
                trigger='hover'
                label={
                  <Avatar role='button' aria-label="Open menu" id='avatar' size="md" img={session?.user.imageUrl || "assets/images/avatar-default.png"} alt={session?.user.name} rounded />
                }
                arrowIcon={false}
                inline
              >
                <Dropdown.Item href='/profile' aria-label="Profile">
                  <FaRegUser className='mr-2' />
                  Hồ sơ
                </Dropdown.Item>
                <Dropdown.Item href='/my-booking' aria-label="My Booking">
                  <TiTicket className='mr-2' />
                  Đặt lịch của tôi
                </Dropdown.Item>
                <Dropdown.Item href='change-password' aria-label="Change Password">
                  <CiLock className='mr-2' />
                  Đổi mật khẩu
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href='/sign-in' aria-label="Sign Out">
                  <MdLogout className='mr-2' />
                  Đăng xuất
                </Dropdown.Item>
              </Dropdown>

            </>
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
