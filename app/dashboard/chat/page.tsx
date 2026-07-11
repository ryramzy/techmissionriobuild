"use client"

import React, { useState, useEffect, useRef } from "react"
import { useAuth } from "@/app/components/AuthContext"
import { db } from "@/lib/firebase"
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  doc, 
  setDoc, 
  getDocs, 
  serverTimestamp,
  limit
} from "firebase/firestore"
import { Send, User, MessageSquare, Loader2, ArrowLeft, Shield } from "lucide-react"
import Link from "next/link"

interface ChatRoom {
  id: string
  participants: string[]
  participantNames: Record<string, string>
  lastMessage?: string
  updatedAt?: any
}

interface ChatMessage {
  id: string
  senderUid: string
  senderName: string
  text: string
  createdAt: any
  readBy: string[]
}

interface Contact {
  uid: string
  name: string
  role: string
  track?: string
}

export default function ChatPage() {
  const { user, profile, loading: authLoading } = useAuth()
  
  // Chat Rooms & Messages states
  const [rooms, setRooms] = useState<ChatRoom[]>([])
  const [activeRoom, setActiveRoom] = useState<ChatRoom | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  
  // UI States
  const [inputText, setInputText] = useState("")
  const [loadingRooms, setLoadingRooms] = useState(true)
  const [loadingMessages, setLoadingMessages] = useState(false)
  const [sending, setSending] = useState(false)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // 1. Guard route: redirect if not authenticated or unauthorized
  useEffect(() => {
    if (authLoading) return
    if (!user) {
      window.location.href = "/login"
    }
  }, [user, authLoading])

  // 2. Fetch available contacts list for simulating new chats
  useEffect(() => {
    if (!user || !profile) return

    const fetchContacts = async () => {
      try {
        const tempContacts: Contact[] = []

        // If user is a student (fellow), populate US mentors / org contacts
        if (profile.profileType === "fellow") {
          if (process.env.NODE_ENV === "development") {
            tempContacts.push(
              { uid: "admin-tmr-support", name: "TMR Support & Operations", role: "Administrator" },
              { uid: "sponsor-church-1", name: "FAETEC Santa Cruz Church Sponsor", role: "Mentor Partner" }
            )
          }
        } else {
          // If user is a donor, organization, or admin, query dynamic fellows list from DB
          const fellowsRef = collection(db, "fellows")
          const snapshot = await getDocs(query(fellowsRef, limit(10)))
          
          if (snapshot.empty) {
            if (process.env.NODE_ENV === "development") {
              // Seeding mock contacts if firestore is empty
              tempContacts.push(
                { uid: "fellow-mock-1", name: "Thiago Silva Santos", role: "Fellow Candidate", track: "Software Engineer" },
                { uid: "fellow-mock-2", name: "Beatriz Oliveira", role: "Fellow Candidate", track: "Full Stack Web Developer" }
              )
            }
          } else {
            snapshot.forEach((doc) => {
              const data = doc.data()
              tempContacts.push({
                uid: doc.id,
                name: data.name,
                role: "TMR Fellow",
                track: data.track,
              })
            })
          }
        }
        setContacts(tempContacts)
      } catch (err) {
        console.error("Failed to load chat contact matches:", err)
      }
    }

    fetchContacts()
  }, [user, profile])

  // 3. Real-time chat rooms listener
  useEffect(() => {
    if (!user) return

    setLoadingRooms(true)
    const chatRoomsRef = collection(db, "chats")
    const q = query(
      chatRoomsRef,
      where("participants", "array-contains", user.uid),
      orderBy("updatedAt", "desc"),
      limit(20)
    )

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const activeRooms: ChatRoom[] = []
        snapshot.forEach((doc) => {
          const data = doc.data()
          activeRooms.push({
            id: doc.id,
            participants: data.participants,
            participantNames: data.participantNames,
            lastMessage: data.lastMessage,
            updatedAt: data.updatedAt,
          })
        })
        setRooms(activeRooms)
        setLoadingRooms(false)
      },
      (err) => {
        console.error("Firestore chat rooms listener failed:", err)
        setLoadingRooms(false)
      }
    )

    return () => unsubscribe()
  }, [user])

  // 4. Real-time messages listener for active chat room
  useEffect(() => {
    if (!activeRoom) {
      setMessages([])
      return
    }

    setLoadingMessages(true)
    const messagesRef = collection(db, "chats", activeRoom.id, "messages")
    const q = query(messagesRef, orderBy("createdAt", "asc"), limit(100))

    const unsubscribe = onSnapshot(q,
      (snapshot) => {
        const roomMessages: ChatMessage[] = []
        snapshot.forEach((doc) => {
          const data = doc.data()
          roomMessages.push({
            id: doc.id,
            senderUid: data.senderUid,
            senderName: data.senderName,
            text: data.text,
            createdAt: data.createdAt,
            readBy: data.readBy || [],
          })
        })
        setMessages(roomMessages)
        setLoadingMessages(false)
        
        // Auto scroll to bottom
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
        }, 100)
      },
      (err) => {
        console.error("Firestore message listener failed:", err)
        setLoadingMessages(false)
      }
    )

    return () => unsubscribe()
  }, [activeRoom])

  // 5. Send message trigger
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputText.trim() || !user || !activeRoom) return

    setSending(true)
    const messageText = inputText.trim()
    setInputText("")

    try {
      const messagesRef = collection(db, "chats", activeRoom.id, "messages")
      const userName = profile?.name || user.email?.split("@")[0] || "Anonymous"

      // Write message to sub-collection
      await addDoc(messagesRef, {
        senderUid: user.uid,
        senderName: userName,
        text: messageText,
        createdAt: serverTimestamp(),
        readBy: [user.uid],
      })

      // Update parent chat doc
      const chatDocRef = doc(db, "chats", activeRoom.id)
      await setDoc(chatDocRef, {
        lastMessage: messageText,
        updatedAt: serverTimestamp(),
      }, { merge: true })

      // Dispatch PWA Send Push Notification dynamically
      const recipientUid = activeRoom.participants.find((p) => p !== user.uid)
      if (recipientUid) {
        await fetch("/api/notifications/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid: recipientUid,
            title: `New message from ${userName}`,
            body: messageText,
            data: { chatId: activeRoom.id },
          }),
        })
      }
    } catch (err) {
      console.error("Failed to transmit chat message:", err)
    } finally {
      setSending(false)
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 50)
    }
  }

  // 6. Create or activate conversation with contact selection
  const handleStartChat = async (contact: Contact) => {
    if (!user) return

    // Check if room already exists
    const existing = rooms.find((r) => r.participants.includes(contact.uid))
    if (existing) {
      setActiveRoom(existing)
      return
    }

    setLoadingMessages(true)
    try {
      const chatRoomId = [user.uid, contact.uid].sort().join("_")
      const chatDocRef = doc(db, "chats", chatRoomId)
      
      const userName = profile?.name || user.email?.split("@")[0] || "Anonymous"

      const newRoomData = {
        participants: [user.uid, contact.uid],
        participantNames: {
          [user.uid]: userName,
          [contact.uid]: contact.name,
        },
        lastMessage: "Conversation initialized.",
        updatedAt: serverTimestamp(),
      }

      await setDoc(chatDocRef, newRoomData)
      
      setActiveRoom({
        id: chatRoomId,
        ...newRoomData
      })
    } catch (err) {
      console.error("Failed to initialize conversation room:", err)
    } finally {
      setLoadingMessages(false)
    }
  }

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-green-400" />
      </div>
    )
  }

  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden flex flex-col">
      {/* Visual background lights */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-7xl h-[300px] bg-gradient-to-b from-blue-900/10 via-green-900/5 to-transparent pointer-events-none" />

      {/* Header Bar */}
      <header className="border-b border-gray-900 bg-black/40 backdrop-blur-md relative z-10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <span className="text-gray-400 hover:text-white transition cursor-pointer p-1.5 hover:bg-white/5 rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </span>
          </Link>
          <div>
            <h1 className="text-lg font-black bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 uppercase tracking-wider">
              Student-Mentor Messaging
            </h1>
            <span className="text-[10px] text-gray-500 block uppercase font-bold tracking-widest">
              Live Chat Portal
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full py-1 px-3 text-[10px] text-blue-400 font-bold">
          <Shield className="w-3.5 h-3.5" />
          <span>Secured Chat Gateway</span>
        </div>
      </header>

      {/* Main Container Grid */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10 overflow-hidden">
        
        {/* Left Side: Chats and contacts directory list */}
        <section className="lg:col-span-4 bg-gradient-to-b from-gray-950 to-black border border-gray-900 rounded-3xl p-6 flex flex-col space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Active Chats Section */}
          <div className="space-y-3 flex-1">
            <h2 className="text-xs font-black tracking-widest text-gray-400 uppercase flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" />
              Active Conversations
            </h2>

            {loadingRooms ? (
              <div className="flex justify-center py-6">
                <Loader2 className="w-5 h-5 animate-spin text-green-400" />
              </div>
            ) : rooms.length === 0 ? (
              <p className="text-xs text-gray-500 italic py-3">No active chats. Start one below!</p>
            ) : (
              <div className="space-y-2">
                {rooms.map((room) => {
                  const recipientUid = room.participants.find((p) => p !== user.uid) || ""
                  const recipientName = room.participantNames[recipientUid] || "Unknown Recipient"
                  const isSelected = activeRoom?.id === room.id

                  return (
                    <button
                      key={room.id}
                      onClick={() => setActiveRoom(room)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition flex items-center gap-3 cursor-pointer ${
                        isSelected 
                          ? "bg-blue-500/10 border-blue-500/40 text-white" 
                          : "bg-black/40 border-gray-900 hover:border-gray-800 text-gray-400 hover:text-white"
                      }`}
                    >
                      <div className="w-10 h-10 bg-gradient-to-tr from-green-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                        {recipientName.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm truncate text-white">{recipientName}</div>
                        <p className="text-xs text-gray-500 truncate mt-0.5">{room.lastMessage}</p>
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Contacts Directory Section */}
          <div className="space-y-3 pt-4 border-t border-gray-900">
            <h2 className="text-xs font-black tracking-widest text-gray-400 uppercase flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              Contacts Directory
            </h2>
            <div className="space-y-2 max-h-[25vh] overflow-y-auto">
              {contacts.length === 0 ? (
                <p className="text-[10px] text-gray-500 italic py-2">
                  No active contacts found. Contacts populate automatically when student applications are verified by school partners.
                </p>
              ) : (
                contacts.map((contact) => (
                  <button
                    key={contact.uid}
                    onClick={() => handleStartChat(contact)}
                    className="w-full text-left p-3 rounded-xl bg-black/40 border border-gray-900 hover:border-gray-800 transition flex items-center justify-between cursor-pointer group"
                  >
                    <div>
                      <span className="font-semibold text-xs text-white block group-hover:text-green-400 transition">
                        {contact.name}
                      </span>
                      <span className="text-[10px] text-gray-500 block mt-0.5">
                        {contact.role} {contact.track ? `• ${contact.track}` : ""}
                      </span>
                    </div>
                    <span className="text-[10px] bg-green-500/15 border border-green-500/20 text-green-400 font-extrabold px-2 py-0.5 rounded-full uppercase">
                      Chat
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Right Side: Conversation messaging thread */}
        <section className="lg:col-span-8 bg-gradient-to-b from-gray-950 to-black border border-gray-900 rounded-3xl flex flex-col justify-between max-h-[80vh] overflow-hidden">
          {activeRoom ? (
            <>
              {/* Active Room Header */}
              <div className="p-4 border-b border-gray-900 flex justify-between items-center bg-black/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-tr from-green-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold">
                    {activeRoom.participantNames[activeRoom.participants.find((p) => p !== user.uid) || ""].slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">
                      {activeRoom.participantNames[activeRoom.participants.find((p) => p !== user.uid) || ""]}
                    </h3>
                    <span className="text-[10px] text-green-400 font-bold block">
                      ● Active Connection
                    </span>
                  </div>
                </div>
              </div>

              {/* Chat Messages Log */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {loadingMessages ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                  </div>
                ) : messages.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 italic text-sm">
                    No messages yet. Send a note below to start the exchange!
                  </div>
                ) : (
                  messages.map((message) => {
                    const isOwnMessage = message.senderUid === user.uid
                    return (
                      <div
                        key={message.id}
                        className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[75%] rounded-2xl p-4 text-xs shadow-md leading-relaxed ${
                            isOwnMessage
                              ? "bg-green-500 text-black font-medium rounded-tr-none"
                              : "bg-gray-900 text-gray-100 rounded-tl-none border border-gray-800"
                          }`}
                        >
                          {!isOwnMessage && (
                            <span className="font-bold text-[10px] text-blue-400 block mb-1">
                              {message.senderName}
                            </span>
                          )}
                          <p>{message.text}</p>
                          <div
                            className={`text-[8px] mt-1.5 text-right ${
                              isOwnMessage ? "text-black/60" : "text-gray-500"
                            }`}
                          >
                            {message.createdAt?.seconds 
                              ? new Date(message.createdAt.seconds * 1000).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
                              : "Sending..."}
                          </div>
                        </div>
                      </div>
                    )
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Footer Form */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-900 bg-black/40 flex gap-3">
                <input
                  type="text"
                  placeholder="Type your message here..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 bg-black border border-gray-800 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-blue-500/50"
                  disabled={sending}
                />
                <button
                  type="submit"
                  disabled={sending || !inputText.trim()}
                  className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-2xl transition disabled:opacity-50 flex items-center justify-center cursor-pointer shadow-lg"
                >
                  {sending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
              <div className="bg-blue-500/10 border border-blue-500/20 text-blue-400 p-4 rounded-full">
                <MessageSquare className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">No Conversation Active</h3>
                <p className="text-xs text-gray-500 max-w-sm mt-1 leading-relaxed">
                  Select an active chat log from the left panel, or pick a fellow or mentor from the directory to start a secure dynamic connection.
                </p>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
