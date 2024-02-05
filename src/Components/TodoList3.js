import React, { useState } from 'react'

export default function TodoList3() {
    let oldList = []
    if (localStorage.getItem('toDos')) {
        oldList = JSON.parse(localStorage.getItem('toDos'))
    }
    const [text, setText] = useState('')
    const [list, setList] = useState([oldList])

    function addItem() {
        if (text === '') return
        const newList = [...list]
        newList.push(text)
        setList(newList)
        localStorage.setItem('toDos', JSON.stringify(newList))
        setText('')
    }

    function deleteItem() {
        setList([])
        localStorage.setItem('toDos', JSON.stringify([]))

    }

    return (
        <div>
            <span>Todo List 3</span>
            <input type='text' value={text} onChange={e => setText(e.target.value)} />

            <button color='blue' onClick={addItem}>ADD</button>
            <button color='red' onClick={deleteItem}>DELETE ALL</button>

            <hr />
            <ol>
                {list.map((item) => <li>{item}</li>)}
            </ol>
        </div>
    )
}
