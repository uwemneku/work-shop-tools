import React, { FC, useEffect, useRef } from 'react'
import { VscDiffRemoved } from 'react-icons/vsc'
import { Tooltip } from 'react-tippy'
import { Input } from './Styles'
import { motion } from "framer-motion"

interface Props {
    index: number
    id: string
    showIcon: boolean
    onChange: React.ChangeEventHandler<HTMLInputElement> | undefined
    onBlur: React.FocusEventHandler<HTMLInputElement> | undefined
    toolName: string | number | readonly string[] | undefined
    toolNumber: string | number | readonly string[] | undefined
    onRemoveIconClick: (id: string) => void
}

const ToolsInput: FC<Props> = ({ onBlur, onChange, toolName, toolNumber, onRemoveIconClick, id, index, showIcon }) => {
    const handleIconClick = () => {onRemoveIconClick(id); console.log('clickedddd');
    }
    const ref = useRef(0)
    useEffect(() => {
        ref.current = ref.current + 1
    })
    return (
        <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ height:0, opacity: 0 }}
        >
            <div className='flex items-center'>
                <Input placeholder='Tool Name'
                    name={`tools.${index}.name`}
                    id={`tools.${index}.name`}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={toolName}
                    required
                />
                <Input className='w-16 ml-3' type={'number'} min={1}
                    name={`tools.${index}.number`}
                    id={`tools.${index}.number`}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={toolNumber}
                    required
                />
                {
                    showIcon &&
                    <Tooltip
                        title="Remove this entry"
                        position="bottom-start"
                        trigger="mouseenter"
                        arrow={true}
                    >
                        <VscDiffRemoved size={30} className='text-white hover:text-red-700 ml-3' onClick={handleIconClick} />
                    </Tooltip>
                }
            </div>
        </motion.div>
    )
}

export default React.memo(ToolsInput)

// export default ToolsInput