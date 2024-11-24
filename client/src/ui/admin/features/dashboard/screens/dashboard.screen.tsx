// src/ui/admin/features/dashboard/screens/hotel-bookings/hotel-bookings.screen.tsx
import React from 'react';
import HotelsChart from "../components/hotels/hotels.component.tsx";
import ReservationsChart from "../components/hotel-reservations/hotel-reservations.component.tsx";
import BookingsByStatusChart from "../components/hotel-booking-responses/hotel-booking-responses.component.tsx";

const AdminDashboard:React.FC = () => {
    return (
        <div className='admin-dashboard'>

            <div className="content">
                <div className="home">
                    <HotelsChart/>
                </div>
                <div className="blog">
                    <hr />
                    <ReservationsChart/>
                </div>
                <div className="help">
                    <hr />
                    <BookingsByStatusChart />
                </div>
                <div className="code">
                    <div className="sub-title">Code Content</div>
                    <hr />
                    <div className="txt">
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. In
                            commodi animi vitae vel, et ratione tenetur nemo voluptatem,
                            laboriosam culpa architecto ut minima deleniti. Earum
                            perspiciatis ullam voluptates consequuntur rem.
                        </p>
                    </div>
                </div>
                <div className="about">
                    <div className="sub-title">About Content</div>
                    <hr />
                    <div className="txt">
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. In
                            commodi animi vitae vel, et ratione tenetur nemo voluptatem,
                            laboriosam culpa architecto ut minima deleniti. Earum
                            perspiciatis ullam voluptates consequuntur rem.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;