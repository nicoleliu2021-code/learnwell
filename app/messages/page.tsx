'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth/AuthContext'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { MessageCircle, Send, ArrowLeft } from 'lucide-react'

interface Message {
  id: string
  sender_id: string
  recipient_id: string
  booking_id: string | null
  content: string
  read: boolean
  created_at: string
}

interface Conversation {
  userId: string
  userName: string
  userRole: string
  lastMessage: Message
  unreadCount: number
  messages: Message[]
}

export default function MessagesPage() {
  const router = useRouter()
  const { user, userRole, loading: authLoading } = useAuth()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messageText, setMessageText] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/login')
      } else {
        loadMessages()
      }
    }
  }, [user, authLoading, router])

  const loadMessages = async () => {
    if (!user) return

    const supabase = createClient()
    setLoading(true)

    try {
      // Get all messages involving this user
      const { data: messages, error } = await supabase
        .from('messages')
        .select('*')
        .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`)
        .order('created_at', { ascending: true })

      if (error) throw error

      // Get all unique user IDs from messages
      const userIds = new Set<string>()
      messages?.forEach((msg) => {
        if (msg.sender_id !== user.id) userIds.add(msg.sender_id)
        if (msg.recipient_id !== user.id) userIds.add(msg.recipient_id)
      })

      // Fetch user details
      const { data: users } = await supabase
        .from('users')
        .select('id, full_name, role')
        .in('id', Array.from(userIds))

      const userMap = new Map(users?.map(u => [u.id, u]) || [])

      // Group messages by conversation (other user)
      const conversationMap = new Map<string, Message[]>()
      messages?.forEach((msg) => {
        const otherUserId = msg.sender_id === user.id ? msg.recipient_id : msg.sender_id
        if (!conversationMap.has(otherUserId)) {
          conversationMap.set(otherUserId, [])
        }
        conversationMap.get(otherUserId)!.push(msg)
      })

      // Build conversations array
      const convos: Conversation[] = Array.from(conversationMap.entries()).map(([userId, msgs]) => {
        const otherUser = userMap.get(userId)
        const unreadCount = msgs.filter(m => m.recipient_id === user.id && !m.read).length
        return {
          userId,
          userName: otherUser?.full_name || 'Unknown User',
          userRole: otherUser?.role || 'user',
          lastMessage: msgs[msgs.length - 1],
          unreadCount,
          messages: msgs
        }
      })

      // Sort by last message time
      convos.sort((a, b) =>
        new Date(b.lastMessage.created_at).getTime() - new Date(a.lastMessage.created_at).getTime()
      )

      setConversations(convos)
    } catch (error) {
      console.error('Error loading messages:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!messageText.trim() || !selectedConversation || !user) return

    setSending(true)
    const supabase = createClient()

    try {
      const { error } = await supabase.from('messages').insert({
        sender_id: user.id,
        recipient_id: selectedConversation.userId,
        content: messageText.trim(),
        booking_id: null
      })

      if (error) throw error

      setMessageText('')
      await loadMessages()

      // Auto-select the conversation again after reload
      const updatedConvo = conversations.find(c => c.userId === selectedConversation.userId)
      if (updatedConvo) setSelectedConversation(updatedConvo)
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Failed to send message. Please try again.')
    } finally {
      setSending(false)
    }
  }

  const markAsRead = async (conversationUserId: string) => {
    if (!user) return

    const supabase = createClient()

    try {
      await supabase
        .from('messages')
        .update({ read: true })
        .eq('recipient_id', user.id)
        .eq('sender_id', conversationUserId)
        .eq('read', false)

      await loadMessages()
    } catch (error) {
      console.error('Error marking messages as read:', error)
    }
  }

  const selectConversation = (convo: Conversation) => {
    setSelectedConversation(convo)
    markAsRead(convo.userId)
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading messages...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
          <p className="text-gray-600">Communicate with {userRole === 'parent' ? 'tutors' : 'parents'}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversations List */}
          <Card className="p-4 lg:col-span-1">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Conversations</h2>

            {conversations.length === 0 ? (
              <div className="text-center py-8">
                <MessageCircle size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 text-sm">No messages yet</p>
                <p className="text-gray-400 text-xs mt-2">
                  Start a conversation after a booking is accepted
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {conversations.map((convo) => (
                  <button
                    key={convo.userId}
                    onClick={() => selectConversation(convo)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedConversation?.userId === convo.userId
                        ? 'bg-blue-50 border-2 border-blue-600'
                        : 'bg-white border border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <div className="font-medium text-gray-900 text-sm">
                        {convo.userName}
                      </div>
                      {convo.unreadCount > 0 && (
                        <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-0.5">
                          {convo.unreadCount}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mb-1 capitalize">
                      {convo.userRole}
                    </div>
                    <div className="text-xs text-gray-600 truncate">
                      {convo.lastMessage.sender_id === user?.id ? 'You: ' : ''}
                      {convo.lastMessage.content}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </Card>

          {/* Message Thread */}
          <Card className="p-4 lg:col-span-2">
            {!selectedConversation ? (
              <div className="flex items-center justify-center h-full min-h-[400px]">
                <div className="text-center">
                  <MessageCircle size={64} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">Select a conversation to view messages</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col h-full min-h-[500px]">
                {/* Header */}
                <div className="border-b border-gray-200 pb-3 mb-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedConversation(null)}
                      className="lg:hidden text-gray-600 hover:text-gray-900"
                    >
                      <ArrowLeft size={20} />
                    </button>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {selectedConversation.userName}
                      </h3>
                      <p className="text-xs text-gray-500 capitalize">
                        {selectedConversation.userRole}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-3 mb-4 max-h-[400px]">
                  {selectedConversation.messages.map((msg) => {
                    const isSent = msg.sender_id === user?.id
                    return (
                      <div
                        key={msg.id}
                        className={`flex ${isSent ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg px-4 py-2 ${
                            isSent
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{msg.content}</p>
                          <p className={`text-xs mt-1 ${isSent ? 'text-blue-100' : 'text-gray-500'}`}>
                            {new Date(msg.created_at).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Send Message Form */}
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type your message..."
                    disabled={sending}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={sending || !messageText.trim()}>
                    <Send size={16} />
                  </Button>
                </form>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
