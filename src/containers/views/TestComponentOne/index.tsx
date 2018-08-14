import * as React from 'react'

import * as styles from './index.scss'
import IconReact from '@assets/svg/react.svg'

function TestComponentOne() {
    return (
        <div className={styles.testComponentOne}>
            <IconReact width={180} height={180} color="purple" />
            <div>
                <img className={styles.img} src="https://mmbiz.qpic.cn/mmbiz_jpg/nuTvXx9HpicWcL7iaWoiaxVBCQAkOUPKptotYHPEqKLyqTSFZ6icpkZlXGpfiaphmiae8ysicyibsmT9yuYJqfIgGSequA/640?wxtype=jpeg&wxfrom=0" referrerPolicy="no-referrer" />
            </div>
        </div>
    )
}

export default TestComponentOne
