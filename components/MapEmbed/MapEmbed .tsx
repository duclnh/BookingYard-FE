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
            title='map'
            src={props.src}
            className={props.className}
            height={props.height}
            width={props.width}
            loading="lazy"
            allowFullScreen
        >
        </iframe>
    )
}
