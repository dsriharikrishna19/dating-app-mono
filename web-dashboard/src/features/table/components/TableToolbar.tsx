'use client'

import * as React from 'react'
import { Table } from '@tanstack/react-table'
import { Search, Settings2, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface TableToolbarProps<TData> {
  table: Table<TData>
  globalFilter: string
  setGlobalFilter: (value: string) => void
  placeholder?: string
}

export function TableToolbar<TData>({
  table,
  globalFilter,
  setGlobalFilter,
  placeholder = 'Search records...'
}: TableToolbarProps<TData>) {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false)

  return (
    <div className="flex items-center justify-between gap-4 p-4 border-b border-gray-200 bg-background/50 backdrop-blur-sm z-30">
      <div className="flex flex-1 items-center space-x-2 min-w-0 max-w-sm">
        <div className="relative w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            placeholder={placeholder}
            value={globalFilter ?? ''}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="h-9 w-full bg-muted/20 border border-gray-200 rounded-lg pl-9 pr-4 text-xs font-medium focus:bg-background focus:border-primary/20 outline-none transition-all shadow-inner"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={[
              'flex items-center gap-2 h-9 px-3 rounded-lg border border-gray-200 text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer',
              isDropdownOpen ? 'bg-muted border-primary/20 text-primary' : 'bg-background text-muted-foreground hover:bg-muted hover:text-foreground'
            ].join(' ')}
          >
            <Settings2 className="h-3.5 w-3.5" />
            Columns
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsDropdownOpen(false)} 
                />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-48 bg-background border border-gray-200 rounded-xl shadow-xl shadow-black/5 p-2 z-50 overflow-hidden"
                >
                  <div className="px-2 py-1.5 border-b border-gray-200 mb-1">
                    <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Toggle Visibility</p>
                  </div>
                  <div className="max-h-[200px] overflow-y-auto custom-scrollbar">
                    {table
                      .getAllColumns()
                      .filter((column) => column.getCanHide())
                      .map((column) => (
                        <button
                          key={column.id}
                          onClick={() => column.toggleVisibility(!column.getIsVisible())}
                          className={[
                            'flex items-center justify-between w-full px-2 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all',
                            column.getIsVisible() ? 'text-primary bg-primary/5' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                          ].join(' ')}
                        >
                          <span className="truncate pr-2">{column.id}</span>
                          {column.getIsVisible() && <Check className="h-3 w-3 shrink-0" />}
                        </button>
                      ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
