import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';
import L from 'leaflet';

// [중요] 마커 아이콘 이미지가 깨지는 문제를 해결하기 위해 외부 CDN 주소를 사용합니다.
const markerIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function App() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [latestData, setLatestData] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [viewMode, setViewMode] = useState('none');
  const [loading, setLoading] = useState(false);

  // 1. 위치 리스트 불러오기 + 디버깅 로그 추가
  useEffect(() => {
    console.log("데이터를 불러오는 중...");
    fetch('https://fluxnet-server-c4g0fbamd6cdhzdf.koreacentral-01.azurewebsites.net/api/showcase/locations/')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP 에러! 상태코드: ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log("불러온 위치 데이터:", data); // 개발자 도구(F12) 콘솔에서 확인 가능
        setLocations(data);
      })
      .catch(err => {
        console.error("API 호출 중 오류 발생:", err);
        alert("데이터를 불러오지 못했습니다. 콘솔 창을 확인해주세요.");
      });
  }, []);

  const handleMarkerClick = async (loc) => {
    setSelectedLocation(loc);
    setViewMode('latest');
    setLoading(true);
    try {
      const res = await fetch(`https://fluxnet-server-c4g0fbamd6cdhzdf.koreacentral-01.azurewebsites.net/api/showcase/location/${loc.id}/data/latest/`);
      const data = await res.json();
      setLatestData(data);
    } catch (err) {
      console.error("최신 데이터 호출 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewHistory = async () => {
    setViewMode('history');
    setLoading(true);
    try {
      const res = await fetch(`https://fluxnet-server-c4g0fbamd6cdhzdf.koreacentral-01.azurewebsites.net/api/showcase/location/${selectedLocation.id}/data/`);
      const data = await res.json();
      setHistoricalData(data.results);
    } catch (err) {
      console.error("과거 데이터 호출 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="map-section">
        <MapContainer 
          center={[36.5, 127.5]} // 대한민국 중심부로 초기 설정
          zoom={7} 
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; OpenStreetMap &copy; CARTO'
          />
          
          {/* 마커 렌더링 부분 */}
          {locations.map(loc => (
            <Marker
              key={loc.id}
              position={[loc.latitude, loc.longitude]}
              icon={markerIcon} // 수정한 아이콘 설정 적용
              eventHandlers={{ click: () => handleMarkerClick(loc) }}
            >
              <Popup>{loc.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {viewMode !== 'none' && (
        <div className="info-panel">
          <button className="close-btn" onClick={() => setViewMode('none')}>✕</button>
          <h2>{selectedLocation?.name}</h2>
          {loading ? (
            <div className="loading">로딩 중...</div>
          ) : viewMode === 'latest' ? (
            <div className="data-card">
              <p><strong>날짜:</strong> {latestData?.date}</p>
              <p><strong>예측:</strong> {latestData?.prediction}</p>
              <p><strong>설명:</strong> {latestData?.description}</p>
              <button onClick={handleViewHistory} className="primary-btn mt-15">이전 데이터 보기</button>
            </div>
          ) : (
            <div className="history-list">
              <button onClick={() => setViewMode('latest')} className="secondary-btn mb-15">뒤로가기</button>
              <ul>
                {historicalData.map(item => (
                  <li key={item.id}>
                    <span className="history-date">[{item.date}]</span>
                    <div className="history-details">
                      예측값: {item.prediction} <br />
                      <span className="desc">({item.description})</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;