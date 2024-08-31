"use client"
import { FileInput, Label } from 'flowbite-react'
import React, { useState } from 'react'
import { useController, UseControllerProps } from 'react-hook-form';

type Props = {
    label?: string,
    multiple?: boolean
    getState: Function
} & UseControllerProps

export default function InputImage(props: Props) {
    const { fieldState, field } = useController({ ...props, defaultValue: "" });
    const [imageSrc, setImageSrc] = useState(null);

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                setImageSrc(e.target?.result || '');
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <div>
            {props.label && (
                <Label className='hover:cursor-pointer' htmlFor={props.name} value={props.label} />
            )}
            <FileInput
                {...field}
                name={props.name}
                onInput={handleFileChange}
                id={props.name}
                helperText={`${props.getState(props.name)?.error ? fieldState.error?.message : ''}`}
                color={
                    props.getState(props.name)?.error ? "failure" : !props.getState(props.name).isDirty ? "" : "success"
                }
            />
            <div>
                {imageSrc && (
                    <div>
                        <img src={imageSrc} alt={props.label} className="mt-4 h-48 w-auto object-contain" />
                    </div>
                )}
            </div>
        </div>
    )
}
