'use client'
import request from '@/lib/request'
import { useEffect, useState } from 'react'
import { message, Table } from 'antd'
import { Column } from 'rc-table'
import ReactJson from 'react-json-view'

const pageSize = 10

export default function MySubmission() {
  const [messageApi, contextHolder] = message.useMessage()
  const [records, setRecords] = useState<Array<any>>([])
  const [total, setTotal] = useState<any>(0)
  const [page, setPage] = useState<any>(1)

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
  }, [page])

  function pageChange(page) {
    setPage(page)
  }

  return (
    <div style={{ padding: 20 }}>
      {contextHolder}
      <Table
        dataSource={records}
        size="small"
        bordered={true}
        pagination={{ pageSize, total, onChange: pageChange }}
      >
        <Column
          title="Domain"
          dataIndex="sbt_submit_api_domain"
          key="sbt_submit_api_domain"
        />
        <Column
          title="Country"
          dataIndex="sbt_submit_api_country_code"
          key="sbt_submit_api_country_code"
        />
        <Column
          title="Category"
          dataIndex="sbt_submit_api_category"
          key="sbt_submit_api_category"
        />
        <Column
          title="Discord"
          dataIndex="sbt_submit_api_discord"
          key="sbt_submit_api_discord"
        />
        <Column
          title="Images"
          dataIndex="sbt_submit_api_images"
          key="sbt_submit_api_images"
        />
        <Column
          title="Description"
          dataIndex="sbt_submit_api_description"
          key="sbt_submit_api_description"
        />
        <Column
          title="Data"
          dataIndex="sbt_submit_api_data"
          key="sbt_submit_api_data"
          render={(val: any) => {
            const array = JSON.parse(val)
            if (array?.length > 0) {
              return array.map((v, index) => {
                return (
                  <ReactJson src={v.request} collapsed={true} key={index} />
                )
              })
            } else {
              return ''
            }
          }}
        />
      </Table>
    </div>
  )
}
