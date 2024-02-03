import React, { useState } from 'react'

export default function TodoList2() {
    // How to get the list of old Todos

    let oldList = []
    if (localStorage.getItem('myTodos')) {
        oldList = JSON.parse(localStorage.getItem('myTodos'))
    }

    const [text, setText] = useState('')
    const [list, setList] = useState(oldList)

    function addItem() {
        if (text === '') return

        const newList = [...list]
        newList.push(text)
        setList(newList)
        localStorage.setItem('myTodos', JSON.stringify(newList))
        setText('')
    }
    function deleteAll() {
        setList([])
        localStorage.setItem('myTodos', JSON.stringify([]))

    }

    return (
        <div>
            <br />
            <span style={todolist}>Todos List 2 </span>
            <input type='text' value={text} onChange={(e) => setText(e.target.value)} />
            <button style={addBtn} onClick={addItem}>ADD</button>
            <button style={delBtn} onClick={deleteAll}>DELETE ALL</button>
            <br />
            <br />
            <hr />
            <ol>
                {
                    list.map((item) =>
                        <li>
                            {item}
                        </li>
                    )
                }
            </ol>

        </div>
    )
}

export const todolist = { fontSize: 22, color: 'blue', marginRight: 20, marginLeft: 20, }
export const addBtn = { color: 'white', background: 'blue', border: 10, padding: 5, margin: 5, fontSize: 16, fontWeight: 'bold' }
export const delBtn = { color: 'white', background: 'red', border: 5, padding: 5, margin: 5, fontSize: 16, fontWeight: 'bold' }