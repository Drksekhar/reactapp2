import React from 'react'
import './Mystyles.css'
export default function TimeTable() {
    return (
        <div>
            <h1>TimeTable</h1>
            <table border='1' id='main_table'>
                <tbody>
                    <tr>
                        <th>Day</th>
                        <th>1</th>
                        <th>2</th>
                        <th rowSpan='8'>Tea Break</th>
                        <th>3</th>
                        <th>4</th>
                        <th rowSpan='8'>Lunch Break</th>
                        <th>5</th>
                        <th>6</th>
                        <th rowSpan='8'>Tea Break</th>
                        <th>7</th>
                        <th>8</th>
                    </tr>
                    <tr>
                        <td>Monday</td>
                        <td>Math</td>
                        <td>Science</td>
                        <td>History</td>
                        <td>English</td>
                        <td>Physics</td>
                        <td>Chemistry</td>
                        <td colSpan="2">Geography</td>


                    </tr>
                    <tr>
                        <td>Tuesday</td>
                        <td>Geography</td>
                        <td>Science</td>
                        <td>Economics</td>
                        <td>English</td>
                        <td>Physics</td>
                        <td>Chemistry</td>

                        <td>History</td>
                        <td>Math</td>
                    </tr>
                    <tr>
                        <td>Wednesday</td>
                        <td>Geography</td>
                        <td>Science</td>
                        <td>Economics</td>
                        <td>English</td>
                        <td>Physics</td>
                        <td>Chemistry</td>
                        <td>History</td>
                        <td>Math</td>

                    </tr>
                    <tr>
                        <td>Thursday</td>
                        <td>Geography</td>
                        <td>Science</td>
                        <td>Economics</td>
                        <td>English</td>
                        <td>Physics</td>
                        <td>Chemistry</td>
                        <td>History</td>
                        <td>Math</td>

                    </tr>
                    <tr>
                        <td>Friday</td>
                        <td>Geography</td>
                        <td>Science</td>
                        <td>Economics</td>
                        <td>English</td>
                        <td>Physics</td>
                        <td>Chemistry</td>
                        <td>History</td>
                        <td>Math</td>
                    </tr>
                    <tr>
                        <td>Saturday</td>
                        <td>Geography</td>
                        <td>Science</td>
                        <td>Economics</td>
                        <td>English</td>
                        <td>Physics</td>
                        <td>Chemistry</td>
                        <td>History</td>
                        <td>Math</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
