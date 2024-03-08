'use client'
import React, { useCallback, useContext, useEffect } from 'react'
import { io } from 'socket.io-client'

type TSocketProvider = {
    children: React.ReactNode
}

type TSocketMessage = {
    sendMessage: (msg: string) => any;
}

const SocketContext = React.createContext<TSocketMessage | null>(null)

export const SocketProvider: React.FC<TSocketProvider> = ({ children }) => {

    const sendMessage: TSocketMessage['sendMessage'] = useCallback((msg) => {
        console.log('Send Messages', msg)
    }, [])

    useEffect(()=> {
        const _socket = io('http://localhost:8000')

        return ()=> {
            _socket.disconnect();
        }
    },[])

    return (
        <SocketContext.Provider value={{ sendMessage }}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocket = ()=> {
    const state = useContext(SocketContext);
    
    if(!state) {
        throw new Error('state is undefined')
    }
    
    return state;
}