const _ = require('lodash')
const rp = require('request-promise')

module.exports = [function (app) {
//   const config = app.config
//   const router = app.router

//   const process = async function (ctx, next) {
//     const userId = ctx.cookies.get('userId')
//     const tenantId = ctx.cookies.get('tenantId')
//     const productId = 3
//     if (!userId) {
//       next()
//       return
//     }
//     if (userId) {
//       const options = {
//         method: 'GET',
//               // uri: `${config.sure('server.authorize.apiPrefix')}/api/v1/estates_service/account/user/${ctx.request.cookies.userId}`,
//         uri: `${config.sure('server.apiPrefix')}/api/v1/estates_service/account/user/${ctx.cookies.get('userId')}`,
//         qs: {
//           userId,
//           tenantId,
//           productId,
//         },
//         json: true,
//       }

//       const res = await rp(options)
//       ctx.njkData = {role: res.content}
//       next()
//     }
//   }
//   router.get([
//     '/',
//     '/data/*',
//     '/user/*',
//     '/labe/*',
//     '/setting/*',
//     '/help/*',
//   ], async (ctx, next) => {
//     await process(ctx, next)
//   })
},
]
    
