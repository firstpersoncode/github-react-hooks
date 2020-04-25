import request from 'supertest'

import server from '.'

jest.useFakeTimers()

const routes = [
    {
        component: jest.fn(),
        path: '/',
        exact: true
    },
    {
        // mock 404 (default route)
        component: jest.fn(),
        path: '**'
    }
]

const app = server({
    rootPath: '/',
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    render: async (_) => ({
        html: '<!doctype html><html><head><title>test</title></head><body>test ..</body></html>',
        routeCtx: { status: null, url: null }
    }),
    routes
})

describe('Configure server', () => {
    test('GET: "/" Should response 200 and return html file', async () => {
        const response: any = await request(app).get('/')
        expect(response.statusCode).toBe(200)
        expect(response.text).toMatch(/<!doctype html>/)
    })

    test('GET: "/manifest.json" Should response 200 and return manifest.json', async () => {
        const response: any = await request(app).get('/manifest.json')
        expect(response.statusCode).toBe(200)
        const result = Object.keys(response.body)
        const manifest = {
            short_name: 'test',
            name: 'test',
            icons: [
                {
                    src: '/favicon.ico',
                    sizes: '64x64 32x32 24x24 16x16',
                    type: 'image/x-icon'
                }
            ],
            start_url: '.',
            display: 'standalone',
            theme_color: '#fec900',
            scope: '/',
            background_color: '#000000'
        }

        for (const k in manifest) {
            if (manifest.hasOwnProperty(k)) {
                expect(result).toContain(k)
            }
        }
    })

    test('GET: "/im-not-exist" Any unregistered slug should response 404', async () => {
        const response: any = await request(app).get('/im-not-exist')
        expect(response.statusCode).toBe(404)
        expect(response.text).toMatch(/<!doctype html>/)
    })
})
