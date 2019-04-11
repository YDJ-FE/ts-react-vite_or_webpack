This is a simple (admin) starter with typescript, react and webpack.

Have a quick view:

<img src="./screenshot.png" width="900">

## setup

```bash
$ npm i
```

## test

```bash
$ npm test
```

## build for development

```bash
$ npm run dev
```

## build for production

```bash
$ npm run build:(qa/prod)
```

## server

We do not use any mock tools(Anyway, you can use the data format from server response to achieve it!), all data interaction depends on [a real node service with nest and mongodb](https://github.com/jackple/showcase). Integration is in our future plan! We will make sure that you still can fully separate client and server side. 😁😁😁

## characteristics/packages

-   webpack-4.x (fixing on 4.28.4 avoid dynamic import error)
-   babel-7.x
-   typescript-3.x
-   react-16.x
-   mobx-5.x ([5.x makes your application must be running in the browser that support es2015+](https://github.com/mobxjs/mobx#browser-support), if you are not willing, you can use 4.x)
-   react-router-4
-   mobx-react-router
-   component hot reload
-   use ServiceWorker by [workbox-webpack-plugin](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin)
-   use [ant design](https://ant.design/index-cn) as UI framework
-   import svg icon as a component by `@svgr/webpack`, [there is an example in the doc of steamer-react-redux-ts](https://github.com/YDJ-FE/steamer-react-ts/blob/master/docs/svg.md)
-   async to load component by `react-loadable`
-   import .(s)css auto generate .(s)css.d.ts by `css-modules-typescript-loader`
-   create component folder by `customaddcomponents` which is added to npm script `npm run add`
-   use husky{pre-commit/commit-msg} hooks

## TODO

-   config menu by user with permission

## functional example

### mobx-react-router

```jsx
import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Button } from 'antd'

interface IStoreProps {
    routerStore?: RouterStore;
}

function Test({ routerStore }: IStoreProps) {
    const gotoHome = () => {
        routerStore.push('/')
    }
    return (
        <Button type="primary" onClick={gotoHome}>
            go to page index directly
        </Button>
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

export default AppRouter
```

[live example](https://github.com/YDJ-FE/ts-react-webpack4/tree/master/src/containers/shared/App?1532589067125)

## necessary extensions (on vscode)

-   [TSLint](https://marketplace.visualstudio.com/items?itemName=eg2.tslint)

-   [stylelint](https://marketplace.visualstudio.com/items?itemName=shinnn.stylelint)

-   [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

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
