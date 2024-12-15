import Header from "@components/header";
import UserInfo from "@components/users/UserInfo";
import UserService from "@services/UserService";
import { User } from "@types";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import useInterval from "use-interval";

const ReadUserById: React.FC = () =>{
    const [user,setUser] = useState<User>();

    const router = useRouter();
    const {userId} = router.query;

    const getUserById = async () =>{
        const [userResponse] = await Promise.all([UserService.getUserById(userId as string)])
        const [foundUser] = await Promise.all([userResponse.json()])
        setUser(foundUser)
    }
    useInterval(()=> {
        if (userId){
            getUserById()
        }
    }, 5000)
    return(
        <>
            <Head>My User</Head>
            <Header/>
            <main>
                <h1 className="text-3xl font-semibold mb-8 text-center">User:</h1>
                <article>
                    {user && (
                        <UserInfo user={user}></UserInfo>
                    )}
                </article>
            </main>
        </>
    )
}

export default ReadUserById;