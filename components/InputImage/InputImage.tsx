"use client"
import { Label } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { TiDelete } from 'react-icons/ti';

type Props = {
    label?: string,
    name: string,
    multiple?: boolean
    value: File | File[] | undefined
    setFile: Function,
    required?: string,
}

export default function InputImage(props: Props) {
    const [imageSources, setImageSources] = useState<string[]>([]);
    const [isInput, setIsInput] = useState<boolean | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (props.value === undefined) {
            setImageSources([]);
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
        }
    }, [props.value])
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const files = event.target.files
            if (props.multiple) {
                const imageArray = Array.from(files).map((file) => {
                    props.setFile((prevFile: File[]) => [...prevFile, file])
                    return URL.createObjectURL(file)
                }
                );
                setImageSources(imageArray);
            } else {
                if (files[0]) {
                    setImageSources([URL.createObjectURL(files[0])]);
                    props.setFile(files[0])
                }
            }
            setIsInput(true)
        }
    };

    const handlerRemoveImage = (indexRemove: number) => {
        if (props.multiple) {
            setImageSources(imageSources.filter((value: string, index: number) => index != indexRemove))
            props.setFile((prevFile: File[]) => prevFile.filter((_, index) => index != indexRemove))
        } else {
            props.setFile(undefined)
            setImageSources([])
        }
        if (imageSources.length - 1 <= 0) {
            setIsInput(false)
        }
    }
    const error = 'border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500'
    const success = 'border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100 dark:focus:border-green-500 dark:focus:ring-green-500'
    return (
        <div>
            {props.label && (
                <Label className='hover:cursor-pointer' htmlFor={props.name} value={props.label} />
            )}
            <div className="flex">
                <div className="relative w-full">
                    <input multiple={props.multiple} ref={fileInputRef} onChange={handleFileChange}
                        className={`block w-full overflow-hidden rounded-lg border disabled:cursor-not-allowed 
                        disabled:opacity-50 text-sm ${isInput != null && props.required ? isInput ? success
                                : error : ''}`}
                        id={props.name}
                        type="file"
                    />
                </div>
            </div>
            {isInput != null && !isInput && props.required && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">{props.required}</p>
            )}
            <div className='mt-4 space-y-4'>
                {imageSources.length > 0 && imageSources.map((image: string, index: number) => (
                    <div key={index} className='relative group hover:cursor-pointer p-1 border'>
                        <div className='min-w-fit'>
                            <img src={image} alt={props.label} className="h-48 w-auto object-contain" />
                            <TiDelete size={25} onClick={() => handlerRemoveImage(index)} className='text-red-500 absolute -top-2.5 -right-2.5 hidden group-hover:block z-10' />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
