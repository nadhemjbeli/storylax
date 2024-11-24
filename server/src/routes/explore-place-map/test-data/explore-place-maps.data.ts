// src/models/explore-place-map/test-data/explore-place-maps.data.ts

interface Place {
    explorePlace: string;
    // exploreMap: string;
    image: string;
    title: string;
    type?:string;
    city?:string;
    description: string;
    location: { lat: number, lon: number };
    transportation: string;
}

interface MapData{
    type:string,
    cardIcon:string,
    color:string,
    icon: string,
    list:Array<Place>
}

const monuments: Place[] = [
    // Monuments related to Carthage
    {
        explorePlace: '66b21c9a6a230313979be1d5',
        // exploreMap: '0',
        image: './test-data/details/monument.jpg',
        title: "Roman Amphitheatre",
        description: "An impressive Roman amphitheater that hosted gladiatorial games and public spectacles in ancient times.",
        location: { lat: 36.8565, lon: 10.3308 },
        transportation: "Bus, Taxi, Walking"
    },
    {
        explorePlace: '66b21c9a6a230313979be1d5',
        // exploreMap: '0',
        image: './test-data/details/monument.jpg',
        title: "Byrsa Hill",
        description: "A historical site that includes the ruins of ancient Carthage and offers panoramic views of the city.",
        location: { lat: 36.8528, lon: 10.3222 },
        transportation: "Bus, Taxi, Walking"
    },
    {
        explorePlace: '66b21c9a6a230313979be1d5',
        // exploreMap: '0',
        image: './test-data/details/monument.jpg',
        title: "Antonine Baths",
        description: "The largest Roman bath complex in Carthage, showcasing the grandeur of Roman architecture and engineering.",
        location: { lat: 36.8415, lon: 10.3187 },
        transportation: "Bus, Taxi, Walking"
    },

    // Monuments related to Sidi Bou Said
    {
        explorePlace: '66b21c9a6a230313979be1d7',
        // exploreMap: '0',
        image: './test-data/details/monument.jpg',
        title: "Ennejma Ezzahra",
        description: "A palace and museum that showcases traditional Tunisian and Andalusian architecture and art.",
        location: { lat: 36.8700, lon: 10.3434 },
        transportation: "Bus, Taxi, Walking"
    },
    {
        explorePlace: '66b21c9a6a230313979be1d7',
        // exploreMap: '0',
        image: './test-data/details/monument.jpg',
        title: "Dar El Annabi",
        description: "A historic house turned museum, offering insights into the traditional Tunisian lifestyle and culture.",
        location: { lat: 36.8695, lon: 10.3429 },
        transportation: "Bus, Taxi, Walking"
    },
    {
        explorePlace: '66b21c9a6a230313979be1d7',
        // exploreMap: '0',
        image: './test-data/details/monument.jpg',
        title: "Sidi Bou Said Lighthouse",
        description: "A lighthouse offering stunning views of the Mediterranean Sea and the surrounding landscape.",
        location: { lat: 36.8712, lon: 10.3445 },
        transportation: "Bus, Taxi, Walking"
    },

    // Monuments related to Djerba
    {
        explorePlace: '66b21c9a6a230313979be1d9',
        // exploreMap: '0',
        image: './test-data/details/monument.jpg',
        title: "El Ghriba Synagogue",
        description: "One of the oldest synagogues in the world, with a rich history and significance for the Jewish community.",
        location: { lat: 33.7994, lon: 10.8532 },
        transportation: "Bus, Taxi, Walking"
    },
    {
        explorePlace: '66b21c9a6a230313979be1d9',
        // exploreMap: '0',
        image: './test-data/details/monument.jpg',
        title: "Houmt Souk",
        description: "The main town on Djerba island, known for its bustling markets, historic mosques, and charming streets.",
        location: { lat: 33.8750, lon: 10.8561 },
        transportation: "Bus, Taxi, Walking"
    },
    {
        explorePlace: '66b21c9a6a230313979be1d9',
        // exploreMap: '0',
        image: './test-data/details/monument.jpg',
        title: "Djerba Explore Park",
        description: "A cultural park featuring a museum, crocodile farm, and recreated traditional Tunisian village.",
        location: { lat: 33.8103, lon: 10.9926 },
        transportation: "Bus, Taxi, Walking"
    }
];

const mostVisitedPlaces: Place[] = [
    // Most visited places related to Carthage
    {
        explorePlace: '66b21c9a6a230313979be1d5',
        // exploreMap: '0',
        image: './test-data/details/visited-place.jpg',
        title: "Carthage Museum",
        description: "A museum housing a vast collection of artifacts from the Punic, Roman, and Byzantine periods.",
        location: { lat: 36.8531, lon: 10.3221 },
        transportation: "Bus, Taxi, Walking"
    },
    {
        explorePlace: '66b21c9a6a230313979be1d5',
        // exploreMap: '0',
        image: './test-data/details/visited-place.jpg',
        title: "Saint Louis Cathedral",
        description: "A striking cathedral built in the 19th century, now used as a venue for cultural events.",
        location: { lat: 36.8522, lon: 10.3218 },
        transportation: "Bus, Taxi, Walking"
    },
    {
        explorePlace: '66b21c9a6a230313979be1d5',
        // exploreMap: '0',
        image: './test-data/details/visited-place.jpg',
        title: "Tophet of Carthage",
        description: "An ancient burial ground where the remains of Carthaginian children were interred.",
        location: { lat: 36.8476, lon: 10.3145 },
        transportation: "Bus, Taxi, Walking"
    },

    // Most visited places related to Sidi Bou Said
    {
        explorePlace: '66b21c9a6a230313979be1d7',
        // exploreMap: '0',
        image: './test-data/details/visited-place.jpg',
        title: "Cafe des Nattes",
        description: "A historic cafe known for its traditional Tunisian tea and stunning views of the village.",
        location: { lat: 36.8701, lon: 10.3416 },
        transportation: "Bus, Taxi, Walking"
    },
    {
        explorePlace: '66b21c9a6a230313979be1d7',
        // exploreMap: '0',
        image: './test-data/details/visited-place.jpg',
        title: "Sidi Bou Said Port",
        description: "A picturesque port offering beautiful views of the Mediterranean Sea and the village.",
        location: { lat: 36.8735, lon: 10.3417 },
        transportation: "Bus, Taxi, Walking"
    },
    {
        explorePlace: '66b21c9a6a230313979be1d7',
        // exploreMap: '0',
        image: './test-data/details/visited-place.jpg',
        title: "Sidi Bou Said Art Gallery",
        description: "A gallery showcasing the works of local artists and the unique blue-and-white architecture of the village.",
        location: { lat: 36.8697, lon: 10.3421 },
        transportation: "Bus, Taxi, Walking"
    },

    // Most visited places related to Djerba
    {
        explorePlace: '66b21c9a6a230313979be1d9',
        // exploreMap: '0',
        image: './test-data/details/visited-place.jpg',
        title: "Djerba Beach",
        description: "A beautiful sandy beach perfect for relaxation, swimming, and water sports.",
        location: { lat: 33.8088, lon: 10.9998 },
        transportation: "Bus, Taxi, Walking"
    },
    {
        explorePlace: '66b21c9a6a230313979be1d9',
        // exploreMap: '0',
        image: './test-data/details/visited-place.jpg',
        title: "Borj El Kebir",
        description: "A historic fortress offering panoramic views of the surrounding area and the sea.",
        location: { lat: 33.8774, lon: 10.8573 },
        transportation: "Bus, Taxi, Walking"
    },
    {
        explorePlace: '66b21c9a6a230313979be1d9',
        // exploreMap: '0',
        image: './test-data/details/visited-place.jpg',
        title: "Guellala Museum",
        description: "A museum dedicated to the history and culture of the island, showcasing traditional crafts and artifacts.",
        location: { lat: 33.7500, lon: 10.8500 },
        transportation: "Bus, Taxi, Walking"
    }
];
const monumentIcon = '<svg xmlns="http://www.w3.org/2000/svg" style="fill:#2c5cff" viewBox="0 0 384 512"> ' +
    '<path d="M180.7 4.7c6.2-6.2 16.4-6.2 22.6 0l80 80c2.5 2.5 4.1 5.8 4.6 9.3l40.2 322L55.9 416 96.1 94c.4-3.5 2-6.8 4.6-9.3l80-80zM152 272c-13.3 0-24 10.7-24 24s10.7 24 24 24l80 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-80 0zM32 448l320 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 512c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/> ' +
    '</svg>'
const placeIcon = '<svg xmlns="http://www.w3.org/2000/svg" style="fill:#e37d0a" viewBox="0 0 384 512">'+
    '<path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>'+
    '</svg>'

const mapData: MapData[] = [
    {
        type:"monument",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" style="fill:#2c5cff" viewBox="0 0 384 512"> <path d="M180.7 4.7c6.2-6.2 16.4-6.2 22.6 0l80 80c2.5 2.5 4.1 5.8 4.6 9.3l40.2 322L55.9 416 96.1 94c.4-3.5 2-6.8 4.6-9.3l80-80zM152 272c-13.3 0-24 10.7-24 24s10.7 24 24 24l80 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-80 0zM32 448l320 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 512c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/> </svg>',
        cardIcon:"./test-data/maps/monument.icon.svg",
        color:"#2c5cff",
        list: monuments,
    },
    {
        type:"place",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" style="fill:#e37d0a" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>',
        cardIcon:"./test-data/maps/location.icon.svg",
        color:"#e37d0a",
        list: mostVisitedPlaces,
    }
]

export {
    monuments,
    Place,
    MapData,
    mapData
}
