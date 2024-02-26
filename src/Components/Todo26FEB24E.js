import React, { useEffect, useState } from 'react'
import { Button, Form, Input } from 'semantic-ui-react'

export default function Todo26FEB24E() {
    // How to get the list of old Todos
    let oldList = []
    if (localStorage.getItem('myTodos')) {
        oldList = JSON.parse(localStorage.getItem('myTodos'))
    }

    const [text, setText] = useState('')
    const [editText, seteditText] = useState('')
    const [editIndex, seteditIndex] = useState('')
    const [list, setList] = useState([oldList])
    const box = document.getElementById('edit')


    useEffect(() => {
        localStorage.setItem('myData', JSON.stringify(list))
    }, [list])

    function addItem(e) {
        e.preventDefault()
        let newList = [...list]
        newList.push(text)
        setList(newList)
        setText('')
    }
    function delItem(index) {
        let newList = [...list]
        newList.splice(index, 1)
        setList(newList)
    }
    function delAll() {
        setList([]); // Clears the list, removing all items
    }

    function editItem(index) {
        seteditText(list[index])
        seteditIndex(index)
        box.show()
    }
    function saveItem() {
        let newList = [...list]
        newList[editIndex] = editText
        setList(newList)
        clsBox()

    }
    function clsBox() {
        box.close()
    }
    return (
        <div>
            <dialog id='edit'>
                <Input type='text' value={editText} onChange={e => seteditText(e.target.value)} style={inputStyle} />
                <Button style={saveBtn} onClick={saveItem}>SAVE</Button>
                <Button style={closeBtn} onClick={clsBox}>Close</Button>
            </dialog>
            <Form onSubmit={addItem}>
                <Input type='text' value={text} onChange={e => setText(e.target.value)} style={inputStyle} />
                <Button style={addBtn}>ADD</Button>
                <Button style={deleteAllBtn} onClick={delAll}>Delete All</Button>
            </Form>
            <table>
                {
                    list.map((item, index) =>
                        <tr key={index}>
                            <td style={{ fontSize: '16px', color: 'blue', }}>{index + 1} . {item}</td>
                            <td><Button style={deleteBtn} onClick={() => delItem(index)}>Delete</Button></td>
                            <td><Button style={editBtn} onClick={() => editItem(index)}>Edit</Button></td>
                        </tr>)
                }
            </table>
        </div>
    )
}
export const inputStyle = {
    fontSize: '20px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
    boxSizing: 'border-box',
};
export const saveBtn = {
    fontSize: '16px', color: 'white', backgroundColor: 'green',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
};
export const editBtn = {
    fontSize: '16px',
    color: 'white',
    backgroundColor: 'green',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
};

export const addBtn = {
    fontSize: '16px',
    color: 'white',
    backgroundColor: 'blue',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
};

export const deleteAllBtn = {
    fontSize: '16px',
    color: 'white',
    backgroundColor: 'red',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
};

export const deleteBtn = {
    fontSize: '16px',
    color: 'white',
    backgroundColor: 'red',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
};


export const closeBtn = {
    fontSize: '16px',
    color: 'white',
    backgroundColor: 'gray',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
};
