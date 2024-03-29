import React from 'react'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from './conf';
import { Button } from 'semantic-ui-react';

export default function Login() {
    const provider = new GoogleAuthProvider();

    function doLogin() {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }
    return (
        <div>
            <h3> Please Log in to Continue</h3>
            <Button onClick={doLogin}> Login in </Button>

        </div>
    )
}
