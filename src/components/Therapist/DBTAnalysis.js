import React, { useState, useEffect } from 'react';
import Chart from 'react-google-charts';

const DBTAnalysis = ({ data }) => {
  // State to hold the formatted data for Google Charts
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Function to process the data into Google Charts format
    const processChartData = () => {
      const formattedData = [
        // Column names for the chart
        ['Emotion', 'Rating', { role: 'style' }],
        // Initialize rows with default values
        ['Anxiety', 0, 'color: #e5e4e2'],
        ['Sadness', 0, 'color: #e5e4e2'],
        ['Anger', 0, 'color: #e5e4e2'],
        ['Shame/Guilt', 0, 'color: #e5e4e2'],
        ['Happiness', 0, 'color: #e5e4e2']
      ];

      // Accumulate the total for each emotion from the data
      data.forEach(entry => {
        formattedData[1][1] += entry.answers.emotional.anxiety; // Anxiety
        formattedData[2][1] += entry.answers.emotional.sadness; // Sadness
        formattedData[3][1] += entry.answers.emotional.anger; // Anger
        formattedData[4][1] += entry.answers.emotional.shame_guilt; // Shame/Guilt
        formattedData[5][1] += entry.answers.emotional.happiness; // Happiness
      });

      // Update state with the new chart data
      setChartData(formattedData);
    };

    processChartData();
  }, [data]);

  return (
    <div>
      <Chart
        width={'500px'}
        height={'300px'}
        chartType="BarChart"
        loader={<div>Loading Chart</div>}
        data={chartData}
        options={{
          title: 'Emotional Analysis',
          chartArea: { width: '50%' },
          hAxis: {
            title: 'Total Rating',
            minValue: 0,
          },
          vAxis: {
            title: 'Emotion',
          },
        }}
      />
    </div>
  );
};

export default DBTAnalysis;
