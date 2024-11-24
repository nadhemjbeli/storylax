import hikingTunisia from "../assets/images/blogs/hiking-tunisia.png"
import jemTunisia from "../assets/images/blogs/jem-tunisia.png"
import sousseMedina from "../assets/images/blogs/sousse-walking-tour-medina-history.png"
import streetFood from "../assets/images/blogs/street-food-staples-tunisia.png"
// Define a type for blog items
interface BlogItem {
    id: number;
    title: string;
    subtitle: string;
    excerpt: string;
    imageUrl: string;
    promoted?:boolean;
    tagName?:string;
    link: string;
}
// Sample blog items data
const blogHomeItems: BlogItem[] = [
    {
        id: 1,
        title: 'Hiking in Tunisia',
        subtitle:'12 Best Hikes for Outdoor and Nature Lovers',
        excerpt: 'Hiking in Tunisia is a rewarding experience where enthusiasts can explore the diverse landscape and immerse themselves in the ultimate cultural journey.',
        imageUrl: hikingTunisia,
        promoted:false,
        tagName:"author",
        link: '#',
    },
    {
        id: 2,
        title: 'Medina of Sousse',
        subtitle:'A coastal town in the north of Tunisia',
        excerpt: 'Sousse was a crucial port during the Aghlabid period (800–909). It epitomizes a town from the early centuries of Islam and showcases Arabo-Muslim urbanism. Marked by its kasbah, ramparts, medina with the Great Mosque and ribat, it was an integral part of a coastal defense system. ',
        imageUrl: sousseMedina,
        tagName:"author",
        link: '#',
        promoted: false
    },
    {
        id: 3,
        title: 'The Amphitheatre of El Jem',
        subtitle:'One of the first sites to be included in this renowned list',
        excerpt: 'The Amphitheatre of El Jem, stands as a testament to the grandeur of Imperial Rome. It boasts the ruins of North Africa\'s largest colosseum as it could accommodate up to 35,000 spectators.',
        imageUrl: jemTunisia,
        tagName:"author",
        link: '#',
        promoted: true
    },
    {
        id: 4,
        title: 'Tunisian Cuisine',
        subtitle:'The Tastier Street Foods You Must Try in Tunisia',
        excerpt: 'You never visit a country without eating its streetfood. No matter what diet you’re on, savoring what locals usually eat when they cannot go back home is an incredible experience for your taste buds. ',
        imageUrl: streetFood,
        tagName:"author",
        link: '#',
        promoted: false
    },
];

export {blogHomeItems}