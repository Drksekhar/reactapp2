import { DataSnapshot, onValue, push, ref, refFromURL, set } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Item, Modal, ModalActions, ModalHeader } from 'semantic-ui-react'
import { db } from '../FB/conf';

export default function Match2() {
    const [box, setBox] = useState(false)
    const [match, setMatch] = useState('');
    const [teamA, setTeamA] = useState('');
    const [teamB, setTeamB] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [place, setPlace] = useState('');
    const [list, setList] = useState([])
    const [data, setData] = useState(null)
    const [editId, setEditId] = useState(null)
    const [delAllBox, setdelAllBox] = useState(false)
    const [delBox, setDelBox] = useState(false)

    function addItem() {
        if (match === '' || teamA === '' || teamB === '' || date === '' || time === '' || place === '') return
        const myRef = ref(db, 'matches')
        push(myRef, { match, teamA, teamB, date, time, place })
        closeBox()

    }
    function saveItem() {
        const saveRef = ref(db, 'matches/' + editId)
        set(saveRef, { match, teamA, teamB, date, time, place })
        setEditId(null)
        closeBox()

    }
    function getItem() {
        const myRef = ref(db, 'matches')
        onValue(myRef, (snapshot) => {
            const res = snapshot.val()
            if (res) {
                setData(res)
                const arr = Object.entries(res)
                setList(arr)
            } else {
                setList([])
            }
        })
    }
    function deleteItem(id) {
        const delRef = ref(db, 'matches/' + id)
        set(delRef, null)
        setDelBox(false)
    }
    // Delete All
    function deleteAll() {
        const delAllRef = ref(db, 'matches')
        set(delAllRef, null)
        setdelAllBox(false)
    }

    // Editing one item
    function editItem(id) {
        setBox(true)
        setEditId(id)
        setMatch(data[id].match)
        setTeamA(data[id].teamA);
        setTeamB(data[id].teamB);
        setDate(data[id].date);
        setTime(data[id].time);
        setPlace(data[id].place);
    }
    function closeBox() {
        setMatch('')
        setTeamA('')
        setTeamB('')
        setDate('')
        setTime('')
        setPlace('')
        setEditId(null)
        setBox(false)
    }

    function showDelBox(id) {
        setEditId(id)
        setMatch(data[id].match)
        setTeamA(data[id].teamA);
        setTeamB(data[id].teamB);
        setDate(data[id].date);
        setTime(data[id].time);
        setPlace(data[id].place);
        setDelBox(true)
    }
    function closeDelBox() {
        setEditId(null)
        setDelBox(false)
    }


    useEffect(() => {
        getItem()
    }, [])
    return (
        <div>
            <h2 style={{ color: 'blue' }}>Match Details</h2>
            <Button style={addBtn} onClick={() => setBox(true)}>ADD</Button>
            {list.length > 0 &&
                <Button style={delAllBtn} onClick={() => setdelAllBox(true)}>DELETE ALL</Button>
            }
            <br />

            {/* Delete All Confirmation box */}

            <Modal
                open={delAllBox}
                onOpen={() => setdelAllBox(true)}
                onClose={() => setdelAllBox(false)}
                closeIcon
                size='mini'
            >
                <Modal.Header> Do you want to Delete All Items?</Modal.Header>
                <Modal.Actions>
                    <Button color='red' onClick={deleteAll}>Delete All</Button>
                    <Button color='black' onClick={() => setdelAllBox(false)}>Cancel</Button>
                </Modal.Actions>
            </Modal>

            {/* Delete one Item  Confirmation box */}

            <Modal
                open={delBox}
                onOpen={() => setDelBox(true)}
                onClose={() => setDelBox(false)}
                closeIcon
                size='mini'
            >
                <Modal.Header> Do you want Delete this Item?</Modal.Header>
                <Modal.Actions>
                    <Button color='red' onClick={() => deleteItem(editId)}>Delete </Button>
                    <Button color='black' onClick={closeDelBox}>Cancel</Button>
                </Modal.Actions>
            </Modal>

            {/* Add item box */}
            <Modal
                open={box}
                onOpen={() => setBox(true)}
                onClose={closeBox}
                closeIcon
                size='mini'
            >
                <Modal.Content>

                    <Form onSubmit={editId ? saveItem : addItem}>
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
                        <Button style={savchBtn} type='submit'>{editId ? 'Save Changes' : 'ADD'}</Button>
                        <Button style={tcnlBtn} type='button' onClick={closeBox}>Cancel</Button>


                    </Form>
                </Modal.Content>
            </Modal>
            <br />
            {list.length !== 0 ?
                <table style={tableBtn}>
                    <thead>
                        <tr>
                            <th style={thbtn}>Match</th>
                            <th style={thbtn}>Team A</th>
                            <th style={thbtn}>Team B</th>
                            <th style={thbtn}>Date</th>
                            <th style={thbtn}>Time</th>
                            <th style={thbtn}>Place</th>
                            <th style={thbtn}>Actions</th>
                        </tr>

                    </thead>
                    {list.map((item) => <>
                        <tr>
                            <td>{item[1].match}</td>
                            <td>{item[1].teamA}</td>
                            <td>{item[1].teamB}</td>
                            <td>{item[1].date}</td>
                            <td>{convertTimeFormat(item[1].time)}</td>
                            <td>{item[1].place}</td>
                            <td>
                                <button style={edtBtn} onClick={() => editItem(item[0])} >
                                    Edit
                                </button>
                                <button style={delBtn} onClick={() => showDelBox(item[0])}>
                                    DELETE
                                </button>
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

function convertTimeFormat(timeString) {
    if (!timeString) return
    const [hours, minutes] = timeString.split(':');
    const hour = hours % 12 || 12;
    const period = hours < 12 ? 'AM' : 'PM';
    return `${hour}:${minutes} ${period}`;
}

const originalTime = '13:01';
const convertedTime = convertTimeFormat(originalTime);
console.log(convertedTime); // Output: 01:01 PM

export const delAllBtn = { backgroundColor: 'red', color: 'white', padding: '10px', borderRadius: '5px', border: 'none', cursor: 'pointer' }
export const addBtn = { backgroundColor: 'blue', color: 'white', padding: '10px', borderRadius: '5px', border: 'none', cursor: 'pointer' }
export const delBtn = { backgroundColor: 'red', border: 'none', borderRadius: '5px', padding: '8px 12px', cursor: 'pointer', color: 'white' }
export const edtBtn = { backgroundColor: 'lightblue', border: 'none', borderRadius: '5px', padding: '8px 12px', marginRight: '5px', cursor: 'pointer' }
export const thbtn = { backgroundColor: 'orange', color: 'white', textAlign: 'center', padding: '10px' }
export const savchBtn = { backgroundColor: 'green', color: 'white', padding: '10px', borderRadius: '5px', border: 'none', cursor: 'pointer' }
export const tcnlBtn = { backgroundColor: 'black', color: 'white', padding: '10px', borderRadius: '5px', border: 'none', cursor: 'pointer' }
export const tableBtn = { border: '2px solid black', borderColor: 'blue', borderCollapse: 'collapse', width: '100%' }