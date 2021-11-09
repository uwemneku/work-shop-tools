import React from 'react'
import tw from "tailwind-styled-components"
import {FaTools} from 'react-icons/fa'
import {MdOutlineEngineering} from 'react-icons/md'
import {AiFillSetting} from 'react-icons/ai'
import { useRouteMatch } from 'react-router-dom'

function SideMenu() {
    const y = useRouteMatch()
    return (
        <Container>
            <ul>
                <Link active={true} >
                    <FaTools size={20} />
                    <Text>Tools </Text>
                </Link>
            </ul>
            <ul>
                <Link active={false}>
                    <MdOutlineEngineering size={25} />
                    <Text>Breakdown</Text>
                </Link>
            </ul>
            <ul>
                <Link active={false} >
                    <AiFillSetting size={25} />
                    <Text>Settings </Text>
                </Link>
            </ul>
        </Container>
    )
}

export default SideMenu


const Container = tw.div`
    h-screen
    max-h-screen
    transition-all
    duration-300
    w-20
    group
    hover:w-52
    bg-gray-700
    py-16
    cursor-default
`
const Link = tw.li<{active: boolean}>`
    ${({active}) => (active ? "bg-gray-900 border-blue-500 font-semibold" : "bg-gray-700 border-gray-700 hover:bg-gray-800 hover:border-blue-200")}
    text-white
    p-3
    flex
    items-center
    border-l-4
    text-base
    font-normal
    transform-none
    mb-2
    justify-center
    group-hover:justify-start
    
    
`
const Text = tw.p`
    ml-3
    transition-none
    hidden
    group-hover:block
`
