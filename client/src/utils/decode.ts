// // src/utils/decode.ts
// import Cookies from 'js-cookie';
// // Import jwtDecode correctly based on module export
// import jwtDecode, { JwtPayload } from 'jwt-decode';
//
// // Define an interface that extends JwtPayload for custom claims
// interface CustomTokenPayload extends JwtPayload {
//     // Add fields according to your JWT payload
//     userId: string;
//     email: string;
// }
//
// export const getDecodedToken = (): CustomTokenPayload | null => {
//     try {
//         // Get the token from cookies
//         const token = Cookies.get('storylax-token');
//
//         // If the token exists, decode it
//         if (token) {
//             return jwtDecode<CustomTokenPayload>(token);
//         }
//
//         // Return null if the token doesn't exist
//         return null;
//     } catch (error) {
//         console.error('Failed to decode token:', error);
//         // Return null if decoding fails
//         return null;
//     }
// };
