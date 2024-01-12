import React from 'react'
import SignInSignUp from '../components/SignInSignUp'

function Auth() {
    const handleSignIn = async (email: string, password: string) => {

    }

    const handleSignUp = (name: string, email: string, password: string, avatar: string) => {

    }


    return (
        <div className='auth'>
            <SignInSignUp onSignIn={handleSignIn} onSignUp={handleSignUp} />
        </div>
    )
}

export default Auth