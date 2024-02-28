import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import BASEURL from '../../config/baseurl'
import axios from "axios";
import TaskType from "../../constants/TaskType";

import { useNavigate } from 'react-router';

const DisplayTable = ({ taskSection = [],onActionClick, ...props }) => {
    return <>
        <table className=" table table-bordered">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Generate On</th>
                    <th scope="col">Deadline</th>
                    <th scope="col">Theropist</th>
                    <th scope="col">operation</th>
                </tr>
            </thead>
            <tbody>
                {taskSection && taskSection.map((task, index) => {

                    return <tr key={task._id}>
                        <th scope="row">{index + 1}</th>
                        <td>{new Date(task.generatedDate).toISOString()}</td>
                        <td>{new Date(task.deadline).toISOString()}</td>
                        <td>{task.therapistId.name}</td>
                        <td><div className='btn btn-primary btn-sm' onClick={()=>onActionClick(task,props.sectionName)}>go ahead</div></td>

                    </tr>
                })}
                {(taskSection == null || taskSection.length < 1) && <tr className='text-center'>No pending task</tr>}
            </tbody>
        </table></>
}
function ClientPendingTaskComponent() {
    const [pendingTask, setPendingTask] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const { currentUser } = useAuth();
    const navigate=useNavigate();

    const handleClickOnTakeTest=(task, taskType)=>{

        if(task?._id && taskType){
           navigate(`/client/task/${taskType}/${task._id}`);
        }
    }
    useEffect(() => {
        const fetchTask = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${BASEURL}/api/client/pendingtasks`, { headers: { authToken: currentUser?.accessToken } })
                setPendingTask(response.data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        }

        fetchTask();

    }, [])
    return (
        <div>
           {isLoading && <div>Fetching information</div>}
           {!isLoading &&  <div className='container'>
                <h4>Pending BeckTask</h4>
                <DisplayTable taskSection={pendingTask.becTask} sectionName={TaskType.BECKTASK} onActionClick={handleClickOnTakeTest}></DisplayTable>
                <h4>Pending Progress Question</h4>
                <DisplayTable taskSection={pendingTask.programTask} sectionName={TaskType.ProgessTask} onActionClick={handleClickOnTakeTest}></DisplayTable>
                <h4>Pending DBT Dairy</h4>
                <DisplayTable taskSection={pendingTask.dbtTask} sectionName={TaskType.DBTTASK} onActionClick={handleClickOnTakeTest}></DisplayTable>
            </div>}
        </div>
    )
}

export default ClientPendingTaskComponent