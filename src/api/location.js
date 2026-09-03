import apiClient from './apiClient';

/**
 * 화면 영역(bbox) 기준으로 관리 지역들의 마커 데이터(GeoJSON) 조회
 * @param {string} bbox - min_lon,min_lat,max_lon,max_lat 형식
 */
export const getLocations = async (bbox) => {
    const params = bbox ? { in_bbox: bbox } : {};
    const response = await apiClient.get(`/prediction/locations/`, { params });
    return response.data;
};

/**
 * 특정 지역의 기본 정보 및 최신 메탄(CH4) 예측 상세 데이터 조회
 * @param {number} id - 클릭한 지역 ID
 */
export const getLocationDetails = async (id) => {
    const response = await apiClient.get(`/prediction/locations/${id}/`);
    return response.data;
};
