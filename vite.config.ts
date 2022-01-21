import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
import { VitePWA } from 'vite-plugin-pwa'

const pathSrc = path.resolve(__dirname, './src')
const pathNodeModules = path.resolve(__dirname, './node_modules')

// https://vitejs.dev/config/
export default ({ mode }) => {
    const env = loadEnv(mode, process.cwd())
    const domain = env.VITE_APP_ENV !== 'prod' ? 'https://starter.jackple.com' : 'https://your_domain'
    const base = env.VITE_APP_ENV !== 'prod' ? '/' : 'https://your_cdn_domain/'
    const staticDomain = base === '/' ? domain + base : base

    return defineConfig({
        base,
        plugins: [
            react(),
            legacy({ targets: ['defaults', 'not IE 11'] }),
            VitePWA({
                base: '/',
                workbox: {
                    cacheId: 'ts-react-vite',
                    clientsClaim: true,
                    skipWaiting: true,
                    offlineGoogleAnalytics: false,
                    inlineWorkboxRuntime: true,
                    runtimeCaching: [
                        {
                            // match html
                            urlPattern: new RegExp(domain),
                            handler: 'NetworkFirst'
                        },
                        {
                            // match static resource
                            urlPattern: new RegExp(`${staticDomain.replace(/\//g, '\\/')}\\/assets`),
                            handler: 'StaleWhileRevalidate'
                        }
                    ]
                }
            })
        ],
        resolve: {
            alias: {
                '@constants': path.resolve(pathSrc, 'constants'),
                '@services': path.resolve(pathSrc, 'services'),
                '@store': path.resolve(pathSrc, 'store'),
                '@utils': path.resolve(pathSrc, 'utils'),
                '@assets': path.resolve(pathSrc, 'assets'),
                '@locales': path.resolve(pathSrc, 'locales'),
                '@components': path.resolve(pathSrc, 'components'),
                '@views': path.resolve(pathSrc, 'containers/views'),
                '@shared': path.resolve(pathSrc, 'containers/shared')
            }
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `
                    @import "${pathNodeModules}/bourbon/core/_bourbon.scss";
                    @import "${pathSrc}/styles/_base.scss";
                    `
                },
                less: {
                    modifyVars: {
                        'primary-color': '#1DA57A'
                    },
                    javascriptEnabled: true
                }
            }
        }
    })
}
