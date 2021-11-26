import router from '../item.router'

describe('item router', () => {
  test('has crud routes', () => {
    const routes = [
      { path: '/', method: 'get' },
      { path: '/', method: 'post' },
      { path: '/:id', method: 'get' },
      { path: '/:id', method: 'delete' },
      { path: '/:id', method: 'put' }
    ]

    routes.forEach(route => {
      const match = router.stack.find(
        elem => elem.route.path === route.path && elem.route.methods[route.method]
      )

      expect(match).toBeTruthy()
    })
  })
})
