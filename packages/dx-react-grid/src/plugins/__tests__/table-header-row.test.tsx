import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Grid, Table, TableHeaderRow } from '../../index.js'

describe('TableHeaderRow sorting', () => {
  const rows = [
    { id: 1, name: 'Charlie' },
    { id: 2, name: 'Alice' },
    { id: 3, name: 'Bob' },
  ]
  const columns = [{ name: 'name', title: 'Name' }]

  function getRenderedOrder() {
    return screen
      .getAllByRole('row')
      .slice(1) // skip header
      .map((r) => r.querySelector('td')!.textContent)
  }

  it('cycles sorting asc -> desc -> none', () => {
    render(
      <Grid rows={rows} columns={columns}>
        <Table />
        <TableHeaderRow showSortingControls />
      </Grid>
    )

    const header = screen.getByText(/Name/)
    // Initial order (no sorting) - preserves original
    expect(getRenderedOrder()).toEqual(['Charlie', 'Alice', 'Bob'])

    fireEvent.click(header)
    // Asc sorting
    expect(getRenderedOrder()).toEqual(['Alice', 'Bob', 'Charlie'])
    expect(header.textContent).toMatch(/▲/)

    fireEvent.click(header)
    // Desc sorting
    expect(getRenderedOrder()).toEqual(['Charlie', 'Bob', 'Alice'])
    expect(header.textContent).toMatch(/▼/)

    fireEvent.click(header)
    // Back to original (no indicator)
    expect(getRenderedOrder()).toEqual(['Charlie', 'Alice', 'Bob'])
    expect(header.textContent).not.toMatch(/▲|▼/)
  })
})
