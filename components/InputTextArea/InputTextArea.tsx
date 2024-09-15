"use client"
import { Label, Textarea } from 'flowbite-react';
import React from 'react'
import { useController, UseControllerProps } from 'react-hook-form'

type Props = {
    label?: string,
    type?: string,
    showLabel?: boolean,
    placeholder?: string | "",
    row: number
} & UseControllerProps

export default function InputTextArea(props: Props) {
    const { fieldState, field } = useController({ ...props, defaultValue: "" });
    return (
        <div>
            {props.label && (
                <div className='mb-0.5'>
                    <Label className='hover:cursor-pointer' htmlFor={field.name} value={props.label} />
                </div>
            )}
            <Textarea
                {...props}
                {...field}
                id={field.name}
                helperText={fieldState.error?.message}
                color={
                    fieldState?.error ? "failure" : !fieldState.isDirty ? "" : "success"
                }
                placeholder={props.placeholder}
                rows={props.row}
            />
        </div>
    )
}
