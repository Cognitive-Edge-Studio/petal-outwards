import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { unified } from 'unified'
import remarkParse from 'remark-parse'

const source = readFileSync(new URL('../docs/02-product-requirements-and-mvp-scope.md', import.meta.url), 'utf8')
const tree = unified().use(remarkParse).parse(source)
const textOf = (node) => node.type === 'text' ? node.value : (node.children ?? []).map(textOf).join('')
const normalize = (text) => text.replace(/\s+/g, ' ').trim()
const expectedBlocks = tree.children.flatMap((node) => {
  if (node.type === 'list') return node.children.map(textOf)
  return node.type === 'heading' || node.type === 'paragraph' ? [textOf(node)] : []
}).map(normalize).filter(Boolean)
const expectedImages = tree.children.flatMap((node) => (node.children ?? [])
  .filter((child) => child.type === 'image').map(({ alt, url }) => ({ alt, filename: url.split('/').pop() })))

const evidencePath = process.argv[2] ?? fileURLToPath(new URL('../output/playwright/rendered-scope.json', import.meta.url))
const evidence = JSON.parse(readFileSync(evidencePath, 'utf8'))
assert.deepEqual(evidence.blocks.map(normalize), expectedBlocks, 'Every scope heading, paragraph, caption and requirement must match the source exactly, in order.')
assert.deepEqual(evidence.images.map(({ alt, src }) => ({ alt, filename: decodeURIComponent(new URL(src).pathname).split('/').pop() })), expectedImages, 'All three diagrams and their original descriptions must be preserved.')
assert.equal(evidence.horizontalOverflow, false, 'The scope page must fit the viewport.')
assert.equal(evidence.sectionCount, 6, 'All six scope sections must be accessible.')

console.log(`Verified ${expectedBlocks.length} exact text blocks, ${expectedImages.length} diagrams and all six sections at ${evidence.viewport.width}px; no horizontal overflow.`)
