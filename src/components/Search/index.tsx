import style from './index.module.css'
import { Button } from 'antd'
import { useState } from 'react'

export default function Search({ handleSearch }: any) {
  const [searchText, setSearchText] = useState('')
  return (
    <div className={style.container}>
      <div className={style.search}>
        <input
          type="text"
          name="domain"
          placeholder="domain.com"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className={style.input}
        />
        <button
          className={style.enter}
          onClick={() => handleSearch(searchText)}
        >
          Entry
        </button>
      </div>
    </div>
  )
}
