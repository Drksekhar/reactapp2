import React, { useState } from 'react'

export default function TodoList4() {
    let oldList = []
    if (localStorage.getItem('myTodos')) {
        oldList = JSON.parse(localStorage.getItem('myTodos'))
    }
    const [text, setText] = useState('')
    const [list, setList] = useState([oldList])

    function addItem() {
        if (text === '') return
        const newList = [...list]
        newList.push(text)
        setList(newList)
        localStorage.setItem('myTodos', JSON.stringify(newList))
        setText('')
    }
    function deleteALL() {
        setList([])
        localStorage.setItem('myTodos', JSON.stringify([]))
    }

    return (
        <div>
            <span> TO Do List 4  </span>
            <input type='text' value={text} onChange={e => setText(e.target.value)} />
            <button color='blue' onClick={addItem}>ADD</button>
            <button color='blue' onClick={deleteALL}>DELETE ALL</button>

            <ol>
                {
                    list.map((item) =>
                        <li>{item}</li>)
                }
            </ol>

        </div>
    )
}
