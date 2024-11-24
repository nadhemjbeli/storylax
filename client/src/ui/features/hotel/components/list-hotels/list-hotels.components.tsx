// src/ui/features/hotel/components/list-hotels/list-hotels.component.tsx
import React, { useEffect, useState } from 'react';
import './list-hotels.style.scss';
import {IHotel, getQueriedHotels} from '../../../../../data/hotel/hotel.data.ts';
import { api_url } from '../../../../../utils/domain/back.ts';
import {useLocation, useNavigate} from 'react-router-dom';
import SearchHotel from "../search-hotel/search-hotel.component.tsx";
import {addDays, format} from "date-fns";

const ListHotels: React.FC = () => {
    const navigate = useNavigate()

    const [hotels, setHotels] = useState<IHotel[]>([]);
    const [query, setQuery] = useState<string>('');
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const defaultPersons = searchParams.get('persons')&&`capacity=${searchParams.get('persons') }&`|| '';
    const defaultRooms = searchParams.get('rooms')&&`rooms=${searchParams.get('rooms')}&` || '';
    const defaultStartDate = searchParams.get('startDate')&&`startDate=${searchParams.get('startDate')}&`||''
    const defaultEndDate = searchParams.get('endDate')&&`endDate=${searchParams.get('endDate')}&`||''
    useEffect(() => {
        let queries =
            '?'+
            defaultPersons +
            defaultRooms +
            defaultStartDate +
            defaultEndDate
        console.log('queries: ', queries)
        getQueriedHotels(queries).then((data) => setHotels(data.data));
    }, [query]);


    const handleChooseHotel = (hotel: IHotel) => {
        let queries = (`cityName=${hotel.city?.name}&`)+
            (defaultPersons?(parseInt(searchParams.get('persons') as string)>hotel?.capacity?`persons=${hotel?.capacity}&`:defaultPersons):`persons=${1}&`) +
            (defaultRooms?(parseInt(searchParams.get('rooms') as string)>hotel?.capacity?`rooms=${hotel?.rooms}&`:defaultPersons):`rooms=${1}&`) +
            (defaultStartDate?defaultStartDate:`startDate=${format(addDays(new Date() as Date, 1), 'dd/MM/yyyy')}&`) +
            (defaultEndDate?defaultEndDate:`endDate=${format(addDays(new Date() as Date, 4), 'dd/MM/yyyy')}&`)
        navigate(`/hotels/${hotel._id}?${queries}`);
    };

    return (
        <>
            <SearchHotel onSearch={setQuery} />
            <div className="list-hotels">
                {hotels.length > 0 ? (
                    hotels.map((hotel) => (
                        <div onClick={()=>handleChooseHotel(hotel)} key={hotel._id} className="hotel-card">
                            <div className="hotel-image">
                                <img src={`${api_url}/${hotel.principalImage.default}`} className="img" alt={hotel.title} />
                            </div>
                            <div className="hotel-info">
                                <div className="hotel-title">{hotel.title}</div>
                                <div className="hotel-city">{(hotel.city as any)?.name}</div>
                                <div className="hotel-footer">
                                    <div className="hotel-rating">⭐ {hotel.avgRating} ({hotel.reviewCount})</div> {/* Example rating */}
                                    <div className="hotel-price">${hotel.price} / night</div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hotels found for the selected criteria.</p>
                )}
            </div>
        </>
    );
};

export default ListHotels;
