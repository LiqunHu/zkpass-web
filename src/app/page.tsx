'use client'
import style from './page.module.css'
import { Button, Select, Row, Col } from 'antd'
import { useEffect, useState } from 'react'
import request from '@/lib/request'
import { initTasks } from './mock'
import TaskCard from '../components/TaskCard/index'
import CountrySelect from '../components/CountrySelect/index'
import Search from '../components/Search/index'

function CardList({ taskList }: any) {
  return (
    <Row gutter={16}>
      {taskList.map((task: any, index: any) => (
        <Col span={6} key={index} style={{ marginTop: '1rem' }}>
          <TaskCard task={task} />
        </Col>
      ))}
    </Row>
  )
}

export default function Home() {
  const [tasks, setTasks] = useState<Array<any>>(initTasks)
  const getTaskList = async () => {
    try {
      const response = await request.post(
        '/v1/api/zkpass/dashboard/getTaskList',
        {
          sbt_task_country_code: 'selectedCountry',
          sbt_task_category: 'selectedCategory',
          search_text: '',
          limit: 6,
          offset: 0
        }
      )
      console.log(response.data.info.rows)
      setTasks([...response.data.info.rows])
    } catch (error) {
      console.error(error)
    }
  }

  // useEffect(() => {
  //   getTaskList()
  // }, [])
  function handleSearch(val: any) {
    console.log(val)
  }

  return (
    <div className={style.main}>
      <Search handleSearch={handleSearch} />
      <CountrySelect />
      <CardList taskList={tasks} />
    </div>
  )
}
