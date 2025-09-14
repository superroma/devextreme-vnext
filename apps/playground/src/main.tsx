import React from 'react'
import { createRoot } from 'react-dom/client'
import { Greeter } from '@devextreme-vnext/components'

const rootEl = document.getElementById('root')
if (rootEl) {
  const root = createRoot(rootEl)
  root.render(<Greeter name="Developer" />)
}
