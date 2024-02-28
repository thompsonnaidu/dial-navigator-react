import React from 'react'
import { useParams } from 'react-router-dom'
import TaskType from '../../constants/TaskType';
import BeckDepressionForm from '../../components/BeckForm/BeckDepressionForm';
import DBTFormComponent from '../../components/DBTForm/DBTFormComponent';
function TaskDetailPage() {
    const {taskId,formType} = useParams();
  return (
    <>
        {taskId && <>
            {formType === TaskType.BECKTASK && 
            <div className='mt-5'>
                <BeckDepressionForm taskId={taskId}/>
            </div>}
            {formType === TaskType.DBTTASK && 
            <div className='mt-5'>
                <DBTFormComponent taskId={taskId}/>
            </div>}
        </>
        }
    </>
  )
}

export default TaskDetailPage