import React from "react";
import "./item.styles.scss";
import { ReactComponent as Eye } from "../../../../../../assets/svg/eye.svg";
interface ItemProps {
  item: {
    id: number;
    title: string;
    description: string;
    location: string;
    imageUrl: string;
  };
  currentIndex: number;
  onSetCurrentIndex: any;
}
const Item: React.FC<ItemProps> = ({
  item,
  currentIndex,
  onSetCurrentIndex,
}) => {
  const test_hovers = (deb: number, len: number) => {
    return Array.from(
      { length: len },
      (_, index) => currentIndex + deb + index + 1
    ).includes(item.id);
  };
  const checkItemHovered = () => {
    if (currentIndex <= 17) {
      return test_hovers(0, 3);
    }
    switch (currentIndex) {
      case 18:
        console.log("arr");
        console.log(
          Array.from({ length: 0 }, (_, index) => currentIndex + 0 + index + 1)
        );
        return test_hovers(0, 2) || item.id == 1;
      case 19:
        return [20, 1, 2].includes(item.id);
      case 20:
        return [1, 2, 3].includes(item.id);
    }

    return;
  };
  const goForward = (id: number) => {
    console.log("forward to " + id);
    const slider = document.querySelector(".slider");
    const items = document.querySelectorAll(".item");
    let counter = 0;
    if (currentIndex <= 17 || ([19, 20].includes(id) && currentIndex > 17)) {
      for (let i = currentIndex; i < id; i++) {
        slider?.append(items[counter]);
        counter += 1;
      }
      onSetCurrentIndex(id);
    }

    if ([1, 2, 3].includes(id) && currentIndex > 17) {
      for (let i = 0; i < id + items.length - currentIndex; i++) {
        slider?.append(items[counter]);
        counter += 1;
      }
      onSetCurrentIndex(id);
    }
  };

  return (
    <li
      className={`item ${currentIndex === item.id ? "active" : ""}`}
      style={
        checkItemHovered()
          ? {
              backgroundImage: `url(${item.imageUrl})`,
              cursor: "pointer",
            }
          : { backgroundImage: `url(${item.imageUrl})` }
      }
      onClick={() => {
        checkItemHovered() ? goForward(item.id) : "";
      }}
    >
      <div className="content">
        <h5 className="location">{item.location}</h5>
        <h4 className="title">{item.title}</h4>
        <p className="description">{item.description}</p>
        <button className="button animated">
          Discover location
          <Eye className="eye-icon" />
        </button>
      </div>
    </li>
  );
};

export default Item;
