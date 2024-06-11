// src/pages/Home.jsx
import { useEffect, useState, useCallback } from 'react';
import API from '../utils/api';

function Home() {
    const [users, setUsers] = useState([]);

    const getUsers = useCallback(async () => {
        const { data } = await API.get('/users', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        if (data) {
            setUsers(data);
        }
    }, []);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    return (
        <div>
            {users.map((user) => (
                <div key={user.email}>{user.email}</div>
            ))}
        </div>
    );
}

export default Home;