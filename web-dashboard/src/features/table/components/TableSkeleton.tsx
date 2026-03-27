'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'

interface TableSkeletonProps {
  columnCount: number
  rowCount?: number
}

export const TableSkeleton = ({ columnCount, rowCount = 10 }: TableSkeletonProps) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-background overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/30">
          <TableRow className="hover:bg-transparent border-gray-200">
            {Array.from({ length: columnCount }).map((_, i) => (
              <TableHead key={i} className="h-12 border-r border-gray-200 last:border-r-0">
                <div className="h-4 w-2/3 animate-pulse rounded bg-muted/50" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rowCount }).map((_, i) => (
            <TableRow key={i} className="border-gray-200 hover:bg-transparent">
              {Array.from({ length: columnCount }).map((_, j) => (
                <TableCell key={j} className="h-14 border-r border-gray-200 last:border-r-0">
                  <div className="h-4 w-full animate-pulse rounded bg-muted/30" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
