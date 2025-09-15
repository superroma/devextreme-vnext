// Converted from: packages/dx-grid-core/src/plugins/table-edit-column/helpers.test.ts
// Phase: RED (Step 08)
import { describe, it, expect } from 'vitest'

// Legacy source: table-edit-column/helpers.test.ts
// Parity: isHeadingEditCommandsTableCell + isEditCommandsTableCell (1 combined with multiple expect chains)
import {
  isHeadingEditCommandsTableCell,
  isEditCommandsTableCell,
} from '../internal/table-edit-column.helpers'
import { TABLE_ADDED_TYPE, TABLE_EDIT_TYPE } from '../internal/table-edit-row.constants'
import { TABLE_DATA_TYPE } from '../internal/table.constants'
import { TABLE_HEADING_TYPE } from '../internal/table-header-row.constants'
import { TABLE_EDIT_COMMAND_TYPE } from '../internal/table-edit-column.constants'

describe('useTableEditColumn.helpers - converted legacy behavior', () => {
  describe('#isHeadingEditCommandsTableCell', () => {
    it('should work', () => {
      expect(
        isHeadingEditCommandsTableCell(
          { type: TABLE_HEADING_TYPE } as any,
          { type: TABLE_EDIT_COMMAND_TYPE } as any
        )
      ).toBeTruthy()
      expect(
        isHeadingEditCommandsTableCell(
          { type: TABLE_HEADING_TYPE } as any,
          { type: 'undefined' } as any
        )
      ).toBeFalsy()
      expect(
        isHeadingEditCommandsTableCell(
          { type: 'undefined' } as any,
          { type: TABLE_EDIT_COMMAND_TYPE } as any
        )
      ).toBeFalsy()
    })
  })
  describe('#isEditCommandsTableCell', () => {
    it('should work', () => {
      expect(
        isEditCommandsTableCell(
          { type: TABLE_ADDED_TYPE } as any,
          { type: TABLE_EDIT_COMMAND_TYPE } as any
        )
      ).toBeTruthy()
      expect(
        isEditCommandsTableCell(
          { type: TABLE_EDIT_TYPE } as any,
          { type: TABLE_EDIT_COMMAND_TYPE } as any
        )
      ).toBeTruthy()
      expect(
        isEditCommandsTableCell(
          { type: TABLE_DATA_TYPE } as any,
          { type: TABLE_EDIT_COMMAND_TYPE } as any
        )
      ).toBeTruthy()
      expect(
        isEditCommandsTableCell({ type: TABLE_ADDED_TYPE } as any, { type: 'undefined' } as any)
      ).toBeFalsy()
      expect(
        isEditCommandsTableCell(
          { type: 'undefined' } as any,
          { type: TABLE_EDIT_COMMAND_TYPE } as any
        )
      ).toBeFalsy()
    })
  })
})
