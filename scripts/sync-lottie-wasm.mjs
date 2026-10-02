import { copyFileSync, mkdirSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'

// Match the WASM to the player resolved by the React wrapper, as Eudora does.
const require = createRequire(import.meta.url)
const playerRequire = createRequire(require.resolve('@lottiefiles/dotlottie-react'))
const source = join(dirname(playerRequire.resolve('@lottiefiles/dotlottie-web')), 'dotlottie-player.wasm')
const destination = join(import.meta.dirname, '..', 'public', 'eudora', 'lottie', 'dotlottie-player.wasm')
mkdirSync(dirname(destination), { recursive: true })
copyFileSync(source, destination)
console.log('Synced local dotLottie player WASM.')
