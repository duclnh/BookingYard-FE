'use client';
import L, { LeafletMouseEvent } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvent, useMap } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import { MdOutlineLocationOff, MdZoomOutMap } from 'react-icons/md';
import iconMarker from 'leaflet/dist/images/marker-icon.png';
import iconMarkerShadow from 'leaflet/dist/images/marker-shadow.png';

type Props = {
    className: string;
    placePosition?: [number, number] | undefined
    setPlacePosition: Function
    handlerExpand?: Function;
};

export default function MapCustom(props: Props) {

    const [position, setPosition] = useState<[number, number] | undefined>(
        props.placePosition ? (props.placePosition as [number, number]) : undefined
    )

    const [zoom, setZoom] = useState(
        props.placePosition ? 15 : 10
    );

    const getMyLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                props.setPlacePosition([position.coords.latitude, position.coords.longitude]);
                setPosition([position.coords.latitude, position.coords.longitude])
                setZoom(15);
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }

    const ZoomControl = () => {
        const map = useMap();

        useEffect(() => {
            map.setZoom(zoom, { animate: true });
            if (position) {
                map.setView(position, zoom, { animate: true });
            }
        }, [map, zoom, position]);

        return null;
    }

    const MapEvents = () => {
        const map = useMap();

        useMapEvent('click', (event: LeafletMouseEvent) => {
            props.setPlacePosition([event.latlng.lat, event.latlng.lng]);
            console.log([event.latlng.lat, event.latlng.lng])
            setPosition([event.latlng.lat, event.latlng.lng])
        });

        useMapEvent('zoomend', () => {
            setZoom(map.getZoom());
        });

        useEffect(() => {
            if (map) {
                map.invalidateSize();
            }
        }, [map]);

        return null;
    };

    const handlerRemovePosition = () => {
        props.setPlacePosition(undefined)
        setPosition(undefined)
    }

    return (
        <>
            <div className={`${props.className} relative`}>
                <MapContainer
                    className={props.className}
                    zoom={zoom}
                    scrollWheelZoom={true}
                    center={position || [10.87588761639265, 106.76734387246937]}
                >
                    <TileLayer
                        className='relative'
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapEvents />
                    <ZoomControl />
                    {position && (
                        <Marker icon={
                            new L.Icon({
                                iconUrl: iconMarker.src,
                                iconRetinaUrl: iconMarker.src,
                                iconSize: [25, 41],
                                iconAnchor: [12.5, 41],
                                popupAnchor: [0, -41],
                                shadowUrl: iconMarkerShadow.src,
                                shadowSize: [41, 41],
                            })
                        } position={position}>
                            <Popup>
                                Vị trí của bạn
                            </Popup>
                        </Marker>
                    )}
                </MapContainer>
                <button type='button' className='absolute z-20 left-4 bottom-4 bg-[#8e8d8d] text-white p-4 rounded-full text-xl font-medium hover:cursor-pointer' onClick={getMyLocation}><IoLocationOutline size={18} /></button>
                {position && (
                    <button type='button' className='absolute z-20 left-20 bottom-4 bg-[#8e8d8d] text-white p-4 rounded-full text-xl font-medium hover:cursor-pointer' onClick={handlerRemovePosition}><MdOutlineLocationOff size={18} /></button>
                )}
                {props.handlerExpand && (
                    <button type='button' className='absolute z-20 right-4 top-4 bg-[#8e8d8d] text-white p-2 rounded-full text-xl font-medium hover:cursor-pointer' onClick={() => {
                        if (props.handlerExpand) {
                            props.handlerExpand(true)
                        }
                    }}><MdZoomOutMap size={18} /></button>
                )}
            </div>
        </>
    )
}
