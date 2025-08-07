
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, MailOpen, Trash2 } from 'lucide-react';
import type { Message } from '@/models/Message';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { deleteMessage, updateMessageStatus } from '@/lib/actions/message-actions';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

type MessagesDataTableProps = {
  data: Message[];
  onRowClick: (message: Message) => void;
};

export default function MessagesDataTable({ data, onRowClick }: MessagesDataTableProps) {
  const { toast } = useToast();
  const router = useRouter();

  const handleToggleReadStatus = async (e: React.MouseEvent, id: string, currentStatus: boolean) => {
    e.stopPropagation();
    try {
      await updateMessageStatus(id, !currentStatus);
      toast({
        title: `Message marked as ${!currentStatus ? 'read' : 'unread'}`,
      });
      router.refresh();
    } catch (error) {
      console.error('Failed to update message status:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update message status.',
      });
    }
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    try {
      await deleteMessage(id);
      toast({
        title: 'Message Deleted',
        description: 'The message has been successfully deleted.',
      });
      router.refresh();
    } catch (error) {
      console.error('Failed to delete message:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete the message.',
      });
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead>From</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Received</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((message) => (
            <TableRow 
              key={message._id} 
              onClick={() => onRowClick(message)}
              className={cn("cursor-pointer", !message.read && 'font-bold')}
            >
              <TableCell>
                <Badge variant={message.read ? 'secondary' : 'default'}>
                  {message.read ? 'Read' : 'Unread'}
                </Badge>
              </TableCell>
              <TableCell>
                <div>{message.name}</div>
                <div className="text-xs text-muted-foreground">{message.email}</div>
              </TableCell>
              <TableCell className="max-w-xs truncate">{message.message}</TableCell>
              <TableCell>{format(new Date(message.createdAt), 'PPpp')}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => handleToggleReadStatus(e, message._id!, message.read)}
                    title={message.read ? 'Mark as unread' : 'Mark as read'}
                  >
                    {message.read ? <MailOpen className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
                  </Button>

                  <AlertDialog onOpenChange={(open) => !open && router.refresh()}>
                    <AlertDialogTrigger asChild>
                       <Button variant="ghost" size="icon" title="Delete message" onClick={(e) => e.stopPropagation()}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete this message.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={(e) => handleDelete(e, message._id!)} className="bg-destructive hover:bg-destructive/90">
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
