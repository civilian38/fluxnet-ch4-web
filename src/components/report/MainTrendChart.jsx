import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const MainTrendChart = ({ data }) => {
    return (
        <div style={{ width: '100%', height: '320px' }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                    data={data} 
                    syncId="trend-charts" // Tooltip 동기화를 위한 핵심 속성
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e4e7" />
                    <XAxis 
                        dataKey="date" 
                        tick={{ fill: '#6b6375', fontSize: 12 }} 
                        tickMargin={12} 
                        minTickGap={30} 
                    />
                    <YAxis 
                        domain={['auto', 'auto']} 
                        tick={{ fill: '#6b6375', fontSize: 12 }} 
                        tickMargin={10} 
                        width={60} 
                    />
                    <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        labelStyle={{ color: '#08060d', fontWeight: 'bold', marginBottom: '8px' }}
                        formatter={(value) => [`${Number(value).toFixed(2)} ppm`, 'CH4 예측값']}
                    />
                    <Line 
                        type="monotone" 
                        dataKey="ch4_value" 
                        stroke="#2b5c46" 
                        strokeWidth={3} 
                        dot={false} 
                        activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }} 
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MainTrendChart;
