
import api from "../../utils/api.ts";
export interface IPlaceDetail {
    _id: string;
    explorePlace: any;
    exploreMap: any;
    title: string;
    type?:string;
    image?:string;
    // city?:any;
    description?: string;
    location: { lat: number, lon: number };
    transportation: string;
}

export interface IMapData{
    _id:string,
    type:string,
    cardIcon:string,
    placeDetails: IPlaceDetail[],
    color:string,
    icon: string
}

const getExplorePlaceMapsData = async ()=>{
    return await api.get('/explore-place-maps')
}
const getExplorePlaceMapDetailsData = async ()=>{
    return await api.get('/explore-place-map-details')
}

export {
    getExplorePlaceMapsData,
    getExplorePlaceMapDetailsData,
}
