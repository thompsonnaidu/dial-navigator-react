import React, { useState, useEffect } from 'react';
import Chart from 'react-google-charts';

const DBTAnalysis = ({ data }) => {
  // State to hold the formatted data for Google Charts, grouped by date
  const [groupedChartData, setGroupedChartData] = useState({});

  useEffect(() => {
    const groupByDate = (data) => {
      return data.reduce((acc, entry) => {
        const date = new Date(entry.submittedDate).toDateString();
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(entry);
        return acc;
      }, {});
    };

    const processChartData = () => {
      const groupedData = groupByDate(data);

      // Create a chart data object for each group
      const chartDataObj = {};

      Object.keys(groupedData).forEach((date) => {
        const formattedData = [
          ['Emotion', 'Rating', { role: 'style' }],
          ['Anxiety', 0, 'color: #e5e4e2'],
          ['Sadness', 0, 'color: #e5e4e2'],
          ['Anger', 0, 'color: #e5e4e2'],
          ['Shame/Guilt', 0, 'color: #e5e4e2'],
          ['Happiness', 0, 'color: #e5e4e2'],
        ];

        groupedData[date].forEach((entry) => {
          formattedData[1][1] += entry.answers.emotional.anxiety;
          formattedData[2][1] += entry.answers.emotional.sadness;
          formattedData[3][1] += entry.answers.emotional.anger;
          formattedData[4][1] += entry.answers.emotional.shame_guilt;
          formattedData[5][1] += entry.answers.emotional.happiness;
        });

        chartDataObj[date] = formattedData;
      });

      setGroupedChartData(chartDataObj);
    };

    processChartData();
  }, [data]);

  return (
    <div>
      {Object.keys(groupedChartData).map((date) => (
        <div key={date}>
          <h2>{date}</h2>
          <Chart
            width={'500px'}
            height={'300px'}
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={groupedChartData[date]}
            options={{
              title: `Emotional Analysis for ${date}`,
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
      ))}
    </div>
  );
};

export default DBTAnalysis;
