import request from '@/lib/request'
import { useEffect, useState } from 'react'
import { Row, Col, message } from 'antd'

export default function MySubmission() {
  const [messageApi, contextHolder] = message.useMessage()
  const [records, setRecords] = useState<Array<any>>([])

  const getRecords = async () => {
    try {
      const response = await request.post(
        '/v1/api/zkpass/submitapi/getSubmitAPIList',
        {
          limit: 6,
          offset: 0
        }
      )
      setRecords([...response.data.info.rows])
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: 'inter error'
      })
    }
  }

  useEffect(() => {
    getRecords()
  }, [])

  return (
    <>
      {contextHolder}
      <div>123</div>
    </>
  )
}
