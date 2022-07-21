import { useState, useEffect } from 'react'
import { ITEMS_PER_PAGE } from 'constants'

const Pagination = (props) => {
    const { arr, currentPage, setCurrentPage } = props
    const TOTAL_ITEMS = ITEMS_PER_PAGE * currentPage

    const goBack = () => {
        if (currentPage === 1) return

        setCurrentPage(curr => curr - 1)
    }

    const goNext = () => {
        const LEN = arr.length

        console.log(LEN, TOTAL_ITEMS, TOTAL_ITEMS % LEN)
        if (LEN % TOTAL_ITEMS === TOTAL_ITEMS) return

        setCurrentPage(curr => curr + 1)
    }

    return (
        <div>
            {currentPage !== 1 &&
                <button onClick={goBack}>Previous</button>}
            <button onClick={goNext} disabled={arr.length % TOTAL_ITEMS === TOTAL_ITEMS}>Next</button>
        </div>
    )
}

export default Pagination
