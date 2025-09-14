import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Grid, Table, TableHeaderRow } from '../../index.js'

describe('Table', () => {
  const rows = [
    { id: 1, name: 'Alice', value: 3 },
    { id: 2, name: 'Bob', value: 7 },
  ]
  const columns = [
    { name: 'name', title: 'Name' },
    { name: 'value', title: 'Value' },
  ]
  it('renders header row via registration', async () => {
    render(
      <Grid rows={rows} columns={columns}>
        <Table />
        <TableHeaderRow />
      </Grid>
    )
    await waitFor(() => expect(screen.getByTestId('dx-grid-header-row')).toBeInTheDocument())
  })
})
