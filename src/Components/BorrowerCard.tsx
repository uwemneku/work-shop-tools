import React, { FC } from 'react'
import { BorrowInfoType } from '../types/BorrowInfo'
import tw from 'tailwind-styled-components/dist/tailwind'
const BorrowerCard:FC<BorrowInfoType> = ({department, id, name, tools}) => {
    return (
        <Container>
        </Container>
    )
}

const Container = tw.li`
    h-24 
    m-4
    hover:h-32 
    transition-all 
    duration-500 
    border-2
    border-opacity-60
    rounded-md
    hover:bg-blue-500
`
export default BorrowerCard


