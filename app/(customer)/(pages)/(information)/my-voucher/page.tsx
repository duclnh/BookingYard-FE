'use client'
import { useAppSelector } from '@hooks/hooks';
import { Button } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { TbBasketDiscount, TbClockBolt, TbClockCancel, TbClockCheck } from 'react-icons/tb';
import { TiThSmall } from 'react-icons/ti';
import qs from "query-string";
import { getCollectVoucher } from '@services/voucherService';
import toast from 'react-hot-toast';
import { CollectVoucher, PageResult } from 'types';
import { EmptyList } from '@components/index';

export default function MyVoucher() {
  const user = useAppSelector(state => state.user.value)
  const [currentSelect, setCurrentSelect] = useState<string>('all');
  const [currentPageSize, setCurrentPageSize] = useState<number>(5);
  const [collectVouchers, setCollectVouchers] = useState<PageResult<CollectVoucher> | undefined>(undefined)

  const url = qs.stringifyUrl({
    url: "", query: {
      "search": "",
      "currentPage": 1,
      "pageSize": currentPageSize,
      "type": currentSelect,
    }
  });
  useEffect(() => {
    getCollectVoucher(user?.id, url)
      .then(x => {
        if (x.status === 200) {
          return x.data
        } else {
          toast.error("Lỗi lấy mã giảm giá ")
        }
      })
      .then((collectVouchers: PageResult<CollectVoucher>) => {
        setCollectVouchers(collectVouchers)
      })
      .catch(() => toast.error("Lỗi hệ thống"))
  }, [currentPageSize, currentSelect])

  const handleScroll = (e: any) => {
    const bottom = Math.floor(e.target.scrollHeight - e.target.scrollTop) === e.target.clientHeight;
    if (bottom) {
      setCurrentPageSize(prev => prev + 5);
    }
  };
  return (
    <div className='col-span-3 rounded-2xl border'>
      <div className='text-2xl font-bold border-b-2 px-5 py-3'>
        Mã giảm giá
      </div>
      <div className="grid grid-cols-4 border">
        <div onClick={() => setCurrentSelect('all')} className={`mx-auto p-2 flex items-center justify-center hover:cursor-pointer ${currentSelect == 'all' ? 'text-blue-700 w-full border-b-2 border-b-blue-700' : ''}`}>
          <TiThSmall className='mx-2' /> Tất cả
        </div>
        <div onClick={() => setCurrentSelect('notused')} className={`mx-auto p-2 flex items-center justify-center hover:cursor-pointer ${currentSelect == 'notused' ? 'text-blue-700 w-full border-b-2 border-b-blue-700' : ''}`}>
          <TbClockBolt className='mx-2' />
          Chưa sử dụng
        </div>
        <div onClick={() => setCurrentSelect('used')} className={`mx-auto p-2 flex items-center justify-center hover:cursor-pointer ${currentSelect == 'used' ? 'text-blue-700 w-full border-b-2 border-b-blue-700' : ''}`}>
          <TbClockCheck className='mx-2' />
          Đã sử dụng
        </div>
        <div onClick={() => setCurrentSelect('outdate')} className={`mx-auto p-2 flex items-center justify-center hover:cursor-pointer ${currentSelect == 'outdate' ? 'text-blue-700 w-full border-b-2 border-b-blue-700' : ''}`}>
          <TbClockCancel className='mx-2' />
          Đã hết hạn
        </div>
      </div>
      <div className='p-5 space-y-4 max-h-[630px] overflow-y-auto' onScroll={handleScroll}>
        {collectVouchers != undefined && collectVouchers.results.length > 0 ? collectVouchers.results.map((collectVoucher: CollectVoucher, index) => (
          <div key={index} className='rounded-lg border'>
            <div className='grid grid-cols-5 place-items-center gap-2 p-2'>
              <div className='col-span-0.5 p-5 w-full rounded-lg bg-gray-700 text-orange-500'>
                <p className='mb-2 text-lg text-center'>Fieldy</p>
                <TbBasketDiscount className='mx-auto' size={35} />
              </div>
              <div className='col-span-2 place-self-start ml-4'>
                <p className='text-xl font-bold mb-2'>{`Giảm ${collectVoucher.percentage}% ${collectVoucher.voucherName}`}</p>
                {collectVoucher.facilityName !== null ? <p className='font-semibold'>{collectVoucher.facilityName}</p> : <p className='font-semibold'>Tất cả các sân</p>}
                <p>Ngày bắt đầu: {collectVoucher.startDate}</p>
                <p>Ngày hết hạn {collectVoucher.endDate}</p>
              </div>
              <div className='col-span-1'>
                <p className='font-bold max-w-24 text-center'>{collectVoucher.sportName ? collectVoucher.sportName : 'Tất cả môn thể thao'}</p>
              </div>
              {!collectVoucher.isUsed && !collectVoucher.isOutDate && (
                <div className='col-span-1'>
                  <Button href={`facility/${collectVoucher.facilityID}`} type='button' className=''>Sử dụng</Button>
                </div>
              )}
              {collectVoucher.isUsed && (
                <div className='col-span-1 '>
                  <p className='bg-green-200 text-green-500 p-1 rounded-md text-center font-bold'>Đã sử dụng</p>
                </div>
              )}
              {!collectVoucher.isUsed && collectVoucher.isOutDate && (
                <div className='col-span-1'>
                  <p className='bg-red-200 text-red-500 p-1 rounded-md text-center font-bold'>Đã hết hạn</p>
                </div>
              )}
            </div>
          </div>
        )) : <>
          <EmptyList />
        </>}
      </div>
    </div>
  )
}
