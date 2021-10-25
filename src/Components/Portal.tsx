import React, { FC } from 'react'
import {createPortal} from 'react-dom'

const Portal:FC = ({children}) => {
    return createPortal(children, document.body)
}

export default Portal;