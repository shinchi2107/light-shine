"use client"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { Checkbox } from "@/src/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu"
import { Input } from "@/src/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table"
import { useEffect, useState } from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/src/components/ui/avatar"
import { useGetAllCategories } from "@/src/hooks/queries/useCategory"
import { useSearchParams, useRouter } from "next/navigation"
import AddAccount from "./add-category"
import { Badge } from "@/src/components/ui/badge"
import EditCategory from "./edit-category"
import { useCategoryStore } from "@/src/store/category.store"


export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          console.log(row.getValue("id"));
          row.toggleSelected(!!value)
        }}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "_id",
    header: "ID",
    cell: ({ row }) => (
      <div className="capitalize overflow-hidden text-ellipsis whitespace-nowrap w-40">{row.getValue("_id")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "image",
    header: "Image", 
    cell: ({ row }) => (
      <Avatar>
        <AvatarImage src={row.getValue("image")} />
        <AvatarFallback>
          {row.getValue("name")?.charAt(0)}
        </AvatarFallback>
      </Avatar>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => ( <div className="capitalize">{row.getValue("status") === "active" ? (
      <Badge variant="default">{row.getValue("status")}</Badge>
    ) : (
      <Badge variant="destructive">{row.getValue("status")}</Badge>
    )}</div>),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const category = row.original
      const { setCategoryId } = useCategoryStore();
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer"
              onClick={() => navigator.clipboard.writeText(category._id)}
            >
              Copy category ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={() => {
              setCategoryId(category._id)}
            }>Edit Category</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Deactivate Category</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

const CategoryTable = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const searchFromUrl = searchParams.get("search") || "";
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [rowSelection, setRowSelection] = useState({})
  const [page, setPage] = useState(pageFromUrl);
  const [search, setSearch] = useState(searchFromUrl);
  const { data: categories } = useGetAllCategories({ page, limit: 2, search });
  const { categoryId, setCategoryId } = useCategoryStore();

  const meta = {
    page: categories?.payload?.data?.page,
    total: categories?.payload?.data?.total,
    totalPages: categories?.payload?.data?.totalPages,
    hasNextPage: categories?.payload?.data?.hasNext,
    hasPreviousPage: categories?.payload?.data?.hasPrev,
  }

  useEffect(() => {
    const params = new URLSearchParams();
      params.set("page", page.toString());
      if (search) params.set("search", search);
      router.replace(`?${params.toString()}`);
  }, [page, search]);

  const table = useReactTable({
    data: categories?.payload?.data?.categories ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const handleSearch = (event) => {
    setSearch(event.target.value);
  }

  const handlePageChange = (page, type) => {
    if (type === "next") {
      setPage(page + 1);
    } else if (type === "previous") {
      setPage(page - 1);
    }
  }

  return (
    <div className="w-full">
      {categoryId && <EditCategory id={categoryId} setId={setCategoryId} />}
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={search}
          onChange={handleSearch}
          className="max-w-sm"
        />
        <div className="flex items-center gap-2 ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="cursor-pointer">
                Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>
          <AddAccount />
        </div>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(page, "previous")}
            disabled={!meta.hasPreviousPage}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(page, "next")}
            disabled={!meta.hasNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CategoryTable;