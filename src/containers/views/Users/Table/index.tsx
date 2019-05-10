import * as React from 'react'
import { Table, Divider, Popconfirm } from 'antd'
import { PaginationConfig } from 'antd/lib/pagination'
import { inject } from 'mobx-react'
import { observer } from 'mobx-react-lite'

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

function UserTable({
    scrollY,
    getUsersloading,
    users,
    getUsers,
    deleteUser,
    handleTableChange,
    pageIndex,
    pageSize,
    total
}: IProps) {
    const useOnMount = (onMount: () => void) =>
        React.useEffect(() => {
            if (onMount) {
                onMount()
            }
        }, [])

    useOnMount(getUsers)

    const [modalVisible, setModalVisible] = React.useState(false)
    const [currentUser, setCurrentUser] = React.useState<IUserStore.IUser>(null)

    function modifyUser(user: IUserStore.IUser) {
        setCurrentUser(user)
        setModalVisible(true)
    }

    return (
        <React.Fragment>
            <Table<IUserStore.IUser>
                className="center-table"
                style={{ width: '100%' }}
                bordered
                rowKey="_id"
                loading={getUsersloading}
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
                                onConfirm={() => deleteUser(record._id)}
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

export default inject(
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
)(observer(UserTable))
