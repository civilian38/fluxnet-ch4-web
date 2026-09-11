import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import MapContainerComponent from '../components/MapContainer';
import { getLocations } from '../api/location';

const MainDashboardPage = () => {
    const [selectedRegionId, setSelectedRegionId] = useState(null);
    const [locations, setLocations] = useState([]);
    const [bbox, setBbox] = useState('');
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(true);
    const [mapCenter, setMapCenter] = useState(null);

    // Bbox나 SearchText가 변경될 때마다 데이터 갱신 (Debounce 적용)
    useEffect(() => {
        let isMounted = true;
        const fetchLocations = async () => {
            if (!bbox && !searchText) return;
            setLoading(true);
            try {
                // 검색어가 입력되어 있으면 화면(bbox)에 구애받지 않고 전체에서 검색
                const params = searchText 
                    ? { search: searchText } 
                    : { bbox: bbox };
                    
                const data = await getLocations(params);
                if (isMounted && data && data.features) {
                    setLocations(data.features);
                }
            } catch (error) {
                console.error("Failed to fetch locations", error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        const debounceTimer = setTimeout(fetchLocations, 300);
        return () => {
            isMounted = false;
            clearTimeout(debounceTimer);
        };
    }, [bbox, searchText]);

    // 유저가 직접 마우스/터치로 지도를 이동(패닝/줌)시켰을 때 호출
    const handleUserMapMove = (newBbox) => {
        if (searchText) {
            setSearchText(''); // 유저 지도 이동 시 검색창 초기화
        }
        setBbox(newBbox);
    };

    // 사이드바 목록 클릭 등 프로그래매틱하게 지도가 이동했거나 초기화될 때 호출
    const handleMapBoundsChange = (newBbox) => {
        setBbox(newBbox);
    };

    // 사이드바에서 지역을 클릭했을 때의 처리
    const handleRegionClick = (region) => {
        setMapCenter({ lat: region.lat, lng: region.lng });
        setSelectedRegionId(region.id);
    };

    return (
        <div style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden' }}>
            <Sidebar 
                searchText={searchText}
                setSearchText={setSearchText}
                locations={locations}
                onRegionClick={handleRegionClick}
            />
            <div style={{ flexGrow: 1, position: 'relative', width: 'calc(100vw - 320px)', height: '100vh' }}>
                <MapContainerComponent 
                    locations={locations}
                    loading={loading}
                    onUserMove={handleUserMapMove}
                    onBoundsChange={handleMapBoundsChange}
                    onMarkerClick={setSelectedRegionId}
                    selectedRegionId={selectedRegionId} 
                    mapCenter={mapCenter}
                />
            </div>
        </div>
    );
};

export default MainDashboardPage;
