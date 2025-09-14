import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Grid, Table } from '../../index.js'

describe('Grid', () => {
  const rows = [
    { id: 1, name: 'A', value: 10 },
    { id: 2, name: 'B', value: 5 },
  ]
  const columns = [
    { name: 'name', title: 'Name' },
    { name: 'value', title: 'Value' },
  ]

  it('renders rows', () => {
    render(
      <Grid rows={rows} columns={columns}>
        <Table />
      </Grid>
    )
    expect(screen.getByText('A')).toBeInTheDocument()
    expect(screen.getByText('B')).toBeInTheDocument()
  })
})
