import { DataSnapshot, onValue, push, ref, refFromURL, set } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Item, Modal } from 'semantic-ui-react'
import { db } from '../FB/conf';

export default function Match() {
    const [box, setBox] = useState(false)
    const [match, setMatch] = useState('');
    const [teamA, setTeamA] = useState('');
    const [teamB, setTeamB] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [place, setPlace] = useState('');
    const [list, setList] = useState([])

    function addItem() {
        if (match === '' || teamA === '' || teamB === '' || date === '' || time === '' || place === '') return
        const myRef = ref(db, 'matches')
        push(myRef, { match, teamA, teamB, date, time, place })
        closeBox()

    }
    function getItem() {
        const myRef = ref(db, 'matches')
        onValue(myRef, (snapshot) => {
            const data = snapshot.val()
            if (data) {
                const arr = Object.entries(data)
                setList(arr)
            } else {
                setList([])
            }
        })
    }
    function deleteItem(id) {
        const delRef = ref(db, 'matches/' + id)
        set(delRef, null)

    }
    function closeBox() {
        setMatch('')
        setTeamA('')
        setTeamB('')
        setDate('')
        setTime('')
        setPlace('')
        setBox(false)

    }

    useEffect(() => {
        getItem()
    }, [])
    return (
        <div>
            <h2 style={{ color: 'blue' }}>Match Details</h2>
            <Button style={{ backgroundColor: 'blue', color: 'white', padding: '10px', borderRadius: '5px', border: 'none', cursor: 'pointer' }} onClick={() => setBox(true)}>ADD</Button>
            <br />
            <Modal
                open={box}
                onOpen={() => setBox(true)}
                onClose={closeBox}
                closeIcon
                size='mini'
            >
                <Modal.Content>

                    <Form onSubmit={addItem}>
                        <Form.Field>
                            <label>Match Name</label>
                            <Input type='text' value={match} onChange={e => setMatch(e.target.value)} />
                        </Form.Field>
                        <Form.Field>
                            <label>Team A</label>
                            <Input type='text' value={teamA} onChange={e => setTeamA(e.target.value)} />
                        </Form.Field>
                        <Form.Field>
                            <label>Team B</label>
                            <Input type='text' value={teamB} onChange={e => setTeamB(e.target.value)} />
                        </Form.Field>
                        <Form.Field>
                            <label>Date</label>
                            <Input type='date' value={date} onChange={e => setDate(e.target.value)} />
                        </Form.Field>
                        <Form.Field>
                            <label>Time</label>
                            <Input type='time' value={time} onChange={e => setTime(e.target.value)} />
                        </Form.Field>
                        <Form.Field>
                            <label>Place</label>
                            <Input type='text' value={place} onChange={e => setPlace(e.target.value)} />
                        </Form.Field>
                        <Button style={{ backgroundColor: 'green', color: 'white', padding: '10px', borderRadius: '5px', border: 'none', cursor: 'pointer' }} type='submit'>Submit</Button>
                        <Button style={{ backgroundColor: 'black', color: 'white', padding: '10px', borderRadius: '5px', border: 'none', cursor: 'pointer' }} type='button' onClick={closeBox}>Cancel</Button>


                    </Form>
                </Modal.Content>
            </Modal>
            <br />
            {list.length !== 0 ?
                <table style={{ border: '1px solid black', borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                        <tr>
                            <th style={{ backgroundColor: 'orange', color: 'white', textAlign: 'center', padding: '10px' }}>Match</th>
                            <th style={{ backgroundColor: 'orange', color: 'white', textAlign: 'center', padding: '10px' }}>Team A</th>
                            <th style={{ backgroundColor: 'orange', color: 'white', textAlign: 'center', padding: '10px' }}>Team B</th>
                            <th style={{ backgroundColor: 'orange', color: 'white', textAlign: 'center', padding: '10px' }}>Date</th>
                            <th style={{ backgroundColor: 'orange', color: 'white', textAlign: 'center', padding: '10px' }}>Time</th>
                            <th style={{ backgroundColor: 'orange', color: 'white', textAlign: 'center', padding: '10px' }}>Place</th>
                            <th style={{ backgroundColor: 'orange', color: 'white', textAlign: 'center', padding: '10px' }}>Actions</th>
                        </tr>

                    </thead>
                    {list.map((item) => <>
                        <tr>
                            <td>{item[1].match}</td>
                            <td>{item[1].teamA}</td>
                            <td>{item[1].teamB}</td>
                            <td>{item[1].date}</td>
                            <td>{item[1].time}</td>
                            <td>{item[1].place}</td>
                            <td>
                                <button style={{ backgroundColor: 'lightblue', border: 'none', borderRadius: '5px', padding: '8px 12px', marginRight: '5px', cursor: 'pointer' }}>Edit</button>
                                <button style={{ backgroundColor: 'red', border: 'none', borderRadius: '5px', padding: '8px 12px', cursor: 'pointer', color: 'white' }} onClick={() => deleteItem(item[0])}>DELETE</button>
                            </td>

                        </tr>
                    </>)}
                </table>
                :
                <>
                    <h3>No Matches found</h3>
                </>
            }
        </div>
    )
}
