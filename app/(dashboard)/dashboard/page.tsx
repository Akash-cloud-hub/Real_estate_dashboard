"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  ColumnDef,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  Plus,
  Search,
  RefreshCw,
  Building2,
  Globe,
  Briefcase,
  LayoutGrid,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Business, Industry } from "@/models/master";
import { fetchBusinesses } from "@/action/user";

export default function AddBusinessPage() {
  const router = useRouter();
  const [data, setData] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Table States
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  // Auto-load data on mount (Best UX)
  useEffect(() => {
    getBusinesses();
  }, []);

  const getBusinesses = async () => {
    setIsLoading(true);
    try {
      // Simulate a small delay for the animation to be felt if data is instant
      // await new Promise(resolve => setTimeout(resolve, 600));
      const businesses = await fetchBusinesses();
      setData(businesses as Business[]);
    } catch (error) {
      console.error("Failed to fetch", error);
    } finally {
      setIsLoading(false);
    }
  };

  // --- COLUMNS DEFINITION ---
  const columns: ColumnDef<Business>[] = [
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
          className="border-slate-300 data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-600"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="border-slate-300 data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-600"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "business_name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-slate-500 hover:text-violet-600 hover:bg-violet-50"
        >
          <Building2 className="mr-2 size-4" />
          Business Name
          <ArrowUpDown className="ml-2 size-3 opacity-50" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="font-semibold text-slate-800 text-base">
          {row.getValue("business_name")}
        </div>
      ),
    },
    {
      accessorKey: "country",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-slate-500 hover:text-violet-600 hover:bg-violet-50"
        >
          <Globe className="mr-2 size-4" />
          Location
          <ArrowUpDown className="ml-2 size-3 opacity-50" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-slate-600">
          {/* Simple flag or icon could go here */}
          {row.getValue("country")}
        </div>
      ),
    },
    {
      accessorKey: "industry",
      header: ({ column }) => (
        <div className="pl-4 flex items-center text-slate-500 font-medium">
          <Briefcase className="mr-2 size-4" />
          Industries
        </div>
      ),
      cell: ({ row }) => {
        const industries: Industry[] = row.getValue("industry");
        if (!industries || industries.length === 0)
          return (
            <span className="text-slate-400 text-sm italic pl-4">
              Not specified
            </span>
          );

        return (
          <div className="flex gap-2 flex-wrap pl-4">
            {industries.map((item, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-100"
              >
                {item.industry}
              </Badge>
            ))}
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const business = row.original;
        return (
          <div className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8 p-0 hover:bg-slate-100 rounded-full"
                >
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="size-4 text-slate-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-[160px] rounded-xl shadow-xl border-slate-100"
              >
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer text-violet-600 focus:text-violet-700 focus:bg-violet-50"
                  onClick={() => router.push(`/addBusiness/${business.id}`)}
                >
                  Edit Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer text-violet-600 focus:text-violet-700 focus:bg-violet-50"
                  onClick={() => router.push(`/addUser/${business.id}`)}
                >
                  Manage Users
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

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
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="min-h-screen bg-slate-50/50 p-8 font-sans text-slate-900">
      {/* --- PAGE HEADER --- */}
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
              Client{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-600">
                Registry
              </span>
            </h1>
            <p className="text-slate-500 mt-2 text-lg">
              Manage your agency portfolio and configurations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={getBusinesses}
              className="hidden md:flex bg-white border-slate-200 text-slate-600 hover:text-violet-600 hover:border-violet-200 transition-all rounded-full"
            >
              <RefreshCw
                className={`mr-2 size-4 ${isLoading ? "animate-spin" : ""}`}
              />
              Sync Data
            </Button>

            <Button
              onClick={() => router.push("/addBusiness/NEW")}
              className="bg-violet-600 hover:bg-violet-700 text-white rounded-full px-6 shadow-lg shadow-violet-200 hover:shadow-violet-300 transition-all hover:scale-105 active:scale-95"
            >
              <Plus className="mr-2 size-5" />
              New Business
            </Button>
          </div>
        </div>

        {/* --- MAIN CONTENT CARD --- */}
        <Card className="border-none shadow-xl shadow-slate-200/40 bg-white/80 backdrop-blur-xl ring-1 ring-slate-200 rounded-[2rem] overflow-hidden">
          <CardHeader className="border-b border-slate-100 bg-white/50 px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Search Bar */}
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <Input
                  placeholder="Filter by country..."
                  value={
                    (table.getColumn("country")?.getFilterValue() as string) ??
                    ""
                  }
                  onChange={(event) =>
                    table
                      .getColumn("country")
                      ?.setFilterValue(event.target.value)
                  }
                  className="pl-10 h-11 bg-slate-50 border-transparent focus:bg-white focus:border-violet-200 focus:ring-4 focus:ring-violet-50 transition-all rounded-xl"
                />
              </div>

              {/* Column Toggle */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="ml-auto border-slate-200 rounded-xl hover:bg-slate-50"
                  >
                    <LayoutGrid className="mr-2 size-4 text-slate-500" />
                    View
                    <ChevronDown className="ml-2 size-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="rounded-xl">
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
                          {column.id.replace("_", " ")}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow
                      key={headerGroup.id}
                      className="hover:bg-transparent border-slate-100"
                    >
                      {headerGroup.headers.map((header) => (
                        <TableHead
                          key={header.id}
                          className="h-14 bg-slate-50/50 text-slate-500 font-medium"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-32 text-center"
                      >
                        <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
                          <Loader2 className="size-8 animate-spin text-violet-500" />
                          <p>Fetching portfolio...</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row, index) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                        className="group transition-all duration-200 hover:bg-slate-50 border-slate-50 data-[state=selected]:bg-violet-50 data-[state=selected]:border-violet-100 animate-in fade-in slide-in-from-bottom-2"
                        style={{
                          animationDelay: `${index * 50}ms`,
                          animationFillMode: "both",
                        }}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id} className="py-4">
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
                        className="h-32 text-center"
                      >
                        <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
                          <Building2 className="size-8 opacity-20" />
                          <p>No businesses found.</p>
                          <Button
                            variant="link"
                            onClick={() => router.push("/addBusiness/NEW")}
                            className="text-violet-600"
                          >
                            Create your first one?
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>

          {/* --- FOOTER PAGINATION --- */}
          <div className="flex items-center justify-between px-8 py-6 border-t border-slate-100 bg-slate-50/30">
            <div className="text-xs text-slate-500">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="rounded-lg border-slate-200 hover:bg-white hover:text-violet-600"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="rounded-lg border-slate-200 hover:bg-white hover:text-violet-600"
              >
                Next
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
