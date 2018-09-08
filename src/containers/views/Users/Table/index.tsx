import * as React from 'react'
import { Table, Divider } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'

import { ComponentExt } from '@utils/reactExt'

interface IStoreProps {
    getUsersloading?: boolean
    users?: IUserStore.IUser[]
    getUsers?: (pageIndex?: number) => Promise<any>
}

interface IProps extends IStoreProps {
    scrollY: number
}

const columns: Array<ColumnProps<IUserStore.IUser>> = [
    {
        title: 'Account',
        dataIndex: 'account',
        key: 'account'
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category'
    },
    {
        title: 'CreatedAt',
        dataIndex: 'createdAt',
        key: 'createdAt'
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <span>
                <a href="javascript:;">Invite {record.account}</a>
                <Divider type="vertical" />
                <a href="javascript:;">Delete</a>
            </span>
        )
    }
]

class TableExtended extends Table<IUserStore.IUser> {}

@inject(
    (store: IStore): IStoreProps => {
        const { getUsersloading, users, getUsers } = store.userStore
        return { getUsersloading, users, getUsers }
    }
)
@observer
class UserTable extends ComponentExt<IProps> {
    componentDidMount() {
        this.props.getUsers()
    }

    render() {
        const { scrollY, getUsersloading, users } = this.props
        return (
            <TableExtended
                className="center-table"
                style={{ width: '100%' }}
                bordered
                rowKey="_id"
                loading={getUsersloading}
                columns={columns}
                dataSource={toJS(users)}
                scroll={{ y: scrollY }}
            />
        )
    }
}

export default UserTable
