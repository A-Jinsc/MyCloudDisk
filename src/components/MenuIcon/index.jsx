import React from 'react';
import './index.css'

export default function Index(props) {
    const {text} = props

    return (
        <div className="icon_title_box">
            <div className="icon_area">
                {props.children}
            </div>
            <div className="text_area">{text}</div>
        </div>
    );
}