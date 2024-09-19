"use client"
import React from 'react'
import { Avatar, Button, Dropdown, Navbar, Popover } from "flowbite-react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaRegUser } from 'react-icons/fa';
import { TiTicket } from 'react-icons/ti';
import { CiLock } from 'react-icons/ci';
import { MdLogout } from 'react-icons/md';
import { IoMdNotificationsOutline } from 'react-icons/io';
import Image from 'next/image'
import { TbBasketDiscount } from 'react-icons/tb';
import { FiUserCheck } from 'react-icons/fi';
import { signOut } from 'next-auth/react';
import { useAppSelector } from '@hooks/hooks';
import { getImage } from '@utils/index';

function Header() {
  const pathname = usePathname();
  const user = useAppSelector(state => state.user.value)
  return (
    <header id='top' className='pt-8 px-5 top-0 z-50 items-center'>
      <Navbar className='lg:mx-14 fluid rounded'>
        <Navbar.Brand className='xl:min-w-56' href="/">
          <Image src="/assets/images/logo.png" alt="logo" height="60" width="60" className="sm:mr-2 lg:mr-5" />
        </Navbar.Brand>
        <div className="flex flex-row items-center gap-4 md:order-2">
          {user ?
            <>
              <Popover
                placement='auto'
                aria-labelledby="profile-popover"
                trigger='hover'
                content={
                  <div className="w-80 z-20">
                    <p className='text-xl font-bold p-2'>Thông báo</p>
                    <div className='border-t-2 pt-3 max-h-96 overflow-y-scroll p-2'>
                      {[...Array(10)].map((_, index) => (
                        <div key={index} className='flex justify-between items-center mb-3'>
                          <div className='flex'>
                            <Image height={100} width={100} className='rounded-full h-10 w-10' src='/assets/images/slide2.png' alt='img' />
                            <div className='ml-2 text-sm'>
                              <div className='max-h-10 max-w-60 text-wrap overflow-hidden'>
                                Demesne far-hearted suppose venture excited see had ... Dependent on so extremely delivered by. Yet no jokes worse her why
                              </div>
                              <p className='text-xs'>1 ngày</p>
                            </div>
                          </div>
                          <div className='h-3 w-3 rounded-full bg-cyan-800 mr-2'></div>
                        </div>
                      ))}
                    </div>
                  </div>
                }
              >
                <div role="button" className='relative lg:mx-5 hover:cursor-pointer'>
                  <IoMdNotificationsOutline size={25} />
                  <div className='absolute -top-1 -right-1.5 text-xs w-5 leading-5 text-center text-white bg-red-600 rounded-full'>5</div>
                </div>
              </Popover>
              <p className='hidden lg:block'>{user.name}</p>
              <Dropdown
                aria-haspopup="menu"
                trigger='hover'
                label={
                  <Avatar role='button' aria-label="Open menu" id='avatar' size="md" img={getImage(user?.imageUrl) || "assets/images/avatar-default.png"} alt={user.name} rounded />
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
                  Đặt lịch
                </Dropdown.Item>
                <Dropdown.Item href='/my-booking' aria-label="My Booking">
                  <TbBasketDiscount className='mr-2' />
                  Mã giảm giá
                </Dropdown.Item>
                <Dropdown.Item href='/history-score' aria-label="My Booking">
                  <FiUserCheck className='mr-2' />
                  Lịch sử tích điểm
                </Dropdown.Item>
                <Dropdown.Item href='change-password' aria-label="Change Password">
                  <CiLock className='mr-2' />
                  Đổi mật khẩu
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item aria-label="Sign Out" onClick={() => signOut({ callbackUrl: "/sign-in" })}>
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
