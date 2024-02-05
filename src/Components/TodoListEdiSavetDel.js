import React, { useEffect, useState } from 'react'

export default function TodoListEdiSavetDel() {

    let oldList = []
    if (localStorage.getItem('myTodos')) {
        oldList = JSON.parse(localStorage.getItem('myTodos'))
    }
    const [text, setText] = useState('')
    const [list, setList] = useState([oldList])
    const [editText, seteditText] = useState('')
    const [editId, seteditId] = useState(null)

    useEffect(() => {
        localStorage.setItem('myTodos', JSON.stringify(list))
    }, [list])

    function addItem(e) {
        e.preventDefault()
        let newList = [...list]
        newList.push(text)
        setList(newList)
        setText('')
    }
    function deleteItem(index) {
        let newList = [...list]
        newList.splice(index, 1)
        setList(newList)
    }

    function deleteAll() {
        setList([])
    }

    function editItem(index) {
        seteditText(list[index])
        seteditId(index)
        const box = document.getElementById('edit')
        box.show()
    }

    function saveItem() {
        let newList = [...list]
        newList[editId] = editText
        setList(newList)
        closeBox()

    }

    function closeBox() {
        const box = document.getElementById('edit')
        box.close()
    }

    return (
        <div>
            <dialog id='edit'>
                <div>
                    <input type='text'
                        value={editText}
                        onChange={(e) => seteditText(e.target.value)} />
                </div>
                <button style={saveBtn} onClick={saveItem} >SAVE</button>
                <button style={closeBtn} onClick={closeBox}>CLOSE</button>
            </dialog>
            <span style={todolist}>TOdo List - CRUD Operations  </span>
            <br />
            <form onSubmit={addItem}>
                <input type='text' value={text} onChange={(e) => setText(e.target.value)} />
                <button style={addBtn}>ADD</button>
                <button style={delAllBtn} onClick={deleteAll} type='button' >DELETE ALL</button>
            </form>
            <table>
                {

                    list.map((item, index) =>
                        <tr key={index}>
                            <td>{index + 1} .</td>
                            <td>{item}</td>
                            <td>
                                <button style={editBtn} onClick={() => editItem(index)}>EDIT</button>
                                <button style={delBtn} onClick={() => deleteItem(index)} >DELETE</button>
                            </td>
                        </tr>
                    )
                }
            </table>
        </div>
    )
}

export const todolist = { fontSize: 22, color: 'blue', marginRight: 20, marginLeft: 20, }
export const addBtn = { color: 'white', background: 'blue', border: 10, padding: 5, margin: 5, fontSize: 16, fontWeight: 'bold' }
export const delBtn = { color: 'white', background: 'red', border: 5, padding: 5, margin: 5, fontSize: 16, fontWeight: 'bold' }
export const saveBtn = { color: 'white', background: 'blue', border: 10, padding: 5, margin: 5, fontSize: 16, fontWeight: 'bold' }
export const delAllBtn = { color: 'white', background: 'red', border: 5, padding: 5, margin: 5, fontSize: 16, fontWeight: 'bold' }
export const editBtn = { color: 'white', background: 'green', border: 10, padding: 5, margin: 5, fontSize: 16, fontWeight: 'bold' }
export const closeBtn = { color: 'white', background: 'black', border: 10, padding: 5, margin: 5, fontSize: 16, fontWeight: 'bold' }


