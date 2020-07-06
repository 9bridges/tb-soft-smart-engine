const AV = require('leanengine')
const fs = require('fs')
const path = require('path')
const got = require('got')

/**
 * 加载 functions 目录下所有的云函数
 */
fs.readdirSync(path.join(__dirname, 'functions')).forEach(file => {
  require(path.join(__dirname, 'functions', file))
})

// 微信登录凭证校验
AV.Cloud.define('code2Session', async ({ params }) => {
  try {
    const { body } = await got('https://api.weixin.qq.com/sns/jscode2session', {
      searchParams: {
        ...params,
        grant_type: 'authorization_code'
      },
      responseType: 'json'
    })
    return Promise.resolve(body)
  } catch (error) {
    return Promise.reject(error)
  }
})
