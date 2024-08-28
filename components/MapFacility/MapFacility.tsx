'use client';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvent, useMap } from 'react-leaflet';
import { useEffect, useState } from 'react';
import iconMarker from 'leaflet/dist/images/marker-icon.png';
import iconMarkerShadow from 'leaflet/dist/images/marker-shadow.png';

export default function MapFacility({ className }: { className: string }) {
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
                            } position={[10.8231, 106.6297]}> {/* Tọa độ TP.HCM */}
                                <Popup>
                                    <p className='hover:cursor-pointer' onClick={() => NavToPosition(10.8231, 106.6297)}>Thành phố Hồ Chí Minh</p>
                                </Popup>
                            </Marker>
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
                            } position={[21.0285, 105.8542]}> {/* Tọa độ Hà Nội */}
                                <Popup>
                                    <p className='hover:cursor-pointer' onClick={() => NavToPosition(21.0285, 105.8542)}>Hà Nội</p>
                                </Popup>
                            </Marker>
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
                            } position={[16.0471, 108.2062]}> {/* Tọa độ Đà Nẵng */}
                                <Popup>
                                    <p className='hover:cursor-pointer' onClick={() => NavToPosition(16.0471, 108.2062)}> Đà Nẵng</p>
                                </Popup>
                            </Marker>
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
                            } position={[10.3521, 107.0843]}> {/* Tọa độ Vũng Tàu */}
                                <Popup>
                                    <p className='hover:cursor-pointer' onClick={() => NavToPosition(10.3521, 107.0843)}>Vũng Tàu</p>
                                </Popup>
                            </Marker>
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
                            } position={[11.9416, 108.4583]}> {/* Tọa độ Đà Lạt */}
                                <Popup>
                                    <p className='hover:cursor-pointer' onClick={() => NavToPosition(11.9416, 108.4583)}>Đà Lạt</p>
                                </Popup>
                            </Marker></>
                    ) : <>
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
                        } position={[21.0285, 105.8542]}> {/* Quận Hoàn Kiếm */}
                            <Popup>
                                Quận Hoàn Kiếm
                            </Popup>
                        </Marker>
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
                        } position={[21.0278, 105.8342]}> {/* Quận Ba Đình */}
                            <Popup>
                                Quận Ba Đình
                            </Popup>
                        </Marker>
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
                        } position={[21.0036, 105.8204]}> {/* Quận Đống Đa */}
                            <Popup>
                                Quận Đống Đa
                            </Popup>
                        </Marker>
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
                        } position={[20.9999, 105.8437]}> {/* Quận Hai Bà Trưng */}
                            <Popup>
                                Quận Hai Bà Trưng
                            </Popup>
                        </Marker>
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
                        } position={[21.0437, 105.8211]}> {/* Quận Tây Hồ */}
                            <Popup>
                                Quận Tây Hồ
                            </Popup>
                        </Marker>
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
                        } position={[21.0306, 105.7649]}> {/* Quận Cầu Giấy */}
                            <Popup>
                                Quận Cầu Giấy
                            </Popup>
                        </Marker>

                    </>}

                </MapContainer>
            </div>
        </>
    )
}
