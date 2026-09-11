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

/**
 * 특정 지역의 메탄(CH4) 예측값 변화 추이 조회
 * @param {number} id - 지역 ID
 * @param {number} months - 최근 조회할 개월 수
 */
export const getLocationCh4Trend = async (id, months = 3) => {
    const response = await apiClient.get(`/prediction/locations/${id}/ch4_trend/`, {
        params: { months }
    });
    return response.data;
};

/**
 * 기상, 위성, 메탄 데이터를 포함한 시계열 동적 조회
 * @param {number} id - 지역 ID
 * @param {string} startDate - YYYY-MM-DD
 * @param {string} endDate - YYYY-MM-DD
 * @param {string} fields - 쉼표로 구분된 필드 문자열 (없을 시 전체)
 */
export const getEnvironmentTrend = async (id, startDate, endDate, fields = '') => {
    const params = {};
    if (startDate) params.start_date = startDate;
    if (endDate) params.end_date = endDate;
    if (fields) params.fields = fields;
    
    const response = await apiClient.get(`/prediction/locations/${id}/environment_trend/`, {
        params
    });
    return response.data;
};
