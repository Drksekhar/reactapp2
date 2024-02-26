import React, { useEffect, useState } from 'react'
import { Button, Form, Input } from 'semantic-ui-react'

export default function TodoList25Feb2() {
    let oldList = []
    if (localStorage.getItem('myTodos')) {
        oldList = JSON.parse(localStorage.getItem('myTodos'))
    }
    const [text, setText] = useState('')
    const [edittext, seteditText] = useState('')
    const [editid, seteditid] = useState('')
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
        seteditText(list[index])
        seteditid(index)
        box.show()
    }
    function saveItem() {
        let newList = [...list]
        newList[editid] = edittext
        setList(newList)
        clsBox()

    }
    function clsBox() {
        box.close()

    }
    return (
        <div>
            <dialog id='edit'>
                <Input type='text' value={edittext} onChange={e => seteditText(e.target.value)} />
                <Button onClick={saveItem}>Save</Button>
                <Button onClick={clsBox}>Close</Button>

            </dialog>
            <Form onSubmit={addItem}>
                <Input type='text' value={text} onChange={e => setText(e.target.value)} />
                <Button>ADD</Button>
                <Button onClick={delAll} type='button'>Delete All</Button>
            </Form>
            <table>
                {
                    list.map((item, index) => <tr>
                        <td style={{ fontSize: 16, color: 'blue' }}>{index + 1} . {item}</td>
                        <td></td>
                        <td><Button onClick={() => { delItem(index) }}>Delete</Button></td>
                        <td><Button onClick={() => { editItem(index) }}>Edit</Button></td>

                    </tr>)
                }
            </table>
        </div>
    )
}
