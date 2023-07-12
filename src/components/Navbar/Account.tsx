'use client'
import s from './Navbar.module.css'
// import Web3 from 'web3'
// import Web3Modal from 'web3modal'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import request from '@/lib/request'
import { ReduxState, login, logout } from '@/lib/redux'
import type { MenuProps } from 'antd'
import { Dropdown, Space } from 'antd'

const providerOptions = {
  /* See Provider Options Section */
}

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    )
  },
  {
    key: '2',
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        2nd menu item (disabled)
      </a>
    ),
    disabled: true
  },
  {
    key: '3',
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        3rd menu item (disabled)
      </a>
    ),
    disabled: true
  }
]

export default function Account() {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => setIsClient(true), [])
  const dispatch = useDispatch()
  const userInfo = useSelector((state: ReduxState) => state.dashboard.userInfo)
  const [web3Modal, setWeb3Modal] = useState<any>()
  const connectWallet = async () => {
    try {
      //     const web3Modal = new Web3Modal({
      //       network: 'mainnet', // optional
      //       cacheProvider: true, // optional
      //       providerOptions // required
      //     })
      //     setWeb3Modal(web3Modal)
      //     const provider = await web3Modal.connect()
      //     await web3Modal.toggleModal()
      //     const web3 = new Web3(provider)
      //     const accounts = await web3.eth.getAccounts()
      //     console.log(accounts)
      //     // const signature = await web3.eth.sign('personal sign', accounts[0])
      //     const signature: any = await window.ethereum.request({
      //       method: 'personal_sign',
      //       params: ['join zpkass', accounts[0]]
      //     })

      //     const response = await request.post('/v1/api/node/auth/signinByAccount', {
      //       address: accounts[0],
      //       signature: signature,
      //       login_type: 'wallet'
      //     })
      const response = await request.post('/v1/api/auth/signinByAccount', {
        address: '0x19bc7C4CC0E240DAd6C6B21518C05C09e8B2A4a8',
        signature:
          '0x690861122b613c6064f2f159b2b50351e0ba7dcc8acdd59938c54b116803751524fe0005dcaff01f6d551440e30bee38e08f8e03c7e79773f9c6e3a929f279fe1c',
        login_type: 'web'
      })
      const userInfo = response.data.info
      await dispatch(login(userInfo))
    } catch (error) {
      console.error(error)
    }
  }

  const disconnectWallet = async () => {
    // await web3Modal.clearCachedProvider()
    dispatch(logout())
  }

  return (
    <>
      {isClient ? (
        <>
          {Object.keys(userInfo).length === 0 && (
            <button className={s.launch} onClick={connectWallet}>
              launch app
            </button>
          )}
          {Object.keys(userInfo).length !== 0 && (
            <>
              <Dropdown menu={{ items }}>
                <button className={s.launch}>
                  {userInfo.address ? userInfo.address.slice(0, 5) + '...' : ''}
                </button>
              </Dropdown>
              <button className={s.launch} onClick={disconnectWallet}>
                Disconnect
              </button>
            </>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  )
}
