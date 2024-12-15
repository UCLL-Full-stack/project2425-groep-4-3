import { User } from "@types"
import { table } from "console"

type Props = {
    user:User
}

const UserInfo: React.FC<Props> = ({user}: Props) => {
    return(
        <>
        {user &&(
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <tbody>
                <tr>
                    <th className="py-3 px-4 text-sm text-gray-800 font-semibold">Name</th>
                    <td className="py-3 px-4 text-sm text-gray-800">{user.name}</td>
                </tr>
                <tr>
                    <th className="py-3 px-4 text-sm text-gray-800 font-semibold">Email</th>
                    <td className="py-3 px-4 text-sm text-gray-800">{user.email}</td>
                </tr>
                <tr>
                    <th className="py-3 px-4 text-sm text-gray-800 font-semibold">Age</th>
                    <td className="py-3 px-4 text-sm text-gray-800">{user.age}</td>
                </tr>
                <tr>
                    <th className="py-3 px-4 text-sm text-gray-800 font-semibold">Role</th>
                    <td className="py-3 px-4 text-sm text-gray-800">{user.role}</td>
                </tr>
            </tbody>
          </table>
        )
        }
        </>
    )
}
export default UserInfo;