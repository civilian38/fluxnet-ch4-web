import React from 'react';
import SubChartItem from './SubChartItem';
import { FIELD_META } from './reportConstants';

const SubChartList = ({ data, selectedFields, onRemoveField }) => {
    if (!selectedFields || selectedFields.length === 0) return null;

    return (
        <div className="sub-chart-list">
            {selectedFields.map(fieldId => {
                const meta = FIELD_META[fieldId];
                if (!meta) return null;
                return (
                    <SubChartItem 
                        key={fieldId} 
                        data={data} 
                        fieldMeta={meta} 
                        onRemove={() => onRemoveField(fieldId)} 
                    />
                );
            })}
            <style>{`
                .sub-chart-list {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 24px;
                }
                @media (max-width: 1024px) {
                    .sub-chart-list {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
};

export default SubChartList;
