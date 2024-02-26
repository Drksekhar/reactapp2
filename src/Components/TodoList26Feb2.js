import React, { useEffect, useState } from 'react'
import { Button, Form, Input } from 'semantic-ui-react'

export default function TodoList26Feb2() {
    // How to get the list of old Todos
    let oldList = []
    if (localStorage.getItem('myTodos')) {
        oldList = JSON.parse(localStorage.getItem('myTodos'))
    }

    const [text, setText] = useState('')
    const [editText, seteditText] = useState('')
    const [editIndex, seteditIndex] = useState(null)
    const [list, setList] = useState([oldList])
    const box = document.getElementById('edit')
    useEffect(() => {
        localStorage.getItem('myData', JSON.stringify(list))
    }, [list])
    function addItem(e) {
        e.preventDefault()
        let newlist = [...list]
        newlist.push(text)
        setList(newlist)
        setText('')
    }
    function delItem(index) {
        let newlist = [...list]
        newlist.splice(index, 1)
        setList(newlist)
        setText('')
    }
    function delAll() {
        setList([])
    }
    function editItem(index) {
        seteditText(list[index])
        seteditIndex(index)
        box.show()
    }
    function clb() {
        box.close()
    }
    function saveItem() {
        let newlist = [...list]
        newlist[editIndex] = editText
        setList(newlist)
        clb()
    }
    return (
        <div>
            <dialog id='edit'>
                <Input type='text' value={editText} onChange={e => seteditText(e.target.value)} />
                <Button onClick={saveItem}>SAVE</Button>
                <Button onClick={clb}>Close</Button>

            </dialog>
            <Form onSubmit={addItem}>
                <Input type='text' value={text} onChange={e => setText(e.target.value)} />
                <Button >ADD</Button>
                <Button onClick={delAll}>Delete All</Button>
            </Form>
            <table>
                {
                    list.map((item, index) =>
                        <tr key={index}>
                            <td>{index + 1}.{item}</td>
                            <td><Button onClick={() => delItem(index)}>DELETE</Button></td>
                            <td><Button onClick={() => editItem(index)}>Edit</Button></td>
                        </tr>)

                }
            </table>


        </div>
    )
}
