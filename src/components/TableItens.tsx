"use client";

import * as React from "react";
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
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, Edit, MoreHorizontal, Pencil, Trash, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AgendaItem } from "@/app/ag";
import { Modal } from "./Modal";
import { TagBadge } from "./TagBadge";
import Link from "next/link";
import { Bookings } from "../../prisma/generated/client";
import { Skeleton } from "./ui/skeleton";
import { toast } from "sonner";

const handleDelete = async (id: string) => {
  try {
    // Faz a solicitação DELETE
    const response = await fetch(`/api/bookings/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    });
    if (response.ok) {
      // Atualiza os dados após a exclusão bem-sucedida
      toast.success('Deletado com sucesso');
    } else {
      throw new Error("Falha ao excluir o item.");
    }
  } catch (error) {
    console.error("Erro ao excluir:", error);
    toast.error('Erro ao excluir item')
    // Trate o erro, se necessário
  }
};

export const columns: ColumnDef<Bookings>[] = [
  {
    id: "select",
    maxSize: 50,
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    enableResizing: true,
    maxSize: 100,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <TagBadge nometag={row.getValue('status')} filtertag={row.getValue('status')} />
    ),
  },
  {
    accessorKey: "cliente",
    minSize: 250,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cliente
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("cliente")}</div>
    ),
  },
  {
    accessorKey: "empresa",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Empresa
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("empresa")}</div>
    ),
  },
  {
    accessorKey: "status_da_venda",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status da Venda
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status_da_venda")}</div>
    ),
  },
  {
    accessorKey: "benfeitoria",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Benfeitoria
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("benfeitoria")}</div>
    ),
  },
  {
    accessorKey: "cpf_cnpj",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          CPF/CNPJ
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("cpf_cnpj")}</div>
    ),
  },
  {
    accessorKey: "quadra",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quadra
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("quadra")}</div>
    ),
  },
  {
    accessorKey: "lote",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Lote
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("lote")}</div>,
  },
  {
    accessorKey: "demarcador",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Demarcador
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("demarcador")}</div>
    ),
  },
  {
    accessorKey: "dt_agendamento",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("dt_agendamento")}</div>
    ),
  },
  {
    accessorKey: "horario_do_agen",
    header: "Hora",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("horario_do_agen")}</div>
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.cliente ?? '')}
            >
              Copiar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Pencil size={12} className="mr-3"/><Link href={`/bookings/${payment.id}`}>Editar</Link></DropdownMenuItem>
            <DropdownMenuItem><Trash2 size={12} className="mr-3" /><Button className="h-auto p-0" variant={'ghost'} onClick={() => handleDelete(payment.id)}>Excluir</Button></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const DataTableDemo = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [data, setData] = React.useState<Bookings[]>([]);

  React.useEffect(() => {
    fetch("/api/bookings")
      .then((response) => response.json())
      .then((data) => setData(data));
    console.log(data);

  }, [data]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    columnResizeMode: "onChange",
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });



  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filtrar por cliente"
          value={(table.getColumn("cliente")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("cliente")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Colunas <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column: any) => column.getCanHide())
                .map((column: any, index) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={index}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {index} {column.columnDef.accessorKey}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Modal />
        </div>
      </div>
      <div className="rounded-md border ">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup: any, index) => (


              <TableRow key={index} className="bg-muted/50">
                {headerGroup.headers.map((header: any, index: any) => {
                  return (
                    <TableHead
                      className="relative text-sm"
                      colSpan={header.colSpan}
                      style={{ width: `${header.getSize()}px` }}
                      key={index}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      <div
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        className={`${header.column.getIsResizing()
                            ? "bg-blue-500 opacity-100"
                            : "opacity-0"
                          } absolute hover:opacity-100 opacity-0 bg-zinc-500/50 top-0 right-0  w-1 h-full cursor-col-resize`}
                      />
                    </TableHead>
                  );
                })}
              </TableRow>

            ))}
          </TableHeader>
          <TableBody className="bg-zinc-50 dark:bg-background">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row: any) => (
                  <TableRow
                    className="text-xs "
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >{

                    }
                    {row.getVisibleCells().map((cell: any) => (

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
                  className="w-full text-center space-y-1"
                >
                  <Skeleton className="w-full h-10"/>
                  <Skeleton className="w-full h-10"/>
                  <Skeleton className="w-full h-10"/>
                  <Skeleton className="w-full h-10"/>
                  <Skeleton className="w-full h-10"/>
                  <Skeleton className="w-full h-10"/>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataTableDemo;
