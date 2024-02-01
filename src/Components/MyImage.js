import React from 'react'
const pic = require('../Images/imgeth.png')

export default function MyImage() {
    return (
        <div>
            <h2> It is Image Page</h2>
            <img
                src="https://media.istockphoto.com/id/627492508/photo/group-of-happy-african-children-east-africa.jpg?s=612x612&w=0&k=20&c=sGtj9YOwlZ6MpKKsyqDsIaumWxSL9QsawIAbcFRMKXk="
                alt=""
                height={300}
                width={400}
            />
            <br /> <br />
            <img

                src={pic} alt="" height={300} width={400}
            />
        </div>
    )
}
