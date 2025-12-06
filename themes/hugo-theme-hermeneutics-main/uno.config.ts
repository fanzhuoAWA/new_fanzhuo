import { defineConfig, presetWind4, presetIcons, presetAttributify, presetTypography } from 'unocss'

import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

export default defineConfig({
    presets: [
        presetWind4({
            dark: 'class',
        }),
        presetIcons({
            collections: {
                // 添加一个名为 `custom` 的自定义图标集
                // 它会自动加载 `./static/img` 目录下的所有SVG文件
                // 图标名将是文件名（去掉 `.svg` 后缀）
                'custom': FileSystemIconLoader(
                    './static/img',
                    svg => svg.replace(/^<svg /, '<svg fill="currentColor" ')
                )
            },
        }),
        presetAttributify(),
        presetTypography(),
    ],
    theme: {
        colors: {
            border: 'var(--herm-border)',
            background: 'var(--herm-background)',
            foreground: 'var(--herm-foreground)',
            primary: {
                DEFAULT: 'var(--herm-primary)',
                foreground: 'var(--herm-primary-foreground)',
            },
            muted: {
                DEFAULT: 'var(--herm-muted)',
                foreground: 'var(--herm-muted-foreground)',
            },
            card: {
                DEFAULT: 'var(--herm-card)',
                foreground: 'var(--herm-card-foreground)',
            },
            accent: 'var(--herm-accent)',
        },
        maxWidth: {
            'container-content': '72rem',
            'container-wide': '80rem',
            'container-narrow': '42rem',
        },
    },
    variants: [
        (matcher) => {
            if (!matcher.startsWith('data-visible:')) {
                return matcher;
            }
            return {
                matcher: matcher.slice('data-visible:'.length),
                selector: (s) => `[data-visible="true"]${s}`,
            };
        },
    ],
    shortcuts: {
        'header-button': 'shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full bg-background/80 text-muted-foreground/70 hover:bg-muted/50 transition-colors',
        'delayed-animation': '[animation-delay:var(--anim-delay)] [animation-fill-mode:forwards]',
    },
    cli: {
        entry: {
            patterns: [
                "layouts/**/*.html",
                "data/social.toml",
                "data/alert.toml",
            ],
            outFile: "assets/css/uno.css"
        }
    },
})