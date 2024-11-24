// src/models/explore-place/test-data/header.data.ts

interface Place {
    // title: string;
    description: string;
    image: string;
    city: string;
    motivationalSentence: string;
}

const placesToExplore: Place[] = [
    {
        // title: "Carthage",
        description: "Carthage is an ancient city located on the coast of Tunisia, near the capital, Tunis. It was once a powerful city-state and remains a significant archaeological site with impressive ruins that tell the story of its rich history.",
        image: './test-data/places-to-explore/carthage.jpg',
        motivationalSentence: "Discover the ancient wonders of Carthage and walk through the pages of history!",
        city:'66b0a299e99baa7d4bba53cf'
    },
    {
        // title: "Sidi Bou Said",
        description: "Sidi Bou Said is a charming coastal village known for its distinctive blue and white architecture. Nestled on a hill overlooking the Mediterranean Sea, it's a favorite spot for artists and tourists alike, offering breathtaking views and a serene atmosphere.",
        image: './test-data/places-to-explore/sidi-bousaid.jpg',
        motivationalSentence: "Let the beauty of Sidi Bou Said inspire your soul and ignite your creativity!",
        city:'66b0a299e99baa7d4bba53e2'
    },
    {
        // title: "Djerba",
        description: "Djerba is an island off the coast of Tunisia, famed for its beautiful beaches, vibrant markets, and rich cultural heritage. It's a perfect destination for relaxation and exploration, blending traditional Tunisian culture with modern amenities.",
        image: './test-data/places-to-explore/djerba.jpg',
        motivationalSentence: "Escape to the idyllic island of Djerba, where paradise awaits you!",
        city:'66b0bfa3a4b7bec7403afeef'
    }
];


export {
    placesToExplore,
}