"use client"
import { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function QrScanner() {
    useEffect(() => {
        const scanner = new Html5QrcodeScanner(
            'reader',
            {
                fps: 5,
                qrbox: {
                    width: 250,
                    height: 250,
                },
            },
            false
        );

        scanner.render(
            (decodedText, decodedResult) => {
                console.log(`Code matched = ${decodedText}`, decodedResult);
            },
            (error) => {
                console.warn(`Code scan error = ${error}`);
            }
        );

        return () => {
            scanner.clear().catch(error => {
                console.error("Failed to clear scanner.", error);
            });
        };
    }, []);

    return <div id="reader"></div>;
};
