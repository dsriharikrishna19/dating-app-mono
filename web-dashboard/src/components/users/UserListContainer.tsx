'use client'

import { useState, useMemo } from 'react'
import { useUsers } from '@/hooks/useUsers'
import { DataTable } from '@/features/table/components/DataTable'
import { ColumnDef } from '@tanstack/react-table'
import { User } from '@/types/user'
import { Checkbox } from '@/components/ui/Checkbox'
import { Badge } from '@/components/ui/Badge'
import { Mail, Globe, Edit2, Trash2, Eye } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { FadeIn } from '@/components/motion'

export const UserListContainer = () => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })
  const { data, isLoading, error } = useUsers(pagination.pageIndex + 1)

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
        size: 40,
      },
      {
        accessorKey: 'name',
        header: 'User Identity',
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-primary text-xs">
              {row.original.name.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xs">{row.original.name}</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">@{row.original.username}</span>
            </div>
          </div>
        ),
        size: 200,
      },
      {
        accessorKey: 'email',
        header: 'Contact',
        cell: ({ row }) => (
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground">
              <Mail className="h-3 w-3" />
              {row.original.email}
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground/60">
              <Globe className="h-3 w-3" />
              {row.original.website}
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'role',
        header: 'Role',
        cell: ({ row }) => (
          <Badge variant={row.original.role === 'admin' ? 'default' : 'secondary'} className="capitalize h-5 px-1.5 text-[9px] font-black tracking-widest border-gray-200">
            {row.original.role}
          </Badge>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <div className={`h-1.5 w-1.5 rounded-full ${row.original.status === 'active' ? 'bg-emerald-500' : 'bg-red-500'}`} />
            <span className={`text-[10px] font-bold uppercase tracking-widest ${row.original.status === 'active' ? 'text-emerald-500' : 'text-red-500'}`}>
              {row.original.status}
            </span>
          </div>
        ),
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: () => (
          <div className="flex items-center justify-start gap-1">
            <button className="p-1.5 hover:bg-muted rounded-md text-muted-foreground hover:text-primary transition-all cursor-pointer">
              <Eye className="h-3.5 w-3.5" />
            </button>
            <button className="p-1.5 hover:bg-muted rounded-md text-muted-foreground hover:text-primary transition-all cursor-pointer">
              <Edit2 className="h-3.5 w-3.5" />
            </button>
            <button className="p-1.5 hover:bg-destructive/10 rounded-md text-muted-foreground hover:text-destructive transition-all cursor-pointer">
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ),
        size: 100,
      },
    ],
    []
  )

  return (
    <FadeIn className="flex flex-col gap-6 h-full min-h-0">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold tracking-tight">Records Directory</h1>
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mt-1">Management Hub</p>
        </div>
        <Button onClick={() => console.log('Add user')} className="shadow-lg shadow-primary/20">Add Entry</Button>
      </div>

      <div className="flex-1 min-h-0">
        <DataTable
          columns={columns}
          data={data?.data || []}
          isLoading={isLoading}
          error={error ? (error as Error) : null}
          manualPagination={true}
          pagination={pagination}
          pageCount={data?.total ? Math.ceil(data.total / 10) : 0}
          onPaginationChange={setPagination}
          searchPlaceholder="Global directory search..."
        />
      </div>
    </FadeIn>
  )
}
