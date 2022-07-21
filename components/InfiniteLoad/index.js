import { ITEMS_PER_PAGE } from 'constants'
import { useEffect } from 'react'

const InfiniteLoad = (props) => {
    const { loading, arr, setList, currentPage, setCurrentPage } = props
    const LAST_PAGE = Math.ceil(arr.length / ITEMS_PER_PAGE)
    const TOTAL_ITEMS = ITEMS_PER_PAGE * currentPage

    const REMAINING_ITEMS = arr.length - TOTAL_ITEMS
    const IS_LAST_PAGE = (REMAINING_ITEMS) <= 0

    useEffect(() => {
        setList(arr.slice(0, currentPage * ITEMS_PER_PAGE)
        )
    }, [arr, currentPage])

    const goNext = () => {
        if (IS_LAST_PAGE) return

        setCurrentPage(curr => curr + 1)
    }

    const showAll = () => {
        setCurrentPage(LAST_PAGE)
    }

    return (!loading &&
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <p>Showing {IS_LAST_PAGE ? arr.length : currentPage * ITEMS_PER_PAGE} out of {arr.length} items</p>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                {!IS_LAST_PAGE &&
                    <button onClick={goNext}>Load more</button>
                }
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                {!IS_LAST_PAGE &&
                    <a onClick={showAll}>Show all</a>
                }
            </div>
        </div>
    )
}

export default InfiniteLoad
