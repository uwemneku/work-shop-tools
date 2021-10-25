import { useEffect, useRef } from 'react'
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




function AddPerson() {
  const dispatch = useAppDispatch()
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const initialValues: BorrowInfoType = { department: '', name: '', id: '', tools: [{ name: uuidv4(), number: '', id:uuidv4() }] }
  
    const formik = useFormik({
    initialValues,
    // validationSchema: validationSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => {
      // setOpen(false);
      // dispatch(addBorrower(formik.values));
      alert(JSON.stringify(values) )
    },
  })
  formik.values.id = uuidv4()

  const toolsArrayLength = useRef<number>(formik.values.tools.length) 

  useEffect(() => {
    if (scrollRef.current && (toolsArrayLength.current < formik.values.tools.length)) {
        const {scrollHeight} = scrollRef.current
        scrollRef.current.scrollTo({behavior:'smooth', top:scrollHeight})
    }
    toolsArrayLength.current = formik.values.tools.length
  }, [formik.values.tools.length])

  const increaseToolsInput = () => {
    const tools = formik.values.tools
    tools.push({ name: uuidv4(), number: '', id:uuidv4() })
    formik.setValues({ ...formik.values, tools:[...tools] })
  }

  const removeToolsInput = (id: string) => {
    console.log(id);
    const {tools} = formik.values
    console.log(tools);
    const newTools = tools.filter((item, index) => {
      if(item.id === id) console.log(index, id);
      return item.id !== id
    } )
    console.log(newTools);
    formik.setValues({ ...formik.values, tools:newTools })
  }
  return (
    <Container className='' >
      <Form onSubmit={formik.handleSubmit} >
        <div className='p-5 flex justify-between bg-blue-500'>
          <p className='text-white font-semibold text-xl' >Add a new record</p>
          <IoClose size={20} className='text-white hover:bg-white hover:text-black' />
        </div>
        <div className='p-4 pb-0 flex flex-col' >
            <Input  placeholder='Name' 
              name='name'
              id='name'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            <Input  placeholder='Department' 
              name='department'
              id='department'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.department}
            />
        </div>
        <div className='p-4 pt-0 flex flex-col' >
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
            <div onClick={increaseToolsInput} className='flex text-white items-center' >
              <GoDiffAdded  className='text-white ml-3' />
              <small className='mx-2 cursor-pointer' > Add Tools</small>
            </div>
            <Button>
              <p>Borrow tools</p>
            </Button>
        </div>
      </Form>
    </Container>
  )
}

export default AddPerson

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
const IconButton = tw.div`
    hover:bg-green-600
    border-2
    border-white
    ml-2
    p-2
    rounded-md
`

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required'),
  department: Yup.string()
    .required('Department is required'),
  tools: Yup.array().of(
    Yup.object().shape({
      name: Yup.string()
        .required('Name of tool is required'),
      number: Yup.string()
        .required('Number of tool is required'),
    })
  )
})

                          //  <TextField
                          //    id={`tools.${index}.name`}
                          //    label="Tools"
                          //    InputLabelProps={{ sx: { fontSize: 15 } }}
                          //    variant="outlined"
                          //    size='small'
                          //    onChange={formik.handleChange}
                          //    onBlur={formik.handleBlur}
                          //    value={formik.values.tools[index].name}
                          //    error={(() => {
                          //      if (formik.errors?.tools as ty) {
                          //        return Boolean(toolsError[index]?.name)
                          //      } else {
                          //       return false
                          //   }
                          //    })()
                          //    }

                          //    sx={{ flex: 2 }}
                          //  />
                          //  <TextField
                          //    id={`tools.${index}.number`}
                          //    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 1 }}
                          //    variant="outlined"
                          //    type='number'
                          //    size='small' sx={{ maxWidth: 80, marginX: 1 }}
                          //    InputLabelProps={{ sx: { fontSize: 8 } }}
                          //    onChange={formik.handleChange}
                          //    onBlur={formik.handleBlur}
                          //    value={formik.values.tools[index].number}
                          //    error={(() => {
                          //      if (formik.errors?.tools as ty) {
                          //        return Boolean(toolsError[index]?.number)
                          //      } else {
                          //        return false
                          //      }
                          //    })()
                          //    }
                          //  />
                          
                     
// import { v4 as uuidv4 } from 'uuid';


// type ty = FormikErrors<{
//   name: string;
//   number: string;
// }>[]

// const Transition = React.forwardRef(function Transition(
//   props: TransitionProps & {
//     children: React.ReactElement<any, any>;
//   },
//   ref: React.Ref<unknown>,
// ) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

// const InputContainer = styled(Box)(({ theme }) => ({
//   padding: theme.spacing(1),
// }))

// export default function AppPersonDialog() {


//   const toolsError = (formik.errors?.tools as ty)

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleSnackClose = () => {
//     setOpenSnack(false)
//   }
//   React.useEffect(() => {
//     open && formik.setValues({...initialValues, id:uuidv4()})
//     // !open && formik.resetForm();

//     return () => { formik.resetForm() }
//   }, [open])

//   const increaseToolsInput = () => {
//     const tools = formik.values.tools
//     tools.push({ name: '', number: '' })
//     formik.setValues({ ...formik.values, tools })
//   }



//   return (
//     <div>
//       <Tooltip title="Add new person">
//         <IconButton onClick={handleClickOpen}>
//           <GoDiffAdded size={30} />
//         </IconButton>
//       </Tooltip>
//       <Dialog
//         open={open}
//         TransitionComponent={Transition}

//         onClose={handleClose}
//         aria-describedby="alert-dialog-slide-description"
//       >
//         <DialogTitle>{"Borrow tool out"}</DialogTitle>
//         <Container maxWidth="lg" sx={{ paddingY: 2 }} >
//           <Box id='formik1' component={'form'} onSubmit={formik.handleSubmit} >

//             <InputContainer>
//               <TextField
//                 id="name"
//                 fullWidth
//                 label="Name"
//                 variant="outlined"
//                 size='small'
//                 InputLabelProps={{ sx: { fontSize: 15 } }}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.name}
//                 error={Boolean(formik.errors.name) && formik.touched.name}
//               />
//             </InputContainer>
//             <InputContainer>
//               <TextField
//                 id="department"
//                 fullWidth
//                 label="Department"
//                 variant="outlined"
//                 size='small'
//                 InputLabelProps={{ sx: { fontSize: 15 } }}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.department}
//                 error={Boolean(formik.errors.department) && formik.touched.department}
//               />
//             </InputContainer>
//             {
//               formik.values.tools.map((item, index, tools) => {
//                 return (
//                   <InputContainer key={index} sx={{ display: 'flex' }} >
//                     <TextField
//                       id={`tools.${index}.name`}
//                       label="Tools"
//                       InputLabelProps={{ sx: { fontSize: 15 } }}
//                       variant="outlined"
//                       size='small'
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       value={formik.values.tools[index].name}
//                       error={(() => {
//                         if (formik.errors?.tools as ty) {
//                           return Boolean(toolsError[index]?.name)
//                         } else {
//                           return false
//                         }
//                       })()
//                       }

//                       sx={{ flex: 2 }}
//                     />
//                     <TextField
//                       id={`tools.${index}.number`}
//                       inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 1 }}
//                       variant="outlined"
//                       type='number'
//                       size='small' sx={{ maxWidth: 80, marginX: 1 }}
//                       InputLabelProps={{ sx: { fontSize: 8 } }}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       value={formik.values.tools[index].number}
//                       error={(() => {
//                         if (formik.errors?.tools as ty) {
//                           return Boolean(toolsError[index]?.number)
//                         } else {
//                           return false
//                         }
//                       })()
//                       }
//                     />
//                     <IconButton onClick={() => tools.length > 1 && removeToolsInput(index)} >
//                       <VscDiffRemoved />
//                     </IconButton>
//                   </InputContainer>
//                 )
//               })
//             }
//             <Tooltip title='Add new tools' >
//               <IconButton onClick={increaseToolsInput} sx={{ display: 'block' }} >
//                 <GoDiffAdded />
//               </IconButton>
//             </Tooltip>
//             <Button type='submit' variant='contained' size="medium" fullWidth
//               onClick={() => (Object.keys(formik.errors).length > 0) && setOpenSnack(true)
//               }
//             >
//               Borrow Tools
//             </Button>
//           </Box>
//         </Container>
//         <Snackbar
//           open={openSnack}
//           autoHideDuration={5000}
//           onClose={handleSnackClose}
//           message={'Incomplete details'}

//         />
//       </Dialog>
//     </div>
//   );
// }
