There is an example [use-webpack](https://github.com/YDJ-FE/ts-react-vite_or_webpack/tree/use-webpack)

This is a simple (admin) starter with typescript, react and vite.

Have a quick view:

<img src="./screenshot.png" width="900">

## setup

> for husky

```bash
$ npm run prepare
```

> If you do not need the taobao registry, you can change it in `.npmrc`

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

## characteristics

-   use [ant design](https://ant.design/index-cn) as UI framework
-   use ServiceWorker
-   use husky{pre-commit/commit-msg} hooks
-   use [react-intl-universal](https://github.com/alibaba/react-intl-universal) for i18n.
-   use [react-virtualized](https://github.com/bvaughn/react-virtualized) for fat list.

## pages

-   The Index page became a [Socket Debugger](https://starter.jackple.com/#/)

## TODO

-   config menu by user with permission
-   more functional pages like Socket Debugger

## component example

```jsx
import React from 'react'
import { observer } from 'mobx-react'
import { Button } from 'antd'

import history from '@shared/App/ht'

function Test() {
    function gotoHome() {
        history.push('/')
    }
    return (
        <Button type="primary" onClick={gotoHome}>
            go to page index directly
        </Button>
    )
}

export default observer(Test)
```

[live example](https://github.com/YDJ-FE/ts-react-webpack4/blob/master/src/containers/views/Login/index.tsx?1532570619900)

## necessary extensions (on vscode)

-   [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

-   [stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)

-   [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## how to upload file to server

```bash
#!/bin/bash

TIMESPAN=$(date '+%s')
DEPLOYNAME=ts-react.qa.${TIMESPAN}
DEPLOYFILES=${DEPLOYNAME}.tar.gz
SERVER=0.0.0.0

# make compression
cd dist/qa
tar -zcvf ${DEPLOYFILES} ./*

# upload
scp -P 22 -o StrictHostKeyChecking=no ${DEPLOYFILES} node@${SERVER}:/home/pages/ts-react/tarfiles

# make decompression
ssh -p 22 -o StrictHostKeyChecking=no node@${SERVER} tar xzf /home/pages/ts-react/tarfiles/${DEPLOYFILES} -C /home/pages/ts-react

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
             root   ~/Documents/react/ts-react/dist/qa/;
             index  index.html;
       }
 }
```

## the scaffold

[steamer-react-redux-ts](https://github.com/YDJ-FE/steamer-react-redux-ts)
