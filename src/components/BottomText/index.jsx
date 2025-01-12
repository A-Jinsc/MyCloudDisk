import React, { useState } from 'react';
import './index.css'

export default function Index(props) {
    return (
        <div className="bottom">
            <p className="text">{props.item}</p>
        </div>
    );
}