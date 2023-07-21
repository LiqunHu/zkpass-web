'use client'
import dynamic from 'next/dynamic'
import request from '@/lib/request'
import { useEffect, useState } from 'react'
import { message, Table } from 'antd'
const ReactJson = dynamic(import('react-json-view'), { ssr: false })

const pageSize = 5

const columns = [
  {
    title: 'Domain',
    dataIndex: 'sbt_submit_api_domain',
    key: 'sbt_submit_api_domain'
  },
  {
    title: 'Country',
    dataIndex: 'sbt_submit_api_country_code',
    key: 'sbt_submit_api_country_code'
  },
  {
    title: 'Category',
    dataIndex: 'sbt_submit_api_category',
    key: 'sbt_submit_api_category'
  },
  {
    title: 'Images',
    dataIndex: 'sbt_submit_api_images',
    key: 'sbt_submit_api_images'
  },
  {
    title: 'Description',
    dataIndex: 'sbt_submit_api_description',
    key: 'sbt_submit_api_description'
  },
  {
    title: 'Data',
    dataIndex: 'sbt_submit_api_data',
    key: 'sbt_submit_api_data',
    render: (_text: any, record: any) => {
      return record.sbt_submit_api_data.map((v: any, index: number) => {
        return <ReactJson src={v} collapsed={true} key={index} />
      })
    }
  }
]

export default function MySubmission() {
  const [messageApi, contextHolder] = message.useMessage()
  const [records, setRecords] = useState<Array<any>>([])
  const [total, setTotal] = useState<any>(0)
  const [page, _setPage] = useState<any>(1)
  const [current, setCurrent] = useState(1)

  const getRecords = async () => {
    try {
      const response = await request.post(
        '/v1/api/zkpass/submitapi/getSubmitAPIList',
        {
          limit: pageSize,
          offset: (page - 1) * pageSize
        }
      )
      setRecords([...response.data.info.rows])
      setTotal(parseInt(response.data.info.total))
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: 'inter error'
      })
    }
  }

  useEffect(() => {
    getRecords()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div style={{ padding: 20 }}>
      {contextHolder}
      <Table
        columns={columns}
        dataSource={records}
        size="small"
        bordered={true}
        rowKey={'sbt_submit_api_id'}
        pagination={{
          current,
          pageSize,
          total,
          onChange: () => {
            setCurrent(page)
            getRecords()
          }
        }}
      />
    </div>
  )
}
