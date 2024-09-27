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
    facilityImages: string [],
    facility360s: string [],
    facilityAddress: string,
    facilityRating: string,
    sports: string [],
    openDate: string,
    startTime: string,
    endTime: string,
    numberFeedback: string,
    description: string,
    convenient: Convenience [],
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