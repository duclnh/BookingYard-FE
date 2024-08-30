"use client"
import { Button, Label } from 'flowbite-react';
import React, { useState } from 'react'
import { IoIosCheckmarkCircleOutline, IoIosCloseCircleOutline } from 'react-icons/io';
import { TiDelete } from 'react-icons/ti';
import { Feature } from 'types';

type Props = {
    handlerSetFeature: Function;
    label?: string;
    name: string;
    features: Feature[];
    group?: boolean
}

export default function NewFeature(props: Props) {
    const [error, setError] = useState<string | undefined>()
    const [textFeature, setTextFeature] = useState<string>('')

    const handlerAddFeature = () => {
        let text = textFeature.trim().toLowerCase();
        if (text) {
            let exit = props.features.find(x => x.title.trim().toLowerCase() === text);
            if (exit) {
                setError('Tính năng này đã có')
            } else {
                if (props.group) {
                    props.handlerSetFeature(props.name, [...props.features, { title: textFeature.trim(), isEnable: true }]);
                } else {
                    props.handlerSetFeature([...props.features, { title: textFeature.trim(), isEnable: true }]);
                }
                setTextFeature('');
                setError('')
            }
        } else {
            setError('Vui lòng nhập tính năng')
        }
    };

    const handlerRemoveFeature = (index: number) => {
        if (props.group) {
            props.handlerSetFeature(props.name, props.features.filter((_, i) => i !== index));
        } else {
            props.handlerSetFeature(props.features.filter((_, i) => i !== index));
        }
        setTextFeature('')
    };
    const handleClick = (indexChange: number) => {
        if (props.group) return
        const oldFeature = [...props.features]
        const findFeature = oldFeature.find((_, index) => index == indexChange)
        if (findFeature) {
            findFeature.isEnable = !findFeature.isEnable
        }
        props.handlerSetFeature(oldFeature);
    };
    return (
        <div>
            {props.label && (
                <Label htmlFor={props.name} value={props.label} />
            )}
            <div className='mt-1'>
                {props.features.map((feature, index) => (
                    <div key={index} className='relative group hover:cursor-pointer'>
                        <div onClick={() => handleClick(index)}>
                            <div className='flex items-center mb-5 border p-2'>
                                {feature.isEnable ? (
                                    <IoIosCheckmarkCircleOutline className='text-green-400 mt-0.5' size={20} />
                                ) : (
                                    <IoIosCloseCircleOutline className='text-red-600 mt-0.5' size={20} />
                                )}
                                <div className='ml-3'>{feature.title}</div>
                            </div>
                        </div>
                        <TiDelete onClick={() => handlerRemoveFeature(index)} size={25} className='text-red-500 absolute -top-2 -right-2 hidden group-hover:block' />
                    </div>
                ))}
            </div>
            <div className='mt-2 flex'>
                <input name={props.name} value={textFeature} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTextFeature(e?.target.value)} className='border rounded-md px-3' />
                <Button onClick={handlerAddFeature} size='sm' type='button'>Thêm</Button>
            </div>
            {
                error && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">{error}</p>
                )
            }
        </div>

    )
}
