'use client'
import style from './page.module.css'
import { Row, Col, message } from 'antd'
import { useEffect, useState } from 'react'
import request from '@/lib/request'
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

let params: any = {}

export default function Home() {
  const [tasks, setTasks] = useState<Array<any>>([])
  const [messageApi, contextHolder] = message.useMessage()
  const getTaskList = async () => {
    try {
      const response = await request.post(
        '/v1/api/zkpass/dashboard/getTaskList',
        {
          ...params,
          limit: 6,
          offset: 0
        }
      )
      setTasks([...response.data.info.rows])
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: 'inter error'
      })
    }
  }

  function handleSearch(val: any) {
    let token = window.localStorage.getItem('token')
    console.log(3333)
    if (token) {
      openExtension('ZKPASS_EXTENSION', {
        method: 'POPUP',
        token: token,
        url: val
      })
    } else {
      messageApi.open({
        type: 'warning',
        content: 'Please login'
      })
    }
  }

  function CountryChange(obj: any) {
    params.sbt_task_country_code = obj.country
    params.sbt_task_country_code = obj.category
    getTaskList()
  }

  useEffect(() => {
    getTaskList()
  }, [])

  return (
    <>
      {contextHolder}
      <div className={style.main}>
        <Search handleSearch={handleSearch} />
        <CountrySelect handleChange={CountryChange} />
        <CardList taskList={tasks} />
      </div>
    </>
  )
}
