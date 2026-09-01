import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLocationDetails } from '../api/location';
import { X, RefreshCw } from 'lucide-react';

const SummaryModal = ({ regionId, onClose }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const fetchData = async () => {
        setLoading(true);
        setError(false);
        try {
            const result = await getLocationDetails(regionId);
            setData(result);
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (regionId) {
            fetchData();
        }
    }, [regionId]);

    // 바깥 영역 클릭 시 모달 닫기
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // 상세히 보기: 클릭 이펙트를 위해 딜레이 부여 후 상세 페이지로 라우팅
    const handleDetailClick = (e) => {
        const btn = e.currentTarget;
        btn.classList.add('btn-clicked');
        setTimeout(() => {
            onClose();
            navigate(`/report/${regionId}`);
        }, 150);
    };

    return (
        <div 
            onClick={handleOverlayClick}
            style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.25)', 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                backdropFilter: 'blur(2px)' 
            }}
        >
            <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                width: '340px',
                padding: '28px 24px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                position: 'relative',
                animation: 'slideUp 0.3s ease-out'
            }}>
                <button onClick={onClose} style={{
                    position: 'absolute', top: '16px', right: '16px',
                    background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af',
                    transition: 'color 0.2s'
                }} onMouseOver={(e) => e.currentTarget.style.color = '#08060d'}
                   onMouseOut={(e) => e.currentTarget.style.color = '#9ca3af'}>
                    <X size={22} />
                </button>

                {loading ? (
                    // 로딩 중일 때 노출되는 스켈레톤 UI
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', animation: 'pulse 1.5s infinite' }}>
                        <div style={{ height: '28px', width: '50%', backgroundColor: '#f4f3ec', borderRadius: '6px' }}></div>
                        <div style={{ height: '16px', width: '35%', backgroundColor: '#f4f3ec', borderRadius: '4px' }}></div>
                        <div style={{ height: '80px', width: '100%', backgroundColor: '#f4f3ec', borderRadius: '8px', marginTop: '16px' }}></div>
                        <div style={{ height: '48px', width: '100%', backgroundColor: '#f4f3ec', borderRadius: '8px', marginTop: '16px' }}></div>
                    </div>
                ) : error ? (
                    // 데이터 페칭 실패 시 에러 및 새로고침 UI
                    <div style={{ textAlign: 'center', padding: '30px 0' }}>
                        <p style={{ color: '#6b6375', marginBottom: '20px', fontSize: '15px', lineHeight: '1.5' }}>
                            요약 정보를 불러올 수 없습니다.<br/>다시 시도해주세요.
                        </p>
                        <button onClick={fetchData} style={{
                            background: 'white', border: '1px solid #e5e4e7', padding: '10px 20px', borderRadius: '8px',
                            cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#08060d',
                            fontWeight: '500', transition: 'background-color 0.2s'
                        }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
                           onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}>
                            <RefreshCw size={18} /> 새로고침
                        </button>
                    </div>
                ) : (
                    // 데이터 수신 성공 시 정보 바인딩
                    <div>
                        <h2 style={{ margin: '0 0 8px 0', fontSize: '22px', color: '#08060d', fontWeight: 'bold' }}>{data.name}</h2>
                        <p style={{ margin: 0, color: '#6b6375', fontSize: '14px' }}>
                            위도: {data.latitude.toFixed(4)}, 경도: {data.longitude.toFixed(4)}
                        </p>
                        
                        <div style={{
                            margin: '24px 0',
                            padding: '20px',
                            backgroundColor: '#f4f3ec', 
                            borderRadius: '12px',
                            textAlign: 'center'
                        }}>
                            <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#6b6375', fontWeight: '500' }}>최근 메탄(CH4) 예측값</p>
                            <p style={{ margin: 0, fontSize: '28px', fontWeight: 'bold', color: data.latest_ch4_prediction !== null ? '#2b5c46' : '#9ca3af' }}>
                                {data.latest_ch4_prediction !== null ? `${data.latest_ch4_prediction.toFixed(2)} ppm` : '데이터 없음'}
                            </p>
                        </div>

                        <button 
                            onClick={handleDetailClick}
                            className="summary-btn"
                            style={{
                                width: '100%',
                                padding: '14px',
                                backgroundColor: '#4ade80',
                                color: '#08060d',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '16px',
                                fontWeight: '700',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s, transform 0.1s'
                            }}
                        >
                            상세히 보기
                        </button>
                    </div>
                )}
            </div>

            <style>{`
                @keyframes pulse {
                    0% { opacity: 0.6; }
                    50% { opacity: 1; }
                    100% { opacity: 0.6; }
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .summary-btn:hover {
                    background-color: #22c55e !important;
                }
                .btn-clicked {
                    transform: scale(0.96);
                    background-color: #16a34a !important;
                }
            `}</style>
        </div>
    );
};

export default SummaryModal;
