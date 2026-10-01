import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { unified } from 'unified'
import remarkParse from 'remark-parse'

const source = readFileSync(new URL('../docs/01-the-story.md', import.meta.url), 'utf8')
const tree = unified().use(remarkParse).parse(source)
const titleIndex = tree.children.findIndex((node) => node.type === 'heading' && node.depth === 1)
assert.ok(titleIndex >= 0, 'The source document must contain its story title.')

// Independently parse the document into its semantic text blocks; compare against
// the actual browser DOM, rather than the application's content parser.
const textOf = (node) => node.type === 'text' ? node.value : (node.children ?? []).map(textOf).join('')
const normalize = (text) => text.replace(/\s+/g, ' ').trim()
const expectedBlocks = tree.children.slice(titleIndex)
  .filter((node) => node.type === 'heading' || node.type === 'paragraph')
  .map(textOf).map(normalize).filter(Boolean)
const expectedImages = tree.children.flatMap((node) => (node.children ?? [])
  .filter((child) => child.type === 'image').map(({ alt, url }) => ({ alt, filename: url.split('/').pop() })))

const evidencePath = process.argv[2] ?? fileURLToPath(new URL('../output/playwright/rendered-story.json', import.meta.url))
const evidence = JSON.parse(readFileSync(evidencePath, 'utf8'))
assert.deepEqual(evidence.blocks.map(normalize), expectedBlocks, 'Rendered story text must match every source block, exactly once and in order.')
assert.deepEqual(evidence.images.map(({ alt, src }) => ({ alt, filename: decodeURIComponent(new URL(src).pathname).split('/').pop() })), expectedImages, 'Every original illustration and its exact alt text must be preserved.')
assert.equal(evidence.hasPreface, false, 'The Author\'s preface must be excluded.')
assert.equal(evidence.horizontalOverflow, false, 'The page must fit the viewport.')

console.log(`Verified ${expectedBlocks.length} exact text blocks and ${expectedImages.length} illustrations at ${evidence.viewport.width}px. Preface excluded; source order preserved; no horizontal overflow.`)
