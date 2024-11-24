// src/models/explore-place-event/test-data/explore-place-events.data.ts



interface Event {
    explorePlace:string;
    title: string;
    exactPlace: string;
    price: string;
    rate: number;
    image: string;
}

const explorePlaceEvents: Event[] = [
    // Carthage Events
    {
        explorePlace: '66b21c9a6a230313979be1d5',
        title: "Carthage Ruins",
        exactPlace: "National Museum",
        price: "$30",
        rate: 4.5,
        image: './test-data/events/carthage/carthage-tour.jpg'
    },
    {
        explorePlace: '66b21c9a6a230313979be1d5',
        title: "Ancient History",
        exactPlace: "Byrsa Hill",
        price: "$25",
        rate: 4.7,
        image: './test-data/events/carthage/byrsa-hill.jpg'
    },
    {
        explorePlace: '66b21c9a6a230313979be1d5',
        title: "Site Exploration",
        exactPlace: "Antonine Baths",
        price: "$35",
        rate: 4.6,
        image: './test-data/events/carthage/antonine-baths.jpg'
    },
    // Sidi Bou Said Events
    {
        explorePlace: '66b21c9a6a230313979be1d7',
        title: "Artistic Workshop",
        exactPlace: "Centre des Arts",
        price: "$20",
        rate: 4.8,
        image: './test-data/events/sidi-bou-said/centre-des-arts.jpg'
    },
    {
        explorePlace: '66b21c9a6a230313979be1d7',
        title: "Ennejma Ezzahra",
        exactPlace: "Ennejma Ezzahra",
        price: "$15",
        rate: 4.7,
        image: './test-data/events/sidi-bou-said/ennejma-ezzahra.jpg'
    },
    {
        explorePlace: '66b21c9a6a230313979be1d7',
        title: "Boat Ride",
        exactPlace: "Marina Sidi Bou Said",
        price: "$25",
        rate: 4.9,
        image: './test-data/events/sidi-bou-said/marina.webp'
    },
    // Djerba Events
    {
        explorePlace: '66b21c9a6a230313979be1d9',
        title: "Relaxation Day",
        exactPlace: "Sidi Mahrez Beach",
        price: "$40",
        rate: 4.5,
        image: './test-data/events/djerba/sidi-mahrez-beach.jpg'
    },
    {
        explorePlace: '66b21c9a6a230313979be1d9',
        title: "Market Tour",
        exactPlace: "Houmt Souk",
        price: "$10",
        rate: 4.4,
        image: './test-data/events/djerba/houmt-souk.webp'
    },
    {
        explorePlace: '66b21c9a6a230313979be1d9',
        title: "Heritage Museum",
        exactPlace: "Djerba Heritage Museum",
        price: "$25",
        rate: 4.6,
        image: './test-data/events/djerba/djerba-heritage-museum.webp'
    },
];


export {
    explorePlaceEvents
}