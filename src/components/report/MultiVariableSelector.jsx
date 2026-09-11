import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Plus } from 'lucide-react';
import { FIELD_META } from './reportConstants';

const MultiVariableSelector = ({ selectedFields, onToggleField, onRemoveField }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const allFields = Object.values(FIELD_META);
    const filteredFields = allFields.filter(f => 
        f.name.includes(searchTerm) || f.category.includes(searchTerm)
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative' }} ref={dropdownRef}>
                    <div 
                        onClick={() => setIsOpen(!isOpen)}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', border: '1px solid #e5e4e7', borderRadius: '8px', backgroundColor: '#fff', cursor: 'pointer', width: '200px', transition: 'border-color 0.2s' }}
                    >
                        <Plus size={18} color="#2b5c46" />
                        <span style={{ flexGrow: 1, color: '#08060d', fontSize: '14px' }}>비교 변수 추가...</span>
                    </div>

                    {isOpen && (
                        <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: '8px', width: '280px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.15)', zIndex: 50, border: '1px solid #e5e4e7' }}>
                            <div style={{ padding: '12px', borderBottom: '1px solid #e5e4e7', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Search size={16} color="#6b6375" />
                                <input 
                                    type="text" 
                                    placeholder="변수명 또는 카테고리 검색..." 
                                    value={searchTerm} 
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{ border: 'none', outline: 'none', width: '100%', fontSize: '14px', backgroundColor: 'transparent' }}
                                />
                            </div>
                            <div style={{ maxHeight: '260px', overflowY: 'auto', padding: '8px 0' }}>
                                {filteredFields.length > 0 ? filteredFields.map(field => (
                                    <div 
                                        key={field.id} 
                                        onClick={() => onToggleField(field.id)}
                                        style={{ padding: '10px 16px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: selectedFields.includes(field.id) ? '#f4f3ec' : 'transparent', transition: 'background-color 0.1s' }}
                                        onMouseOver={(e) => { if (!selectedFields.includes(field.id)) e.currentTarget.style.backgroundColor = '#faf9f6' }}
                                        onMouseOut={(e) => { if (!selectedFields.includes(field.id)) e.currentTarget.style.backgroundColor = 'transparent' }}
                                    >
                                        <div>
                                            <span style={{ fontSize: '12px', color: '#6b6375', marginRight: '8px', fontWeight: '500' }}>[{field.category}]</span>
                                            <span style={{ fontSize: '14px', color: '#08060d', fontWeight: selectedFields.includes(field.id) ? 'bold' : 'normal' }}>{field.name}</span>
                                        </div>
                                        {selectedFields.includes(field.id) && <span style={{ color: '#4ade80', fontSize: '16px', fontWeight: 'bold' }}>✓</span>}
                                    </div>
                                )) : (
                                    <div style={{ padding: '20px', textAlign: 'center', color: '#6b6375', fontSize: '14px' }}>검색 결과가 없습니다.</div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                    {selectedFields.map(fieldId => {
                        const field = FIELD_META[fieldId];
                        if (!field) return null;
                        return (
                            <div key={fieldId} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 14px', backgroundColor: '#fff', borderRadius: '20px', border: `1px solid ${field.color}`, boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: field.color }}></div>
                                <span style={{ fontSize: '14px', color: '#08060d', fontWeight: '500' }}>{field.name}</span>
                                <button onClick={() => onRemoveField(fieldId)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', marginLeft: '4px' }}>
                                    <X size={14} color="#9ca3af" />
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default MultiVariableSelector;
