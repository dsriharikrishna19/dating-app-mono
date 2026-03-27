'use client'

import * as React from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  Table as TableType
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table'
import { DataTableProps } from '../types'
import { TableToolbar } from './TableToolbar'
import { TablePagination } from './TablePagination'
import { TableSkeleton } from './TableSkeleton'
import { motion, AnimatePresence } from 'framer-motion'

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  error,
  manualPagination,
  pageCount,
  pagination,
  onPaginationChange,
  enableRowSelection = true,
  columnVisibilityToggle = true,
  searchPlaceholder,
  emptyState,
  errorState,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [globalFilter, setGlobalFilter] = React.useState('')
  const [internalPagination, setInternalPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })

  // Debounced global filter
  const [debouncedGlobalFilter, setDebouncedGlobalFilter] = React.useState(globalFilter)

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedGlobalFilter(globalFilter)
    }, 300)
    return () => clearTimeout(handler)
  }, [globalFilter])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter: debouncedGlobalFilter,
      pagination: manualPagination ? (pagination || internalPagination) : internalPagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setDebouncedGlobalFilter,
    onPaginationChange: (updater) => {
      const nextPagination = typeof updater === 'function' 
        ? updater(manualPagination ? (pagination || internalPagination) : internalPagination)
        : updater
      
      if (manualPagination) {
        onPaginationChange?.(nextPagination)
      } else {
        setInternalPagination(nextPagination)
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    columnResizeMode: 'onChange',
    manualPagination: manualPagination,
    pageCount: pageCount,
  })

  if (isLoading) {
    return <TableSkeleton columnCount={columns.length} />
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-12 border border-destructive/20 bg-destructive/5 rounded-xl text-destructive gap-2">
        <p className="font-bold uppercase tracking-widest text-[10px]">Error loading data</p>
        <p className="text-sm font-medium">{error.message}</p>
        {errorState}
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-background border border-gray-200 rounded-xl shadow-sm overflow-hidden min-h-[500px]">
      <TableToolbar
        table={table}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        placeholder={searchPlaceholder}
      />

      <div className="flex-1 overflow-auto custom-scrollbar relative bg-muted/5 min-h-[400px]">
        <Table 
          className="min-w-full border-separate border-spacing-0" 
          style={{ width: table.getCenterTotalSize() }}
        >
          <TableHeader className="sticky top-0 z-20 bg-background/90 backdrop-blur-md shadow-sm">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent border-none">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="font-black uppercase tracking-widest text-[9px] text-muted-foreground py-3 px-4 border-b border-r border-gray-200 last:border-r-0 relative transition-colors hover:bg-muted/50"
                      style={{ width: header.getSize() }}
                    >
                      <div className="flex items-center justify-between">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </div>
                      
                      {header.column.getCanResize() && (
                        <div
                          {...{
                            onMouseDown: header.getResizeHandler(),
                            onTouchStart: header.getResizeHandler(),
                            className: `absolute right-0 top-0 h-full w-1 bg-gray-200 cursor-col-resize select-none touch-none hover:bg-primary transition-colors z-10 ${
                              header.column.getIsResizing() ? 'bg-primary w-1' : ''
                            }`,
                          }}
                        />
                      )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            <AnimatePresence mode="popLayout" initial={false}>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <motion.tr
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={row.id}
                    className="group border-b border-gray-200 last:border-b-0 hover:bg-muted/30 transition-colors bg-background cursor-pointer"
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell 
                        key={cell.id} 
                        className="py-2.5 px-4 border-r border-gray-200 last:border-r-0"
                        style={{ width: cell.column.getSize() }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </motion.tr>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-48 text-center bg-background"
                  >
                    {emptyState || (
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="h-10 w-10 bg-muted/50 rounded-lg flex items-center justify-center text-muted-foreground border border-gray-200">
                          <p className="font-bold text-xs">!</p>
                        </div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                          No records found
                        </p>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              )}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>

      <TablePagination
        pageIndex={table.getState().pagination.pageIndex}
        pageSize={table.getState().pagination.pageSize}
        pageCount={table.getPageCount()}
        canPreviousPage={table.getCanPreviousPage()}
        canNextPage={table.getCanNextPage()}
        setPageIndex={table.setPageIndex}
        setPageSize={table.setPageSize}
        previousPage={table.previousPage}
        nextPage={table.nextPage}
        totalItems={data.length}
      />
    </div>
  )
}
