import React, { useState} from 'react'
import { RouteComponentProps } from 'react-router'
import { useLoginMutation, MeDocument } from '../generated/graphql'
import { setAccessToken } from '../accessToken'


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
                },
                update: (store, {data}) => {
                    if (!data) {
                        return null
                    }
                    store.writeQuery({
                        query: MeDocument,
                        data: {
                            me: data.login.user
                        }
                    })
                }
            })
            console.log(response)

            if (response && response.data) {
                setAccessToken(response.data.login.accessToken)
            }

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