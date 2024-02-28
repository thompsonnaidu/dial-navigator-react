import React from 'react';
import Chart from 'react-google-charts';

const ChartComponent = ({ data, title }) => (
  <Chart
    width={'100%'}
    height={'300px'}
    chartType="LineChart"
    loader={<div>Loading Chart</div>}
    data={data}
    options={{
      title: title,
      hAxis: { title: 'Date', format: 'MM/dd/yy' },
      vAxis: { title: 'Score', minValue: 0 },
      legend: { position: 'bottom' },
      series: { 0: { curveType: 'function' } },
    }}
  />
);

const transformDataForCategory = (categoryName, subcategories, beckData) => {
  // Sort the data by submittedDate
  beckData.sort((a, b) => new Date(a.submittedDate) - new Date(b.submittedDate));

  // Create the header row with the subcategory titles
  const headers = ['Date', ...subcategories];
  const chartData = [headers];

  beckData.forEach((data) => {
    const row = [new Date(data.submittedDate)];
    const category = data.answers[categoryName];

    subcategories.forEach((subcat) => {
      let value = category[subcat];

      if (typeof value === 'boolean') {
        value = value ? 1 : 0;
      } else if (typeof value === 'object' && value !== null && 'rating' in value) {
        value = parseInt(value.rating) || 0;
      } else if (typeof value === 'string' && value.toLowerCase() === 'yes') {
        value = 1;
      } else if (typeof value === 'string' && value.toLowerCase() === 'no') {
        value = 0;
      }

      row.push(value);
    });

    chartData.push(row);
  });

  return chartData;
};

const BeckReport = ({ beckData }) => {
  // Define category names and their corresponding subcategories
  const categories = {
    emotional: ['anxiety', 'sadness', 'anger', 'shame_guilt', 'happiness', 'other'],
    urges: ['self_harm', 'substance_use', 'disordered_eating', 'other'],
    behavior: ['self_harm', 'substance_use', 'disordered_eating', 'other'],
    dbtSkill: ['mindfulness', 'distressed_tolerance', 'emotional_regulation', 'interpersonal_effectiveness', 'Other'],
    effectivenessDbtSkill: ['mindfulness', 'distressed_tolerance', 'emotional_regulation', 'interpersonal_effectiveness', 'other']
  };

  const charts = Object.entries(categories).map(([categoryName, subcats]) => {
    const chartData = transformDataForCategory(categoryName, subcats, beckData.param);
    return <ChartComponent key={categoryName} data={chartData} title={`Progress for ${categoryName}`} />;
  });

  return (
    <div>
      {charts}
    </div>
  );
};

export default BeckReport;
