// src/data/home-page/testimonials.data.ts
import girlBlue from "../../assets/images/home/testimonials/caracters/les-cacartères_Plan-de-travail-1.jpg"
import manBlue from "../../assets/images/home/testimonials/caracters/les-cacartères-02.jpg"
import womanPink from "../../assets/images/home/testimonials/caracters/les-cacartères-03.jpg"
import girlPurple from "../../assets/images/home/testimonials/caracters/les-cacartères-04.jpg"
import smilingPinkWoman from "../../assets/images/home/testimonials/caracters/les-cacartères-05.jpg"
import manWhite from "../../assets/images/home/testimonials/caracters/les-cacartères-06.jpg"
import womanGray from "../../assets/images/home/testimonials/caracters/les-cacartères-07.jpg"
import manWhite2 from "../../assets/images/home/testimonials/caracters/les-cacartères-08.jpg"
import girlCrossed from "../../assets/images/home/testimonials/caracters/les-cacartères-09.jpg"
import blondeWoman from "../../assets/images/home/testimonials/caracters/les-cacartères-10.jpg"

interface Testimonial {
    id: number;
    name: string;
    lightColor:string;
    darkColor:string;
    testimonial: string;
    imageUrl: string; // URL of the user's image
    rate: number;
}
const lightCyan ="#7dd0f4"
const lightBlue ="#12d2ff"
const darkPink ="#e930ef"
const primaryBlue ="#3d00f9"
const white ="#ffffff"
// const darkYellow ="#b48c00"
// const lightPink ="#f9b9ff"
// const lightRed ="#ffb7d2"
// const darkRed ="#8d0010"
const testimonials: Testimonial[] = [
    {
        id: 11,
        name: "Sarah Wilson",
        lightColor:darkPink,
        darkColor:white,
        testimonial: "A perfect getaway! The home was cozy and well-equipped.",
        imageUrl: girlPurple,
        rate: 5
    },
    {
        id: 1,
        name: "Emily Johnson",
        lightColor:lightCyan,
        darkColor:primaryBlue,
        testimonial: "Amazing experience! The home was exactly as described and the host was very accommodating.",
        imageUrl: womanPink,
        rate: 4
    },
    {
        id: 2,
        name: "John Doe",
        lightColor:darkPink,
        darkColor:white,
        testimonial: "The house was beautiful and clean. We had a wonderful time!",
        imageUrl: manBlue,
        rate: 4
    },
    {
        id: 3,
        name: "Jane Smith",
        lightColor:lightBlue,
        darkColor:primaryBlue,
        testimonial: "Great location and comfortable stay. Would definitely recommend to others.",
        imageUrl: girlBlue,
        rate: 5
    },
    {
        id: 4,
        name: "Michael Brown",
        lightColor:lightCyan,
        darkColor:primaryBlue,
        testimonial: "Nice place, close to amenities. Host was very responsive.",
        imageUrl: manWhite,
        rate: 1
    },
    {
        id: 5,
        name: "Sarah Wilson",
        lightColor:darkPink,
        darkColor:white,
        testimonial: "A perfect getaway! The home was cozy and well-equipped.",
        imageUrl: girlPurple,
        rate: 5
    },
    {
        id: 6,
        name: "Laura Garcia",
        lightColor:lightBlue,
        darkColor:primaryBlue,
        testimonial: "Very good experience. The host was friendly and helpful.",
        imageUrl: smilingPinkWoman,
        rate: 3
    },
    {
        id: 7,
        name: "David Martinez",
        lightColor:lightCyan,
        darkColor:primaryBlue,
        testimonial: "Excellent stay. The neighborhood was lovely and the home was spacious.",
        imageUrl: manWhite2,
        rate: 4
    },
    {
        id: 8,
        name: "Jane Lee",
        lightColor:darkPink,
        darkColor:white,
        testimonial: "Fantastic home! We enjoyed our stay very much.",
        imageUrl: womanGray,
        rate: 5
    },
    {
        id: 9,
        name: "Emma Clark",
        lightColor:lightBlue,
        darkColor:primaryBlue,
        testimonial: "Good place to stay. Convenient and clean.",
        imageUrl: girlCrossed,
        rate: 4
    },
    {
        id: 10,
        name: "Jane Anderson",
        testimonial: "Lovely home in a great location. Highly recommended.",
        lightColor:lightCyan,
        darkColor:primaryBlue,
        imageUrl: blondeWoman,
        rate: 2
    },
    // {
    //     id: 11,
    //     name: "Sophia Harris",
    //     lightColor:lightPink,
    //     darkColor:darkPink,
    //     testimonial: "Comfortable and clean. We had a pleasant stay.",
    //     imageUrl: profile2
    // },
    // {
    //     id: 12,
    //     name: "Christopher White",
    //     lightColor:lightRed,
    //     darkColor:darkRed,
    //     testimonial: "Outstanding experience. The home was perfect for our family.",
    //     imageUrl: profile3
    // },
    // {
    //     id: 13,
    //     name: "Olivia Thompson",
    //     lightColor:lightYellow,
    //     darkColor:darkYellow,
    //     testimonial: "A luxurious stay! The home exceeded our expectations.",
    //     imageUrl: profile1
    // },
    // {
    //     id: 14,
    //     name: "Liam Robinson",
    //     lightColor:lightBlue,
    //     darkColor:darkBlue,
    //     testimonial: "Good value for money. The place was well-maintained.",
    //     imageUrl: profile4
    // },
    // {
    //     id: 15,
    //     name: "Isabella Walker",
    //     lightColor:lightPink,
    //     darkColor:darkPink,
    //     testimonial: "Beautiful home and great service. We had an amazing time!",
    //     imageUrl: profile1
    // }
];

export {
    testimonials
};
