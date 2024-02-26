import React, { useEffect, useState } from 'react'
import { Button, Form, Input } from 'semantic-ui-react'

export default function TodoList26Feb() {
    // How to get the list of old Todos
    let oldList = []
    if (localStorage.getItem('myTodos')) {
        oldList = JSON.parse(localStorage.getItem('myTodos'))
    }
    const [text, setText] = useState('')
    const [editText, setEditText] = useState('')
    const [editID, setEditID] = useState(null)
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
        setList([])
    }
    function editItem(index) {
        setEditText(list[index])
        setEditID(index)
        box.show()
    }
    function saveItem() {
        let newList = [...list]
        newList[editID] = editText
        setList(newList)
        clsBox()
    }

    function clsBox() {
        box.close()

    }
    return (
        <div>
            <dialog id='edit'>
                <Input type='text' value={editText} onChange={e => setEditText(e.target.value)} />
                <Button onClick={clsBox}>Close</Button>
                <Button onClick={saveItem}>Save</Button>

            </dialog>
            <Form onSubmit={addItem}>
                <Input type='text' value={text} onChange={e => setText(e.target.value)} />
                <Button>ADD</Button>
                <Button onClick={delAll} type='button'>Delete All</Button>
            </Form>
            <table>
                {list.map((item, index) =>
                    <tr>
                        <td>{index + 1} .{item}</td>
                        <td><Button onClick={() => delItem(index)}>Delete</Button></td>
                        <td><Button onClick={() => editItem(index)}>Edit</Button></td>
                    </tr>)
                }
            </table>
        </div>
    )
}
