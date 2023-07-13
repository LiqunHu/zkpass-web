'use client'
import style from './page.module.css'
import { Button, Select, Row, Col } from 'antd'
import { useEffect, useState } from 'react'
import request from '@/lib/request'
import { initTasks } from './mock'
import TaskCard from '../components/TaskCard/index'
import CountrySelect from '../components/CountrySelect/index'
import Search from '../components/Search/index'

const openExtension = (type: string, doc: any) => {
  window.postMessage(
    {
      type,
      doc
    },
    '*'
  )
}

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
  const [tasks, setTasks] = useState<Array<any>>([])
  const getTaskList = async () => {
    try {
      const response = await request.post(
        '/v1/api/zkpass/dashboard/getTaskList',
        {
          sbt_task_country_code: '',
          sbt_task_category: '',
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

  function handleSearch(val: any) {
    let token = window.localStorage.getItem('token')
    if (token) {
      openExtension('ZKPASS_EXTENSION', {
        method: 'POPUP',
        token: token,
        url: val
      })
    } else {
      alert('Please login')
    }
  }

  useEffect(() => {
    getTaskList()
  }, [])

  return (
    <div className={style.main}>
      <Search handleSearch={handleSearch} />
      <CountrySelect />
      <CardList taskList={tasks} />
    </div>
  )
}
