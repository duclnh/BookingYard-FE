import { Label } from 'flowbite-react';
import React from 'react'
import DatePicker, { DateObject } from 'react-multi-date-picker'
import InputIcon from 'react-multi-date-picker/components/input_icon'
import Toolbar from 'react-multi-date-picker/plugins/toolbar';

type Props = {
  label?: string;
  name: string;
  minDate?: Date
  row?: string;
  labelClassName?: string;
  multiple: boolean;
  date?: Date
  handlerChange: Function;
}

export default function InputDate(props: Props) {
  const months = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"]
  const weekDays = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"]
  return (
    <div className={props.row}>
      {props.label && (
        <Label className={`hover:cursor-pointer ${props.labelClassName ? props.labelClassName : ''}`} htmlFor={props.name} value={props.label} />
      )}
      <DatePicker
        className='col-span-2 hover:cursor-pointer'
        onChange={(date: DateObject) => {
          if (date) {
            props.handlerChange(new Date(date.format("MM/DD/YYYY")))
          }
        }}
        id={props.name}
        type='button'
        format="DD/MM/YYYY"
        value={props.date}
        minDate={props.minDate}
        multiple={props.multiple}
        months={months}
        weekDays={weekDays}
        placeholder='Chọn ngày'
        calendarPosition='bottom-right'
        render={<InputIcon />}
        plugins={[
          <Toolbar
            position="bottom"
            names={{
              today: "Hôm nay",
              deselect: "Bỏ chọn",
              close: "Xong",
            }}

          />,
        ]}
      />

      {/* 
              picker multiple date
              <div className='grid grid-cols-3 sm:grid-cols-4 gap-2'>
                {[...Array(1)].map((_, index) => (
                  <div key={index} className='group/item p-1 text-sm w-full text-center border rounded-md hover:cursor-pointer relative'>
                    <p>04/08/2024</p>
                    <MdCancel className='absolute -top-1.5 -right-1.5 invisible group-hover/item:visible' />
                  </div>
                ))}
                <Tooltip
                  theme={customToolTipTheme}
                  trigger='hover'
                  placement='auto'
                  arrow
                  content={
                    <Calendar
                      minDate={new Date()}
                      months={months}
                      weekDays={weekDays}
                      plugins={[
                        <Toolbar
                          position="bottom"
                          names={{
                            today: "Hôm nay",
                            deselect: "Bỏ chọn",
                            close: "Xong",
                          }}
                        />,
                      ]}
                    />
                  }
                  style="light"
                >
                  <div className='p-1.5 w-7 text-sm text-center border rounded-md hover:cursor-pointer'>
                    <IoAddOutline size={15} />
                  </div>
                </Tooltip>
              </div> */}
    </div>
  )
}
