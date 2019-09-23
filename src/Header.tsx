import React from 'react'
import { Link } from 'react-router-dom'
import { useMeQuery } from './generated/graphql'

export const Header: React.FC = () => {
    const {data, loading} = useMeQuery({ fetchPolicy: 'network-only' })
    
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
            <div>{body}</div>
            
        </header>
    )
}