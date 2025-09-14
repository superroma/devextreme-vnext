import { describe, it, expect } from 'vitest'

// This test ensures React is not bundled inside @devextreme-vnext/core dist output.
// We previously observed embedded react.production.min.js content which caused duplicate React instances.

describe('core bundle externals', () => {
  it('does not inline React implementation', async () => {
    let fs: any
    try {
      fs = await import('fs')
    } catch {
      // Environment without fs (e.g., browser) - skip
      return
    }
    const distUrl = new URL('../../dist/index.js', import.meta.url)
    const distFile = distUrl.pathname
    if (!fs.existsSync(distFile)) {
      expect.fail(`Dist file missing at ${distFile}; run build before tests`)
    }
    const content = fs.readFileSync(distFile, 'utf8') as string
    const hasEmbeddedReact = content.includes('react.element') && content.includes('isMounted')
    expect(hasEmbeddedReact).toBe(false)
  })
})
