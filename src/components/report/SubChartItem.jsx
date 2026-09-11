import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { X } from 'lucide-react';

const SubChartItem = ({ data, fieldMeta, onRemove }) => {
    return (
        <div style={{ 
            backgroundColor: '#fff', 
            padding: '20px 24px', 
            borderRadius: '12px', 
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', 
            position: 'relative', 
            animation: 'slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1)' 
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: fieldMeta.color }}></div>
                    {fieldMeta.name} 
                    <span style={{ color: '#6b6375', fontSize: '13px', fontWeight: 'normal' }}>
                        {fieldMeta.unit ? `(${fieldMeta.unit})` : ''}
                    </span>
                </h3>
                <button 
                    onClick={onRemove} 
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex', alignItems: 'center', padding: '4px', borderRadius: '4px', transition: 'background-color 0.2s' }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f4f3ec'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                    <X size={18} />
                </button>
            </div>
            
            <div style={{ width: '100%', height: '200px' }}>
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
                            tickMargin={10} 
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
                            formatter={(value) => [`${Number(value).toFixed(2)} ${fieldMeta.unit}`, fieldMeta.name]}
                        />
                        <Line 
                            type="monotone" 
                            dataKey={fieldMeta.id} 
                            stroke={fieldMeta.color} 
                            strokeWidth={2} 
                            dot={false} 
                            activeDot={{ r: 5, stroke: '#fff', strokeWidth: 2 }} 
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <style>{`
                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-20px) scaleY(0.95); }
                    to { opacity: 1; transform: translateY(0) scaleY(1); }
                }
            `}</style>
        </div>
    );
};

export default SubChartItem;
