import React, { useEffect, useState } from "react";
import { testimonials } from "../../../../../data/home-page/testimonials.data.ts";
import "./testimonial.styles.scss";
import { strings } from "../../../../../i18n/strings.ts";

interface TestimonialProps {
  // Add any props you want to pass to the Home component here
}

const Testimonial: React.FC<TestimonialProps> = () => {
  const [testimonialCurrentIndex, setTestimonialCurrentIndex] = useState(0);
  const slider = document.querySelector(".testimonials-slider");
  const cards = document.querySelectorAll(".testimonial-card");
  const goToNextTestimonial = () => {
    setTestimonialCurrentIndex(
      testimonialCurrentIndex === cards.length ? 1 : testimonialCurrentIndex + 1
    );
    slider?.append(cards[0]);
  };

  useEffect(() => {
    console.log(testimonialCurrentIndex);
    const interval = setInterval(() => {
      goToNextTestimonial();
    }, 3000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [testimonialCurrentIndex]);
  return (
    <div className="home-section flex-column testimonial-section">
      <h3 className="title">{strings.testimonials.title}</h3>

      <div className="testimonials-slider">
        {testimonials.map((testimonial) => (
          <div
            className={`testimonial-card ${
              testimonial.id === testimonialCurrentIndex
                ? "active"
                : testimonial.id
            }`}
            key={testimonial.id}
            style={{
              backgroundColor: testimonial.lightColor,
              color: testimonial.darkColor,
            }}
          >
            <div className="content">
              <div className="testimonial-profil">
                <img
                  className="testimonial-profile-img"
                  src={testimonial.imageUrl}
                  alt={`${testimonial.name}'s picture`}
                />
                <p className="testimonial-name">{testimonial.name}</p>
              </div>
              <div className="testimonial-content">
                <p className="testimonial-text">{testimonial.testimonial}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
