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

export type AddressVN = {
    id: number,
    name: string,
    name_en: string,
    full_name: string,
    full_name_en: string,
    latitude: number,
    longitude: number,
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