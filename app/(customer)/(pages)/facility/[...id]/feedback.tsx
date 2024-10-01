"use client"
import { ModalView } from '@components/index'
import { getFeedbackFacilityDetail } from '@services/index'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FeedbackFacilityDetail, PageResult } from 'types'
import qs from "query-string";
import { CustomFlowbiteTheme, Rating } from 'flowbite-react'
import { getImage } from '@utils/index'
import Image from 'next/image'
import { SlArrowLeftCircle, SlArrowRightCircle } from 'react-icons/sl'

type Props = {
    rating: number,
    numberRating: number,
    facilityID: string,
    percentFiveStar: number,
    percentFourStar: number,
    percentThreeStar: number,
    percentTwoStar: number,
    percentOneStar: number,
}

export default function Feedback(props: Props) {
    const [modalImageFeedback, setModalImageFeedback] = useState(false);
    const [feedback, setFeedback] = useState<PageResult<FeedbackFacilityDetail> | undefined>(undefined)
    const [imageFeedback, setImageFeedback] = useState<string[]>([])
    const [currentIndexFeedback, setCurrentIndexFeedback] = useState(0);
    const [currentPageSize, setCurrentPageSize] = useState<number>(4)
    const customTheme: CustomFlowbiteTheme["ratingAdvanced"] = {
        progress: {
            label: 'text-sm font-medium text-black dark:text-cyan-500'
        }
    };
    const handleScroll = (e: any) => {
        const bottom = Math.floor(e.target.scrollHeight - e.target.scrollTop) === e.target.clientHeight;
        if (bottom) {
            setCurrentPageSize(prev => prev + 5);
        }
    };
    const url = qs.stringifyUrl({
        url: "", query: {
            "search": "",
            "currentPage": 1,
            "pageSize": currentPageSize,
        }
    });
    useEffect(() => {
        if (props.facilityID !== undefined) {
            getFeedbackFacilityDetail(props.facilityID, url)
                .then(x => {
                    if (x.status == 200) {
                        return x.data
                    }
                })
                .then((feedback: PageResult<FeedbackFacilityDetail>) => {
                    setFeedback(feedback);
                })
                .catch(() => {
                    toast.error("Lỗi hệ thống vui lòng thử lại sau")
                });
        }
    }, [currentPageSize])

    const prevImageFeedback = () => {
        if (currentIndexFeedback == 0) return;
        setCurrentIndexFeedback((prevIndex) => (prevIndex === 0 ? imageFeedback.length - 1 : prevIndex - 1));
    };

    const nextImageFeedback = () => {
        if ((imageFeedback.length - 1) == currentIndexFeedback) return;
        setCurrentIndexFeedback((prevIndex) => (prevIndex === imageFeedback.length - 1 ? 0 : prevIndex + 1));
    };

    const handlerOpenFeedbackImage = (index: number, images: string[]) => {
        setImageFeedback(images);
        setModalImageFeedback(true);
        setCurrentIndexFeedback(index);
    }
    return (
        <>
            {/* Start feedback */}
            <div className='mt-10' id='feedback'>
                <div className='text-2xl font-bold border-b-2 py-3'>Đánh giá của khách hàng</div>
                <div className='grid sm:grid-cols-3 mt-10 gap-10 sm:place-items-start'>
                    <div className='col-span-1'>
                        <div className='text-center'>
                            <p className='text-6xl font-bold'>{props?.rating}</p>
                            <p className='mt-2'>{`Dựa trên ${props?.numberRating} lượt đánh giá`}</p>
                        </div>
                    </div>
                    <div className='sm:col-span-2 w-full ml-8'>
                        <Rating.Advanced percentFilled={props.percentFiveStar} theme={customTheme} className="mb-2">
                            <Rating>
                                <Rating.Star />
                                <Rating.Star />
                                <Rating.Star />
                                <Rating.Star />
                                <Rating.Star />
                            </Rating>
                        </Rating.Advanced>
                        <Rating.Advanced percentFilled={props.percentFourStar} theme={customTheme} className="mb-2">
                            <Rating>
                                <Rating.Star />
                                <Rating.Star />
                                <Rating.Star />
                                <Rating.Star />
                                <Rating.Star filled={false} />
                            </Rating>
                        </Rating.Advanced>
                        <Rating.Advanced percentFilled={props.percentThreeStar} theme={customTheme} className="mb-2">
                            <Rating>
                                <Rating.Star />
                                <Rating.Star />
                                <Rating.Star />
                                <Rating.Star filled={false} />
                                <Rating.Star filled={false} />
                            </Rating>
                        </Rating.Advanced>
                        <Rating.Advanced percentFilled={props.percentTwoStar} theme={customTheme} className="mb-2">
                            <Rating>
                                <Rating.Star />
                                <Rating.Star />
                                <Rating.Star filled={false} />
                                <Rating.Star filled={false} />
                                <Rating.Star filled={false} />
                            </Rating>
                        </Rating.Advanced>
                        <Rating.Advanced percentFilled={props.percentOneStar} theme={customTheme} className="mb-2">
                            <Rating>
                                <Rating.Star />
                                <Rating.Star filled={false} />
                                <Rating.Star filled={false} />
                                <Rating.Star filled={false} />
                                <Rating.Star filled={false} />
                            </Rating>
                        </Rating.Advanced>
                    </div>
                </div>
                <div className='mt-10 overflow-hidden max-h-[400px] hover:overflow-y-auto' onScroll={handleScroll}>
                    {feedback != undefined && feedback.results.map((feedback: FeedbackFacilityDetail, index) => (
                        <div key={index} className='flex justify-between items-start mb-10'>
                            <div className='flex'>
                                <div className='min-w-8'>
                                    <Image height={40} width={40} src={getImage(feedback.avatar) || "/assets/images/avatar-default.png"} alt={feedback.name} className='rounded-full mt-1' />
                                </div>
                                <div className='ml-3'>
                                    <div className='text-xl font-bold mb-1'>{feedback.name}</div>
                                    <div className='flex items-center mb-3'>
                                        {feedback.rating && (
                                            <Rating>
                                                {Array.from({ length: 5 }, (_, index) => (
                                                    <Rating.Star key={index} filled={index < feedback.rating} />
                                                ))}
                                            </Rating>
                                        )}
                                    </div>
                                    <div className='max-w-[490px] text-gray-700 mb-5'>
                                        <p>Demesne far-hearted suppose venture excited see had has. Dependent on so extremely delivered by. Yet no jokes worse her why. Bed one supposing breakfast day fulfilled off depending questions.</p>
                                    </div>
                                    <div className='flex'>
                                        {feedback.images.length > 3 ? <>
                                            <Image height={100} width={100} src={getImage(feedback.images[0]) || ''} className='rounded-lg hover:cursor-pointer mr-3' onClick={() => handlerOpenFeedbackImage(0, feedback.images)} alt="image 1" />
                                            <Image height={100} width={100} src={getImage(feedback.images[1]) || ''} className='rounded-lg hover:cursor-pointer mr-3' onClick={() => handlerOpenFeedbackImage(1, feedback.images)} alt="image 2" />
                                            <Image height={100} width={100} src={getImage(feedback.images[2]) || ''} className='rounded-lg hover:cursor-pointer mr-3' onClick={() => handlerOpenFeedbackImage(2, feedback.images)} alt="image 3" />
                                            <div className='hover:cursor-pointer relative'>
                                                <Image height={100} width={100} src={getImage(feedback.images[3]) || ''} className='rounded-lg hover:cursor-pointer h-[100%]' alt="image 4" />
                                                <div className='absolute right-0 top-0 w-full h-full bg-[#302f2f] opacity-70 rounded-lg flex justify-center items-center text-white font-bold' onClick={() => handlerOpenFeedbackImage(3, feedback.images)}>
                                                    + {feedback.images.length - 3}
                                                </div>
                                            </div>
                                        </> : <>
                                            {feedback.images.map((image, index) => (
                                                <Image key={index} height={100} width={100} src={getImage(image) || ''} className='rounded-lg hover:cursor-pointer mr-3' onClick={() => handlerOpenFeedbackImage(index, feedback.images)} alt={`image ${index}`} />
                                            ))}
                                        </>}
                                    </div>
                                </div>
                            </div>
                            <div className='text-gray-500 pr-3'>
                                {feedback.createdAt}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* End feedback */}
            {/*Start view Image */}
            <ModalView key={'View Feedback'} toggle={modalImageFeedback} setToggle={setModalImageFeedback}>
                <div className='rounded-lg shadow dark:bg-gray-700 w-[100%] h-[100%] group'>
                    <SlArrowLeftCircle className={`${currentIndexFeedback == 0 ? 'text-gray-500' : 'text-white'} mx-2 absolute top-1/2 left-3`} cursor='pointer' size={40} onClick={prevImageFeedback} />
                    <div className='mb-5'>
                        <Image
                            height={600}
                            width={1100}
                            className='select-none w-full max-h-[775px]'
                            src={getImage(imageFeedback[currentIndexFeedback]) || "/assets/images/slide1.png"}
                            alt='Slide'
                        />
                    </div>
                    <SlArrowRightCircle className={`${currentIndexFeedback == (imageFeedback.length - 1) ? 'text-gray-500' : 'text-white'} mx-2 absolute top-1/2 right-3`} cursor='pointer' size={40} onClick={nextImageFeedback} />
                </div>
            </ModalView>
            {/*End view Image */}
        </>
    )
}
