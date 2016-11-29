import React from 'react'

import * as actions from '../../common/redux/modules/user'

export default function (router) {

  router.get('/useinfo', function (ctx) {
    const pageInfo = {
      title: '礼品使用详情',
      keyword: '',
      description: '',
    }

    ctx.render(pageInfo)
  })

  return router
}

