import React from 'react'

function BorrowerCard() {
    return (
        <div>
            
        </div>
    )
}

export default BorrowerCard


// import { Divider, IconButton, MenuItem, MenuList, Paper, Tooltip, Typography } from '@mui/material'
// import React, { FC } from 'react'
// import { Box, SxProps, Theme } from '@mui/system'
// import {IoIosAddCircle} from 'react-icons/io'
// import { BorrowInfoType } from '../types/BorrowInfo'
// import { motion } from 'framer-motion'

// const menuContainerStyle: SxProps<Theme> = {
//     maxWidth: 300,
//     width: 300,
//     padding: 1,
//     margin: 2
//  }

// const BorrowerCard:FC<BorrowInfoType> = ({name, department, tools, id}) => {
//     return (
//         <Box sx={{position:'relative', alignSelf:'flex-start'}}>
//             <Paper sx={menuContainerStyle} elevation={2} >
//                 <MenuList>
//                     <MenuItem sx={{display:'flex', justifyContent:'space-between'}} >
//                         <Box>
//                             <Typography variant='caption' color='primary'   >
//                                 {department}
//                             </Typography>
//                             <Typography variant='h5' sx={{fontWeight:'medium', whiteSpace:'normal'}} >
//                                 {name}
//                             </Typography>

//                         </Box>
//                     </MenuItem>
//                     {
//                         tools.map((item, index) => {
//                             return(
//                                 <Box key={index}>
//                                     <Divider />
//                                     <MenuItem sx={{whiteSpace:'normal', display:'flex', justifyContent:'space-between'}} >
//                                         <Typography  sx={{wordWrap: 'break-word'}} >
//                                             {item.name}
//                                         </Typography>
//                                         <Typography>
//                                             {item.number}
//                                         </Typography>
//                                     </MenuItem>
//                                 </Box>
//                             )
//                         })
//                     }
//                 </MenuList>
//                 <Box sx={{position:'absolute', bottom:0, right:0}}>
//                     <Tooltip title="Search">
//                         <IconButton>
//                             <IoIosAddCircle color={'blue'} size={30} />
//                         </IconButton>
//                     </Tooltip>
//                 </Box>
//             </Paper>
//         </Box>
//     )
// }

// export default React.memo(BorrowerCard) 
