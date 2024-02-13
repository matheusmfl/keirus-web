'use client'
import { Header } from './components/Header'
import { UserTableCrud } from './components/UserTableCrud'
import { listUsers } from '@/app/api-fetch/listUsers'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [users, setUsers] = useState([])
  const [numberOfMembers, setNumberOfMembers] = useState(0)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await listUsers()
        setUsers(usersResponse)
        setNumberOfMembers(users.length)
      } catch (error) {
        console.error('Erro ao buscar usuários:', error)
      }
    }
    fetchData()
  }, [users])

  return (
    <div className="min-h-screen bg-[#F6F6F9] flex flex-col gap-4">
      <Header membersLength={numberOfMembers} />
      <div className="px-7">
        <UserTableCrud UserList={users} />
      </div>
    </div>
  )
}
