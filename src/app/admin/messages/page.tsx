
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getMessages } from '@/lib/actions/message-actions';
import MessagesDataTable from './MessagesDataTable';
import { useEffect, useState } from 'react';
import type { Message } from '@/models/Message';
import MessageDetailDialog from './MessageDetailDialog';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    async function fetchMessages() {
      const fetchedMessages = await getMessages();
      const plainMessages = JSON.parse(JSON.stringify(fetchedMessages));
      setMessages(plainMessages);
    }
    fetchMessages();
  }, []);

  const handleRowClick = (message: Message) => {
    setSelectedMessage(message);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedMessage(null);
    // Re-fetch messages to get updated read status
     getMessages().then(fetchedMessages => {
        const plainMessages = JSON.parse(JSON.stringify(fetchedMessages));
        setMessages(plainMessages);
     });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Contact Messages</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inbox</CardTitle>
        </CardHeader>
        <CardContent>
          <MessagesDataTable data={messages} onRowClick={handleRowClick} />
        </CardContent>
      </Card>
      {selectedMessage && (
        <MessageDetailDialog
          message={selectedMessage}
          isOpen={isDialogOpen}
          onClose={handleDialogClose}
        />
      )}
    </div>
  );
}
