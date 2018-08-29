import * as React from 'react'
import { Table, Tag, Divider } from 'antd'
import { ColumnProps } from 'antd/lib/table'

import { ComponentExt } from '@utils/reactExt'

interface IUser {
    key: string
    name: string
    age: number
    address: string
    tags: string[]
}

const columns: Array<ColumnProps<IUser>> = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="javascript:;">{text}</a>
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age'
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address'
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: (tags: string[]) => (
            <span>
                {tags.map(tag => (
                    <Tag color="blue" key={tag}>
                        {tag}
                    </Tag>
                ))}
            </span>
        )
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <span>
                <a href="javascript:;">Invite {record.name}</a>
                <Divider type="vertical" />
                <a href="javascript:;">Delete</a>
            </span>
        )
    }
]

const data: IUser[] = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer']
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser']
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher']
    }
]

class TableExtended extends Table<IUser> {}

class UserTable extends ComponentExt {
    componentDidMount() {
        this.api.user.getUsers({})
    }

    render() {
        return <TableExtended columns={columns} dataSource={data} style={{ width: '100%' }} />
    }
}

export default UserTable
