'use client'
import s from './page.module.css'
import { Button, Select } from 'antd'
import { useEffect, useState } from 'react'
import { getCodeList } from 'country-list'
import request from '@/lib/request'

const categoryOptions = [
  {
    value: 'bank',
    label: 'bank'
  },
  {
    value: 'game',
    label: 'game'
  }
]
const countries = getCodeList()
const countryOptions = Object.keys(countries).map((key) => ({
  value: key,
  label: countries[key]
}))

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [tasks, setTasks] = useState<Array<any>>([])

  const getTaskList = async () => {
    try {
      const response = await request.post(
        '/v1/api/zkpass/dashboard/getTaskList',
        {
          sbt_task_country_code: selectedCountry,
          sbt_task_category: selectedCategory,
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

  useEffect(() => {
    getTaskList()
  }, [])

  return (
    <div className={s.main}>
      <form className={s.search}>
        <input
          type="text"
          name="domain"
          autoComplete="off"
          placeholder="domain.com"
          pattern="^(?:[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.)?[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$"
          required
          className={s.input}
        />
        <button type="submit" className={s.enter}>
          Entry
        </button>
      </form>
      <div>
        <Select
          placeholder="Country"
          value={selectedCountry}
          onChange={setSelectedCountry}
          className={s.selectc}
          options={countryOptions}
          allowClear={true}
        />

        <Select
          placeholder="Category"
          value={selectedCategory}
          onChange={setSelectedCategory}
          className={s.selectcg}
          options={categoryOptions}
          allowClear={true}
        />
      </div>
      <div className={s.container}>
        <div className={s.task_grid}>
          {tasks.map((task) => {
            return (
              <div className={s.card} key={task.sbt_task_id}>
                <div className={s.card_body}>
                  <h2 className={s.title}>{task.sbt_task_url}</h2>
                  <p className={s.line}>{task.sbt_task_country_code}</p>
                  <p className={s.line}>{task.sbt_task_category}</p>
                  <p className={s.line}>{task.sbt_task_requirements}</p>
                  <p className={s.line}>{task.sbt_task_reward}</p>
                  <Button size="middle" className={s.submit}>
                    Submit
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
