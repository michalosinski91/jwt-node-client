import React from 'react'
import { Link } from 'react-router-dom'
import { useMeQuery, useLogoutMutation } from './generated/graphql'
import { setAccessToken } from './accessToken'

export const Header: React.FC = () => {
    const {data, loading} = useMeQuery()
    const [logout, {client}] = useLogoutMutation()
    
    let body: any = null;

    if (loading) {
        body = null
    } else if (data && data.me) {
        body = <div>User {data.me.email} logged in</div>
    } else {
        body = <div>not logged in</div>
    }

    return (
        <header>
            <div>
                <Link to='/'>Home</Link>
            </div>
            <div>
                <Link to='/register'>Register</Link>
            </div>
            <div>
                <Link to='/login'>Login</Link>
            </div>
            <div>
                <Link to='/bye'>Bye</Link>
            </div>
            <div>
                {!loading && data && data.me 
                    ? (
                        <button onClick={async () => {
                            await logout()
                            setAccessToken('')
                            await client!.resetStore();
                        }}>Log out</button>
                    )
                    : null
                }
            </div>
            <div>{body}</div>
            
        </header>
    )
}