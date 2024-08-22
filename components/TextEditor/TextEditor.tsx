'use client'
import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useController, UseControllerProps } from 'react-hook-form';

type Props = {
  className: string;
  label: string,
  type?: string,
  showLabel?: boolean,
} & UseControllerProps

export default function TextEditor(props: Props) {
  const [show, setShow] = useState(false)
  const { fieldState, field } = useController({ ...props, defaultValue: "" });

  window.addEventListener("load", function () {
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
        placeholder: 'Compose an epic...',
        theme: 'snow'
      };
      const quill = new Quill(container, options);
    } else if (container === null) {
      console.error('Editor container not found!');
    }
  });

  return <div className={props.className} id='editor' />;
};

