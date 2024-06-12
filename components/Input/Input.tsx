"use client"
import { Label, TextInput } from 'flowbite-react';
import React, { useState } from 'react'
import { UseControllerProps, useController } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

type Props = {
    label: string,
    type?: string,
    showLabel?: boolean,
} & UseControllerProps

export default function Input(props: Props) {
    const [show, setShow] = useState(false)
    const { fieldState, field } = useController({ ...props, defaultValue: "" });
    return (
        <div>
            {props.label && (
                <div className='mb-0.5'>
                    <Label htmlFor={field.name} value={props.label} />
                </div>
            )}

            {props.type == 'password' ? (
                <div className='relative'>
                    <TextInput
                        {...props}
                        {...field}
                        id={field.name}
                        type={show ? 'text' : 'password'}
                        placeholder={props.label}
                        helperText={fieldState.error?.message}
                        color={
                            fieldState?.error ? "failure" : !fieldState.isDirty ? "" : "success"
                        }
                    />
                    <div onClick={() => setShow(!show)} className='absolute top-3.5 right-2 hover:cursor-pointer'>
                       {show ? <FaRegEyeSlash /> : <FaRegEye/> }
                    </div>
                </div>
            ) : (
                <TextInput
                    {...props}
                    {...field}
                    id={field.name}
                    type={props.type || ''}
                    placeholder={props.label}
                    helperText={fieldState.error?.message}
                    color={
                        fieldState?.error ? "failure" : !fieldState.isDirty ? "" : "success"
                    }
                />
            )}
        </div>
    )
}
