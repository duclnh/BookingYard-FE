"use client"
import { Button } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { FaLongArrowAltUp } from 'react-icons/fa'

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 200) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        isVisible ?
            (<Button
                onClick={() => window.scroll({top: 0})}
                className='fixed animate-fade-up bottom-5 w-10 h-10 right-3 rounded-full focus:ring-transparent'
            >
                <FaLongArrowAltUp size={17} />
            </Button>) 
            :
            <></>
    )
}
