import React from 'react'
import BorrowerCard from '../Components/BorrowerCard';
import TopMenu from '../Components/TopMenu'
import { useAppSelector } from '../hooks/reduxHook';
import Masonry from 'react-masonry-css'

function Tools() {
    const appData = useAppSelector(state => state.borrowerInfo)
    return (
        <div className='max-h-screen h-screen overflow-hidden flex flex-col' >
            <TopMenu />
            <Masonry
                breakpointCols={4}
                className="my-masonry-grid bg-black flex-1 overflow-y-scroll"
                columnClassName="my-masonry-grid_column">
                {
                    new Array(90).fill(1).map((item, i) => {
                        return (
                            <BorrowerCard {...item} key={i} />
                        )
                    })
                }
        </Masonry >
        </div>
    )
}

export default Tools
