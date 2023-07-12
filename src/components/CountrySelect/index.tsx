import { Select } from 'antd'
import style from './index.module.css'
import { useState } from 'react'
import { getCodeList } from 'country-list'

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

export default function CountrySelect() {
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  return (
    <div className={style.selectContainer}>
      <Select
        placeholder="Please select country"
        value={selectedCountry}
        onChange={setSelectedCountry}
        className={style.select}
        options={countryOptions}
        allowClear={true}
      />
      <Select
        placeholder="Please select Category"
        value={selectedCategory}
        onChange={setSelectedCategory}
        className={style.select}
        options={categoryOptions}
        allowClear={true}
      />
    </div>
  )
}
