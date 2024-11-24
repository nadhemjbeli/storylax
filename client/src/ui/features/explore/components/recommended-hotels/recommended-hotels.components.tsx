import React, { useEffect, useState } from 'react';
import './recommended-hotels.style.scss';
import {IHotel, getRecommandedHotels, IRecommendedHotel} from '../../../../../data/hotel/hotel.data.ts';
import { api_url } from '../../../../../utils/domain/back.ts';
import { useNavigate } from 'react-router-dom';

const RecommendedHotels: React.FC = () => {
    const navigate = useNavigate();
    const [hotels, setHotels] = useState<IRecommendedHotel[]>([]);

    useEffect(() => {
        getRecommandedHotels().then((data) => {
            console.log(data.data)
            setHotels(data.data?.slice(0, 4)); // Limiting to 4 hotels
        });
    }, []);

    const handleChooseHotel = (hotel: IHotel) => {
        navigate(`/hotels/${hotel._id}`);
    };

    return (
        <div className="recommended-hotels">
            {hotels.length > 0 ?
                (

                <div>
                    <h2>Recommended Hotels</h2>
                    <div className="hotels-wrapper">
                        {
                            hotels.map((hotel) => (
                                <div onClick={() => handleChooseHotel(hotel.hotel)} key={hotel.hotel._id} className="hotel-card">
                                    <div className="hotel-image">
                                        <img src={`${api_url}/${hotel.hotel.principalImage?.default}`} className="img" alt={hotel.hotel.title} />
                                    </div>
                                    <div className="hotel-info">
                                        <div className="hotel-title">{hotel.hotel.title}</div>
                                        <div className="hotel-city">{(hotel.hotel.city as any)?.name}</div>
                                        <div className="hotel-footer">
                                            <div className="hotel-rating">⭐ 4.76 (250)</div> {/* Example rating */}
                                            <div className="hotel-price">${hotel.hotel.price} / night</div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            ) : (
                <p></p>
            )
            }
        </div>
    );
};

export default RecommendedHotels;
