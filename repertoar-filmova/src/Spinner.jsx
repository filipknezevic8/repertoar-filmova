import React from 'react';
import './styles/Spinner.scss';

function Spinner() {
    return (
        <div className="spinner__backdrop">
            <div className="spinner"></div>
        </div>
    );
}

export default Spinner;