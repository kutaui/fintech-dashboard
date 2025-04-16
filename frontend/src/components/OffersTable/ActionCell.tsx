'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useOffers } from '@/hooks/useOffers'
import { ClipboardCopy, Eye, MoreHorizontal, PencilIcon, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { EditOfferDialog } from './EditOfferDialog'
import { ViewDetailsDialog } from './ViewDetailsDialog'

type ActionCellProps = {
  offer: OfferType
}

export function ActionCell({ offer }: ActionCellProps) {
  const { updateOffer, deleteOffer, isDeleting } = useOffers()
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  function handleDelete() {
    deleteOffer(offer.id)
    setDeleteDialogOpen(false)
  }

  function handleEditOffer(updatedOffer: OfferType) {
    updateOffer(updatedOffer)
    setEditDialogOpen(false)
  }

  return (
    <>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(String(offer.id))}
            className="flex items-center gap-2 cursor-pointer"
          >
            <ClipboardCopy className="h-4 w-4" />
            <span>Copy offer ID</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={() => {
              setViewDialogOpen(true)
              setDropdownOpen(false)
            }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Eye className="h-4 w-4" />
            <span>View details</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => {
              setEditDialogOpen(true)
              setDropdownOpen(false)
            }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <PencilIcon className="h-4 w-4" />
            <span>Edit offer</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={() => {
              setDeleteDialogOpen(true)
              setDropdownOpen(false)
            }}
            className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete offer</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ViewDetailsDialog 
        offer={offer} 
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
      />
      
      <EditOfferDialog 
        offer={offer} 
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onEditOffer={handleEditOffer}
      />

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Offer</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the offer
              &ldquo;{offer.title}&rdquo;.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleDelete}
              disabled={isDeleting}
              variant="destructive"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
} 