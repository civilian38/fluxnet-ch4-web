import axios from 'axios';

const API_BASE_URL = 'https://fluxnet-web.delightfulisland-8239f9f6.koreacentral.azurecontainerapps.io/api';

/**
 * 화면 영역(bbox) 기준으로 관리 지역들의 마커 데이터(GeoJSON) 조회
 * @param {string} bbox - min_lon,min_lat,max_lon,max_lat 형식
 */
export const getLocations = async (bbox) => {
    const params = bbox ? { in_bbox: bbox } : {};
    const response = await axios.get(`${API_BASE_URL}/prediction/locations/`, { params });
    return response.data;
};

/**
 * 특정 지역의 기본 정보 및 최신 메탄(CH4) 예측 상세 데이터 조회
 * @param {number} id - 클릭한 지역 ID
 */
export const getLocationDetails = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/prediction/locations/${id}/`);
    return response.data;
};
