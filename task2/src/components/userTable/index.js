import React, { useState, useEffect } from 'react';
import { Table, Icon } from 'antd';
import getRequest from '../../constant/request';

const placeholder = <Icon type="loading" style={{ fontSize: 44 }} spin />;

const UserTable = (props) => {

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            setLoading(true);
            const content = await getRequest("/users/");
            setLoading(false);
            setResult(content);
        };
        fetchUsers();
    }, []);

    const renderUserColumns = () => ([
        {
            title: "username",
            dataIndex: "username",
            key: "username",
            width: "10%",
            render: username => <div>{username && username}</div>,
            sorter: (a, b) => {
                return a.username.localeCompare(b.username);
            }
        },
        {
            title: "name",
            dataIndex: "name",
            key: "name",
            width: "10%",
            render: name => <div>{name && name}</div>,
            sorter: (a, b) => {
                return a.name.localeCompare(b.name);
            }
        },
        {
            title: "email",
            dataIndex: "email",
            key: "email",
            width: "10%",
            render: email => <div>{email && email}</div>,
            sorter: (a, b) => {
                return b.email - a.email;
            }
        },
        {
            title: "phone",
            dataIndex: "phone",
            key: "phone",
            width: "10%",
            render: phone => <div>{phone && phone}</div>,
            sorter: (a, b) => {
                return b.phone - a.phone;
            }
        },
        {
            title: "website",
            dataIndex: "website",
            key: "website",
            width: "10%",
            render: website => <div>{website && website}</div>,
            sorter: (a, b) => {
                return b.website - a.website;
            }
        }
    ]);

    const getDetail = (record) => {
        const { username, id } = record;
        props.history.push(`/albums/?userId=${id}&username=${username}`);
    }

    return (
        <div className='table-layout'>
            <Table
                onRow={(record, index) => ({
                    index,
                    onClick: () =>
                        getDetail(record)
                })}
                rowKey="id"
                locale={{ emptyText: loading ? placeholder : "Нету результатов..." }}
                dataSource={result}
                columns={renderUserColumns()}
            ></Table>
        </div>

    )

}

export default UserTable;

