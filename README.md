this is a simple admin starter (with typescript, react and webpack) looks like:

<img src="./screenshot.png" width="900">

## setup

```bash
$ npm i
```

## build for development

```bash
$ npm run dev
```

## build for production

```bash
$ npm run qa/prod
```

## characteristics/packages

-   webpack-4.x
-   typescript-3.0.x
-   react-16.4.x
-   mobx-5.x ([5.x makes your application must be running in the browser that support es2015+](https://github.com/mobxjs/mobx#browser-support), if you are not willing, you can use 4.x)
-   react-router-4
-   mobx-react-router
-   component hot reload
-   use [ant design](https://ant.design/index-cn) as UI framework
-   import svg icon as a component by `@svgr/webpack`, [there is an example in the doc of steamer-react-redux-ts](https://github.com/YDJ-FE/steamer-react-ts/blob/master/docs/svg.md)
-   async to load component by `react-loadable`
-   import .(s)css auto generate .(s)css.d.ts by `typings-for-css-modules-loader`
-   create component folder by `customaddcomponents` which is added to npm script `npm run add`

## functional example

### mobx-react-router

```jsx
import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Button } from 'antd'

import * as styles from './index.scss'

interface IStoreProps {
    routerStore?: RouterStore;
}

function Test({ routerStore }: IStoreProps) {
    const gotoHome = () => {
        routerStore.push('/')
    }
    return (
        <div className={styles.login}>
            Login!!!
            <div className={styles.btnGroup}>
                <Button type="primary" onClick={gotoHome}>
                    go to page index directly
                </Button>
            </div>
        </div>
    )
}

export default inject(
    (store: IStore): IStoreProps => ({
        routerStore: store.routerStore
    })
)(observer(Login))
```

[live example](https://github.com/YDJ-FE/ts-react-webpack4/blob/master/src/containers/views/Login/index.tsx?1532570619900)

### async to load component

```jsx
import * as React from 'react'
import { hot } from 'react-hot-loader'
import Loadable from 'react-loadable'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import PageLoading from '@components/PageLoading'

const Test = Loadable({
    loader: () => import(/* webpackChunkName: "test" */ './Test'),
    loading: PageLoading
})

const AppRouter = () => (
    <Router>
        <Switch>
            <Route exact path="/test" component={Test} />
        </Switch>
    </Router>
)

export default hot(module)(AppRouter)
```

[live example](https://github.com/YDJ-FE/ts-react-webpack4/tree/master/src/containers/shared/App?1532589067125)

## how to deploy with nginx

```
server {
       listen       9993;
       server_name  localhost:9993;

       location / {
             root   ~/Documents/react/ts-react-webpack4/dist/qa/;
             index  index.html index.htm;
       }
 }
```

## the scaffold

[steamer-react-redux-ts](https://github.com/YDJ-FE/steamer-react-redux-ts)
