import { ColumnDef } from '@tanstack/react-table'

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading?: boolean
  error?: Error | null
  
  // Pagination
  manualPagination?: boolean
  pageCount?: number
  pagination?: { pageIndex: number; pageSize: number }
  onPaginationChange?: (pagination: { pageIndex: number; pageSize: number }) => void
  
  // Sorting
  manualSorting?: boolean
  onSortingChange?: (sorting: any) => void
  
  // Filtering
  manualFiltering?: boolean
  onGlobalFilterChange?: (filter: string) => void
  
  // Actions & Customization
  enableRowSelection?: boolean
  columnVisibilityToggle?: boolean
  searchPlaceholder?: string
  
  // View states
  emptyState?: React.ReactNode
  errorState?: React.ReactNode
}

export interface TablePaginationProps {
  pageIndex: number
  pageSize: number
  pageCount: number
  canPreviousPage: boolean
  canNextPage: boolean
  setPageIndex: (index: number) => void
  setPageSize: (size: number) => void
  previousPage: () => void
  nextPage: () => void
  totalItems?: number
}
