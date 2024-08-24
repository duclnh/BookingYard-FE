'use client';
import React, { useEffect, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useController, UseControllerProps } from 'react-hook-form';
import { Label } from 'flowbite-react';

type Props = {
  className: string;
  label: string;
  showLabel?: boolean;
} & UseControllerProps;

export default function TextEditor(props: Props) {
  const { fieldState, field } = useController({ ...props, defaultValue: "" });
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const container = document.getElementById('editor');

      if (container !== null && !container.classList.contains('ql-container')) {
        const options = {
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
              ['blockquote', 'code-block'],
              ['link', 'image', 'video', 'formula'],

              [{ 'header': 1 }, { 'header': 2 }],               // custom button values
              [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
              [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
              [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
              [{ 'direction': 'rtl' }],                         // text direction

              [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

              [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
              [{ 'font': [] }],
              [{ 'align': [] }],

              ['clean']                                         // remove formatting button
            ],
          },
          placeholder: 'Mô tả chi tiết về sân...',
          theme: 'snow'
        };
        const quillInstance = new Quill(container, options)

        quillInstance.on('text-change', () => {
          const content = quillInstance.getSemanticHTML();
          field.onChange(content);
        });

      } else if (container === null) {
        console.error('Editor container not found!');
      }
    }
  }, []);
  return (
    <>
      <Label className='hover:cursor-pointer' htmlFor='editor' value={props.label} />
      <div className={props.className} id='editor' />
      {fieldState.invalid && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">Vui lòng nhập mô tả sân</p>
      )}
    </>
  );
}
