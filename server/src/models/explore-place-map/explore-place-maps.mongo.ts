// src/models/explore-place-map/explore-place-maps.mongo.ts

import {ExplorePlaceMap, ExplorePlaceMapDetail} from "./explore-place-maps.model";
import * as util from "util";

// For ExplorePlaceMap
export const getAllMapsFromDB = async () => {
    return await ExplorePlaceMap.find()
        // .populate('list.explorePlace');
};

export const getMapByIdFromDB = async (id: string) => {
    return await ExplorePlaceMap.findById(id)
        // .populate('list.explorePlace');
};

export const createMapInDB = async (data: any) => {
    const map = new ExplorePlaceMap(data);
    return await map.save();
};

export const updateMapInDB = async (id: string, data: any) => {
    return await ExplorePlaceMap.findByIdAndUpdate(id, data, { new: true })
        // .populate('list.explorePlace');
};

export const deleteMapInDB = async (id: string) => {
    return await ExplorePlaceMap.findByIdAndDelete(id);
};


// For ExplorePlaceMapDetail
export const getAllMapDetailsFromDB = async () => {
    const details = await ExplorePlaceMapDetail.find()
        .populate('exploreMap')
        .populate({
            path: 'explorePlace',
            select: 'city', // Include other fields if needed
            populate: {
                path: 'city',
                select: 'name location', // Include location fields if needed
            },
        });

    // console.log(util.inspect(details, { depth: null, colors: true }));

    return details;
};

export const getMapDetailByIdFromDB = async (id: string) => {
    return await ExplorePlaceMapDetail.findById(id);
};

export const createMapDetailInDB = async (data: any) => {
    const mapDetail = new ExplorePlaceMapDetail(data);
    return await mapDetail.save();
};

export const updateMapDetailInDB = async (id: string, data: any) => {
    return await ExplorePlaceMapDetail.findByIdAndUpdate(id, data, { new: true });
};

export const deleteMapDetailInDB = async (id: string) => {
    return await ExplorePlaceMapDetail.findByIdAndDelete(id);
};
