"use client";
import { Avatar, Breadcrumb, CustomFlowbiteTheme, Dropdown, Navbar, Popover, Sidebar } from 'flowbite-react';
import React, { useEffect, useMemo, useState } from 'react'
import { HiHome } from 'react-icons/hi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import Image from 'next/image';
import { FaList, FaRegUser } from 'react-icons/fa';
import { CiLock } from 'react-icons/ci';
import { MdLogout, MdOutlineFeedback, MdOutlineReportGmailerrorred, MdSportsKabaddi } from 'react-icons/md';
import { TbBasketDiscount, TbPackage } from 'react-icons/tb';
import { RiCalendarScheduleLine, RiDashboard2Line } from 'react-icons/ri';
import { PiBuildingOfficeBold, PiHeadCircuitBold, PiUsersBold, PiUsersThreeBold } from 'react-icons/pi';
import { GrSchedules } from 'react-icons/gr';
import { Loading } from '@components/index';
import { signOut, useSession } from 'next-auth/react';
import { useAppDispatch, useAppSelector } from '@hooks/hooks';
import { getUser } from '@services/userService';
import toast from 'react-hot-toast';

import { setUser } from '@hooks/userStore';
import { User } from 'types';

export default function ManagementLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session, status: status } = useSession()
  const user = useAppSelector(state => state.user.value)
  const [collapse, setCollapse] = useState<boolean>();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (session?.user && user == undefined) {
      getUser(session.user.userID)
        .then(x => {
          if (x.status === 200) {
            return x.data
          } else if (x.status === 401) {
            toast.error("Đã hết phiên đăng nhập")
            signOut({ callbackUrl: "/admin/sign-in" });
          } else {
            toast.error("Lỗi lấy thông tin người dùng")
          }
        })
        .then((u: User) => dispatch(setUser(u)))
        .catch(() => toast.error("Lỗi hệ thống"))
    }
    setCollapse(localStorage.getItem("collapse") === "true");
  }, [status])
  if (user === undefined) {
    return <Loading />
  }
  const customTheme: CustomFlowbiteTheme['sidebar'] = {
    root: {
      inner: `h-full overflow-y-auto overflow-x-hidden rounded px-2 border-b-2 border-r-2 bg-white py-4 dark:bg-gray-800`
    }
  }
  const handlerCollapseSidebar = (collapse: boolean) => {
    setCollapse(collapse);
    localStorage.setItem("collapse", `${collapse}`)
  }
  return (
    <div className='flex h-full w-full'>
      <Sidebar theme={customTheme} className={`${!collapse ? 'w-80' : ''}`} collapseBehavior='collapse' collapsed={collapse} aria-label="Sidebar with multi-level dropdown example">
        {!collapse ? (
          <Sidebar.Items className='p-3 mb-6 relative select-none'>
            <Image height={30} width={60} className='mx-auto' src={"/assets/images/logo.png"} alt='img' />
            <div className='mt-3 text-center'>
              <p className='text-xl font-bold'>Công Ty Fieldy</p>
            </div>
            <FaList onClick={() => handlerCollapseSidebar(true)} size={18} className='absolute top-0 right-0 hover:cursor-pointer hover:scale-110' />
          </Sidebar.Items>
        ) : (
          <Sidebar.Items>
            <FaList onClick={() => handlerCollapseSidebar(false)} size={18} className='mx-auto  mb-4 hover:cursor-pointer hover:scale-110' />
          </Sidebar.Items>
        )}
        <Sidebar.Items className={`${!collapse ? 'min-h-[544px] max-h-[545px]' : 'min-h-[659px] max-h-[660px]'} hover:overflow-y-auto overflow-y-hidden overflow-x-hidden`}>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="/admin/company/dashboard" icon={RiDashboard2Line}>
              Tổng quan
            </Sidebar.Item>
            <Sidebar.Item href="/admin/company/booking" icon={GrSchedules}>
              Đặt lịch
            </Sidebar.Item>
            {/* <Sidebar.Item href="/admin/company/schedule" icon={RiCalendarScheduleLine}>
              Lịch trình
            </Sidebar.Item> */}
            <Sidebar.Collapse icon={PiBuildingOfficeBold} label="Cơ sở">
              <Sidebar.Item href="/admin/company/facility">Danh sách</Sidebar.Item>
              <Sidebar.Item href="/admin/company/facility/create">Tạo mới</Sidebar.Item>
            </Sidebar.Collapse>
            <Sidebar.Collapse icon={TbBasketDiscount} label="Voucher">
              <Sidebar.Item href="/admin/company/voucher">Danh sách</Sidebar.Item>
              <Sidebar.Item href="/admin/company/voucher/create">Tạo mới</Sidebar.Item>
            </Sidebar.Collapse>
            <Sidebar.Item href="/admin/company/customer" icon={PiUsersBold}>
              Khách hàng
            </Sidebar.Item>
            {/* <Sidebar.Collapse icon={PiUsersThreeBold} label="Nhân viên">
              <Sidebar.Item href="/admin/company/staff">Danh sách</Sidebar.Item>
              <Sidebar.Item href="/admin/company/staff/create">Tạo mới</Sidebar.Item>
            </Sidebar.Collapse> */}
            {/* <Sidebar.Collapse icon={TbPackage} label="Gói sân">
              <Sidebar.Item href="/admin/company/package">Danh sách gói</Sidebar.Item>
              <Sidebar.Item href="/admin/company/package/register">Danh sách đăng kí</Sidebar.Item>
              <Sidebar.Item href="/admin/company/package/create">Tạo mới</Sidebar.Item>
            </Sidebar.Collapse> */}
            {/* <Sidebar.Collapse icon={MdSportsKabaddi} label="Thể thao">
              <Sidebar.Item href="/admin/company/sport">Danh sách</Sidebar.Item>
              <Sidebar.Item href="/admin/company/sport/create">Tạo mới</Sidebar.Item>
            </Sidebar.Collapse> */}
            <Sidebar.Item href="/admin/company/support" icon={PiHeadCircuitBold}>
              Hỗ trợ
            </Sidebar.Item>
            <Sidebar.Item href="/admin/company/feedback" icon={MdOutlineFeedback}>
              Đánh giá
            </Sidebar.Item>
            <Sidebar.Item href="/admin/company/report" icon={MdOutlineReportGmailerrorred}>
              Báo cáo
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
        <Sidebar.Items className='border-t-2'>
          <Sidebar.ItemGroup className='!mt-2'>
            <Sidebar.Item onClick={async () => await signOut({ redirect: true, callbackUrl: "/admin/sign-in" })} icon={MdLogout}>
              Đăng xuất
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      <div className='w-full'>
        <header id='top' className='border-b-2'>
          <div className='flex justify-between items-center mx-5'>
            <div>
              {/* <Breadcrumb aria-label="Default breadcrumb example">
                <Breadcrumb.Item href="#" icon={HiHome}>
                  Home
                </Breadcrumb.Item>
              </Breadcrumb> */}
            </div>
            <Navbar className=''>
              <div className="flex flex-row items-center gap-4 md:order-2">
                <Popover
                  placement='bottom-start'
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
                <Dropdown
                  className='z-40'
                  aria-haspopup="menu"
                  trigger='hover'
                  label={
                    <>
                      <Avatar role='button' aria-label="Open menu" id='avatar' size="md" img={user.imageUrl || "/assets/images/avatar-default.png"} alt={user.name} rounded />
                      <div className='ml-3 text-left'>
                        <p className='font-bold'>{user.name}</p>
                        <p className='text-xs'>{user.role === "Admin" && 'Quản trị viên' || user.role === "Staff" && 'Nhân viên'}</p>
                      </div>
                    </>
                  }
                  arrowIcon={false}
                  inline
                >
                  <Dropdown.Item href='/admin/company/profile' aria-label="Profile">
                    <FaRegUser className='mr-2' />
                    Hồ sơ
                  </Dropdown.Item>
                  <Dropdown.Item href='/admin/company/change-password' aria-label="Change Password">
                    <CiLock className='mr-2' />
                    Đổi mật khẩu
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={async () => await signOut({ redirect: true, callbackUrl: "/admin/sign-in" })} aria-label="Sign Out">
                    <MdLogout className='mr-2' />
                    Đăng xuất
                  </Dropdown.Item>
                </Dropdown>
                <Navbar.Toggle />
              </div>
            </Navbar>
          </div>
        </header>
        <div className='h-[714px] max-h-[715px] overflow-y-auto'>
          <div className='py-5 px-3 md:px-12'>{children}</div>
        </div>
      </div>
    </div >
  )
}
