"use client"
import { Label, TextInput } from 'flowbite-react';
import React, { useState } from 'react'
import { UseControllerProps, useController } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

type Props = {
    label?: string,
    type?: string,
    showLabel?: boolean,
    onChange?: Function,
    row?: boolean,
    placeholder?: string | "",
    value?: string,
    readOnly?: boolean
} & UseControllerProps

export default function Input(props: Props) {
    const [show, setShow] = useState(false)
    const { fieldState, field } = useController({ ...props, defaultValue: props.value || '' });
    return (
        <div className={`${props.row ? 'flex items-center' : ''}`}>
            {props.label && (
                <div className={`${props.row ? 'mr-2' : 'mb-0.5'}`}>
                    <Label className='hover:cursor-pointer' htmlFor={field.name} value={props.label} />
                </div>
            )}

            {props.type == 'password' ? (
                <div className='relative'>
                    <TextInput
                        {...props}
                        {...field}
                        id={field.name}
                        type={show ? 'text' : 'password'}
                        placeholder={props.placeholder}
                        helperText={fieldState.error?.message}
                        color={
                            fieldState?.error ? "failure" : !fieldState.isDirty ? "" : "success"
                        }
                    />
                    <div onClick={() => setShow(!show)} className='absolute top-3.5 right-2 hover:cursor-pointer'>
                        {show ? <FaRegEyeSlash /> : <FaRegEye />}
                    </div>
                </div>
            ) : (
                <div>
                    <TextInput
                        {...props}
                        {...field}
                        onInput={(e) => {
                            if (props.onChange) {
                                field.onChange(e.currentTarget.value)
                                props.onChange()
                            }
                        }}
                        id={field.name}
                        type={props.type || ''}
                        placeholder={props.placeholder}
                        helperText={fieldState.error?.message}
                        color={
                            fieldState?.error ? "failure" : !fieldState.isDirty ? "" : "success"
                        }
                    />
                </div>
            )}
        </div>
    )
}
