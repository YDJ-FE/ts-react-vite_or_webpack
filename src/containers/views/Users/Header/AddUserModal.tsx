import * as React from 'react'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import { Modal, Form, Input } from 'antd'
import { FormComponentProps } from 'antd/lib/form'

import { ComponentExt } from '@utils/reactExt'

const FormItem = Form.Item

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 19 }
    }
}

interface IStoreProps {
    createUser?: (user: IUserStore.IUser) => Promise<any>
}

interface IProps extends IStoreProps {
    visible: boolean
    onCancel: () => void
}

@observer
class AddUserModal extends ComponentExt<IProps & FormComponentProps> {
    @observable
    private loading: boolean = false

    @action
    toggleLoading = () => {
        this.loading = !this.loading
    }

    submit = (e?: React.FormEvent<any>): void => {
        if (e) {
            e.preventDefault()
        }
        this.props.form.validateFields(
            async (err, values): Promise<any> => {
                if (!err) {
                    this.toggleLoading()
                    try {
                        const { createUser, onCancel } = this.props
                        await createUser(values)
                        onCancel()
                    } catch (err) {}
                    this.toggleLoading()
                }
            }
        )
    }

    render() {
        const { visible, onCancel, form } = this.props
        const { getFieldDecorator } = form
        return (
            <Modal title="Add User" visible={visible} onOk={this.submit} onCancel={onCancel}>
                <Form onSubmit={this.submit}>
                    <FormItem hasFeedback {...formItemLayout} label="account">
                        {getFieldDecorator('account', {
                            rules: [
                                {
                                    required: true
                                }
                            ]
                        })(<Input />)}
                    </FormItem>
                    <FormItem hasFeedback {...formItemLayout} label="password">
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true
                                }
                            ]
                        })(<Input />)}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

export default Form.create<IProps>()(AddUserModal)
