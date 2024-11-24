// src/ui/features/home/components/homeHeader/placeGroup/place-group.component.tsx
import React from "react";
import "./place-group.styles.scss";

interface PlaceGroupProps {
    orderedPlaces: any[];
    currentIndex: number;
    checkIndexInArray: (id: number, currentIndex: number) => boolean;
    goToSlide: (index: number) => void;
}

const PlaceGroup: React.FC<PlaceGroupProps> = ({
                                                   orderedPlaces,
                                                   currentIndex,
                                                   checkIndexInArray,
                                                   goToSlide,
                                               }) => {
    return (
        <div className="offer-content relative">
            {orderedPlaces.map((place) => {
                const isActive = checkIndexInArray(place.id, currentIndex);
                const zIndex = isActive
                    ? orderedPlaces.length + 1
                    : orderedPlaces.length - place.id - 1 + 1;

                return (
                    <div
                        className="img-container relative"
                        style={{ zIndex: zIndex }}
                        key={place.id}
                    >
                        {isActive ? (
                            <div className="counter absolute absolute-center">
                                {currentIndex % 5 === 0 ? 5 : currentIndex % 5}
                            </div>
                        ) : null}

                        <div
                            className={`circle absolute absolute-center ${
                                isActive ? "active-circle" : ""
                            }`}
                            style={{
                                background: `conic-gradient(#85bddc calc(${
                                    (currentIndex % 5 === 0 ? 5 : currentIndex % 5) * 20
                                } * 3.6deg), #eee 0deg)`,
                            }}
                        ></div>
                        <img
                            className={`offer-img absolute-center ${
                                isActive ? "active-img" : ""
                            } absolute`}
                            src={place.src}
                            alt={place.title}
                            onClick={() => {
                                if (!isActive) goToSlide(place.id);
                            }}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default PlaceGroup;
