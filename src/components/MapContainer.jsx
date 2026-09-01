import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMapEvents, useMap } from 'react-leaflet';
import { getLocations } from '../api/location';
import SummaryModal from './SummaryModal';
import RegionMarker from './RegionMarker';

// 지도 초기 구동 시 최초 화면 영역(Bounding Box)을 상태로 설정
const MapInitializer = ({ setBbox }) => {
    const map = useMap();
    useEffect(() => {
        const bounds = map.getBounds();
        setBbox(`${bounds.getWest()},${bounds.getSouth()},${bounds.getEast()},${bounds.getNorth()}`);
    }, [map, setBbox]);
    return null;
};

// 지도 패닝/줌 이벤트 종료 시 바운딩 박스 갱신
const MapEventHandler = ({ setBbox }) => {
    useMapEvents({
        moveend: (e) => {
            const bounds = e.target.getBounds();
            setBbox(`${bounds.getWest()},${bounds.getSouth()},${bounds.getEast()},${bounds.getNorth()}`);
        }
    });
    return null;
};

const MapContainerComponent = ({ onMarkerClick, selectedRegionId }) => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bbox, setBbox] = useState('');

    // Bounding Box 영역이 변경될 때마다 화면에 표시할 위치 마커 데이터 페치
    useEffect(() => {
        let isMounted = true;
        const fetchLocations = async () => {
            if (!bbox) return;
            setLoading(true);
            try {
                const data = await getLocations(bbox);
                if (isMounted && data && data.features) {
                    setLocations(data.features);
                }
            } catch (error) {
                console.error("Failed to fetch locations", error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchLocations();
        return () => { isMounted = false; };
    }, [bbox]);

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            {/* 초기 로딩 화면: 데이터가 비어있고 로딩 중일 때 표시할 스피너 */}
            {loading && locations.length === 0 && (
                <div style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#2b5c46'
                }}>
                    <div className="map-spinner"></div>
                    <p style={{ marginTop: '12px', fontWeight: 'bold', fontSize: '15px' }}>지도를 불러오는 중...</p>
                </div>
            )}

            <MapContainer 
                center={[36.5, 127.5]} 
                zoom={7} 
                style={{ width: '100%', height: '100%', zIndex: 0 }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'
                />
                <MapInitializer setBbox={setBbox} />
                <MapEventHandler setBbox={setBbox} />
                
                {locations.map(feature => (
                    <RegionMarker 
                        key={feature.id}
                        id={feature.id}
                        lat={feature.geometry.coordinates[1]}
                        lng={feature.geometry.coordinates[0]}
                        onClick={onMarkerClick}
                    />
                ))}
            </MapContainer>

            {/* 특정 지역 마커를 클릭하여 띄우는 요약 모달 */}
            {selectedRegionId && (
                <SummaryModal 
                    regionId={selectedRegionId} 
                    onClose={() => onMarkerClick(null)} 
                />
            )}

            <style>{`
                .map-spinner {
                    width: 48px;
                    height: 48px;
                    border: 4px solid rgba(43, 92, 70, 0.15);
                    border-top: 4px solid #2b5c46;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin { 
                    0% { transform: rotate(0deg); } 
                    100% { transform: rotate(360deg); } 
                }
            `}</style>
        </div>
    );
};

export default MapContainerComponent;
