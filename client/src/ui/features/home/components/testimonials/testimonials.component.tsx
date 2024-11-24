// src/ui/features/home/components/testimonials/testimonials.component.tsx
import React, {useEffect, useState} from "react";
import { testimonials } from "../../../../../data/home-page/testimonials.data.ts";
import { ReactComponent as OpenQuote } from "../../../../../assets/svg/home/testimonials/open-quote.svg";
import { ReactComponent as CloseQuote } from "../../../../../assets/svg/home/testimonials/close-quote.svg";
import { ReactComponent as FilledStar } from "../../../../../assets/svg/home/testimonials/filled-star.svg";
import { ReactComponent as UnFilledStar } from "../../../../../assets/svg/home/testimonials/unfilled-star.svg";
import "./testimonials.styles.scss";
import { strings } from "../../../../../i18n/strings.ts";

interface TestimonialProps {
  // Add any props you want to pass to the Home component here
}

const Testimonials: React.FC<TestimonialProps> = () => {
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
    <div className="home-section flex-column testimonials-section">
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
                {/*<Message/>*/}
              <div className="testimonial-profil">
                <img
                  className="testimonial-profile-img"
                  src={testimonial.imageUrl}
                  alt={`${testimonial.name}'s picture`}
                />
                  <p className="testimonial-name">{testimonial.name}</p>
              </div>
                <div className="testimonial-content">
                    <OpenQuote className="testimonial-open-quote"/>
                    <p className="testimonial-text">{testimonial.testimonial}</p>
                    {/* Star Rating System */}
                    <div className="testimonial-rating">
                        {Array.from({ length: 5 }, (_, i) => (
                            <React.Fragment key={i}>
                                {testimonial.rate > i ? (
                                    <FilledStar className="star filled" />
                                ) : (
                                    <UnFilledStar className="star unfilled" />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                    <CloseQuote className="testimonial-close-quote"/>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
