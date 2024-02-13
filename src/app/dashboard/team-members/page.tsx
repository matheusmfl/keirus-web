import { Header } from './components/Header'
import { UserTableCrud } from './components/UserTableCrud'
import { listUsers } from '@/app/api-fetch/listUsers'

export default async function Dashboard() {
  const users = await listUsers()

  return (
    <div className="min-h-screen bg-[#F6F6F9] flex flex-col gap-4">
      <Header membersLength={users.length} />
      <div className="px-7">
        <UserTableCrud UserList={users} />
      </div>
    </div>
  )
}
