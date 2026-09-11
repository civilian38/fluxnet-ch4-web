import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLocationDetails, getEnvironmentTrend } from '../../api/location';
import DateRangeSelector from '../../components/report/DateRangeSelector';
import MainTrendChart from '../../components/report/MainTrendChart';
import MultiVariableSelector from '../../components/report/MultiVariableSelector';
import SubChartList from '../../components/report/SubChartList';
import { ArrowLeft } from 'lucide-react';

const TrendReportPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [locationInfo, setLocationInfo] = useState(null);
    const [trendData, setTrendData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // 날짜 초기값 유틸
    const getToday = () => new Date().toISOString().split('T')[0];
    const get6MonthsAgo = () => {
        const d = new Date();
        d.setMonth(d.getMonth() - 6);
        return d.toISOString().split('T')[0];
    };
    
    const [startDate, setStartDate] = useState(get6MonthsAgo());
    const [endDate, setEndDate] = useState(getToday());
    
    // 선택된 변수 ID 상태
    const [selectedFields, setSelectedFields] = useState([]);

    useEffect(() => {
        const fetchBaseInfo = async () => {
            try {
                const info = await getLocationDetails(id);
                setLocationInfo(info);
            } catch (e) {
                console.error('기본 정보를 불러오는데 실패했습니다.', e);
            }
        };
        fetchBaseInfo();
    }, [id]);

    const fetchTrendData = async (start, end) => {
        setLoading(true);
        setError(null);
        try {
            // 최초 조회 시 fields 파라미터를 생략하여 모든 변수 데이터를 가져옴
            const data = await getEnvironmentTrend(id, start, end);
            setTrendData(data);
        } catch (e) {
            setError("데이터를 불러오는데 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrendData(startDate, endDate);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const handleSearch = (newStart, newEnd) => {
        setStartDate(newStart);
        setEndDate(newEnd);
        fetchTrendData(newStart, newEnd);
    };

    const handleToggleField = (fieldId) => {
        setSelectedFields(prev => 
            prev.includes(fieldId) ? prev.filter(f => f !== fieldId) : [...prev, fieldId]
        );
    };

    const handleRemoveField = (fieldId) => {
        setSelectedFields(prev => prev.filter(f => f !== fieldId));
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', backgroundColor: '#f9f9f9', overflowY: 'auto', overflowX: 'hidden' }}>
            <header style={{ padding: '20px 40px', backgroundColor: '#fff', borderBottom: '1px solid #e5e4e7', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                        <ArrowLeft size={24} color="#08060d" />
                    </button>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '24px' }}>{locationInfo ? locationInfo.name : '로딩 중...'} <span style={{ fontSize: '16px', color: '#6b6375', fontWeight: 'normal' }}>상세 리포트</span></h1>
                    </div>
                </div>
                <DateRangeSelector 
                    initialStart={startDate} 
                    initialEnd={endDate} 
                    onSearch={handleSearch} 
                />
            </header>

            <main style={{ padding: '40px', width: '100%', boxSizing: 'border-box' }}>
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                        <p style={{ color: '#6b6375', fontSize: '18px' }}>데이터를 분석 중입니다...</p>
                    </div>
                ) : error ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px', color: '#ef4444' }}>
                        <p>{error}</p>
                    </div>
                ) : trendData.length === 0 ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                        <p style={{ color: '#6b6375', fontSize: '16px' }}>해당 기간의 데이터가 존재하지 않습니다.</p>
                    </div>
                ) : (
                    <>
                        <section style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', marginBottom: '24px' }}>
                            <h2 style={{ fontSize: '18px', marginTop: 0, marginBottom: '20px' }}>메탄 (CH4) 예측 트렌드</h2>
                            <MainTrendChart data={trendData} />
                        </section>

                        <section style={{ marginBottom: '24px' }}>
                            <MultiVariableSelector 
                                selectedFields={selectedFields} 
                                onToggleField={handleToggleField}
                                onRemoveField={handleRemoveField} 
                            />
                        </section>

                        <SubChartList 
                            data={trendData} 
                            selectedFields={selectedFields} 
                            onRemoveField={handleRemoveField} 
                        />
                    </>
                )}
            </main>
        </div>
    );
};

export default TrendReportPage;
