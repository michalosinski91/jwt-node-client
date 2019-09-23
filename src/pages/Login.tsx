import React, { useState} from 'react'
import { RouteComponentProps } from 'react-router'
import { useLoginMutation } from '../generated/graphql'


export const Login: React.FC<RouteComponentProps> = ({ history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [login] = useLoginMutation()

    return(
        <form onSubmit={async e => {
            e.preventDefault()
            const response = await login({
                variables: {
                    email,
                    password
                }
            })
            console.log(response)
            history.push('/')
        }}>
            <div>
                <input 
                    value={email} 
                    placeholder='email' 
                    onChange={ e => {setEmail(e.target.value)}} 
                />
            </div>
            <div>
                <input 
                    value={password} 
                    type='password'
                    placeholder='password' 
                    onChange={ e => {setPassword(e.target.value)}} 
                />
            </div>
            <div>
                <button type='submit'>Login</button>
            </div>
        </form>
    )
}