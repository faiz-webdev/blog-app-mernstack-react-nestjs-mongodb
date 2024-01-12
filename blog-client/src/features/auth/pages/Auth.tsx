import React, { useEffect } from 'react'
import SignInSignUp from '../components/SignInSignUp'
import { useSignInMutation, useSignUpMutation } from '../api/authApi';
import { enqueueSnackbar } from 'notistack';

function Auth() {
    const [signIn, { isSuccess: signedIn }] = useSignInMutation();
    const handleSignIn = async (email: string, password: string) => {
        await signIn({ email, password })
    }

    const [signUp, { isSuccess: signedUp }] = useSignUpMutation();
    const handleSignUp = async (name: string, email: string, password: string, avatar: string) => {
        await signUp({ name, email, password, avatar })
    }

    useEffect(() => {
        if (signedIn) {
            enqueueSnackbar('User signed in', { variant: 'success' })
        }

        if (signedUp) {
            enqueueSnackbar('User signed in', { variant: 'success' })
        }
    }, [signedIn, signedUp])


    return (
        <div className='auth'>
            <SignInSignUp onSignIn={handleSignIn} onSignUp={handleSignUp} />
        </div>
    )
}

export default Auth