'use client'
import React, { useEffect, useState } from 'react'
import { GrSubtractCircle } from 'react-icons/gr';
import { SiTicktick } from 'react-icons/si';
import { TiThSmall } from 'react-icons/ti';
import Image from 'next/image'
import { useAppSelector } from '@hooks/hooks';
import { getHistoryScoreUser } from '@services/userService';
import toast from 'react-hot-toast';
import { HistoryPoint, PageResult } from 'types';
import { EmptyList } from '@components/index';
import qs from "query-string";

export default function HistoryScore() {
  const user = useAppSelector(state => state.user.value)
  const [currentPageSize, setCurrentPageSize] = useState(5);
  const [currentSelect, setSelect] = useState<string>('all');
  const [historyPoints, setHistoryPoints] = useState<PageResult<HistoryPoint> | undefined>(undefined)

  const url = qs.stringifyUrl({
    url: "", query: {
      "search": "",
      "currentPage": 1,
      "pageSize": currentPageSize,
      "type": currentSelect,
    }
  });
  const handleScroll = (e: any) => {
    const bottom = Math.floor(e.target.scrollHeight - e.target.scrollTop) === e.target.clientHeight;
    if (bottom) {
      setCurrentPageSize(prev => prev + 5);
    }
  };
  useEffect(() => {
    if (user !== undefined) {
      getHistoryScoreUser(user.id, url)
        .then(x => {
          if (x.status === 200) {
            console.log(x.data)
            return x.data
          } else {
            toast.error("Lỗi lấy lịch sử điểm người dùng")
          }
        })
        .then((h: PageResult<HistoryPoint>) => setHistoryPoints(h))
        .catch(() => toast.error("Lỗi hệ thống"))
    }

  }, [currentPageSize, currentSelect])
  return (
    <div className='col-span-3 rounded-2xl border'>
      <div className='text-2xl font-bold border-b-2 px-5 py-3'>
        Lịch sử tích điểm
      </div>
      <div className="grid grid-cols-3 border">
        <div onClick={() => setSelect("all")} className={`mx-auto p-2 flex items-center justify-center hover:cursor-pointer ${currentSelect == "all" ? 'text-blue-700 w-full border-b-2 border-b-blue-700' : ''}`}>
          <TiThSmall className='mx-2' /> Tất cả
        </div>
        <div onClick={() => setSelect("positive")} className={`mx-auto p-2 flex items-center justify-center hover:cursor-pointer ${currentSelect == "positive" ? 'text-blue-700 w-full border-b-2 border-b-blue-700' : ''}`}>
          <SiTicktick className='mx-2' />
          Tích điểm
        </div>
        <div onClick={() => setSelect("negative")} className={`mx-auto p-2 flex items-center justify-center hover:cursor-pointer ${currentSelect == "negative" ? 'text-blue-700 w-full border-b-2 border-b-blue-700' : ''}`}>
          <GrSubtractCircle className='mx-2' />
          Dùng điểm
        </div>
      </div>
      <div className='p-5 space-y-4 max-h-[630px] overflow-y-auto' onScroll={handleScroll}>
        {historyPoints != undefined && historyPoints?.results.length > 0 ? historyPoints?.results.map((history: HistoryPoint, index) => (
          <div key={index} className='rounded-lg border'>
            <div className='grid grid-cols-4 place-items-center gap-2 p-2'>
              <Image height={80} width={80} src="/assets/images/logo.png" alt='img' className='col-span-1 rounded-xl' />
              <div className='col-span-2 place-self-start ml-4 py-5'>
                <p className='text-xl font-bold mb-5'>Fieldy</p>
                {history.point > 0 ? <p>{`Ngày tích điểm: ${history.createdAt}`}</p>
                  : <p>{`Ngày sử dụng: ${history.createdAt}`}</p>}
              </div>
              <div className='col-span-1'>
                {history.point > 0 ? <p className='text-2xl font-medium text-green-600'>+ {` ${history.point}`}</p>
                  : <p className='text-2xl font-medium text-red-600'>{` ${history.point}`}</p>}
              </div>
            </div>
          </div>
        )) : <>
          <EmptyList />
        </>}
      </div>
    </div>
  )
}
