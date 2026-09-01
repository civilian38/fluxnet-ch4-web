import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import MapContainerComponent from '../components/MapContainer';

const MainDashboardPage = () => {
    // 선택된 지역 ID 상태: 모달 노출 유무 제어에 사용
    const [selectedRegionId, setSelectedRegionId] = useState(null);

    return (
        <div style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden' }}>
            <Sidebar />
            <div style={{ flexGrow: 1, position: 'relative', width: 'calc(100vw - 320px)', height: '100vh' }}>
                <MapContainerComponent 
                    onMarkerClick={setSelectedRegionId} 
                    selectedRegionId={selectedRegionId} 
                />
            </div>
        </div>
    );
};

export default MainDashboardPage;
