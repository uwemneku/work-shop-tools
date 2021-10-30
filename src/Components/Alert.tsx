import { opendirSync } from 'fs'
import React, { FC, useEffect, useState } from 'react'
import tw from 'tailwind-styled-components/dist/tailwind'
import Portal from './Portal'

interface Props{
    mode?: 'danger' | 'success' | 'default'
    onClose?: () => void
    autoHideDuration?: number
    open: boolean
}

const Alert:FC<Props> = ({mode = 'default', open, children, onClose, autoHideDuration=200 }) => {
    const [alertVisibility, setAlertVisibility] = useState(open)

    useEffect(() => {
        const timer = setTimeout(() => {
            setAlertVisibility(false)
        }, autoHideDuration);
        return () => clearTimeout(timer)
    }, [autoHideDuration])

    useEffect(() => {
        setAlertVisibility(open)
    }, [open])


    return (
        <Portal>
            {
                alertVisibility &&
                <Container $mode={mode} >
                    {children}
                </Container>
            }
        </Portal>
    )
}

export default Alert

 
const Container = tw.div<{$mode: Props['mode']}>`
    ${({$mode}) => ($mode === 'danger' ? 'bg-red-600' : $mode === 'success' ? 'bg-green-500' : 'bg-blue-500')}
    absolute
    top-1
    right-1
    rounded-sm
    p-3
    m-3
    max-w-sm
    bg-gray-100
`