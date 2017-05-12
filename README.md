# iview_demo

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
模板 http://admin.bdtask.com/BdtaskAdmin_v1.0/#
For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

##git 分支操作
    在本地新建一个分支： git branch Branch1
    切换到你的新分支: git checkout Branch1
    将新分支发布在github上： git push origin Branch1
    在本地删除一个分支： git branch -d Branch1
    在github远程端删除一个分支： git push origin :Branch1   (分支名前的冒号代表删除)
### git diff 文件名


### git log 

### git reset --hard HEAD^
    首先，Git必须知道当前版本是哪个版本，在Git中，用HEAD表示当前版本，也就是最新的提交3628164...882e1e0（注意我的提交ID和你的肯定不一样），上一个版本就是HEAD^，上上一个版本就是HEAD^^，当然往上100个版本写100个^比较容易数不过来，所以写成HEAD~100。