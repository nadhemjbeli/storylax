import carthageTour from "../../assets/images/explore/events/carthage/carthage-tour.jpg";
import byrsaHill from "../../assets/images/explore/events/carthage/byrsa-hill.jpg";
import antonineBaths from "../../assets/images/explore/events/carthage/antonine-baths.jpg";
import centreDesArts from "../../assets/images/explore/events/sidi-bou-said/centre-des-arts.jpg";
import ennejmaEzzahra from "../../assets/images/explore/events/sidi-bou-said/ennejma-ezzahra.jpg";
import marina from "../../assets/images/explore/events/sidi-bou-said/marina.webp";
import sidiMahrezBeach from "../../assets/images/explore/events/djerba/sidi-mahrez-beach.jpg";

interface Itinerary {
    id: number;
    explorePlace:string;
    title: string;
    exactPlace: string;
    description: string;
    image: string;
}
export interface IItinerary {
    explorePlace:any;
    title: string;
    exactPlace: string;
    description: string;
    image: string;
}

const itineraryData: Itinerary[] = [
    // Carthage Events
    {
        id: 0,
        explorePlace: '66b21c9a6a230313979be1d5',
        title: "Explore Carthage Ruins",
        exactPlace: "National Museum of Carthage",
        description: "Discover the historical ruins of Carthage. A journey through ancient times awaits you.",
        image: carthageTour
    },
    {
        id: 1,
        explorePlace: '66b21c9a6a230313979be1d5',
        title: "Ancient History Tour",
        exactPlace: "Byrsa Hill",
        description: "Delve into the rich history of Carthage with a visit to Byrsa Hill. Learn about the city's storied past.",
        image: byrsaHill
    },
    {
        id: 2,
        explorePlace: '66b21c9a6a230313979be1d5',
        title: "Explore Antonine Baths",
        exactPlace: "Antonine Baths",
        description: "Take a guided tour of the Antonine Baths, one of the largest Roman bath complexes in Africa.",
        image: antonineBaths
    },
    {
        id: 3,
        explorePlace: '66b21c9a6a230313979be1d5',
        title: "Explore Antonine Baths",
        exactPlace: "Antonine Baths",
        description: "Take a guided tour of the Antonine Baths, one of the largest Roman bath complexes in Africa.",
        image: antonineBaths
    },
    // Sidi Bou Said Events
    {
        id: 4,
        explorePlace: '66b21c9a6a230313979be1d7',
        title: "Art Workshop Experience",
        exactPlace: "Centre des Arts",
        description: "Engage in an artistic workshop at Centre des Arts. Unleash your creativity in a picturesque setting.",
        image: centreDesArts
    },
    {
        id: 5,
        explorePlace: '66b21c9a6a230313979be1d7',
        title: "Visit Ennejma Ezzahra",
        exactPlace: "Ennejma Ezzahra",
        description: "Tour the Ennejma Ezzahra palace, a masterpiece of architecture and history.",
        image: ennejmaEzzahra
    },
    {
        id: 6,
        explorePlace: '66b21c9a6a230313979be1d7',
        title: "Relaxing Boat Ride",
        exactPlace: "Marina Sidi Bou Said",
        description: "Enjoy a serene boat ride at Marina Sidi Bou Said. A perfect way to unwind and take in the views.",
        image: marina
    },
    // Djerba Events
    {
        id: 6,
        explorePlace: '66b21c9a6a230313979be1d9',
        title: "Beach Day at Sidi Mahrez",
        exactPlace: "Sidi Mahrez Beach",
        description: "Spend a relaxing day at Sidi Mahrez Beach. Sunbathe, swim, and enjoy the beautiful coastline.",
        image: sidiMahrezBeach
    }
]

export {
    itineraryData
}