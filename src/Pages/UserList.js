import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { getUserList } from '../api/services';
import style from '../Styles/UserList.module.css'
import Loader from "../Components/Loader";


function UserList() {

    useEffect(() => {
        getUser()
    }, [])
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    const getUser = async () => {
        setIsLoading(true);

        try {
            // const token = localStorage.getItem("access_token")
            let response = await getUserList()
            setData(response.data.users);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <>
            {isLoading && <Loader />}
            <p className={style.title}>USER LIST :</p>
            <div>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                            <th>Event Producer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((user, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.email.replace('mailto:', '')}</td>
                                <td>{user.isEventProducer === true ? "true" : "false"}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default UserList
