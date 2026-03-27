# Table Component

A set of components for building accessible and responsive tables.

## Usage

```tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/shared/components/ui/Table'

export const MyTable = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Header</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>Data</TableCell>
      </TableRow>
    </TableBody>
  </Table>
)
```

## Components

- `Table`: Root table container.
- `TableHeader`: THead section.
- `TableBody`: TBody section.
- `TableRow`: TR element.
- `TableHead`: TH element.
- `TableCell`: TD element.
- `TableCaption`: Optional table caption.
