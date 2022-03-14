import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
import { VitePWA } from 'vite-plugin-pwa'
import tsconfigPaths from 'vite-tsconfig-paths'

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
            tsconfigPaths(),
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
            // require('rollup-plugin-visualizer').default({ open: true, gzipSize: true, brotliSize: true })
        ],
        css: {
            preprocessorOptions: {
                scss: {
                    charset: false,
                    additionalData: `
                    @import "${pathNodeModules.replace(/\\/g, '/')}/bourbon/core/_bourbon.scss";
                    @import "${pathSrc.replace(/\\/g, '/')}/styles/_base.scss";
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
