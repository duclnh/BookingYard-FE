"use client"
import { EmptyList, InputDate, LoadingData, ModalView } from '@components/index'
import { convertNumberToPrice } from '@utils/moneyOptions'
import { Accordion, Button, Modal } from 'flowbite-react'
import React, { useEffect, useMemo, useState } from 'react'
import { FaImage } from 'react-icons/fa'
import { TbView360Number } from 'react-icons/tb'
import { CourtBooking, SportCreate } from 'types'
import qs from "query-string";
import { getCourtBooking } from '@services/courtService'
import toast from 'react-hot-toast'
import Image from 'next/image'
import View360, { EquirectProjection } from '@egjs/react-view360'
import { getImage, getImage360 } from '@utils/index'
import { useAppDispatch } from '@hooks/hooks'
import { setBooking } from '@hooks/bookingStore'
import { useRouter } from 'next/navigation'

type Props = {
    open: boolean,
    setOpen: Function,
    facilityID: string,
    sports?: SportCreate[],
    facilityOpen: string,
    facilityClose: string,
    facilityName: string,
    facilityImage: string,
    facilityTime: string,
    facilityAddress: string,
    facilityRating: number,
}

export default function Booking(props: Props) {
    const [selectSport, setSelectSport] = useState<SportCreate | null>(null);
    const [datePlay, setDatePlay] = useState<Date | null>(null);
    const [selectedStartHour, setSelectedStartHour] = useState<number | null>(null);
    const [selectedEndHour, setSelectedEndHour] = useState<number | null>(null);
    const [hoveredHour, setHoveredHour] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [courts, setCourts] = useState<CourtBooking[] | undefined>(undefined)
    const [courtSelected, setCourtSelected] = useState<CourtBooking | null>(null);
    const [modal360, setModal360] = useState(false);
    const [modalImage, setModalImage] = useState(false);
    const [image, setImage] = useState<string | undefined>(undefined);
    const [image360, setImage360] = useState<string | undefined>(undefined);
    const dispatch = useAppDispatch();
    const router = useRouter()

    function formatDate(date: Date | null) {
        if (!date) return '';
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }

    const url = qs.stringifyUrl({
        url: "", query: {
            "sportID": selectSport?.sportID,
            "startTime": `${selectedStartHour}:00`,
            "endTime": `${selectedEndHour}:00`,
            "playDate": formatDate(datePlay),
        }
    });

    useEffect(() => {
        setDatePlay(null);
        setSelectedStartHour(null);
        setSelectedEndHour(null);
    },[selectSport])

    const startHour: number = props.facilityOpen
        ? parseInt(props.facilityOpen.split(':')[0], 10)
        : 0;

    const endHour: number = props.facilityClose
        ? parseInt(props.facilityClose.split(':')[0], 10)
        : 0;

    const handleDateChange = (dates: Date | Date[]) => {
        if (!Array.isArray(dates)) {
            setDatePlay(dates);
            setSelectedStartHour(null);
            setSelectedEndHour(null);
        }
    };

    const handleTimeClick = (hour: number) => {
        if (hour === selectedStartHour) {
            setSelectedStartHour(null);
            setSelectedEndHour(null);
        } else if (selectedStartHour === null) {
            setSelectedStartHour(hour);
            setSelectedEndHour(null);
        } else if (selectedStartHour !== null) {
            setSelectedEndHour(hour);
        }
        setCourts(undefined);
        setCourtSelected(null);
    };

    const handleTimeHover = (hour: number) => {
        setHoveredHour(hour);
    };

    const handleMouseLeave = () => {
        setHoveredHour(null);
    };

    const handlerLoadCourt = () => {
        if (selectSport == null) {
            toast.error("Hãy chọn môn thể thao")
            return;
        }
        if (datePlay == null) {
            toast.error("Hãy chọn ngày chơi")
            return;
        }
        if (selectedStartHour == null) {
            toast.error("Hãy chọn thời gian bắt đầu")
            return;
        }
        if (selectedEndHour == null) {
            toast.error("Hãy chọn thời gian kết thúc")
            return;
        }
        setIsLoading(true)
        getCourtBooking(props.facilityID, url)
            .then(x => {
                if (x.status === 200) {
                    return x.data
                } else {
                    toast.error("Lỗi lấy sân")
                }
            }).then((courts: CourtBooking[]) => {
                setCourts(courts)
            })
            .catch(() => toast.error("Lỗi lấy thông tin sân"))
            .finally(() => setIsLoading(false))
    }

    const handlerPayment = () => {
        if (courtSelected == null) {
            toast.error("Hãy chọn sân")
            return;
        }
        dispatch(setBooking(
            {
                facilityID: props.facilityID,
                facilityName: props.facilityName,
                facilityImage: props.facilityImage,
                facilityClose: props.facilityClose,
                facilityRating: props.facilityRating,
                facilityOpen: props.facilityOpen,
                facilityTime: props.facilityTime,
                facilityAddress: props.facilityAddress,
                courtID: courtSelected.courtID,
                courtName: courtSelected.courtName,
                courtPrice: courtSelected.courtPrice,
                sportName: selectSport?.sportName,
                numberPlayer: courtSelected.numberPlayer,
                playDate: formatDate(datePlay),
                startTime: `${selectedStartHour}:00`,
                endTime: `${selectedEndHour}:00`,
                totalTime: handlerGetTotalTime(),
            }
        ))
        router.push("/payment")
    }

    const projection = useMemo(() => {
        return new EquirectProjection({
            src: getImage360(image360 || ''),
        });
    }, [image360])

    const handlerCloseBooking = () => {
        setSelectedStartHour(null)
        setSelectedStartHour(null)
        setSelectSport(null)
        setDatePlay(null)
        setCourtSelected(null)
        setCourts(undefined)
        props.setOpen(false)
    }

    const handlerGetTotalTime = () => {
        if (selectedStartHour && selectedEndHour) {
            return selectedEndHour - selectedStartHour
        }
        return 1;
    }

    return (
        <>
            {/* Start Booking*/}
            <Modal className='z-20' onClose={() => {
                if (modal360 || modalImage) {
                    return;
                } else {
                    handlerCloseBooking()
                }
            }} show={props.open} dismissible>
                <Modal.Header className='border-b-2' >
                    <p className='text-lg ml-4 font-bold py-2'>Đặt lịch</p>
                </Modal.Header>
                <Modal.Body className='pt-5'>
                    <Accordion alwaysOpen flush>
                        <Accordion.Panel>
                            <Accordion.Title className='!p-3'>1. Chọn môn thể thao</Accordion.Title>
                            <Accordion.Content>
                                {props.sports !== undefined &&
                                    <div className={`grid grid-cols-${props.sports.length > 4 ? '5' : props.sports.length} gap-5 place-items-center`}>
                                        {
                                            props.sports.map((sport: SportCreate, index) => (
                                                <div onClick={() => setSelectSport(sport)} key={index} className={`border w-20 leading-10 text-center rounded-xl hover:cursor-pointer hover:bg-black hover:text-white ${selectSport?.sportID === sport.sportID && ('bg-black text-white')}`}>
                                                    {sport.sportName}
                                                </div>
                                            ))
                                        }
                                    </div>
                                }
                            </Accordion.Content>
                        </Accordion.Panel>
                        <Accordion.Panel>
                            <Accordion.Title className='!p-3'>2. Chọn ngày chơi</Accordion.Title>
                            <Accordion.Content>
                                <InputDate row='flex justify-center' minDate={new Date(new Date().setDate(new Date().getDate() - 1))} multiple={false} handlerChange={handleDateChange} name='date' />
                            </Accordion.Content>
                        </Accordion.Panel>
                        <Accordion.Panel>
                            <Accordion.Title className='!p-3'>3. Chọn thời gian chơi</Accordion.Title>
                            <Accordion.Content>
                                {datePlay !== null && startHour !== undefined && endHour !== undefined && (
                                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-5 place-items-center mt-5">
                                        {[...Array(endHour - startHour + 1)].map((_, index) => {
                                            const hour = startHour + index;

                                            // Temporary hover range
                                            const isInHoverRange =
                                                selectedStartHour !== null &&
                                                hoveredHour !== null &&
                                                hoveredHour >= selectedStartHour &&
                                                hour >= selectedStartHour &&
                                                hour <= hoveredHour;

                                            // Permanent selected range
                                            const isInSelectedRange =
                                                selectedStartHour !== null &&
                                                selectedEndHour !== null &&
                                                hour >= selectedStartHour &&
                                                hour <= selectedEndHour;

                                            if (datePlay !== null &&
                                                datePlay.toDateString() === new Date().toDateString()
                                                && hour < datePlay.getUTCHours()) {
                                                return <></>;
                                            } else {
                                                return (
                                                    <div
                                                        key={index}
                                                        onClick={() => handleTimeClick(hour)}
                                                        onMouseEnter={() => handleTimeHover(hour)}
                                                        onMouseLeave={handleMouseLeave} // Clear hover when mouse leaves
                                                        className={`border w-20 leading-10 text-center rounded-xl hover:cursor-pointer 
                                                    ${isInHoverRange || isInSelectedRange ? 'bg-black text-white' : 'hover:bg-black hover:text-white'}`}
                                                        style={{
                                                            transition: 'background-color 0.3s, color 0.3s', // Smooth transition
                                                        }}
                                                    >
                                                        {`${hour}:00`}
                                                    </div>
                                                );
                                            }
                                        })}
                                    </div>
                                )}
                            </Accordion.Content>
                        </Accordion.Panel>
                    </Accordion>
                    <div className='mt-4'>
                        {courts !== undefined ? <>
                            {isLoading ? <LoadingData /> : <div className='grid grid-cols-2 sm:grid-cols-3 gap-5 place-items-center'>
                                {courts.length > 0 ? courts.map((court: CourtBooking, index) => (
                                    <div key={index} className={`py-2 px-4 border w-40 leading-10 text-center rounded-xl hover:cursor-pointer hover:bg-black hover:text-white ${court.courtID == courtSelected?.courtID && ('bg-black text-white')}`}>
                                        <div onClick={() => {
                                            if (courtSelected?.courtID == court.courtID) {
                                                setCourtSelected(null)
                                            } else {
                                                setCourtSelected(court)
                                            }
                                        }}>
                                            <p className='text-xl font-bold'>{court?.courtName}</p>
                                            {selectSport?.sportName == "Bóng đá" && (
                                                <p>{court.numberPlayer} người</p>
                                            )}
                                        </div>
                                        <p>{convertNumberToPrice(court?.courtPrice || 0)}</p>
                                        <div className='flex justify-center mx-auto space-x-5 mt-3'>
                                            <FaImage onClick={() => {
                                                setModalImage(true)
                                                setImage(court?.image)
                                            }} size={18} />
                                            <TbView360Number onClick={() => {
                                                setModal360(true)
                                                setImage360(court?.image360)
                                            }} size={18} />
                                        </div>
                                    </div>
                                )) : <>
                                </>}
                            </div>}
                            {courts.length == 0 && (
                                <EmptyList />
                            )}
                            {courtSelected && selectedStartHour && selectedEndHour && (
                                <div className='text-xl text-center mt-4 font-bold'>Số giờ:  {handlerGetTotalTime()}</div>
                            )}
                            {courtSelected && (
                                <div className='text-xl text-center my-4 font-bold'>Số tiền: {convertNumberToPrice(courtSelected.courtPrice * handlerGetTotalTime())}</div>
                            )}
                        </> : <>
                        </>}
                        {courtSelected == null && courts == undefined && (
                            <Button onClick={handlerLoadCourt} className='mx-auto' color={"warning"} size={"sm"}>Tìm sân</Button>
                        )}
                    </div>

                </Modal.Body>
                <Modal.Footer className='border-t-2'>
                    <div className='flex mx-auto space-x-10'>
                        <Button onClick={handlerPayment} className='w-20' size={'sm'}>Đặt lịch</Button>
                        <Button onClick={handlerCloseBooking} className='w-20' size={'sm'} color={'failure'}>Hủy</Button>
                    </div>
                </Modal.Footer>
            </Modal>
            {/* End Booking */}

            {/*Start view Image */}
            <ModalView key={'View Images'} toggle={modalImage} setToggle={setModalImage}>
                <div className='rounded-lg shadow dark:bg-gray-700 w-[100%] h-[100%]'>
                    {image !== undefined && (
                        <div className='mb-5'>
                            <Image
                                height={600}
                                width={1100}
                                quality={100}
                                className='select-none w-full max-h-[775px]'
                                src={getImage(image) || "/assets/images/slide1.png"}
                                alt='Slide'
                            />
                        </div>
                    )}
                </div>
            </ModalView>
            {/*End view Image */}

            {/*Start view 360 */}
            <ModalView key={'View 360'} toggle={modal360} setToggle={setModal360}>
                <div className='rounded-lg shadow dark:bg-gray-700 w-[100%] h-[100%]'>
                    {image360 !== undefined && image360.length > 0 && (
                        <View360 className="is-16by9 h-full w-full" projection={projection} />
                    )}
                </div>
            </ModalView>
            {/*End view 360 */}
        </>
    )
}
