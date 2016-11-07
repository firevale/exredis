# 社区平台服务器

平台服务器开发环境通过docker整合， 开始开发前需要先安装[`docker for mac`](https://docs.docker.com/docker-for-mac/).
docker hub 服务在国内访问比较慢， 可以通过VPN或者使用dao cloud的[`镜像服务`](https://www.daocloud.io/mirror.html#accelerator-doc).

安装完docker for mac后就可以进行开发工作了， 第一次执行命令需要下载docker image文件，请耐心等待.

   * 日常开发任务只需要执行'./acs console'即可进入服务器iex交互界面
```bash
./acs consol
```
  * 单元测试可以通过'./acs test', 即可查看测试结果
```bash
./acs test
```
  * 开发环境有变化时，通过'./acs update'升级.
```bash
./acs update
```
  * 执行'./acs shell'， 可以直接进入docker虚拟主机. 
```bash
./acs shell
➜  /code git:(dev) mix --help
➜  /code git:(dev) mix test
```
