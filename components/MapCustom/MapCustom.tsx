'use client'
import L, { LeafletMouseEvent } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup, useMapEvent, useMap } from 'react-leaflet'
import MarkerIcon from '../../node_modules/leaflet/dist/images/marker-icon.png'
import MarkerShadow from '../../node_modules/leaflet/dist/images/marker-shadow.png'
import { useEffect, useState } from 'react'
import { IoLocationOutline } from 'react-icons/io5'
import { MdOutlineLocationOff, MdZoomOutMap } from 'react-icons/md'

export default function MapCustom({ className, expandMap }: { className: string, expandMap?: Function }) {

    const [placePosition, setPlacePosition] = useState<[number, number]>();
    const [zoom, setZoom] = useState(10);

    const getMyLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setPlacePosition([position.coords.latitude, position.coords.longitude]);
                setZoom(15);
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }

    function ZoomControl() {
        const map = useMap();

        useEffect(() => {
            map.setZoom(zoom, { animate: true });
            if (placePosition) {
                map.setView(placePosition, zoom, { animate: true });
            }
        }, [map, zoom, placePosition]);

        return null;
    }

    const MapEvents = () => {
        const map = useMap();

        useMapEvent('click', (event: LeafletMouseEvent) => {
            setPlacePosition([event.latlng.lat, event.latlng.lng]);
        });

        useMapEvent('zoomend', () => {
            setZoom(map.getZoom());
        });

        useMapEvent('zoom', () => {
            setZoom(map.getZoom());
        });

        useEffect(() => {
            if (map) {
                map.invalidateSize(); // Đảm bảo bản đồ cập nhật kích thước
            }
        }, [map]);
        
        return null;
    };

    return (
        <div className={`${className} relative`}>
            <MapContainer
                className={className}
                zoom={zoom}
                scrollWheelZoom={true}
                center={placePosition || [10.87588761639265, 106.76734387246937]}
            >
                <TileLayer
                    className='relative'
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapEvents />
                <ZoomControl />
                {placePosition && (
                    <Marker icon={
                        new L.Icon({
                            iconUrl: MarkerIcon.src,
                            iconRetinaUrl: MarkerIcon.src,
                            iconSize: [25, 41],
                            iconAnchor: [12.5, 41],
                            popupAnchor: [0, -41],
                            shadowUrl: MarkerShadow.src,
                            shadowSize: [41, 41],
                        })
                    } position={placePosition}>
                        <Popup>
                            Vị trí của bạn
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
            <button type='button' className='absolute z-20 left-4 bottom-4 bg-[#8e8d8d] text-white p-4 rounded-full text-xl font-medium hover:cursor-pointer' onClick={getMyLocation}><IoLocationOutline size={18} /></button>
            {placePosition && (
                <button type='button' className='absolute z-20 left-20 bottom-4 bg-[#8e8d8d] text-white p-4 rounded-full text-xl font-medium hover:cursor-pointer' onClick={() => setPlacePosition(null)}><MdOutlineLocationOff  size={18} /></button>
            )}
            {expandMap && (
                <button type='button' className='absolute z-20 right-4 top-4 bg-[#8e8d8d] text-white p-2 rounded-full text-xl font-medium hover:cursor-pointer' onClick={() => expandMap(true)}><MdZoomOutMap size={18} /></button>
            )}
        </div>
    )
}
