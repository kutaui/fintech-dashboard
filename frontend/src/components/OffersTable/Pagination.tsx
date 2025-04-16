'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react'

type PaginationProps = {
  pageIndex: number
  pageSize: number
  pageCount: number
  totalItems: number
  handlePageChange: (newPage: number) => void
  handlePreviousPage: () => void
  handleNextPage: () => void
  handlePageSizeChange: (value: string) => void
}

export function Pagination({
  pageIndex,
  pageSize,
  pageCount,
  totalItems,
  handlePageChange,
  handlePreviousPage,
  handleNextPage,
  handlePageSizeChange,
}: PaginationProps) {
  const currentPage = pageIndex + 1
  const firstVisibleRow = totalItems === 0 ? 0 : pageIndex * pageSize + 1
  const lastVisibleRow = Math.min((pageIndex + 1) * pageSize, totalItems)

  function generatePagination() {
    if (pageCount <= 7) {
      return Array.from({ length: pageCount }, (_, i) => i + 1)
    }
    
    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5, '...', pageCount]
    } else if (currentPage >= pageCount - 2) {
      return [1, '...', pageCount - 4, pageCount - 3, pageCount - 2, pageCount - 1, pageCount]
    } else {
      return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', pageCount]
    }
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 mt-4">
      <div className="flex items-center space-x-2">
        <p className="text-sm text-muted-foreground">
          Showing 
          <span className="font-medium"> {firstVisibleRow} </span>
          to 
          <span className="font-medium"> {lastVisibleRow} </span>
          of 
          <span className="font-medium"> {totalItems} </span>
          entries
        </p>
        <div className="flex items-center space-x-2">
          <Label htmlFor="perPage" className="text-sm">
            Show
          </Label>
          <Select
            value={pageSize.toString()}
            onValueChange={handlePageSizeChange}
          >
            <SelectTrigger className="h-8 w-[80px]">
              <SelectValue placeholder={pageSize.toString()} />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 20, 50, 100].map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {pageCount > 0 && (
        <nav className="flex items-center space-x-1">
          <Button 
            variant="outline"
            size="icon"
            onClick={handlePreviousPage}
            disabled={pageIndex === 0}
            className="h-8 w-8"
            type="button"
          >
            <ChevronLeftIcon className="h-4 w-4" />
            <span className="sr-only">Go to previous page</span>
          </Button>
          
          <div className="flex items-center space-x-1">
            {generatePagination().map((page, i) => (
              page === '...' ? (
                <span
                  key={i}
                  className="flex h-8 w-8 items-center justify-center text-sm text-muted-foreground"
                >
                  <MoreHorizontalIcon className="h-4 w-4" />
                </span>
              ) : (
                <Button
                  key={i}
                  variant={currentPage === page ? "default" : "outline"}
                  size="icon"
                  onClick={() => handlePageChange(Number(page) - 1)}
                  className="h-8 w-8 mx-0.5"
                  type="button"
                >
                  {page}
                </Button>
              )
            ))}
          </div>
          
          <Button 
            variant="outline"
            size="icon"
            onClick={handleNextPage}
            disabled={pageIndex >= pageCount - 1}
            className="h-8 w-8"
            type="button"
          >
            <ChevronRightIcon className="h-4 w-4" />
            <span className="sr-only">Go to next page</span>
          </Button>
        </nav>
      )}
    </div>
  )
} 