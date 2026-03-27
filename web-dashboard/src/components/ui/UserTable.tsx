'use client'

import * as React from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  SortingState,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table'
import { User } from '@/types/user'
import { Badge } from '@/components/ui/Badge'
import { Search, ArrowUpDown, Edit2, Trash2, Mail, Globe } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface UserTableProps {
  users: User[]
  isLoading?: boolean
  currentPage?: number
  totalItems?: number
  itemsPerPage?: number
  onPageChange?: (page: number) => void
}

// Helper to generate a consistent color based on string
const getAvatarColor = (name: string) => {
  const colors = [
    'bg-blue-500', 'bg-purple-500', 'bg-emerald-500', 
    'bg-orange-500', 'bg-pink-500', 'bg-indigo-500'
  ]
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

export const UserTable = ({ 
  users, 
  isLoading, 
  currentPage = 1, 
  totalItems = 0, 
  itemsPerPage = 10,
  onPageChange 
}: UserTableProps) => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = React.useState('')

  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const columns = React.useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'User identity',
        cell: ({ row }) => (
          <div className="flex items-center gap-3 min-w-[180px]">
            <div className={[
              'h-9 w-9 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-sm shrink-0',
              getAvatarColor(row.original.name)
            ].join(' ')}>
              {row.original.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex flex-col truncate">
              <span className="font-bold text-foreground truncate group-hover:text-primary transition-colors leading-tight">{row.original.name}</span>
              <span className="text-[10px] text-muted-foreground font-medium truncate">@{row.original.username}</span>
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'email',
        header: 'Contact Info',
        cell: ({ row }) => (
          <div className="flex flex-col gap-0.5 min-w-[160px] truncate">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground truncate group-hover:text-foreground transition-colors">
              <Mail className="h-3 w-3 shrink-0" />
              <span className="truncate">{row.original.email}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground/60 truncate">
              <Globe className="h-3 w-3 shrink-0" />
              <span className="truncate">{row.original.website}</span>
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'role',
        header: 'Permissions',
        cell: ({ row }) => (
          <div className="min-w-[100px]">
            <Badge 
              variant={row.original.role === 'admin' ? 'default' : 'secondary'} 
              className={[
                'capitalize font-bold border rounded-md text-[10px] px-2 py-0',
                row.original.role === 'admin' ? 'bg-primary/10 text-primary border-primary/20 shadow-none' : 'bg-muted/50 text-muted-foreground border-transparent shadow-none'
              ].join(' ')}
            >
              {row.original.role}
            </Badge>
          </div>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Health',
        cell: ({ row }) => (
          <div className="flex items-center gap-2 min-w-[100px]">
            <div
              className={[
                'h-1.5 w-1.5 rounded-full',
                row.original.status === 'active' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]',
              ].join(' ')}
            />
            <span className={[
              'text-[10px] font-black uppercase tracking-widest',
              row.original.status === 'active' ? 'text-emerald-500' : 'text-red-500'
            ].join(' ')}>
              {row.original.status}
            </span>
          </div>
        ),
      },
      {
        id: 'actions',
        header: '',
        cell: () => (
          <div className="flex items-center justify-end gap-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity min-w-[80px]">
            <button className="p-1.5 hover:bg-muted rounded-md text-muted-foreground hover:text-primary transition-all">
              <Edit2 className="h-3.5 w-3.5" />
            </button>
            <button className="p-1.5 hover:bg-destructive/10 rounded-md text-muted-foreground hover:text-destructive transition-all">
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ),
      },
    ],
    []
  )

  const table = useReactTable({
    data: users,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <div className="flex flex-col h-full bg-background border border-gray-200 rounded-xl shadow-sm overflow-hidden min-h-[500px]">
      {/* Search Header - Fixed */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-3 border-b border-gray-200 bg-background z-30">
        <div className="flex items-center flex-1 gap-3 min-w-[280px]">
          <div className="relative flex-1 group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              placeholder="Filter names or emails..."
              value={globalFilter ?? ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="w-full bg-muted/20 border-transparent focus:bg-background focus:border-primary/20 rounded-lg pl-10 pr-4 py-2 text-xs outline-none transition-all border border-gray-200"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 pr-2">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            {totalItems} Users
          </span>
        </div>
      </div>

      {/* Scrollable Area */}
      <div className="flex-1 overflow-auto custom-scrollbar relative bg-muted/5 min-h-[400px] max-h-[calc(100vh-320px)]">
        {isLoading ? (
          <div className="p-4 space-y-3">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="h-14 w-full animate-pulse rounded-lg bg-muted/40" />
            ))}
          </div>
        ) : (
          <Table className="min-w-[800px] border-separate border-spacing-0">
            <TableHeader className="sticky top-0 z-20 bg-background/90 backdrop-blur-md shadow-sm">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-transparent border-none">
                  {headerGroup.headers.map((header) => (
                    <TableHead 
                      key={header.id} 
                      className={[
                        'font-black uppercase tracking-widest text-[9px] text-muted-foreground py-3 px-4 border-b border-r border-gray-200 last:border-r-0',
                        header.column.getCanSort() ? 'cursor-pointer select-none hover:text-primary hover:bg-muted/50 transition-all' : '',
                      ].join(' ')}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center justify-between">
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getIsSorted() && (
                          <ArrowUpDown className={[
                            'h-3 w-3 text-primary',
                            header.column.getIsSorted() === 'desc' ? 'rotate-180' : ''
                          ].join(' ')} />
                        )}
                      </div>
                    </TableHead>
                  ))}
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
                      className="group border-b border-gray-200 last:border-b-0 hover:bg-muted/30 transition-colors bg-background"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="py-2 px-4 border-r border-gray-200 last:border-r-0">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </motion.tr>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-48 text-center bg-background">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="h-10 w-10 bg-muted/50 rounded-lg flex items-center justify-center text-muted-foreground border border-gray-200">
                          <Search className="h-5 w-5" />
                        </div>
                        <p className="text-xs font-bold text-muted-foreground">No matches for current filter</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </AnimatePresence>
            </TableBody>
          </Table>
        )}
      </div>

      {/* Pagination Bar - Fixed Bottom */}
      <div className="flex items-center justify-between px-6 py-3 border-t border-gray-200 bg-background z-30">
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            Page {currentPage} of {totalPages || 1}
          </span>
          <div className="flex items-center gap-1">
            <div className="h-1.5 w-[60px] bg-muted/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${(currentPage / (totalPages || 1)) * 100}%` }}
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange?.(currentPage - 1)}
            disabled={currentPage === 1 || isLoading}
            className={[
              'px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border border-gray-200 transition-all',
              currentPage === 1 || isLoading ? 'opacity-30 cursor-not-allowed bg-muted' : 'hover:bg-muted hover:border-primary/20 hover:text-primary active:scale-95'
            ].join(' ')}
          >
            Previous
          </button>
          <button
            onClick={() => onPageChange?.(currentPage + 1)}
            disabled={currentPage === totalPages || isLoading}
            className={[
              'px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border border-gray-200 transition-all',
              currentPage === totalPages || isLoading ? 'opacity-30 cursor-not-allowed bg-muted' : 'hover:bg-muted hover:border-primary/20 hover:text-primary active:scale-95'
            ].join(' ')}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
