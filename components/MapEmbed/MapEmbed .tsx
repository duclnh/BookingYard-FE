import React from 'react'

type Props = {
    src: string,
    className?: string,
    height?: string,
    width?: string
}

export default function MapEmbed(props: Props) {
    return (
        <iframe
            src={props.src}
            className={props.className}
            height={props.height}
            width={props.width}
            loading="lazy"
            style={{ border: 0 }}
            allowFullScreen
        >
        </iframe>
    )
}
