import { onValue, push, ref, set } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { db } from './conf'

export default function Fruits() {
    const [text, setText] = useState('')
    const [list, setList] = useState([])
    const fruitsRef = ref(db, 'Fruits')

    function getItem() {
        onValue(fruitsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const arr = Object.entries(data)
                setList(arr)
            } else {
                setList([])
            }
        });
    }
    function addItem(e) {
        e.preventDefault()
        push(fruitsRef, text)
        setText('')
    }
    function deleteItem(id) {
        const delRef = ref(db, 'Fruits/' + id)
        set(delRef, null)
    }

    function deleteAll() {
        set(fruitsRef, null)

    }
    useEffect(() => {
        getItem()
    }, [])
    return (
        <div>
            <h2>Furits</h2>
            <form onSubmit={addItem}>
                <input type='text' value={text} onChange={(e) => setText(e.target.value)} />
                <button>ADD</button>
                <button type='button' onClick={deleteAll}>DELETE ALL</button>
            </form>
            {/* <ol>
            {list.map((item) =>
                <li>{item[1]}</li>)}
            </ol> */}
            <table>
                {list.map((item) =>
                    <tr>
                        <td>{item[1]}</td>
                        <td><button onClick={() => deleteItem(item[0])}>Delete</button></td>

                    </tr>)
                }
            </table>
        </div>
    )
}
