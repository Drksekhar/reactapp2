import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Select } from 'semantic-ui-react'

export default function TodoList25Feb() {
    // How to get the list of old Todos
    let oldList = []
    if (localStorage.getItem('myTodos')) {
        oldList = JSON.parse(localStorage.getItem('myTodos'))
    }

    const [text, setText] = useState('')
    const [edittext, seteditText] = useState('')
    const [editid, seteditId] = useState(null)
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
        seteditId(index)
        box.show()
    }
    function saveItem() {
        let newList = [...list]
        newList[editid] = edittext
        setList(newList)
        clsBoX()
    }
    function clsBoX() {
        box.close()

    }
    return (
        <div>
            <dialog id='edit'>
                <Input type='text' value={edittext} onChange={e => seteditText(e.target.value)} />
                <Button onClick={saveItem}>SAVE</Button>
                <Button onClick={clsBoX}>Close</Button>

            </dialog>
            <Form onSubmit={addItem}>
                <Input type='text' value={text} onChange={e => setText(e.target.value)} />
                <Button>Add</Button>
                <Button onClick={delAll} type='button'>Delete All</Button>
            </Form>

            <table>
                {
                    list.map((item, index) => <tr key={index}>
                        <td> {index + 1}  ) {item}</td>
                        <td> <Button onClick={() => editItem(index)}> Eidt </Button></td>
                        <td> <Button onClick={() => { delItem(index) }}> Delete </Button></td>
                    </tr>)
                }
            </table>
        </div>
    )
}
