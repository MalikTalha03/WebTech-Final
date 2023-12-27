import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchDragons, joinDragon, leaveDragon } from '../app/features/dragons/dragonSlice'

const Dragons = () => {
    const dispatch = useDispatch()
    const dragons = useSelector((state) => state.dragon.dragons)
    const loading = useSelector((state) => state.dragon.loading)
    const error = useSelector((state) => state.dragon.error)

    useEffect(() => {
        dispatch(fetchDragons())
    }
    , [dispatch])

    if (loading) return <h1>Loading...</h1>
    if (error) return <h1>{error}</h1>


    function handleClick(e) {
        if (e.target.innerText === 'Join') {
            dispatch(joinDragon(e.target.id))
        } else {
            dispatch(leaveDragon(e.target.id))
        }
    }
    const mapdata = dragons.map((dragon) => {
        return (
            <div key={dragon.id}>
                <img src={dragon.flickr_images[0]} alt={dragon.name} />
                <h1>{dragon.name}</h1>
                <p>{dragon.description}</p>
                <button onClick={handleClick} id={dragon.id}>{dragon.reserved ? 'Leave' : 'Join'}</button>
            </div>
        )}
    )
    
  return (
    <div>
        <div className="dragons">
            <h1>Hello</h1>
            {mapdata}
        </div>
    </div>
  )
}

export default Dragons