
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { updateMessageStatus } from '@/lib/actions/message-actions';
import type { Message } from '@/models/Message';
import { format } from 'date-fns';
import { useEffect } from 'react';

type MessageDetailDialogProps = {
  message: Message;
  isOpen: boolean;
  onClose: () => void;
};

export default function MessageDetailDialog({ message, isOpen, onClose }: MessageDetailDialogProps) {

  useEffect(() => {
    if (isOpen && !message.read) {
      updateMessageStatus(message._id!, true);
    }
  }, [isOpen, message]);


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Message from: {message.name}</DialogTitle>
          <DialogDescription>
            {message.email} &bull; Received on {format(new Date(message.createdAt), 'PPpp')}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="prose prose-sm dark:prose-invert max-w-none bg-muted/50 p-4 rounded-md whitespace-pre-wrap">
            {message.message}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
