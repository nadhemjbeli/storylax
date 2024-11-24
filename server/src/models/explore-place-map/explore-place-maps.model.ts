// src/models/explore-place-map/explore-place-maps.model.ts

import { Schema, Document, model } from 'mongoose';
import {IExplorePlace} from "../explore-place/explore-places.model";

interface IExplorePlaceMapDetail extends Document {
    explorePlace: IExplorePlace['_id'];
    exploreMap: IExplorePlaceMap['_id'];
    title: string;
    image?: string;
    description: string;
    location: { lat: number, lon: number };
    transportation: string;
}

interface IExplorePlaceMap extends Document {
    type: string;
    icon: string;
    cardIcon: string;
    color: string;
}

const ExplorePlaceMapDetailSchema: Schema = new Schema({
    explorePlace: { type: Schema.Types.ObjectId, ref: 'Explore-Place', required: true },
    exploreMap: { type: Schema.Types.ObjectId, ref: 'Explore-Place-Map', required: true },
    title: { type: String, required: true },
    image: { type: String },
    description: { type: String },
    location: {
        lat: { type: Number, required: true },
        lon: { type: Number, required: true }
    },
    transportation: { type: String, required: true }
});

const ExplorePlaceMapSchema: Schema = new Schema({
    type: { type: String, required: true },
    icon: { type: String, required: true },
    cardIcon: { type: String, required: true },
    color: { type: String, required: true },
});

const ExplorePlaceMapDetail = model<IExplorePlaceMapDetail>('Explore-Place-Map-Detail', ExplorePlaceMapDetailSchema);
const ExplorePlaceMap = model<IExplorePlaceMap>('Explore-Place-Map', ExplorePlaceMapSchema);

export {
    ExplorePlaceMap,
    ExplorePlaceMapDetail,
    IExplorePlaceMap,
    IExplorePlaceMapDetail
};
