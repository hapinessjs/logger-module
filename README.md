<img src="http://bit.ly/2mxmKKI" width="500" alt="Hapiness" />

<div style="margin-bottom:20px;">
<div style="line-height:60px">
    <a href="https://travis-ci.org/hapinessjs/logger.svg?branch=master">
        <img src="https://travis-ci.org/hapinessjs/logger.svg?branch=master" alt="build" />
    </a>
    <a href="https://coveralls.io/github/hapinessjs/logger?branch=master">
        <img src="https://coveralls.io/repos/github/hapinessjs/logger/badge.svg?branch=master" alt="coveralls" />
    </a>
    <a href="https://david-dm.org/hapinessjs/logger">
        <img src="https://david-dm.org/hapinessjs/logger.svg" alt="dependencies" />
    </a>
    <a href="https://david-dm.org/hapinessjs/logger?type=dev">
        <img src="https://david-dm.org/hapinessjs/logger/dev-status.svg" alt="devDependencies" />
    </a>
</div>
<div>
    <a href="https://www.typescriptlang.org/docs/tutorial.html">
        <img src="https://cdn-images-1.medium.com/max/800/1*8lKzkDJVWuVbqumysxMRYw.png"
             align="right" alt="Typescript logo" width="50" height="50" style="border:none;" />
    </a>
    <a href="http://reactivex.io/rxjs">
        <img src="http://reactivex.io/assets/Rx_Logo_S.png"
             align="right" alt="ReactiveX logo" width="50" height="50" style="border:none;" />
    </a>
    <a href="http://hapijs.com">
        <img src="http://bit.ly/2lYPYPw"
             align="right" alt="Hapijs logo" width="75" style="border:none;" />
    </a>
</div>
</div>

# Logger Module

`Logger` module for the [Hapiness](https://github.com/hapinessjs/hapiness) framework based on [Good](https://github.com/hapijs/good) plugin.

## Table of contents

* [Using your module inside Hapiness application](#using-your-module-inside-hapiness-application)
    * [Yarn or NPM it in your package.json](#yarn-or-npm-it-in-your-packagejson)
    * [Import LoggerModule from the library](#import-loggermodule-from-the-library)
* [Contributing](#contributing)
* [Change History](#change-history)
* [Maintainers](#maintainers)
* [License](#license)

## Using your module inside Hapiness application

### `yarn` or `npm` it in your `package.json`

```bash
$ npm install --save @hapiness/logger

or

$ yarn add @hapiness/logger
```
    
```javascript
"dependencies": {
    "@hapiness/core": "^1.0.0-beta.6",
    "@hapiness/logger": "^1.0.0-beta.6",
    //...
}
//...
```

### import `LoggerModule` from the library

```javascript
import { Hapiness, HapinessModule, HttpServer, OnGet } from '@hapiness/core';
import { LoggerModule } from '@hapiness/logger';

@HapinessModule({
    version: '1.0.0',
    options: {
        host: '0.0.0.0',
        port: 4443
    },
    imports: [
        LoggerModule.setConfig({ ... })
    ]
})
class HapinessModuleApp {
    constructor(private server: HttpServer) {
        this.server.instance.log(['tag'], 'my data log');
    }
}

@Route({
    method: 'get',
    path: '/test'
})
class MyRoute implements OnGet {
    onGet(request, reply) {
        request.log(['tag'], 'my data log');
        reply('test');
    }
}

Hapiness.bootstrap(HapinessModuleApp);


```

[Back to top](#table-of-contents)

## Contributing

To set up your development environment:

1. clone the repo to your workspace,
2. in the shell `cd` to the main folder,
3. hit `npm or yarn install`,
4. run `npm or yarn run test`.
    * It will lint the code and execute all tests. 
    * The test coverage report can be viewed from `./coverage/lcov-report/index.html`.

[Back to top](#table-of-contents)

## Change History

* v1.0.0-beta.6 (2017-05-26)
    * Create LoggerModule
    * Documentation
    * Module version related to core version
    
[Back to top](#table-of-contents)

## Maintainers

<table>
    <tr>
        <td colspan="4" align="center"><a href="https://www.tadaweb.com"><img src="https://tadaweb.com/images/tadaweb/logo.png" width="117" alt="tadaweb" /></a></td>
    </tr>
    <tr>
        <td align="center"><a href="https://github.com/Juneil"><img src="https://avatars3.githubusercontent.com/u/6546204?v=3&s=117" width="117"/></a></td>
        <td align="center"><a href="https://github.com/antoinegomez"><img src="https://avatars3.githubusercontent.com/u/997028?v=3&s=117" width="117"/></a></td>
        <td align="center"><a href="https://github.com/srz09"><img src="https://avatars3.githubusercontent.com/u/6841511?v=3&s=117" width="117"/></a></td>
        <td align="center"><a href="https://github.com/njl07"><img src="https://avatars3.githubusercontent.com/u/1673977?v=3&s=117" width="117"/></a></td>
    </tr>
    <tr>
        <td align="center"><a href="https://github.com/Juneil">Julien Fauville</a></td>
        <td align="center"><a href="https://github.com/antoinegomez">Antoine Gomez</a></td>
        <td align="center"><a href="https://github.com/srz09">Sébastien Ritz</a></td>
        <td align="center"><a href="https://github.com/njl07">Nicolas Jessel</a></td>
    </tr>
</table>

[Back to top](#table-of-contents)

## License

Copyright (c) 2017 **Hapiness** Licensed under the [MIT license](https://github.com/hapinessjs/empty-module/blob/master/LICENSE.md).

[Back to top](#table-of-contents)
