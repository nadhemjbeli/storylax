// src/ui/admin/features/dashboard/components/hotel-booking-responses/hotel-booking-responses.component.tsx
import React, { useEffect, useState } from 'react';
import './hotel-booking-responses.style.scss'
import { Doughnut } from 'react-chartjs-2';
import { getAllBookings } from '../../../../../../data/hotel/booking-hotel.data.ts';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const BookingsByStatusChart: React.FC = () => {
    const [chartData, setChartData] = useState<any>({
        labels: [],
        datasets: []
    });

    useEffect(() => {
        const fetchBookingData = async () => {
            try {
                const { data } = await getAllBookings();

                // Count bookings by status
                const statusCounts: { [key: string]: number } = {
                    accepted: 0,
                    'in progress': 0,
                    rejected: 0
                };

                data.forEach((booking: any) => {
                    const status = booking.status || 'Unknown';
                    if (statusCounts[status] !== undefined) {
                        statusCounts[status] += 1;
                    } else {
                        statusCounts['Unknown'] = (statusCounts['Unknown'] || 0) + 1;
                    }
                });

                const labels = Object.keys(statusCounts);
                const counts = Object.values(statusCounts);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Number of Bookings by Status',
                            data: counts,
                            backgroundColor: [
                                'rgba(75, 192, 192, 0.6)', // Accepted
                                'rgba(255, 206, 86, 0.6)', // In Progress
                                'rgba(255, 99, 132, 0.6)', // Rejected
                            ],
                            borderColor: [
                                'rgba(75, 192, 192, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(255, 99, 132, 1)',
                            ],
                            borderWidth: 1,
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching booking data:', error);
            }
        };

        fetchBookingData();
    }, []);

    return (
        <div className='booking-by-status'>
            <h2>Bookings by Status</h2>
            <Doughnut data={chartData} options={{
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Number of Bookings by Status',
                    },
                },
            }} />
        </div>
    );
};

export default BookingsByStatusChart;
