import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, LogOut, Plus, Search, MapPin } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Sidebar = () => {
    const [searchText, setSearchText] = useState('');
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <aside style={{ 
            width: '320px', 
            height: '100%', 
            backgroundColor: '#ffffff', 
            borderRight: '1px solid #e5e4e7',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '2px 0 8px rgba(0,0,0,0.05)',
            zIndex: 1000
        }}>
            <div style={{ padding: '24px 20px', borderBottom: '1px solid #e5e4e7', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontSize: '20px', margin: 0, color: '#2b5c46', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={24} color="#2b5c46" /> Fluxnet CH4
                </h1>
                {user ? (
                    <LogOut size={20} style={{ cursor: 'pointer', color: '#6b6375' }} title="로그아웃" onClick={handleLogout} />
                ) : null}
            </div>
            
            <div style={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                {user && (
                    <div style={{ marginBottom: '16px', fontSize: '14px', color: '#2b5c46', fontWeight: 'bold' }}>
                        반갑습니다, {user.nickname} 님!
                    </div>
                )}
                
                <div style={{ position: 'relative', marginBottom: '20px' }}>
                    <Search size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#9ca3af' }} />
                    <input 
                        type="text" 
                        placeholder="지역 검색..." 
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px 10px 10px 38px',
                            border: '1px solid #e5e4e7',
                            borderRadius: '8px',
                            boxSizing: 'border-box',
                            fontSize: '14px',
                            outline: 'none',
                            transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#2b5c46'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e4e7'}
                    />
                </div>

                <div style={{ flexGrow: 1, overflowY: 'auto' }}>
                    <p style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '12px', fontWeight: '500' }}>관리 중인 지역 (목업)</p>
                    <div style={{ padding: '14px', border: '1px solid #e5e4e7', borderRadius: '8px', marginBottom: '10px', cursor: 'pointer', backgroundColor: '#f9f9f9', transition: 'background-color 0.2s' }}
                         onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f4f3ec'}
                         onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}>
                        <strong style={{ display: 'block', fontSize: '15px', color: '#08060d', marginBottom: '4px' }}>서울대공원 습지</strong>
                        <span style={{ fontSize: '13px', color: '#6b6375' }}>최근 측정: 2.1 ppm (정상)</span>
                    </div>
                    <div style={{ padding: '14px', border: '1px solid #e5e4e7', borderRadius: '8px', marginBottom: '10px', cursor: 'pointer', backgroundColor: '#f9f9f9', transition: 'background-color 0.2s' }}
                         onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f4f3ec'}
                         onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}>
                        <strong style={{ display: 'block', fontSize: '15px', color: '#08060d', marginBottom: '4px' }}>창녕 우포늪</strong>
                        <span style={{ fontSize: '13px', color: '#6b6375' }}>최근 측정: 3.4 ppm (경고)</span>
                    </div>
                </div>

                {!user ? (
                    <button style={{
                        marginTop: '20px', padding: '14px', backgroundColor: '#2b5c46', color: 'white',
                        border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex',
                        alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: '600',
                        fontSize: '15px', transition: 'background-color 0.2s'
                    }}
                    onClick={() => navigate('/login')}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1e4232'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2b5c46'}>
                        <LogIn size={18} /> 로그인하러 가기
                    </button>
                ) : user.is_admin ? (
                    <button style={{
                        marginTop: '20px', padding: '14px', backgroundColor: '#2b5c46', color: 'white',
                        border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex',
                        alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: '600',
                        fontSize: '15px', transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1e4232'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2b5c46'}>
                        <Plus size={18} /> 새로운 지역 추가
                    </button>
                ) : null}
            </div>
        </aside>
    );
};

export default Sidebar;
