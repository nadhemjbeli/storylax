import React, { useState, useEffect, useRef } from 'react';
import './hero.style.scss';
import {
    getExplorePlaceEventsData,
    getExplorePlacesData,
} from "../../../../../data/explore/header.data.ts";
import { ReactComponent as StarIcon } from "../../../../../assets/svg/star.icon.svg";
import cloud from "../../../../../assets/images/cloud.png";
import {IExplorePlace} from "../../../../../schemas/explore/explore-places/explore-places.schema.ts";
import {api_url} from "../../../../../utils/domain/back.ts";
import {ICitySchema} from "../../../../../data/city.data.ts";

interface HeroProps {
    onSetExplorePlace: (value: string) => void;
    onSetCity: (value: ICitySchema) => void;
}
const Hero: React.FC<HeroProps> = ({onSetExplorePlace, onSetCity}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [animateClass, setAnimateClass] = useState('');
    const [cloudClasses, setCloudClasses] = useState<string[]>([]);
    const [explorePlaces, setExplorePlaces] = useState<IExplorePlace[]>([]);
    const [explorePlaceEvents, setExplorePlaceEvents] = useState<any[]>([]);
    const eventCardsRef = useRef<HTMLDivElement>(null);
    let cloudsNumber = 3;

    useEffect(() => {
        const interval = setInterval(() => {
            // setCurrentIndex(currentIndex>=2?0:currentIndex+1)
        }, 10000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    useEffect(() => {
        showClouds(cloudsNumber);
        getExplorePlacesData().then(places=>{
            const city = places?.data[currentIndex]?.city
            onSetExplorePlace(places.data[currentIndex]?._id)
            onSetCity(city)
            setExplorePlaces(places.data)
            getExplorePlaceEventsData(city?._id).then(events=>{
                setExplorePlaceEvents(events.data)
            })
        })
    }, [currentIndex]);

    const changeIndexTo = (id: number) => {
        setAnimateClass('animate-bg');
        setTimeout(() => setAnimateClass(''), 500);
        setCurrentIndex(id);
        // console.log(`city id: ${explorePlaces[id]?.city?._id}`)
        // onSetExplorePlace(explorePlaces[id]?._id)
    };
    const showClouds = (numClouds: number) => {
        const newCloudClasses = Array.from({ length: numClouds }, (_, index) => 'show-cloud');
        setCloudClasses(newCloudClasses);
        newCloudClasses.forEach((_, index) => {
            setTimeout(() => {
                setCloudClasses((prev) => prev.map((cls, i) => (i === index ? '' : cls)));
            }, (index + 1) * 1000);
        });
    };


    const filteredEvents = explorePlaceEvents;

    let isDragging = false;
    let initialX = 0;
    let currentX = 0;
    let minX = 0;
    let maxX = 0;


    const startDrag = (e: React.MouseEvent<HTMLDivElement>) => {
        isDragging = true;
        initialX = e.clientX - currentX;
        minX = eventCardsRef.current ? eventCardsRef.current.clientWidth - eventCardsRef.current.scrollWidth : 0;
        maxX = 0;
    };

    const drag = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentX = Math.max(minX, Math.min(maxX, currentX));
            updateCardsPosition();
        }
    };

    const stopDrag = () => {
        isDragging = false;
    };

    const updateCardsPosition = () => {
        if (eventCardsRef.current) {
            eventCardsRef.current.style.transform = `translateX(${currentX}px)`;
        }
    };


    const handleCardClicked = () => {
        // window.location.href = "#"
    }

    return (
        <>
            <div className="hero-section">
                <div className={`hero-header ${animateClass}`} style={{ backgroundImage: "url("+api_url+"/"+explorePlaces[currentIndex]?.image+")"}}>
                    <div className="hero-content">
                        <h1 className="hero-title">{explorePlaces[currentIndex]?.city?.name}</h1>
                        <p className="hero-description">{explorePlaces[currentIndex]?.description}</p>
                        <button className="primary-button-outline">Discover Location</button>
                    </div>
                    <div className="navigation-dots">
                        {explorePlaces.map((place, index) => (
                            <div
                                key={place._id}
                                className={`dot ${index === currentIndex ? 'active' : ''}`}
                                onClick={() => {
                                    changeIndexTo(index)
                                    showClouds(cloudsNumber)
                                }}
                            ></div>
                        ))}
                    </div>
                </div>
                <div className="sides">
                    <div className="hero-body">
                        <div className="left">
                            <div
                                className="left-content"
                                style={{ backgroundImage: "url("+api_url+"/"+explorePlaces[currentIndex]?.image+")"}}
                            >
                                <div className="clouds" style={{"--clouds":cloudsNumber} as React.CSSProperties}>
                                    {Array.from({ length: cloudsNumber }).map((_, index) => (
                                        <img
                                            alt=""
                                            key={index}
                                            className={`cloud ${cloudClasses[index] || 'hide-cloud'}`}
                                            src={cloud}
                                            style={{ "--i": index + 1 } as React.CSSProperties}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            <h1 className="body-title">
                                explore {explorePlaces[currentIndex]?.city?.name} with us
                            </h1>
                            <p className="body-motivation">
                                {explorePlaces[currentIndex]?.motivationalSentence}
                            </p>
                            <div className="event-cards"
                                 ref={eventCardsRef}
                                 onMouseDown={startDrag}
                                 onMouseMove={drag}
                                 onMouseUp={stopDrag}
                                 onMouseLeave={stopDrag}>
                                {filteredEvents.map(event => (
                                    <div onClick={handleCardClicked} key={event._id} className="event-card">
                                        <div className="event-image" style={{ backgroundImage: "url("+api_url+"/"+event.image+")"}}></div>
                                        <div className="event-content">
                                            <div className="event-title">{event.title}</div>
                                            <div className="event-details">{event.exactPlace}</div>
                                            <div className="event-footer">
                                                <div className="event-rate">
                                                    <StarIcon className={"icon"}/>
                                                    <span className={"rate"}>{event.rate}</span>
                                                </div>
                                                <div className="event-price">{event.price}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Hero;
