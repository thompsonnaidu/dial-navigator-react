import React from 'react'
import { useParams } from 'react-router-dom'
import TaskType from '../../constants/TaskType';
import BeckDepressionForm from '../../components/BeckForm/BeckDepressionForm';
function TaskDetailPage() {
    const {taskId,formType} = useParams();
  return (
    <>
        {taskId && formType === TaskType.BECKTASK && 
            <div className='mt-5'>
                <BeckDepressionForm taskId={taskId}/>
            </div>
        }
    </>
  )
}

export default TaskDetailPage