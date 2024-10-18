export type PageResult<T> = {
    totalCount: number,
    pageSize: number,
    currentPage: number,
    totalPages: number,
    hasNext: boolean,
    hasPrevious: boolean,
    results: T[];
};

export type Feature = {
    title: string
    isEnable: boolean
}
export type Convenience = {
    title: string;
    content: string;
    icon: string;
    feature: Feature[];
}

export type Support = {
    id: number,
    name: string,
    email: string,
    phone: string,
    content: string,
    typeSupport: string,
    note?: string,
    isProcessed: boolean,
    modifiedBy?: string,
    createdAt: string,
    modifiedAt?: string
};

export type StatisticSupport = {
    totalSupport: number,
    totalProcessed: number,
    totalUnProcessed: number,
}

export type UserUpdate = {
    id: string,
    name: string,
    imageUrl?: string,
    role: string,
}

export type User = {
    id: string,
    name: string,
    imageUrl?: string,
    address?: string,
    email: string,
    phone: string,
    gender: string,
    point: number,
    wardID: number,
    role: string,
}

export type UserAdmin = {
    address: string;
    createDate: string;
    email: string;
    gender: string;
    id: string;
    imageUrl: string | null;
    name: string;
    phone: string;
    point: number;
    role: string;
    wardID: string | null;
}

export type Manager = {
    id: string,
    name: string,
    imageUrl?: string,
    address?: string,
    email: string,
    phone: string,
    gender: string,
    point: number,
    wardID: number,
    role: string,
    facilityID?: string,
    facilityName?: string,
    facilityImage?: string,
    collapse?: boolean,
}

export type AddressVN = {
    id: number,
    name: string,
    name_en: string,
    full_name: string,
    full_name_en: string,
    latitude: number,
    longitude: number,
    phuong: number
    quan: number
    tinh: number
}

export type FacilityTime = {
    value: string,
    name: string,
    isChecked: boolean,
}

export type PeakHour = {
    name: string,
    isChecked: boolean,
}
export type SportCreate = {
    sportID: number,
    sportName: string,
}

export type SportCreateSelect = {
    sportID: number,
    sportName: string,
    isSelected: boolean
}


export type HistoryPoint = {
    historyPointID: string,
    point: number,
    content: string,
    createdAt: string,
}

export type Court = {
    courtID: number,
    courtName: string,
    image: string,
    sportID: number,
    numberPlayer: number,
    sportName: string,
    courtPrice: number,
    isActive: boolean
}

export type CourtBooking = {
    courtID: number,
    courtName: string,
    image: string,
    image360: string,
    numberPlayer: number,
    courtPrice: number,
}

export type CourtDetail = {
    courtID: number,
    courtName: string,
    image: string,
    image360: string,
    sportID: number,
    numberPlayer: number,
    sportName: string,
    courtPrice: number,
    isActive: boolean
}

export type FacilityAdmin = {
    facilityID: string,
    ownerName: string,
    image: string,
    facilityName: string,
    address: string,
    isActive: boolean,
    isDeleted: boolean,
}

export type Facility = {
    facilityID: string,
    facilityImage: string,
    facilityName: string,
    facilityAddress: string,
    facilityRating: number,
    facilityMinPrice: number,
    facilityMaxPrice: number,
    facilityDistance: number,
}

export type FacilityDetail = {
    facilityID: string,
    facilityName: string,
    facilityImages: string[],
    facility360s: string[],
    facilityAddress: string,
    facilityRating: number,
    sports: SportCreate[],
    openDate: string,
    startTime: string,
    endTime: string,
    numberFeedback: number,
    description: string,
    convenient: Convenience[],
    facilityMinPrice: number,
    facilityMaxPrice: number,
    longitude: number,
    latitude: number,
    percentFiveStar: number,
    percentFourStar: number,
    percentThreeStar: number,
    percentTwoStar: number,
    percentOneStar: number,
}

export type FeedbackFacilityDetail = {
    name: string,
    avatar: string,
    content: string,
    rating: number,
    images: string[],
    createdAt: string
}
export type FeedbackHome = {
    name: string,
    avatar: string,
    content: string,
    rating: number,
    typeFeedback: string
}

export type FeedbackOwner = {
    feedbackID: string,
    name: string,
    phone: string,
    content: string,
    rating: number,
    typeFeedback: number,
    isShow: true,
    images: string[],
    createdAt: string
}

export type FacilityHome = {
    facilityID: string,
    facilityImage: string,
    facilityName: string,
    facilityAddress: string,
    facilityRating: number,
    facilityMinPrice: number,
    facilityMaxPrice: number,
    startTime: string,
    endTime: string
}

export type VoucherHome = {
    voucherID: string,
    voucherName: string,
    facilityName: string,
    percentage: number,
    sportName: string,
}

export type VoucherBooking = {
    voucherID: string,
    voucherName: string,
    facilityName: string,
    percentage: number,
    sportName: string,
    registerDate: string,
    expiredDate: string,
    image: string,
}

export type VoucherManagement = {
    voucherID: string,
    voucherName: string,
    image: string,
    percentage: number,
    quantity: number,
    voucherDescription: string,
    registerDate: string,
    expiredDate: string,
    createDate: string,
    reason: string,
    status: boolean
    code: string,
    sportID: number,
    isDeleted: boolean,
    isStarted: boolean,
    isEnded: boolean,
}

export type CollectVoucher = {
    collectVoucherID: string,
    facilityID: string,
    percentage: number,
    facilityName: string,
    sportName: string,
    voucherName: string,
    startDate: string,
    endDate: string,
    isOutDate: boolean,
    isUsed: boolean
}

export type MyBooking = {
    bookingID: string,
    facilityID: string,
    paymentCode: string,
    facilityLogo: string,
    facilityImage: string,
    facilityName: string,
    startTime: string,
    endTime: string,
    playDate: string,
    bookingDate: string,
    totalPrice: number,
    isCheckIn: boolean,
    isFeedback: boolean,
    isDeleted: boolean
}

export type BookingDetail = {
    bookingID: string,
    facilityID: string,
    paymentCode: string,
    image: string,
    facilityName: string,
    fullAddress: string,
    facilityLogo: string,
    facilityImage: string,
    courtName: string,
    courtImage: string,
    court360: string,
    typeCourt: string,
    bookingName: string,
    bookingPhone: string,
    paymentMethod: string,
    paymentStatus: string,
    startTime: string,
    endTime: string,
    playDate: string,
    bookingDate: string,
    reason: string,
    isFeedback: boolean,
    voucherID: string,
    voucherName: string,
    percentage: number,
    voucherCode: string,
    ownerPrice: number,
    courtPrice: number,
    totalPrice: number,
    numberPlayer: number,
    voucherFacility: string,
    voucherStartDate: string,
    voucherEndDate: string,
    voucherSport: string,
    sportName: string,
    usedPoint: number,
    isCheckIn: boolean,
    isDeleted: boolean,
}

export type Booking = {
    facilityID: string,
    facilityName: string,
    facilityImage: string,
    facilityTime: string,
    facilityOpen: string,
    facilityClose: string,
    facilityRating: number,
    facilityAddress: string,
    playDate: string,
    startTime: string,
    endTime: string,
    courtID: number,
    courtName: string,
    sportName: string | undefined,
    numberPlayer: number,
    courtPrice: number,
    totalTime: number,
}


export type DashBoard = {
    revenue: number,
    totalBookings: number,
    totalBookingsCancel: number,
    detailsRevenue: DetailsRevenue,
    countBookings: CourtBookings[]
}

export type DetailsRevenue = {
    hourlyDetails: HourlyRevenue[],
    dayOfWeekDetails: DayOfWeekRevenue[],
    dailyDetails: DailyRevenue[],
    monthlyDetails: MonthlyRevenue[]
}

export type CourtBookings = {
    sportName: string,
    count: number,
}

export type HourlyRevenue = {
    hour: any,
    amount: number,
}
export type DayOfWeekRevenue = {
    day: string,
    amount: number,
}
export type DailyRevenue = {
    day: any,
    amount: number,
}
export type MonthlyRevenue = {
    month: number,
    amount: number,
}

export type Position = {
    name: string,
    latitude: number,
    longitude: number
}

export type PositionFacility = {
    id: string,
    name: string,
    image: string,
    latitude: number,
    longitude: number
}