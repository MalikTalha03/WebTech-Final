import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchMissions, joinMission, leaveMission } from '../app/features/mission/missionSlice'

const Missions = () => {
    const dispatch = useDispatch()
    const missions = useSelector((state) => state.mission.missions)
    const loading = useSelector((state) => state.mission.loading)
    const error = useSelector((state) => state.mission.error)

    useEffect(() => {
        dispatch(fetchMissions())
    }
    , [dispatch])

    if (loading) return <h1>Loading...</h1>
    if (error) return <h1>{error}</h1>
    const handleclick = (e) => {
        if (e.target.innerText === 'Join Mission') {
            handlejoin(e)
        } else {
            handleleave(e)
        }
    }
    const handlejoin = (e) => {
        dispatch(joinMission(e.target.id))  
    }
    const handleleave = (e) => {
        dispatch(leaveMission(e.target.id))
    }
    const mapdata = missions.map((mission) => {
        return (
            <div key={mission.mission_id}>
                <h1>{mission.mission_name}</h1>
                <p>{mission.description}</p>
                <p>{mission.reserved ? 'Active Member' : 'Not a member'}</p>
                <button onClick={handleclick} id= {mission.mission_id+'btn'}>{
                    mission.reserved ? 'Leave Mission' : 'Join Mission'
                }
                </button>
            </div>
        )}
    )

    
  return (
    <div>
        <div className="missions">
            <h1>Hello</h1>
            {mapdata}
        </div>
    </div>
  )
}

export default Missions