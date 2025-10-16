import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { GenderDistribution, HeightData } from '../../types';

interface ChartsProps {
  genderDistribution: GenderDistribution[];
  heightData: HeightData[];
}

const GENDER_COLORS = {
  'Male': '#4A90E2',
  'Female': '#E24A90',
  'Hermaphrodite': '#9A4AE2',
  'Unknown': '#888888'
};

export const Charts: React.FC<ChartsProps> = ({ genderDistribution, heightData }) => {
  const renderCustomizedLabel = (entry: any) => {
    return `${entry.percentage}%`;
  };

  const getGenderColor = (gender: string): string => {
    return GENDER_COLORS[gender as keyof typeof GENDER_COLORS] || '#888888';
  };

  const pieChartData = genderDistribution.map(item => ({
    ...item,
    name: item.gender
  }));

  const barChartData = heightData.map(item => ({
    ...item
  }));

  return (
    <div className="charts-container">
      <div className="chart-section">
        <h4 className="chart-title">Gender Distribution</h4>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {pieChartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={getGenderColor(entry.gender)} 
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: any, name: any, props: any) => [
                  `${value} (${props.payload.percentage}%)`,
                  'Count'
                ]}
                labelFormatter={(label: any) => `Gender: ${label}`}
              />
              <Legend 
                formatter={(value: any, entry: any) => `${entry.payload.gender} (${entry.payload.count})`}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-section">
        <h4 className="chart-title">Resident Heights</h4>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={barChartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 215, 0, 0.2)" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12, fill: '#ffffff' }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#ffffff' }}
                label={{ value: 'Height (cm)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#ffffff' } }}
              />
              <Tooltip 
                formatter={(value: any) => [`${value} cm`, 'Height']}
                labelFormatter={(label: any) => `Resident: ${label}`}
                contentStyle={{
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  border: '1px solid rgba(255, 215, 0, 0.3)',
                  borderRadius: '6px',
                  color: '#ffffff'
                }}
              />
              <Bar dataKey="height" fill="#4A90E2" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};