import * as React from 'react'
import { Table, Divider, Popconfirm } from 'antd'
import { observer } from 'mobx-react'

import { useOnMount } from '@utils/reactExt'
import useRootStore from '@store/useRootStore'
import UserModal from './UserModal'

interface IProps {
    scrollY: number
}

function UserTable({ scrollY }: IProps) {
    const { userStore } = useRootStore()

    const [modalVisible, setModalVisible] = React.useState(false)
    const [currentUser, setCurrentUser] = React.useState<IUserStore.IUser>(null)

    function modifyUser(user: IUserStore.IUser) {
        setCurrentUser(user)
        setModalVisible(true)
    }

    useOnMount(userStore.getUsers)

    return (
        <React.Fragment>
            <Table<IUserStore.IUser>
                className="center-table"
                style={{ width: '100%' }}
                bordered
                rowKey="_id"
                loading={userStore.getUsersloading}
                dataSource={userStore.users}
                scroll={{ y: scrollY }}
                pagination={{
                    current: userStore.pageIndex,
                    showSizeChanger: true,
                    pageSize: userStore.pageSize,
                    pageSizeOptions: ['30', '20', '10'],
                    total: userStore.total
                }}
                onChange={userStore.handleTableChange}
            >
                <Table.Column<IUserStore.IUser> key="account" title="Account" dataIndex="account" width={200} />
                <Table.Column<IUserStore.IUser> key="category" title="Category" dataIndex="category" width={100} />
                <Table.Column<IUserStore.IUser> key="createdAt" title="CreatedAt" dataIndex="createdAt" width={200} />
                <Table.Column<IUserStore.IUser>
                    key="action"
                    title="Action"
                    width={120}
                    render={(_, record) => (
                        <span>
                            <a href="javascript:;" onClick={() => modifyUser(record)}>
                                Modify
                            </a>
                            <Divider type="vertical" />
                            <Popconfirm
                                placement="top"
                                title="确认删除?"
                                onConfirm={() => userStore.deleteUser(record._id)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <a href="javascript:;">Delete</a>
                            </Popconfirm>
                        </span>
                    )}
                />
            </Table>
            <UserModal visible={modalVisible} onCancel={() => setModalVisible(false)} user={currentUser} />
        </React.Fragment>
    )
}

export default observer(UserTable)
