'use client';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvent, useMap } from 'react-leaflet';
import { useEffect, useState } from 'react';
import iconMarker from 'leaflet/dist/images/marker-icon.png';
import iconMarkerShadow from 'leaflet/dist/images/marker-shadow.png';
import { Position, PositionFacility } from 'types';
import Image from 'next/image';
import { getImage } from '@utils/imageOptions';

export default function MapFacility({ className, positions, facilities }:
    { className: string, positions: Position[], facilities: PositionFacility[] }) {
    const [position, setPosition] = useState<[number, number] | undefined>()
    const [zoom, setZoom] = useState(6);
    const NavToPosition = (latitude: number, longitude: number) => {
        setPosition([latitude, longitude])
        setZoom(11);
    }
    const ZoomControl = () => {
        const map = useMap();

        useEffect(() => {
            map.setZoom(zoom, { animate: true });
            if (position) {
                map.setView(position, zoom, { animate: true });
            }
            if (position && zoom < 10) {
                setPosition(undefined);
            }
        }, [map, zoom, position]);
        return null;
    }

    const MapEvents = () => {
        const map = useMap();

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

    return (
        <>
            <div className={`${className} relative`}>
                <MapContainer
                    className={className}
                    zoom={zoom}
                    scrollWheelZoom={true}
                    center={position || [15.65742732239148, 104.6454932754854]}
                >
                    <TileLayer
                        className='relative'
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapEvents />
                    <ZoomControl />
                    {zoom < 10 ? (
                        <>
                            {positions.map((pos: Position, index) => (
                                <Marker key={index} icon={
                                    new L.Icon({
                                        iconUrl: iconMarker.src,
                                        iconRetinaUrl: iconMarker.src,
                                        iconSize: [25, 41],
                                        iconAnchor: [12.5, 41],
                                        popupAnchor: [0, -41],
                                        shadowUrl: iconMarkerShadow.src,
                                        shadowSize: [41, 41],
                                    })
                                } position={[pos.latitude, pos.longitude]}>
                                    <Popup>
                                        <p className='hover:cursor-pointer' onClick={() => NavToPosition(pos.latitude, pos.longitude)}>{pos.name}</p>
                                    </Popup>
                                </Marker>
                            )
                            )}
                        </>
                    ) : <>
                        {facilities.map((fp: PositionFacility, index) => (
                            <Marker key={index} icon={
                                new L.Icon({
                                    iconUrl: iconMarker.src,
                                    iconRetinaUrl: iconMarker.src,
                                    iconSize: [25, 41],
                                    iconAnchor: [12.5, 41],
                                    popupAnchor: [0, -41],
                                    shadowUrl: iconMarkerShadow.src,
                                    shadowSize: [41, 41],
                                })
                            } position={[fp.latitude, fp.longitude]}>
                                <Popup>
                                    <div className='hover:cursor-pointer' onClick={() => NavToPosition(fp.latitude, fp.longitude)}>
                                        <Image className='w-full h-full' width={1000} height={1000} src={getImage(fp.image) || ''} alt='image' />
                                        <p className='font-bold text-lg text-center'>{fp.name}</p>
                                    </div>
                                </Popup>
                            </Marker>
                        )
                        )}
                    </>}

                </MapContainer>
            </div>
        </>
    )
}
