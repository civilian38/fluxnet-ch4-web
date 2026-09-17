import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMapEvents, useMap } from 'react-leaflet';
import SummaryModal from './SummaryModal';
import RegionMarker from './RegionMarker';

// 지도 초기 구동 시 Bounding Box 설정
const MapInitializer = ({ onBoundsChange }) => {
    const map = useMap();
    useEffect(() => {
        const bounds = map.getBounds();
        onBoundsChange(`${bounds.getWest()},${bounds.getSouth()},${bounds.getEast()},${bounds.getNorth()}`);
    }, [map, onBoundsChange]);
    return null;
};

// 유저의 상호작용(드래그, 줌)에 의한 지도 이동과 코드에 의한 이동을 분리하여 감지
const MapEventHandler = ({ onUserMove, onBoundsChange }) => {
    const isUserAction = useRef(false);

    useMapEvents({
        dragstart: () => { isUserAction.current = true; },
        zoomstart: () => { isUserAction.current = true; },
        moveend: (e) => {
            const bounds = e.target.getBounds();
            const bboxStr = `${bounds.getWest()},${bounds.getSouth()},${bounds.getEast()},${bounds.getNorth()}`;
            
            if (isUserAction.current) {
                onUserMove(bboxStr);
                isUserAction.current = false;
            } else {
                onBoundsChange(bboxStr);
            }
        }
    });
    return null;
};

// 외부 상태(mapCenter) 변경에 따라 지도 중심을 부드럽게 이동시킴
const MapCenterUpdater = ({ mapCenter }) => {
    const map = useMap();
    useEffect(() => {
        if (mapCenter) {
            map.flyTo([mapCenter.lat, mapCenter.lng], 13, { duration: 1.5 });
        }
    }, [mapCenter, map]);
    return null;
};

const MapContainerComponent = ({ 
    locations, 
    loading, 
    onUserMove, 
    onBoundsChange, 
    onMarkerClick, 
    selectedRegionId, 
    mapCenter 
}) => {
    const cartoKey = import.meta.env.VITE_CARTO_KEY;

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            {loading && locations.length === 0 && (
                <div style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#2b5c46'
                }}>
                    <div className="map-spinner"></div>
                    <p style={{ marginTop: '12px', fontWeight: 'bold', fontSize: '15px' }}>위치 정보를 불러오는 중...</p>
                </div>
            )}

            <MapContainer 
                center={[36.5, 127.5]} 
                zoom={7} 
                style={{ width: '100%', height: '100%', zIndex: 0 }}
            >
                <TileLayer
                    url={`https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png?key=${cartoKey}`}
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />
                <MapInitializer onBoundsChange={onBoundsChange} />
                <MapEventHandler onUserMove={onUserMove} onBoundsChange={onBoundsChange} />
                <MapCenterUpdater mapCenter={mapCenter} />
                
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
