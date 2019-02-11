import * as React from 'react'
import { Table, Divider, Popconfirm } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { PaginationConfig } from 'antd/lib/pagination'
import { inject, observer } from 'mobx-react'
import { observable, action } from 'mobx'

import { ComponentExt } from '@utils/reactExt'
import UserModal from './../UserModal'

interface IStoreProps {
    getUsersloading?: boolean
    users?: IUserStore.IUser[]
    getUsers?: () => Promise<any>
    deleteUser?: (_id: string) => Promise<any>
    handleTableChange?: (pagination: PaginationConfig) => void
    pageIndex?: number
    pageSize?: number
    total?: number
}

interface IProps extends IStoreProps {
    scrollY: number
}

const baseColumns: Array<ColumnProps<IUserStore.IUser>> = [
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
    }
]

class TableExtended extends Table<IUserStore.IUser> {}

@inject(
    (store: IStore): IStoreProps => {
        const {
            getUsersloading,
            users,
            getUsers,
            deleteUser,
            handleTableChange,
            pageIndex,
            pageSize,
            total
        } = store.userStore
        return { getUsersloading, users, getUsers, deleteUser, handleTableChange, pageIndex, pageSize, total }
    }
)
@observer
class UserTable extends ComponentExt<IProps> {
    @observable
    private userModalVisible: boolean = false

    @observable
    private currentUser: IUserStore.IUser = null

    @action
    hideUserModalVisible = () => {
        this.userModalVisible = !this.userModalVisible
    }

    @action
    modifyUser = (user: IUserStore.IUser) => {
        this.currentUser = user
        this.userModalVisible = true
    }

    componentDidMount() {
        this.props.getUsers()
    }

    render() {
        const {
            scrollY,
            getUsersloading,
            users,
            deleteUser,
            handleTableChange,
            pageIndex,
            pageSize,
            total
        } = this.props
        const columns = baseColumns.concat([
            {
                title: 'Action',
                key: 'action',
                render: (_, record) => (
                    <span>
                        <a href="javascript:;" onClick={() => this.modifyUser(record)}>
                            Modify
                        </a>
                        <Divider type="vertical" />
                        <Popconfirm
                            placement="top"
                            title="确认删除?"
                            onConfirm={() => deleteUser(record._id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <a href="javascript:;">Delete</a>
                        </Popconfirm>
                    </span>
                )
            }
        ])
        return (
            <React.Fragment>
                <TableExtended
                    className="center-table"
                    style={{ width: '100%' }}
                    bordered
                    rowKey="_id"
                    loading={getUsersloading}
                    columns={columns}
                    dataSource={users}
                    scroll={{ y: scrollY }}
                    pagination={{
                        current: pageIndex,
                        showSizeChanger: true,
                        pageSize,
                        pageSizeOptions: ['30', '20', '10'],
                        total
                    }}
                    onChange={handleTableChange}
                />
                <UserModal
                    visible={this.userModalVisible}
                    onCancel={this.hideUserModalVisible}
                    user={this.currentUser}
                />
            </React.Fragment>
        )
    }
}

export default UserTable
