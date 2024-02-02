import React from 'react'

export default function StudentsCard(p) {
    const myStyle = { fontFamily: 'cursive', fontSize: '30', background: "orange", color:"white" }
    return (
        <div>
            <h1 style={{ color: 'blue' }}>{p.name}</h1>
            <p style={myStyle}>{p.town}</p>
            <p style={myStyle}>{p.Phone}</p>
        </div>
    )
}
