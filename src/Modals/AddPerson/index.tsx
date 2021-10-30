import React, { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import tw from 'tailwind-styled-components/dist/tailwind'
import FormModal from './FormModal'

function AddPerson() {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const toggleModal = () => setIsModalVisible(!isModalVisible)
    return (
        <div>
            <IconButton onClick={toggleModal} >
                <IoMdAdd size={25} className='text-white' />
            </IconButton>
            {
                isModalVisible &&
                <FormModal onClose={toggleModal} />
            }
        </div>
    )
}

export default AddPerson

const IconButton = tw.div`
    hover:bg-blue-800
    p-2
    rounded-md
`