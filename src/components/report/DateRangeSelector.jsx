import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';

const DateRangeSelector = ({ initialStart, initialEnd, onSearch }) => {
    const [tempStart, setTempStart] = useState(initialStart);
    const [tempEnd, setTempEnd] = useState(initialEnd);
    const [error, setError] = useState('');

    useEffect(() => {
        setTempStart(initialStart);
        setTempEnd(initialEnd);
    }, [initialStart, initialEnd]);

    const getFormattedDate = (date) => date.toISOString().split('T')[0];

    const setPresetDays = (days) => {
        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - days);
        setTempStart(getFormattedDate(start));
        setTempEnd(getFormattedDate(end));
        setError('');
    };

    const setPresetMonths = (months) => {
        const end = new Date();
        const start = new Date();
        start.setMonth(end.getMonth() - months);
        setTempStart(getFormattedDate(start));
        setTempEnd(getFormattedDate(end));
        setError('');
    };

    const handleSearch = () => {
        if (new Date(tempStart) > new Date(tempEnd)) {
            setError('시작일은 종료일보다 이전이어야 합니다.');
            return;
        }
        setError('');
        onSearch(tempStart, tempEnd);
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'relative' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => setPresetDays(7)} style={presetBtnStyle}>최근 7일</button>
                <button onClick={() => setPresetDays(30)} style={presetBtnStyle}>최근 30일</button>
                <button onClick={() => setPresetMonths(6)} style={presetBtnStyle}>최근 6개월</button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #e5e4e7', padding: '6px 12px', borderRadius: '8px', backgroundColor: '#fff' }}>
                <Calendar size={18} color="#6b6375" />
                <input 
                    type="date" 
                    value={tempStart} 
                    onChange={(e) => { setTempStart(e.target.value); setError(''); }} 
                    style={inputStyle} 
                />
                <span style={{ color: '#6b6375' }}>~</span>
                <input 
                    type="date" 
                    value={tempEnd} 
                    onChange={(e) => { setTempEnd(e.target.value); setError(''); }} 
                    style={inputStyle} 
                />
            </div>
            <button 
                onClick={handleSearch} 
                disabled={!!error} 
                style={{ ...searchBtnStyle, opacity: error ? 0.5 : 1, cursor: error ? 'not-allowed' : 'pointer' }}
            >
                조회
            </button>
            {error && (
                <span style={{ position: 'absolute', bottom: '-20px', right: '70px', color: '#ef4444', fontSize: '12px' }}>
                    {error}
                </span>
            )}
        </div>
    );
};

const presetBtnStyle = {
    padding: '6px 12px', borderRadius: '6px', border: '1px solid #e5e4e7', backgroundColor: '#f4f3ec', cursor: 'pointer', fontSize: '14px', color: '#08060d', transition: 'background-color 0.2s'
};
const inputStyle = {
    border: 'none', outline: 'none', fontSize: '14px', fontFamily: 'inherit', color: '#08060d', background: 'transparent', cursor: 'pointer'
};
const searchBtnStyle = {
    padding: '8px 16px', borderRadius: '8px', border: 'none', backgroundColor: '#4ade80', color: '#08060d', fontWeight: 'bold', fontSize: '14px', transition: 'transform 0.1s'
};

export default DateRangeSelector;
