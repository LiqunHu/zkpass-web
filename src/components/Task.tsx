'use client'
import Button from '@/components/Button'
import request from '@/lib/request'
import { useEffect, useState } from 'react'

export default async function Task() {
  const [countryCode, setCountryCode] = useState('')
  const [taskType, setTaskType] = useState('')
  const [searchText, setSearchText] = useState('')
  const [tasks, setTasks] = useState<Array<any>>([])
  const getTaskList = async () => {
    try {
      const response = await request.post(
        '/v1/api/zkpass/dashboard/getTaskList',
        {
          sbt_task_country_code: countryCode,
          sbt_task_type: taskType,
          search_text: searchText,
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
  //   // async function work() {
  //   //   await getTaskList()
  //   // }
  //   // console.log('33333')
  //   // work()
  //   setTasks([
  //     {
  //       created_at: '2023-07-01T11:32:19.452Z',
  //       sbt_task_country_code: 'US',
  //       sbt_task_id: 1,
  //       sbt_task_requirements: '1111',
  //       sbt_task_reward: '2222',
  //       sbt_task_status: '1',
  //       sbt_task_type: 'bank',
  //       sbt_task_url: 'http://www.ccb.com',
  //       state: '1',
  //       updated_at: '2023-07-01T11:32:19.452Z',
  //       version: 0
  //     }
  //   ])
  // }, [])
  return (
    <main className="flex h-max flex-col items-center justify-between p-16">
      <form
        onSubmit={async (e) => {
          e.preventDefault()
        }}
        className="mt-10 flex h-10 w-full max-w-2xl justify-between space-x-4 px-5"
      >
        <input
          type="text"
          name="domain"
          onInput={(e) => {
            console.log(e.target.value)
          }}
          autoComplete="off"
          placeholder="domain.com"
          pattern="^(?:[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.)?[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$"
          required
          className="min-w-0 flex-auto rounded-md border border-gray-300 px-4 focus:border-black focus:ring-0 sm:text-sm"
        />
        <button
          type="submit"
          className="w-28 rounded-md border border-solid border-black bg-black py-2 text-sm text-white transition-all duration-150 ease-in-out hover:bg-white hover:text-black focus:outline-none"
        >
          Entry
        </button>
      </form>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-24 lg:px-8">
        <div className="mt-12 space-y-2 sm:mt-16 sm:grid sm:grid-cols-3 sm:gap-6 sm:space-y-0 lg:mx-auto lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4">
          {tasks.map((task) => {
            return (
              <div
                key={task.sbt_task_id}
                className="divide-y divide-zinc-600 rounded-lg border bg-zinc-900 shadow-sm"
              >
                <div className="p-6">
                  <h2 className="text-2xl font-semibold leading-6 text-white">
                    {task.sbt_task_url}
                  </h2>
                  <p className="mt-4 text-zinc-300">
                    {task.sbt_task_country_code}
                  </p>
                  <p className="mt-4 text-zinc-300">{task.sbt_task_type}</p>
                  <p className="mt-4 text-zinc-300">
                    {task.sbt_task_requirements}
                  </p>
                  <p className="mt-4 text-zinc-300">{task.sbt_task_reward}</p>
                  <Button
                    variant="slim"
                    type="button"
                    onClick={() => {}}
                    className="mt-8 block w-full rounded-md py-2 text-center text-sm font-semibold text-white hover:bg-zinc-900"
                  >
                    Subscribe
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}
