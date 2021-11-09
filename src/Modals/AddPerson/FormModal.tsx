import React, { useEffect, useRef, useState, PropsWithChildren } from 'react'
import tw from 'tailwind-styled-components/dist/tailwind'
import {useFormik } from 'formik'
import * as Yup from 'yup'
import { useAppDispatch } from '../../hooks/reduxHook'
import { BorrowInfoType } from '../../types/BorrowInfo'
import { IoClose } from 'react-icons/io5'
import { GoDiffAdded } from 'react-icons/go'
import { Input } from './Styles'
import ToolsInput from './ToolsInput'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import { v4 as uuidv4 } from 'uuid';
import { addBorrower } from '../../Slice/borrowerSlice'

interface Props{
  onClose: () => void
}




function FormModal({onClose}:PropsWithChildren<Props>): JSX.Element | null {
  const dispatch = useAppDispatch()
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const initialValues: BorrowInfoType = { department: '', name: '', id: uuidv4(), tools: [{ name:'', number: '', id:uuidv4() }] }

  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => {
      dispatch(addBorrower(formik.values))
      onClose();
    },
  })
  const toolsArrayLength = useRef<number>(formik.values.tools.length)   //keeps track of the previous number of tools input when there is a render

  //reset form when this component mounts
  useEffect(() => {
    formik.resetForm()
  }, [])

  useEffect(() => {
    // The statement (toolsArrayLength.current < formik.values.tools.length) ensures that 
    // scrollTo is only called when the tools array in formik increases and not when it reduces
    if (scrollRef.current && (toolsArrayLength.current < formik.values.tools.length)) {
      const { scrollHeight } = scrollRef.current
      scrollRef.current.scrollTo({ behavior: 'smooth', top: scrollHeight })
    }
    toolsArrayLength.current = formik.values.tools.length
  }, [formik.values.tools.length])


  const increaseToolsInput = () => {
    const tools = formik.values.tools
    tools.push({ name: '', number: '', id: uuidv4() })
    formik.setValues({ ...formik.values, tools})
  }

  //Removes a tool from the tools array in formik 
  const removeToolsInput = (id: string) => {
    const { tools: oldTools } = formik.values
    const tools = oldTools.filter((item, index) => item.id !== id)
    formik.setValues({ ...formik.values, tools })
  }


  return (
        <Container>
          <Form onSubmit={formik.handleSubmit} >
            <div className='p-5 flex justify-between bg-blue-500'>
              <p className='text-white font-semibold text-xl' >Add a new record</p>
              <IoClose onClick={onClose} size={20} className='text-white hover:bg-white hover:text-black' />
            </div>
            <div className='p-4 pb-0 flex flex-col' >
              <Input placeholder='Name'
                name='name'
                id='name'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                required
              />
              <Input placeholder='Department'
                name='department'
                id='department'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.department}
                required
              />
            </div>
            <div className='p-4 pt-0 flex flex-col' >
              {/* ================Dynamic tools input starts here============================= */}
              <div className='max-h-64 overflow-auto overflow-x-hidden py-2' ref={scrollRef} >
                <AnimateSharedLayout>
                  <motion.div layout initial={{ borderRadius: 25 }}>
                    <AnimatePresence>
                      {
                        formik.values.tools.map((item, index) => {
                          return (
                            <ToolsInput
                              index={index}
                              key={item.id}
                              id={item.id}
                              showIcon={formik.values.tools.length > 1}   // only show the remove icon when the tool input is more than one
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              toolName={formik.values.tools[index].name}
                              toolNumber={formik.values.tools[index].number}
                              onRemoveIconClick={removeToolsInput}
                            />
                          )
                        })
                      }
                    </AnimatePresence>
                  </motion.div>
                </AnimateSharedLayout>
              </div>
              {/* ================Dynamic tools input ends here============================= */}

              {/* =============button to add form starts here */}
              <div onClick={increaseToolsInput} className='flex text-blue-500 font-bold items-center my-2' >
                <GoDiffAdded className='ml-3' />
                <small className='mx-2 cursor-pointer' > Add Tools</small>
              </div>
              {/* =============button to add form ends here */}
              <Button>
                <p>Borrow tools</p>
              </Button>
            </div>
          </Form>
        </Container>
  )
}

export default FormModal

const Container = tw.div`
      flex
      justify-center
      absolute 
      top-0 
      left-0 
      w-screen 
      h-screen 
      bg-black 
      bg-opacity-50
`
const Form = tw.form`
  bg-gray-900
  self-center
  rounded-sm
  drop-shadow-md
  flex
  flex-col
  overflow-auto
`

const Button = tw.button`
  font-bold
  text-white
  border-2
  hover:bg-green-700
  p-3
  mt-4
  transition-all
  duration-300
  transform
  drop-shadow-2xl
  hover:-translate-y-2
  hover:shadow-lg
`

