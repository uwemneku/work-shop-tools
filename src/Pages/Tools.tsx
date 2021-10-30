import React from 'react'
import TopMenu from '../Components/TopMenu'

function Tools() {
    return (
        <div className='max-h-screen overflow-hidden flex flex-col' >
            <TopMenu />
            <div className='overflow-y-auto m-2' style={{columns: 5, columnGap:3}}>
                {
                    new Array(100).fill(1).map((item, i) => {
                        return(
                            <li className={`bg-black h-24 mb-2 hover:h-32 transition-all duration-500 hover:bg-blue-500` }>
                            </li>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Tools
