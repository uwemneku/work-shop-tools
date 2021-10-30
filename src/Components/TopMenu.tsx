import React, { useRef, useState } from 'react'
import tw from 'tailwind-styled-components/dist/tailwind'
import {GoSearch} from 'react-icons/go'
import {IoClose} from 'react-icons/io5'
import {IoMdAdd} from 'react-icons/io'
import AddPerson from '../Modals/AddPerson'
const Container = tw.div`
        flex
        justify-between
        items-center
        bg-gray-900
        p-2
        border-2
        border-gray-500
`
const InputContainer = tw.div`
    flex
    p-1
    px-2
    rounded-lg
    items-center
    bg-gray-700
    border-2
    border-gray-700
    hover:border-gray-500
`
const Input = tw.input`
    bg-gray-700
    focus:outline-none
    px-3
    text-sm
    text-white
`

function TopMenu() {
    return (
        <Container>
            <InputComponent />
            <div>
                <AddPerson />
            </div>
        </Container>
    )
}

const InputComponent = () => {
    const [inputValue, setInputValue] = useState<string>('')
    const inputRef = useRef<HTMLInputElement>()

    const handleTextChange:React.ChangeEventHandler<HTMLInputElement> | undefined = ({target}) => {
            setInputValue(target.value)
            console.log(target.value);
    }

    const handleIconClick = () => setInputValue('')
    return(
            <InputContainer>
                <GoSearch size={15} color='white' />
                <Input ref={inputRef} value={inputValue} onChange={handleTextChange} />
                {(inputValue.length > 0) && <IoClose size={20} className='text-white hover:bg-white hover:text-black' onClick={handleIconClick} />}
            </InputContainer>

    )
}

export default TopMenu

