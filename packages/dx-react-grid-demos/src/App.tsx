import React from 'react'
import { BasicGrid } from './demos/BasicGrid.js'

const sectionStyle: React.CSSProperties = { marginTop: 20 }

function App() {
  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>DevExtreme vNext Grid Demos</h1>
      <div style={sectionStyle}>
        <h2>Basic Grid</h2>
        <BasicGrid />
      </div>
    </div>
  )
}

export default App
