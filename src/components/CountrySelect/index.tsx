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

const obj: any = {
  country: null,
  category: null
}
export default function CountrySelect({ handleChange }) {
  function countryChange(val: any) {
    obj.country = val
    handleChange(obj)
  }
  function CategoryChange(val: any) {
    obj.category = val
    handleChange(obj)
  }
  return (
    <div className={style.selectContainer}>
      <Select
        placeholder="Please select country"
        onChange={(v: any) => countryChange(v)}
        className={style.select}
        options={countryOptions}
        allowClear={true}
      />
      <Select
        placeholder="Please select Category"
        onChange={(v: any) => CategoryChange(v)}
        className={style.select}
        options={categoryOptions}
        allowClear={true}
      />
    </div>
  )
}
