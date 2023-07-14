import style from './index.module.css'
import { Button } from 'antd'
import { useState } from 'react'

export default function Search({ handleSearch }: any) {
  const [searchText, setSearchText] = useState('')
  return (
    <form className={style.container}>
      <div className={style.search}>
        <input
          type="text"
          name="domain"
          autoComplete="off"
          placeholder="domain.com"
          pattern="^(?:[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.)?[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$"
          required
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
    </form>
  )
}
