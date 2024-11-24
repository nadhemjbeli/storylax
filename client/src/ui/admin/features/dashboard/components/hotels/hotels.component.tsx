// src/ui/admin/features/dashboard/components/hotels/hotels.component.tsx
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2'; // Change from Bar to Line
import { getHotels } from '../../../../../../data/hotel/hotel.data';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register required components for the line chart
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const HotelsChart: React.FC = () => {
    const [chartData, setChartData] = useState<any>({
        labels: [],
        datasets: []
    });

    useEffect(() => {
        const fetchHotelData = async () => {
            try {
                const { data } = await getHotels();
                // Extract city names and count hotels per city
                const cityCounts: { [key: string]: number } = {};

                data.forEach((hotel: any) => {
                    const cityName = hotel.city?.name || 'Unknown';
                    if (cityCounts[cityName]) {
                        cityCounts[cityName] += 1;
                    } else {
                        cityCounts[cityName] = 1;
                    }
                });

                const labels = Object.keys(cityCounts);
                const counts = Object.values(cityCounts);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Number of Hotels per City',
                            data: counts,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)', // This won't be visible in a line chart
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 2,
                            fill: false, // Set to true if you want to fill the area under the line
                            tension: 0.3, // Smoothness of the line
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching hotel data:', error);
            }
        };

        fetchHotelData();
    }, []);

    return (
        <div>
            <h2>Hotels Distribution by City</h2>
            <Line data={chartData} options={{
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Number of Hotels per City',
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true, // Ensure the Y-axis starts at 0
                    },
                },
            }} />
        </div>
    );
};

export default HotelsChart;
