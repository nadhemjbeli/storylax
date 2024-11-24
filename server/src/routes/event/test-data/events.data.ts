
interface EventPlace {
    _id?: string;
    city: string;
    title: string;
    resume: string;
    description: string;
    startDate: string;
    endDate: string;
    author: string;
    principalImage:string
}

const events: EventPlace[] = [
    // Carthage Events
    {
        city: '66b0a299e99baa7d4bba53cf',
        title: "Carthage Ruins Guided Tour",
        description:'<p>description</p>',
        resume: "Join a guided tour to explore the ancient ruins of Carthage and learn about its rich history and significance.",
        startDate: "2024-08-19",
        endDate: "2024-08-22",
        author: '66ac08a5e7abf5633e3d967a',
        principalImage:'./test-data/events/carthage-ruins.jpg',
    },
    {
        city: '66b0a299e99baa7d4bba53cf',
        title: "Carthage History Lecture",
        description:'<p>description</p>',
        resume: "Attend a lecture by a renowned historian on the fascinating history of Carthage.",
        startDate: "2024-08-19",
        endDate: "2024-08-20",
        author: '66ac08a5e7abf5633e3d967a',
        principalImage:'./test-data/events/carthage-ruins.jpg',
    },
    {
        city: '66b0a299e99baa7d4bba53cf',
        title: "Carthage Archaeological Workshop",
        description:'<p>description</p>',
        resume: "Participate in an archaeological workshop and get hands-on experience in uncovering ancient artifacts.",
        startDate: "2024-08-23",
        endDate: "2024-08-25",
        author: '66ac08a5e7abf5633e3d967a',
        principalImage:'./test-data/events/carthage-ruins.jpg',
    },
    {
        city: '66b0a299e99baa7d4bba53cf',
        title: "Carthage Sunset Photography Session",
        description:'<p>description</p>',
        resume: "Capture the beauty of Carthage at sunset during a guided photography session.",
        startDate: "2024-08-25",
        endDate: "2024-08-26",
        author: '66ac08a5e7abf5633e3d967a',
        principalImage:'./test-data/events/carthage-ruins.jpg',
    },
    {
        city: '66b0a299e99baa7d4bba53cf',
        title: "Carthage Cultural Festival",
        description:'<p>description</p>',
        resume: "Enjoy a day at the Carthage Cultural Festival, featuring local music, dance, and food.",
        startDate: "2024-08-12",
        endDate: "2024-08-12",
        author: '66ac08a5e7abf5633e3d967a',
        principalImage:'./test-data/events/carthage-ruins.jpg',
    },
    {
        city: '66b0a299e99baa7d4bba53cf',
        title: "Carthage Historical Reenactment",
        description:'<p>description</p>',
        resume: "Experience a live reenactment of significant events from Carthage's rich history.",
        startDate: "2024-08-22",
        endDate: "2024-08-24",
        author: '66ac08a5e7abf5633e3d967a',
        principalImage:'./test-data/events/carthage-ruins.jpg',
    },
    {
        city: '66b0a299e99baa7d4bba53cf',
        title: "Carthage Food and Juice Festival",
        description:'<p>description</p>',
        resume: "Indulge in a variety of local foods and Juices at the Carthage Food and Juice Festival.",
        startDate: "2024-08-13",
        endDate: "2024-08-16",
        author: '66ac08a5e7abf5633e3d967a',
        principalImage:'./test-data/events/carthage-ruins.jpg',
    },
    {
        city: '66b0a299e99baa7d4bba53cf',
        title: "Carthage Food and Juice Festival",
        description:'<p>description</p>',
        resume: "Indulge in a variety of local foods and Juices at the Carthage Food and Juice Festival.",
        startDate: "2024-08-14",
        endDate: "2024-08-16",
        author: '66ac08a5e7abf5633e3d967a',
        principalImage:'./test-data/events/carthage-ruins.jpg',
    },
    // Sidi Bou Said Events
    {
        city: '66b0a299e99baa7d4bba53e2',
        title: "Sidi Bou Said Art Workshop",
        description:'<p>description</p>',
        resume: "Join a workshop and learn to create art inspired by the beauty of Sidi Bou Said.",
        startDate: "2024-08-19",
        endDate: "2024-08-21",
        author: '66ac08a5e7abf5633e3d967a',
        principalImage:'./test-data/events/discover-sidi-bou-said.webp',
    },
    {
        city: '66b0a299e99baa7d4bba53e2',
        title: "Sidi Bou Said Walking Tour",
        description:'<p>description</p>',
        resume: "Explore the charming streets of Sidi Bou Said on a guided walking tour.",
        startDate: "2024-08-21",
        endDate: "2024-08-22",
        author: '66ac08a5e7abf5633e3d967a',
        principalImage:'./test-data/events/discover-sidi-bou-said.webp',
    },
    {
        city: '66b0a299e99baa7d4bba53e2',
        title: "Sidi Bou Said Music Night",
        description:'<p>description</p>',
        resume: "Enjoy an evening of live music at one of Sidi Bou Said's scenic spots.",
        startDate: "2024-08-23",
        endDate: "2024-08-24",
        author: '66ac08a5e7abf5633e3d967a',
        principalImage:'./test-data/events/discover-sidi-bou-said.webp',
    },
    {
        city: '66b0a299e99baa7d4bba53e2',
        title: "Sidi Bou Said Photography Workshop",
        description:'<p>description</p>',
        resume: "Learn photography techniques to capture the stunning views of Sidi Bou Said.",
        startDate: "2024-08-25",
        endDate: "2024-08-27",
        author: '66ac08a5e7abf5633e3d967a',
        principalImage:'./test-data/events/discover-sidi-bou-said.webp',
    },
    {
        city: '66b0a299e99baa7d4bba53e2',
        title: "Sidi Bou Said Craft Market",
        description:'<p>description</p>',
        resume: "Visit the craft market to find unique handmade items and souvenirs.",
        startDate: "2024-08-27",
        endDate: "2024-08-29",
        author: '66ac08a5e7abf5633e3d967a',
        principalImage:'./test-data/events/discover-sidi-bou-said.webp',
    },
    // Djerba Events
    {
        city: '66b0bfa3a4b7bec7403afeef',
        title: "Djerba Beach Yoga",
        description:'<p>description</p>',
        resume: "Start your day with a relaxing yoga session on the beautiful beaches of Djerba.",
        startDate: "2024-08-19",
        endDate: "2024-08-20",
        author: '66ac08a5e7abf5633e3d967a',
        principalImage:'./test-data/events/activities-on-djerba.webp',
    },
    {
        city: '66b0bfa3a4b7bec7403afeef',
        title: "Djerba Market Tour",
        description:'<p>description</p>',
        resume: "Explore the vibrant markets of Djerba and discover local crafts and cuisine.",
        startDate: "2024-08-21",
        endDate: "2024-08-22",
        author: '66ac08a5e7abf5633e3d967a',
        principalImage:'./test-data/events/activities-on-djerba.webp',
    },
    {
        city: '66b0bfa3a4b7bec7403afeef',
        title: "Djerba Cultural Show",
        description:'<p>description</p>',
        resume: "Experience a cultural show featuring traditional music and dance from Djerba.",
        startDate: "2024-08-23",
        endDate: "2024-08-24",
        author: '66ac08a5e7abf5633e3d967a',
        principalImage:'./test-data/events/activities-on-djerba.webp',
    },
    {
        city: '66b0bfa3a4b7bec7403afeef',
        title: "Djerba Sailing Excursion",
        description:'<p>description</p>',
        resume: "Enjoy a sailing excursion around the island of Djerba, taking in the stunning coastal views.",
        startDate: "2024-08-25",
        endDate: "2024-08-28",
        author: '66ac08a5e7abf5633e3d967a',
        principalImage:'./test-data/events/activities-on-djerba.webp',
    },
    {
        city: '66b0bfa3a4b7bec7403afeef',
        title: "Djerba History Museum Tour",
        description:'<p>description</p>',
        resume: "Visit the Djerba History Museum and learn about the island's rich cultural heritage.",
        startDate: "2024-08-15",
        endDate: "2024-08-18",
        author: '66ac08a5e7abf5633e3d967a',
        principalImage:'./test-data/events/activities-on-djerba.webp',
    }
];

export {
    events,
    EventPlace
};
