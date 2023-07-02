'use client'
import Image from 'next/image'
import s from './page.module.css'
import { Form, Select } from 'antd'
import { useEffect, useState } from 'react'
import { getCodeList } from 'country-list'
import Button from '@/components/Button'

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
  const [selectedCountry, setSelectedCountry] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string[]>([])
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
          <div className={s.card}>
            <div className={s.card_body}>
              <h2 className={s.title}>http://www.ccb.com</h2>
              <p className={s.line}>US</p>
              <p className={s.line}>11</p>
              <p className={s.line}>22</p>
              <p className={s.line}>33</p>
              <Button variant="slim" type="button" className={s.submit}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
