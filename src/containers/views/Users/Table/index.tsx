import * as React from 'react'
import { Table, Divider } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { observer } from 'mobx-react'
import { observable, action, runInAction, toJS } from 'mobx'

import { ComponentExt } from '@utils/reactExt'

interface IProps {
    scrollY: number
}

interface IUser {
    account: string
    category: string
    createdAt: string
}

const columns: Array<ColumnProps<IUser>> = [
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

class TableExtended extends Table<IUser> {}

@observer
class UserTable extends ComponentExt<IProps> {
    @observable
    private loading: boolean = false
    // datasource
    @observable
    private users: IUser[] = []

    @action
    getUsers = async () => {
        this.loading = true
        try {
            const res = await this.api.user.getUsers({})
            runInAction('SET_USER_TABLE_DATASOURCE', () => {
                this.users = res
            })
        } catch (err) {}
        runInAction('HIDE_USER_TABLE_LOADING', () => {
            this.loading = false
        })
    }

    componentDidMount() {
        this.getUsers()
    }

    render() {
        const { scrollY } = this.props
        return (
            <TableExtended
                className="center-table"
                style={{ width: '100%' }}
                rowKey="_id"
                loading={this.loading}
                columns={columns}
                dataSource={toJS(this.users)}
                scroll={{ y: scrollY }}
            />
        )
    }
}

export default UserTable
