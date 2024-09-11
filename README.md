# Nestjs 后端项目模板

> 该文件不在生成产物中,仅对该模板做出必要说明

## 模板特性

* 支持读取环境配置文件
* Typescript/Jest/Airbnb Eslint/Prettier
* 接口多版本支持
* 接口限流保护
* 约束接口进参,移除非白名单属性,自动转换数据为符合预期的类型
* 支持Swagger API文档
* 基于Docker快速构建分发
* 默认提供Github Actions文件进行自动lint和部署
* 统一的响应拦截器,规范返回数据
* JWT Token处理
* 支持连接到Redis
* 支持使用 Email
* 支持Google reCAPTCHA v3 人机校验
* 支持Mysql

更多插件功能请通过 `@compass-aiden/cli` 安装

## 模板变量


|       变量名       | 变量说明                  |
| :----------------: | :------------------------ |
|    projectName     | 项目名称                  |
| projectDescription | **可选** 项目描述         |
