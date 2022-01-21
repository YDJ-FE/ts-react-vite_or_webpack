import React from 'react'
import { Input, Button, message } from 'antd'
import axios from 'axios'

import styles from './index.module.scss'

function DouyinVideo() {
    const [loading, setLoading] = React.useState(false)
    const [url, setUrl] = React.useState('')
    const [targetUrl, setTargetUrl] = React.useState('')

    async function submit() {
        setLoading(true)
        try {
            const { data } = await axios.get<string>('https://jackple.com/', { params: { url } })
            if (data.startsWith('http')) {
                return setTargetUrl(data)
            }
            throw new Error()
        } catch (err) {
            message.error('sth error, please check input')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.douyinVideo}>
            <div className={styles.container}>
                <h3 style={{ textAlign: 'center', marginBottom: 20 }}>获取抖音无水印视频</h3>
                <Input
                    placeholder="input dy shared url"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    onPressEnter={submit}
                />
                <div className={styles.tips}>
                    仅限以下域名的链接: <br />
                    iesdouyin.com <br />
                    douyin.com
                </div>
                <Button style={{ marginTop: 30 }} type="primary" block loading={loading} onClick={submit}>
                    Get
                </Button>
                <a className={styles.link} href={targetUrl} rel="noreferrer" target="_blank">
                    {targetUrl}
                </a>
            </div>
        </div>
    )
}

export default DouyinVideo
