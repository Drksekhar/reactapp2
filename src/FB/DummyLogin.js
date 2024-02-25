import React from 'react'
import { Button, Checkbox, Form, Segment } from 'semantic-ui-react'

export default function DummyLogin() {
    return (
        <div style={{}}>
        <div style={{maxWidth:600, margin:20}}>
            <Segment>
                <Form>
                    <h2>Log in Form</h2>
                    <Form.Field>
                        <label>First Name</label>
                        <input placeholder='First Name' />
                    </Form.Field>
                    <Form.Field>
                        <label>Last Name</label>
                        <input placeholder='Last Name' />
                    </Form.Field>
                    <Form.Field>
                        <Checkbox label='I agree to the Terms and Conditions' />
                    </Form.Field>
                    <Button type='submit'>Submit</Button>
                </Form>
            </Segment>
        </div>
        </div>
    )
}

