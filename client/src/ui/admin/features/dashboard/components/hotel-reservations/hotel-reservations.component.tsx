import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getHotelReservations } from '../../../../../../data/hotel/hotel-reservations.data';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const ReservationsByStateChart: React.FC = () => {
    const [chartData, setChartData] = useState<any>({
        labels: [],
        datasets: []
    });

    useEffect(() => {
        const fetchReservationData = async () => {
            try {
                const { data } = await getHotelReservations();
                // Count reservations by travelerKeyState
                const stateCounts: { [key: string]: number } = {};

                data.forEach((reservation: any) => {
                    const state = reservation.travelerKeyState || 'Unknown';
                    if (stateCounts[state]) {
                        stateCounts[state] += 1;
                    } else {
                        stateCounts[state] = 1;
                    }
                });

                const labels = Object.keys(stateCounts);
                const counts = Object.values(stateCounts);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Number of Reservations by Traveler State',
                            data: counts,
                            backgroundColor: 'rgba(153, 102, 255, 0.2)',
                            borderColor: 'rgba(153, 102, 255, 1)',
                            borderWidth: 1,
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching reservation data:', error);
            }
        };

        fetchReservationData();
    }, []);

    return (
        <div>
            <h2>Reservations by Traveler Key State</h2>
            <Bar data={chartData} options={{
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Number of Reservations by Traveler Key State',
                    },
                },
            }} />
        </div>
    );
};

export default ReservationsByStateChart;
