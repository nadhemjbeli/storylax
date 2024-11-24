import React, {useEffect, useState} from 'react';
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import Leaflet from 'leaflet';
import { ReactComponent as FilterIcon } from "../../../../../assets/svg/explore/filter.icon.svg";
import "./maps.style.scss";
import {
    getExplorePlaceMapDetailsData,
    getExplorePlaceMapsData,
    IMapData, IPlaceDetail,
} from "../../../../../data/explore/maps.data.ts";
import MonumentCard from "./monumentCard/place-card.component.tsx";
import Modal from "../../../../components/modal/modal.component.tsx";
import { strings } from "../../../../../i18n/strings.ts";
import {useOutsideClick} from "../../../../../hooks/useOutsideClick.tsx";
import Cards from "./cards/cards.component.tsx";
import {ICitySchema} from "../../../../../data/city.data.ts";
import {api_url} from "../../../../../utils/domain/back.ts";

interface PropsMaps {}

const Maps: React.FC<PropsMaps> = () => {
    const [isOpen, setIsOpen] = useState<boolean | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [placeType, setPlaceType] = useState<string | null>(null);
    const [color, setColor] = useState<string | null>(null);
    const [image, setImage] = useState<string >('');
    const [cardIcon, setCardIcon] = useState<string>('');
    const [activePlace, setActivePlace] = useState<IPlaceDetail | null>(null);
    const [cardPosition, setCardPosition] = useState<[number, number]>([0, 0]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    const [explorePlaceMaps, setExplorePlaceMaps] = useState<IMapData[]>([]);
    const [cities, setCities] = useState<ICitySchema[]>([]);

    const [filteredMapPoints, setFilteredMapPoints] = useState<IMapData[]>([]);
    const ref = useOutsideClick(() => {
        setDropdownOpen(false);
    });

    useEffect(() => {
        getExplorePlaceMapsData().then(response => {
            const explorePlaceMaps = response.data;
            getExplorePlaceMapDetailsData().then(response => {
                const explorePlaceMapDetails = response.data;

                // Prepare city data
                const citiesMap: ICitySchema[] = [];
                const citiesN: string[] = [];
                explorePlaceMapDetails.forEach((detail: IPlaceDetail) => {
                    const city = detail?.explorePlace?.city;
                    if (city && !citiesMap.some(existingCity => existingCity._id === city._id)) {
                        citiesMap.push(city);
                        citiesN.push(city.name);
                    }
                });
                setCities(citiesMap);
                setActiveOptions(citiesN);

                // Attach filtered details to maps
                const mapsWithDetails = explorePlaceMaps.map((map: IMapData) => {
                    const filteredDetails = explorePlaceMapDetails.filter(
                        (detail: IPlaceDetail) => detail.exploreMap?.type === map.type
                    );
                    return {
                        ...map,
                        placeDetails: filteredDetails,
                    };
                });

                setExplorePlaceMaps(mapsWithDetails);
                setFilteredMapPoints(mapsWithDetails)
            });
        });
    }, []);

    const [activeOptions, setActiveOptions] = useState<string[]>();

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleMarkerClick = (id: string, place: IPlaceDetail, type: string, color: string, cardIcon: string, event: any) => {
        if (activePlace && activePlace._id === id) {
            if (isOpen && placeType === type) {
                setActivePlace(null);
                handleCloseCard();
            } else {
                setPlaceType(type);
                setColor(color);
                setCardIcon(cardIcon);
                setActivePlace(place);
                setIsOpen(true);
            }
        } else {
            setPlaceType(type);
            setColor(color);
            setCardIcon(cardIcon);
            setActivePlace(place);
            setIsOpen(true);
        }
        setCardPosition([event.originalEvent.pageX, event.originalEvent.pageY]);
        setShowModal(true); // Open modal on marker click
    };

    const handleCardClick = (place: IPlaceDetail, type: string, color: string) => {
        setPlaceType(type);
        setColor(color);
        setActivePlace(place);
        setShowModal(true); // Open modal on card click
    };

    const handleCloseCard = () => {
        setPlaceType(null);
        setActivePlace(null);
        setIsOpen(false);
    };

    const handleMapClick = () => {
        handleCloseCard();
    };

    const createCustomIcon = (svg: string) => {
        return new Leaflet.DivIcon({
            html: svg,
            className: '',
            iconSize: [24, 24],
            iconAnchor: [12, 24]
        });
    };

    const handleModalOpen = (value: boolean) => {
        setShowModal(value);
    };

    const handleCategoryChange = (category: string | null) => {
        setSelectedCategory(category);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleOptionClick = (optionIndex: string) => {
        const updatedActiveOptions = new Set(activeOptions);
        setActivePlace(null)
        if (updatedActiveOptions.has(optionIndex)) {
            updatedActiveOptions.delete(optionIndex);
        } else {
            updatedActiveOptions.add(optionIndex);
        }
        const filteredActivePoints = explorePlaceMaps.map((point) => ({
            ...point,
            placeDetails: point.placeDetails.filter((place) => updatedActiveOptions.has(place.explorePlace.city.name || "")),
        }));
        setFilteredMapPoints(filteredActivePoints)
        setActiveOptions([...updatedActiveOptions]);
    };

    const filteredActiveMapPoints = selectedCategory
        ? filteredMapPoints
            .filter(point => point.type === selectedCategory)
        : filteredMapPoints;

    return (
        <div className="maps-section container">
            <div className="controls">
                <div className="filter-buttons">
                    <button
                        className={`filter-button ${selectedCategory === null ? 'active' : ''}`}
                        onClick={() => handleCategoryChange(null)}
                    >
                        All
                    </button>
                    {explorePlaceMaps.map(point => (
                        <button
                            key={point._id}
                            className={`filter-button ${selectedCategory === point.type ? 'active' : ''}`}
                            onClick={() => handleCategoryChange(point.type)}
                        >
                            {point.type}
                        </button>
                    ))}
                </div>
                <div ref={ref} className="dropdown-container">
                    <div
                        className={`dropdown-button ${dropdownOpen && 'active'}`}
                        onClick={toggleDropdown}>
                        <FilterIcon className="dropdown-icon" />
                    </div>
                    {dropdownOpen && (
                        <div className="dropdown-content">
                            {cities.map((city) => (
                                <button
                                    key={city._id}
                                    className={`dropdown-btn ${activeOptions?.includes(city.name) ? 'active' : ''}`}
                                    onClick={() => handleOptionClick(city.name)}
                                >
                                    {city.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Cards
                filteredActiveMapPoints={filteredActiveMapPoints}
                onCardClick={handleCardClick} // Pass the handler to Cards
            />
            {activePlace && (
                <Modal isOpen={showModal} onClose={handleModalClose}>
                    <div className="modal-body">
                        <img src={`${api_url}/${activePlace.image}`} className="place-modal-image" alt={activePlace.title}/>
                        <div className="modal-type">
                            <div className="modal-type-content" style={color && { backgroundColor: color }}>
                                <img src={`${api_url}/${activePlace.exploreMap?.cardIcon}`} className='modal-place-icon' alt=""/>
                                {placeType}
                            </div>
                            <div className="modal-city">{activePlace.explorePlace.city.name}</div>
                        </div>
                        <h2 className="modal-title">{activePlace.title}</h2>
                        <p className="modal-description">
                            {activePlace.description}
                        </p>
                        <button className="primary-button-outline">Call to action!</button>
                    </div>
                </Modal>
            )}
            <div className="map-container">
                <MapContainer className="leaflet-container"
                              center={[33.8881, 10.0975]} zoom={6}
                              scrollWheelZoom={true}
                              onClick={handleMapClick}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {filteredActiveMapPoints.map(point => (
                        <div key={point._id}>
                            {point.placeDetails.map(place => (
                                <Marker
                                    key={place._id}
                                    icon={createCustomIcon(point.icon)}
                                    position={[place.location.lat, place.location.lon]}
                                    eventHandlers={{
                                        click: (event:any) => handleMarkerClick(place._id, place, point.type, point.color, point.cardIcon, event),
                                    }}
                                />
                            ))}
                        </div>
                    ))}
                </MapContainer>
                {activePlace && (
                    <MonumentCard
                        title={activePlace.title}
                        type={placeType}
                        color={color}
                        cardIcon={cardIcon}
                        image={activePlace.image}
                        transportation={activePlace.transportation}
                        position={cardPosition}
                        onClose={handleCloseCard}
                        onChangeModal={handleModalOpen}
                    />
                )}
            </div>
        </div>
    );
};

export default Maps;
