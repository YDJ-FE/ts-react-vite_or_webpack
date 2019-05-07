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

## primary packages

-   webpack-4.x (fixing on 4.28.4 avoid dynamic import error)
-   babel-7.x
-   typescript-3.x
-   react-16.x
-   mobx-5.x ([5.x makes your application must be running in the browser that support es2015+](https://github.com/mobxjs/mobx#browser-support), if you are not willing, you can use 4.x)
-   react-router-4
-   mobx-react-router

## characteristics

-   use [ant design](https://ant.design/index-cn) as UI framework
-   import .(s)css auto generate .(s)css.d.ts by `css-modules-typescript-loader`
-   use ServiceWorker by [workbox-webpack-plugin](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin)
-   import svg icon as a component by `@svgr/webpack`, [there is an example in the doc of steamer-react-redux-ts](https://github.com/YDJ-FE/steamer-react-ts/blob/master/docs/svg.md)
-   async to load component by `react-loadable`
-   create component folder by `customaddcomponents` which is added to npm script `npm run add`
-   use husky{pre-commit/commit-msg} hooks
-   use [webpack dll](https://webpack.js.org/plugins/dll-plugin/) when you are running in production mode
-   use [react-intl-universal](https://github.com/alibaba/react-intl-universal) for i18n.
-   use [react-virtualized](https://github.com/bvaughn/react-virtualized) for fat list.

## pages

-   The Index page became a [Socket Debugger](https://starter.jackple.com/#/)

## About `mobx-react-lite`

-   When using React hooks, You must use `observer` from `mobx-react-lite` instead of `mobx-react`
-   [see more](https://github.com/mobxjs/mobx-react-lite)

## TODO

-   config menu by user with permission
-   more functional pages like Socket Debugger

## component example

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

export default inject((store: IStore): IStoreProps => ({ routerStore: store.routerStore }))(observer(Test))
```

[live example](https://github.com/YDJ-FE/ts-react-webpack4/blob/master/src/containers/views/Login/index.tsx?1532570619900)

## necessary extensions (on vscode)

-   [TSLint](https://marketplace.visualstudio.com/items?itemName=eg2.tslint)

-   [stylelint](https://marketplace.visualstudio.com/items?itemName=shinnn.stylelint)

-   [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## how to upload file to server

```bash
#!/bin/bash

TIMESPAN=$(date '+%s')
DEPLOYNAME=ts-react-webpack.qa.${TIMESPAN}
DEPLOYFILES=${DEPLOYNAME}.tar.gz
SERVER=0.0.0.0

# make compression
cd dist/qa
tar -zcvf ${DEPLOYFILES} ./*

# upload
scp -P 22 -o StrictHostKeyChecking=no ${DEPLOYFILES} node@${SERVER}:/home/pages/ts-react-webpack/tarfiles

# make decompression
ssh -p 22 -o StrictHostKeyChecking=no node@${SERVER} tar xzf /home/pages/ts-react-webpack/tarfiles/${DEPLOYFILES} -C /home/pages/ts-react-webpack

if [ $? -ne 0 ]; then
    echo "success"
else
    echo "fail"
fi
```

## how to deploy with nginx

```nginx
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
