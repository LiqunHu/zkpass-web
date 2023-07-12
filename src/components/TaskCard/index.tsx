import style from './index.module.css'
import { Button } from 'antd'

export default function TaskCard({ task }) {
  return (
    <div className={style.cardContainer}>
      <div className={style.cell}>
        <div>Country:</div>
        <div>{task.sbt_task_country_code}</div>
      </div>
      <div className={style.cell}>
        <div>Category:</div>
        <div>{task.sbt_task_category}</div>
      </div>
      <div className={style.cell}>
        <div>Url:</div>
        <div>{task.sbt_task_url}</div>
      </div>
      <div className={style.cell}>
        <div>Requirements:</div>
        <div>{task.sbt_task_requirements}</div>
      </div>
      <div className={style.cell}>
        <div>Reward:</div>
        <div>{task.sbt_task_reward}</div>
      </div>
      {/*<Button size="middle">*/}
      {/*  Submit*/}
      {/*</Button>*/}
    </div>
  )
}
