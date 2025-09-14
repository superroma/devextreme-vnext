import React, { useState } from 'react'
import {
  Grid,
  Table,
  TableHeaderRow,
  TableFilterRow,
  PagingPanel,
} from '@devextreme-vnext/dx-react-grid'
import { employees } from '../demo-data/employees.js'

const columns = [
  { name: 'name', title: 'Name' },
  { name: 'position', title: 'Position' },
  { name: 'city', title: 'City' },
]

export const BasicGrid: React.FC = () => {
  const [sorting, setSorting] = useState<any[]>([])
  const [filters, setFilters] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)

  return (
    <Grid
      rows={employees}
      columns={columns}
      sorting={sorting}
      onSortingChange={setSorting}
      filters={filters}
      onFiltersChange={setFilters}
      currentPage={currentPage}
      onCurrentPageChange={setCurrentPage}
      pageSize={pageSize}
      onPageSizeChange={setPageSize}
    >
      <Table />
      <TableHeaderRow showSortingControls />
      <TableFilterRow />
      <PagingPanel />
    </Grid>
  )
}
