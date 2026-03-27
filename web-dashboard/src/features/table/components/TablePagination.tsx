'use client'

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { TablePaginationProps } from '../types'

export const TablePagination = ({
  pageIndex,
  pageSize,
  pageCount,
  canPreviousPage,
  canNextPage,
  setPageIndex,
  setPageSize,
  previousPage,
  nextPage,
  totalItems
}: TablePaginationProps) => {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-background/50 backdrop-blur-sm">
      <div className="flex-1 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
        {totalItems ? `${totalItems} total records` : `Page ${pageIndex + 1} of ${pageCount}`}
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest shrink-0">Rows / page</p>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="h-8 w-[70px] bg-muted/20 border border-gray-200 rounded-lg text-xs font-bold px-2 focus:border-primary outline-none transition-all cursor-pointer"
          >
            {[10, 20, 30, 40, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center text-[10px] font-bold text-foreground min-w-[100px] bg-muted/30 py-1.5 px-3 rounded-lg border border-gray-200">
            Page {pageCount === 0 ? 0 : pageIndex + 1} of {pageCount}
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setPageIndex(0)}
              disabled={!canPreviousPage}
              className="p-1.5 rounded-lg border border-gray-200 hover:bg-muted hover:border-primary/20 text-muted-foreground hover:text-primary transition-all disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronsLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className="p-1.5 rounded-lg border border-gray-200 hover:bg-muted hover:border-primary/20 text-muted-foreground hover:text-primary transition-all disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="p-1.5 rounded-lg border border-gray-200 hover:bg-muted hover:border-primary/20 text-muted-foreground hover:text-primary transition-all disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => setPageIndex(pageCount - 1)}
              disabled={!canNextPage}
              className="p-1.5 rounded-lg border border-gray-200 hover:bg-muted hover:border-primary/20 text-muted-foreground hover:text-primary transition-all disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronsRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
