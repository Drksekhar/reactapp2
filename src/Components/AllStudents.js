import React from 'react'
import StudentsCard from './StudentsCard'

const title = "List of Students"
const arr = ['apple', 'orange', 'banana']
const obj = { name: 'apple', price: 200, kilos: 2 }

console.log(obj);

const data = [
    { name: 'sekhar', town: 'thu', Phone: '8870334641' },
    { name: 'Anji', town: 'thu', Phone: '9492405239' },
    { name: 'Madhu', town: 'thu', Phone: '45678952' }
]
console.log(data[0].name);
console.log(data[0].town);
console.log(data[0].Phone);

console.log(data[1].name);
console.log(data[1].town);
console.log(data[1].Phone);

console.log(data[2].name);
console.log(data[2].town);
console.log(data[2].Phone);
export default function AllStudents() {
    return (
        <div>
            <h1 style={{ color: 'blue' }}>{title}</h1>
            <br />
            <h4>{arr}</h4>
            <h4>{JSON.stringify(arr)}</h4>
            <h4>{JSON.stringify(obj)}</h4>
// to get fixed data
            {/* <StudentsCard name="sekhar" town="THU" Phone="1234568" />
            <StudentsCard name="Anji" town="KNL" Phone="1234568" />
            <StudentsCard name="Madhu" town="NDK" Phone="1234568" /> */}

// to get dynamic data
            {data.map((item) =>
                <>
                    <StudentsCard name={item.name} town={item.town} Phone={item.Phone} />
                </>
            )}
            {arr}
        </div>
    )
}
