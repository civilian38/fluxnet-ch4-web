import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerAPI } from '../api/auth';
import { MapPin, Lock, User, Mail, Smile } from 'lucide-react';

const RegisterPage = () => {
    const [formData, setFormData] = useState({ email: '', nickname: '', username: '', password: '' });
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setIsLoading(true);
        try {
            await registerAPI(formData);
            alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
            navigate('/login');
        } catch (err) {
            setErrorMsg('회원가입에 실패했습니다. 입력한 정보를 확인해주세요.');
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
                <h2 style={{ textAlign: 'center', fontSize: '20px', marginBottom: '24px', color: '#08060d' }}>회원가입</h2>
                
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ position: 'relative' }}>
                        <Mail size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#9ca3af' }} />
                        <input 
                            type="email" name="email" placeholder="이메일" 
                            value={formData.email} onChange={handleChange} required
                            style={{ width: '100%', padding: '10px 10px 10px 38px', border: '1px solid #e5e4e7', borderRadius: '8px', boxSizing: 'border-box', fontSize: '14px' }}
                        />
                    </div>
                    <div style={{ position: 'relative' }}>
                        <Smile size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#9ca3af' }} />
                        <input 
                            type="text" name="nickname" placeholder="닉네임" 
                            value={formData.nickname} onChange={handleChange} required
                            style={{ width: '100%', padding: '10px 10px 10px 38px', border: '1px solid #e5e4e7', borderRadius: '8px', boxSizing: 'border-box', fontSize: '14px' }}
                        />
                    </div>
                    <div style={{ position: 'relative' }}>
                        <User size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#9ca3af' }} />
                        <input 
                            type="text" name="username" placeholder="아이디" 
                            value={formData.username} onChange={handleChange} required
                            style={{ width: '100%', padding: '10px 10px 10px 38px', border: '1px solid #e5e4e7', borderRadius: '8px', boxSizing: 'border-box', fontSize: '14px' }}
                        />
                    </div>
                    <div style={{ position: 'relative' }}>
                        <Lock size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#9ca3af' }} />
                        <input 
                            type="password" name="password" placeholder="비밀번호" 
                            value={formData.password} onChange={handleChange} required
                            style={{ width: '100%', padding: '10px 10px 10px 38px', border: '1px solid #e5e4e7', borderRadius: '8px', boxSizing: 'border-box', fontSize: '14px' }}
                        />
                    </div>
                    
                    {errorMsg && <p style={{ color: '#ef4444', fontSize: '13px', margin: 0, textAlign: 'center' }}>{errorMsg}</p>}
                    
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        style={{ padding: '12px', backgroundColor: '#2b5c46', color: 'white', border: 'none', borderRadius: '8px', cursor: isLoading ? 'not-allowed' : 'pointer', fontWeight: '600', fontSize: '15px', marginTop: '8px' }}
                    >
                        {isLoading ? '가입 중...' : '회원가입'}
                    </button>
                </form>

                <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px', color: '#6b6375' }}>
                    이미 계정이 있으신가요? <Link to="/login" style={{ color: '#2b5c46', textDecoration: 'none', fontWeight: '600' }}>로그인</Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
