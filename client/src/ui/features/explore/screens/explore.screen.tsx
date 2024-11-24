import React, {useEffect, useState} from "react";
import "./explore.style.scss"
import Hero from "../components/hero/hero.component.tsx";
import Filter from "../components/filter/filter.component.tsx";
import Maps from "../components/maps/maps.component.tsx";
import Itinerary from "../components/itinerary/itinerary.component.tsx";
import Events from "../components/events/events.component.tsx";
import FloatingButton from "../components/floating-button/floating-button.component.tsx";
import Blog from "../../../components/Blog/blog.component.tsx";
import {getBlogsData, IBlogData} from "../../../../data/blog-page/blogs.data.ts";
import {ICitySchema} from "../../../../data/city.data.ts";
import RecommendedHotels from "../components/recommended-hotels/recommended-hotels.components.tsx";

const Explore:React.FC = () => {
    const [currentExplorePlace, setCurrentExplorePlace] = useState<string>('');
    const [currentCity, setCurrentCity] = useState<ICitySchema>();
    const [blogs, setBlogs] = useState<IBlogData[]>([]);
    const handleExplorePlace = (value:string) => {
        // console.log("explore Place "+ value)
        setCurrentExplorePlace(value)
    };
    const handleCity = (value:ICitySchema) => {
        // console.log("city "+ value)
        setCurrentCity(value)
    };
    useEffect(() => {
        getBlogsData().then(response=>{
            // console.log(response.data?.filter((place:IBlogData)=>place.city?._id===currentCity))
            setBlogs(response.data?.filter((place:IBlogData)=>place.city?._id===currentCity?._id).slice(-4))
        })
    }, [currentCity]);
    return (
        <div className="explore-page">
            <Hero onSetCity={handleCity} onSetExplorePlace={handleExplorePlace} />
            {/*<Filter />*/}
            <RecommendedHotels/>
            <Maps />
            <Itinerary explorePlaceId={currentExplorePlace} />
            <Blog title={`${currentCity?.name} blogs`} blogs={blogs}/>
            <Events explorePlaceId={currentCity?._id || ''}/>
            <FloatingButton />
        </div>
    );
};

export default Explore;
