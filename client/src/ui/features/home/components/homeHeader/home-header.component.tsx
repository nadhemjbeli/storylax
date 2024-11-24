// src/ui/features/home/components/homeHeader/home-header.component.tsx
import "./home-header.style.scss";
import { useEffect, useState } from "react";
import { slideItems, topPlaces } from "../../../../../data/home-header.data.ts";
import { ReactComponent as PrevArrow } from "../../../../../assets/svg/prev-arrow.svg";
import { ReactComponent as NextArrow } from "../../../../../assets/svg/next-arrow.svg";
import Item from "./item/item.component.tsx";
import ProgressBar from "./progressBar/progress-bar.tsx";
import PlaceGroup from "./placeGroup/place-group.component.tsx";

const HomeHeader = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isClicked, setIsClicked] = useState(false);

  const activate = (direction: string) => {
    const slider = document.querySelector(".slider");
    const items = document.querySelectorAll(".item");
    switch (direction) {
      case "next":
        setCurrentIndex(currentIndex === items.length ? 1 : currentIndex + 1);
        slider?.append(items[0]);
        break;
      case "prev":
        setCurrentIndex(currentIndex === 1 ? items.length : currentIndex - 1);
        slider?.prepend(items[items.length - 1]);
        break;
      default:
        console.warn(`Unknown direction: ${direction}`);
    }
  };

  const goToSlide = (index: number) => {
    let cur = currentIndex + 1;
    let ind = index * 5 + 1;
    const slider = document.querySelector(".slider");
    const items = document.querySelectorAll(".item");
    if (cur < ind) {
      let counter = 0;
      for (let i = cur; i < ind - 4; i++) {
        slider?.append(items[counter]);
        counter += 1;
      }
      setCurrentIndex(ind - 5);
    } else if (cur > ind) {
      let counter = 0;
      for (let i = ind - 5; i < cur; i++) {
        slider?.prepend(items[items.length - counter]);
        counter += 1;
      }
      setCurrentIndex(ind - 5);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      activate("next");
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, isClicked]);

  const checkIndexInArray = (id: number, currentIndex: number) => {
    return Array.from(
        { length: 5 },
        (_, index) => (id - 1) * 5 + index
    ).includes(currentIndex - 1);
  };

  const activePlace = topPlaces.filter((place) =>
      checkIndexInArray(place.id, currentIndex)
  );
  const inactivePlaces = topPlaces.filter(
      (place) => !checkIndexInArray(place.id, currentIndex)
  );
  const orderedPlaces = [...activePlace, ...inactivePlaces];

  const progress = (currentIndex % 5) / 5;

  return (
      <>
        <div className="header-content relative">
          <ul className="slider relative">
            {slideItems.map((item) => {
              return (
                  <Item
                      item={item}
                      currentIndex={currentIndex}
                      key={item.id}
                      onSetCurrentIndex={setCurrentIndex}
                  />
              );
            })}
          </ul>
          <ProgressBar progress={progress} />
          <div className="btn-container absolute">
            <button
                className="btn prev"
                onClick={() => {
                  setIsClicked(true);
                  activate("prev");
                }}
            >
              <PrevArrow className="arrow" />
            </button>
            <button
                className="btn next"
                onClick={() => {
                  setIsClicked(true);
                  activate("next");
                }}
            >
              <NextArrow className="arrow" />
            </button>
          </div>
          {/* Pass props to PlaceGroup */}
          <div className="offer absolute">

            {/*<PlaceGroup*/}
            {/*    orderedPlaces={orderedPlaces}*/}
            {/*    currentIndex={currentIndex}*/}
            {/*    checkIndexInArray={checkIndexInArray}*/}
            {/*    goToSlide={goToSlide}*/}
            {/*/>*/}
          </div>
        </div>
      </>
  );
};

export default HomeHeader;
