import { Route, Routes } from "react-router-dom";
import About from "./ui/features/about/screens/about.screen.tsx";
import UserLayout from "./ui/layouts/main.layout.tsx";
import { strings } from "./i18n/strings";
import { replaceSpace } from "./utils/string-manipulation";
import Contact from "./ui/features/contact/screens/contact.screen.tsx";
import Explore from "./ui/features/explore/screens/explore.screen.tsx";
import Home from "./ui/features/home/screens/home.screen.tsx";
import SignIn from "./ui/features/signIn/screens/sign-in.screen.tsx";
import SignUp from "./ui/features/signUp/screens/sign-up.screen.tsx";
import Blog from "./ui/features/blog/screens/blog.screen.tsx";
import ResetPassword from "./ui/features/forgotPassword/screens/forgot-password.screen.tsx";
import {AuthProvider} from "./contexts/traveler-auth.context.tsx";
import AdminLayout from "./ui/layouts/admin.layout.tsx";
import AdminDashboard from "./ui/admin/features/dashboard/screens/dashboard.screen.tsx";
import AdminBlogs from "./ui/admin/features/blog/screens/blogs/blogs.screen.tsx";
import PrivateRoute from "./contexts/private-route.tsx";
import AdminAddBlog from "./ui/admin/features/blog/components/add-blog.component.tsx";
import AdminUpdateBlog from "./ui/admin/features/blog/components/update-blog.component.tsx";
import AdminCities from "./ui/admin/features/city/screens/citiess.screen.tsx";
import AdminAddCity from "./ui/admin/features/city/components/add-city.component.tsx";
import AdminUpdateCity from "./ui/admin/features/city/components/update-blog.component.tsx";
import AdminBlogImages from "./ui/admin/features/blog/screens/blog-images/blog-images.screen.tsx";
import AdminBlogTags from "./ui/admin/features/blog/screens/blog-tags/blog-tags.screen.tsx";
import AdminAddBlogTag from "./ui/admin/features/blog/screens/blog-tags/add-blog-tag.screen.tsx";
import AdminUpdateBlogTag from "./ui/admin/features/blog/screens/blog-tags/update-blog-tag.screen.tsx";
import AdminUsers from "./ui/admin/features/user/screens/users/users.screen.tsx";
import AdminUpdateUser from "./ui/admin/features/user/screens/users/update-user.screen.tsx";
import AdminInterestsPage from "./ui/admin/features/user/screens/interests/interests.screen.tsx";
import AdminUpdateUserInterests from "./ui/admin/features/user/screens/user-interests/update-user-interests.screen.tsx";
import AdminAddInterest from "./ui/admin/features/user/screens/interests/add-interest.screen.tsx";
import AdminUpdateInterest from "./ui/admin/features/user/screens/interests/update-interests.screen.tsx";
import AdminEvents from "./ui/admin/features/event/screens/events/events.screen.tsx";
import AdminAddEvent from "./ui/admin/features/event/screens/events/add-event.screen.tsx";
import AdminUpdateEvent from "./ui/admin/features/event/screens/events/update-event.screen.tsx";
import AdminBlogComments from "./ui/admin/features/blog/screens/blog-comments/blog-comments.screen.tsx";
import AdminAddHotel from "./ui/admin/features/hotel/screens/hotels/add-hotel.screen.tsx";
import AdminHotels from "./ui/admin/features/hotel/screens/hotels/hotels.screen.tsx";
import HotelsPage from "./ui/features/hotel/screens/hotels/hotels.screen.tsx";
import HotelDetailsPage from "./ui/features/hotel-details/screens/hotel-details/hotel-details.screen.tsx";
import ConfirmBookingPage from "./ui/features/hotel-details/screens/confirm-booking/confirm-booking.screen.tsx";
import AdminHotelBookingsPage from "./ui/admin/features/hotel/screens/hotel-bookngs/hotel-bookiings.screen.tsx";
import AdminUpdateHotelBookings from "./ui/admin/features/hotel/screens/hotel-bookngs/update-hotel-booking.screen.tsx";
import {adminRoles, allRoles, hostRoles, travelerRoles} from "./utils/roleVariables.ts";
import HostDashboard from "./ui/host/feature/dashboard/screens/host-dashboard.screen.tsx";
import HostLayout from "./ui/layouts/host.layout.tsx";
import AdminUpdateHotel from "./ui/admin/features/hotel/screens/hotels/update-event.screen.tsx";
import HostHotelBookingsPage from "./ui/host/feature/hotel/screens/hotel-bookngs/hotel-bookiings.screen.tsx";
import HostUpdateHotelBookings from "./ui/host/feature/hotel/screens/hotel-bookngs/update-hotel-booking.screen.tsx";
import HotelReservationsPage from "./ui/features/myReservations/screens/reservations/reservations.screen.tsx";
import ReservedUsers from "./ui/host/feature/hotel/screens/reserved-users/reserved-users.screen.tsx";
import HotelHostReservationsByCustomerPage
  from "./ui/host/feature/hotel/screens/reservations-by-customer/reservations-by-customer.screen.tsx";
import AdminHotelServicesComponent from "./ui/admin/features/hotel/screens/hotel-services/hotel-services.screen.tsx";
import AdminAddHotelServiceScreen from "./ui/admin/features/hotel/screens/hotel-services/add-hotel-service.screen.tsx";
import MemoryGame from "./ui/features/event-game/screens/event-game.screen.tsx";
import AdminEventCards from "./ui/admin/features/event/screens/event-cards/event-cards.screen.tsx";
import AdminAddEventCard from "./ui/admin/features/event/screens/event-cards/add-event-card.screen.tsx";
import EventPage from "./ui/features/event/screens/event/event.screen.tsx";
import HostHotels from "./ui/host/feature/hotel/screens/hotels/hotels.screen.tsx";
import TravelerUpdateUserInterests
  from "./ui/features/user-interest/screens/user-interests/update-user-interests.screen.tsx";
import AllLayout from "./ui/layouts/all.layout.tsx";
import PublicRoute from "./contexts/public-route.tsx";
import ContinueReservationScreen from "./ui/features/continue-reservation/screens/continue-reservation.screen.tsx";

function App() {

  return (
      <AuthProvider>
        <Routes>
          <Route path="/user-interests" element={<AllLayout />}>
            <Route
                path="/user-interests"
                element={<PrivateRoute role={allRoles} element={<TravelerUpdateUserInterests />} />}
            />
          </Route>
          <Route path="/" element={<UserLayout />}>
            <Route
                index
                element={<PublicRoute element={<Home />} />}
            />
            <Route
              path={`/${replaceSpace(strings.navbar.about)}`}
              element={<About />}
            />
            <Route
                path={`/${replaceSpace(strings.navbar.signin)}`}
                element={<SignIn />}
            />
            <Route
                path={`/${replaceSpace(strings.navbar.signup)}`}
                element={<SignUp />}
            />
            {/*<Route*/}
            {/*  path={`/${replaceSpace(strings.navbar.exclusive)}`}*/}
            {/*  element={<Exclusive />}*/}
            {/*/>*/}
            <Route
              path={`/${replaceSpace(strings.navbar.explore)}`}
              element={<Explore />}
            />
            <Route
                path={`/${replaceSpace(strings.paths.blog)}`}
                element={<Blog />}
            />
            <Route
              path={`/${replaceSpace(strings.navbar.contact)}`}
              element={<Contact />}
            />
            <Route
              path={`/${replaceSpace(strings.navbar.exclusive)}`}
              element={<HotelsPage />}
            />
            <Route
              path={`/hotels/:id`}
              element={<HotelDetailsPage />}
            />
            <Route
              path={`/event/:eventId`}
              element={<EventPage />}
            />
            <Route
              path={`/memory-game/:eventId`}
              element={<MemoryGame />}
            />
            <Route
              path={`/confirm-booking/:hotelId`}
              element={<PrivateRoute role={travelerRoles} element={<ConfirmBookingPage />} />}
            />
            <Route path="/reset-password/:token" element={<ResetPassword/>} />


            <Route
                path={`/${replaceSpace(strings.navbar.traveler.reservations)}`}
                element={
                  <PrivateRoute
                      role={allRoles}
                      element={<HotelReservationsPage />}
                  />
                }
            />

            <Route path="/my-reservations/continue/:reservationId" element={<ContinueReservationScreen />} />
          </Route>







          <Route path="/admin" element={<AdminLayout/>}>
            <Route index element={<PrivateRoute role={adminRoles} element={<AdminDashboard />} />} />

            {/*  users */}
            <Route
                path="/admin/users"
                element={<PrivateRoute role={adminRoles} element={<AdminUsers />} />}
            />
            <Route
                path="/admin/interests"
                element={<PrivateRoute role={adminRoles} element={<AdminInterestsPage />} />}
            />
            <Route
                path="/admin/add-interest"
                element={<PrivateRoute role={adminRoles} element={<AdminAddInterest />} />}
            />
            <Route
                path="/admin/update-interest/:id"
                element={<PrivateRoute role={adminRoles} element={<AdminUpdateInterest />} />}
            />
            <Route
                path="/admin/update-user-interests/:id"
                element={<PrivateRoute role={adminRoles} element={<AdminUpdateUserInterests />} />}
            />

            <Route
                path="/admin/update-user/:id"
                element={<PrivateRoute role={adminRoles} element={<AdminUpdateUser />} />}
            />

            {/*blogs*/}
            <Route
                path="/admin/blogs"
                element={<PrivateRoute role={adminRoles} element={<AdminBlogs />} />}
            />
            <Route
                path="/admin/blog-tags"
                element={<PrivateRoute role={adminRoles} element={<AdminBlogTags />} />}
            />
            <Route
                path="/admin/blog-comments/:blogId"
                element={<PrivateRoute role={adminRoles} element={<AdminBlogComments />} />}
            />
            <Route
                path="/admin/add-blog"
                element={<PrivateRoute role={adminRoles} element={<AdminAddBlog />} />}
            />
            <Route
                path="/admin/add-blog-tag"
                element={<PrivateRoute role={adminRoles} element={<AdminAddBlogTag />} />}
            />
            <Route
                path="/admin/update-blog/:id"
                element={<PrivateRoute role={adminRoles} element={<AdminUpdateBlog />} />}
            />
            <Route
                path="/admin/update-blog-tag/:id"
                element={<PrivateRoute role={adminRoles} element={<AdminUpdateBlogTag />} />}
            />

            {/*events*/}
            <Route
                path="/admin/events"
                element={<PrivateRoute role={adminRoles} element={<AdminEvents />} />}
            />
            <Route
                path="/admin/event-cards/:eventId"
                element={<PrivateRoute role={adminRoles} element={<AdminEventCards />} />}
            />
            <Route
                path="/admin/add-event"
                element={<PrivateRoute role={adminRoles} element={<AdminAddEvent />} />}
            />
            <Route
                path="/admin/add-event-card/:eventId"
                element={<PrivateRoute role={adminRoles} element={<AdminAddEventCard />} />}
            />
            <Route
                path="/admin/update-event/:id"
                element={<PrivateRoute role={adminRoles} element={<AdminUpdateEvent />} />}
            />


            {/*hotels*/}
            <Route
                path="/admin/hotels"
                element={<PrivateRoute role={adminRoles} element={<AdminHotels />} />}
            />
            <Route
                path="/admin/hotel-services/:hotelId"
                element={<PrivateRoute role={adminRoles} element={<AdminHotelServicesComponent />} />}
            />
            <Route
                path="/admin/add-hotel-service/:hotelId"
                element={<PrivateRoute role={adminRoles} element={<AdminAddHotelServiceScreen />} />}
            />
            <Route
                path="/admin/booking-hotels/:hotelId"
                element={<PrivateRoute role={adminRoles} element={<AdminHotelBookingsPage />} />}
            />
            <Route
                path="/admin/update-hotel-booking/:id"
                element={<PrivateRoute role={adminRoles} element={<AdminUpdateHotelBookings />} />}
            />
            <Route
                path="/admin/add-hotel"
                element={<PrivateRoute role={adminRoles} element={<AdminAddHotel />} />}
            />
            <Route
                path="/admin/update-hotel/:id"
                element={<PrivateRoute role={adminRoles} element={<AdminUpdateHotel />} />}
            />


            {/*cities*/}
            <Route
                path="/admin/cities"
                element={<PrivateRoute role={adminRoles} element={<AdminCities />} />}
            />
            <Route
                path="/admin/add-city"
                element={<PrivateRoute role={adminRoles} element={<AdminAddCity />} />}
            />
            <Route
                path="/admin/update-city/:id"
                element={<PrivateRoute role={adminRoles} element={<AdminUpdateCity />} />}
            />
            <Route
                path="/admin/blog-images/:blogId"
                element={<PrivateRoute role={adminRoles} element={<AdminBlogImages />} />}
            />
          </Route>
          {/*  host */}
          <Route path="/host" element={<HostLayout/>}>
            <Route index
                   element={<PrivateRoute role={hostRoles} element={<HostDashboard />} />}
            />

            {/*  host's hotels */}
            <Route
                path="/host/hotels"
                element={<PrivateRoute role={hostRoles} element={<HostHotels />} />}
            />
            <Route
                path="/host/booking-hotels/:hotelId"
                element={<PrivateRoute role={hostRoles} element={<HostHotelBookingsPage />} />}
            />
            <Route
                path="/host/hotel-services/:hotelId"
                element={<PrivateRoute role={hostRoles} element={<AdminHotelServicesComponent />} />}
            />
            <Route
                path="/host/update-hotel-booking/:id"
                element={<PrivateRoute role={hostRoles} element={<HostUpdateHotelBookings />} />}
            />
            <Route
                path="/host/add-hotel"
                element={<PrivateRoute role={hostRoles} element={<AdminAddHotel />} />}
            />
            <Route
                path="/host/update-hotel/:id"
                element={<PrivateRoute role={hostRoles} element={<AdminUpdateHotel />} />}
            />
            <Route
                path="/host/reserved-users"
                element={<PrivateRoute role={hostRoles} element={<ReservedUsers />} />}
            />
            <Route
                path="/host/reservations-by-customer/:customerId"
                element={<PrivateRoute role={hostRoles} element={<HotelHostReservationsByCustomerPage />} />}
            />
          </Route>
        </Routes>
      </AuthProvider>
  );
}

export default App;
