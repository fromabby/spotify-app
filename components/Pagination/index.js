import { ITEMS_PER_PAGE } from 'constants'
import { useEffect } from 'react'

const Pagination = (props) => {
    const { loading, arr, setList, currentPage, setCurrentPage } = props
    const TOTAL_ITEMS = ITEMS_PER_PAGE * currentPage

    const REMAINING_ITEMS = arr.length - TOTAL_ITEMS
    const IS_LAST_PAGE = (REMAINING_ITEMS) <= 0
    const IS_FIRST_PAGE = currentPage === 1

    useEffect(() => {
        setList(
            arr.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
        )
    }, [arr, currentPage])

    const goBack = () => {
        if (IS_FIRST_PAGE) return

        setCurrentPage(curr => curr - 1)
    }

    const goNext = () => {
        if (IS_LAST_PAGE) return

        setCurrentPage(curr => curr + 1)
    }

    return (!loading &&
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <p>Page {currentPage} of {Math.ceil(arr.length / ITEMS_PER_PAGE)}</p>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <button onClick={goBack} disabled={IS_FIRST_PAGE} style={{ marginRight: '5px' }}>Previous</button>
                <button onClick={goNext} disabled={IS_LAST_PAGE}>Next</button>
            </div>
        </div>
    )
}

export default Pagination