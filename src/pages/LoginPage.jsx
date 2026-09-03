import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginAPI } from '../api/auth';
import { AuthContext } from '../context/AuthContext';
import { MapPin, Lock, User } from 'lucide-react';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();
    const { loginSuccess } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setIsLoading(true);
        try {
            const data = await loginAPI(username, password);
            await loginSuccess(data);
            navigate('/home');
        } catch (err) {
            setErrorMsg('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', width: '100vw', height: '100vh', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f3ec' }}>
            <div style={{ width: '400px', padding: '40px', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                    <h1 style={{ fontSize: '24px', margin: 0, color: '#2b5c46', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <MapPin size={28} color="#2b5c46" /> Fluxnet CH4
                    </h1>
                </div>
                <h2 style={{ textAlign: 'center', fontSize: '20px', marginBottom: '24px', color: '#08060d' }}>로그인</h2>
                
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ position: 'relative' }}>
                        <User size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#9ca3af' }} />
                        <input 
                            type="text" 
                            placeholder="아이디" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={{ width: '100%', padding: '10px 10px 10px 38px', border: '1px solid #e5e4e7', borderRadius: '8px', boxSizing: 'border-box', fontSize: '14px' }}
                        />
                    </div>
                    <div style={{ position: 'relative' }}>
                        <Lock size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#9ca3af' }} />
                        <input 
                            type="password" 
                            placeholder="비밀번호" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ width: '100%', padding: '10px 10px 10px 38px', border: '1px solid #e5e4e7', borderRadius: '8px', boxSizing: 'border-box', fontSize: '14px' }}
                        />
                    </div>
                    
                    {errorMsg && <p style={{ color: '#ef4444', fontSize: '13px', margin: 0, textAlign: 'center' }}>{errorMsg}</p>}
                    
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        style={{ padding: '12px', backgroundColor: '#2b5c46', color: 'white', border: 'none', borderRadius: '8px', cursor: isLoading ? 'not-allowed' : 'pointer', fontWeight: '600', fontSize: '15px', marginTop: '8px' }}
                    >
                        {isLoading ? '로그인 중...' : '로그인'}
                    </button>
                </form>

                <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px', color: '#6b6375' }}>
                    계정이 없으신가요? <Link to="/register" style={{ color: '#2b5c46', textDecoration: 'none', fontWeight: '600' }}>회원가입</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
