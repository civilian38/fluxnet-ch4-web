import React from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';

// 눈에 잘 띄는 핀 모양 마커(물방울 핀 모양)를 위한 스타일 및 호버 애니메이션
const markerStyle = `
  .custom-pin-icon {
    background: transparent;
    border: none;
  }
  .pin-marker {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.4));
    transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transform-origin: bottom center;
    cursor: pointer;
  }
  .pin-marker:hover {
    transform: scale(1.2) translateY(-4px);
    z-index: 1000 !important;
  }
  .pin-marker svg {
    width: 100%;
    height: 100%;
  }
  .pin-marker svg path.pin-body {
    transition: fill 0.2s;
  }
  .pin-marker:hover svg path.pin-body {
    fill: #dc2626; /* 호버 시 조금 더 어두운 빨간색 */
  }
`;

// 동적으로 스타일 주입 (중복 방지)
if (typeof document !== 'undefined' && !document.getElementById('region-marker-style')) {
  const style = document.createElement('style');
  style.id = 'region-marker-style';
  style.innerHTML = markerStyle;
  document.head.appendChild(style);
}

const RegionMarker = ({ id, lat, lng, onClick }) => {
    // 눈에 띄는 빨간색(#ef4444) 핀 마커 SVG 디자인
    const markerHtml = `
      <div class="pin-marker">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class="pin-body" d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" fill="#ef4444" stroke="#ffffff" stroke-width="1.5"/>
            <circle cx="12" cy="10" r="3" fill="#ffffff"/>
        </svg>
      </div>
    `;

    // divIcon을 사용하여 스타일링이 용이한 DOM 구조의 마커 생성
    const icon = L.divIcon({
        className: 'custom-pin-icon',
        html: markerHtml,
        iconSize: [36, 36],
        iconAnchor: [18, 36] // 핀의 맨 밑부분을 좌표에 맞춤
    });

    return (
        <Marker 
            position={[lat, lng]} 
            icon={icon}
            eventHandlers={{
                click: () => onClick(id)
            }}
        />
    );
};

export default RegionMarker;
