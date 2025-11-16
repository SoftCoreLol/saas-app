'use client'
import { cn, configureAssistant, getSubjectColor } from '@/lib/utils'
import { vapi } from '@/lib/vapi.sdk'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import Image from 'next/image'
import { useEffect, useRef, useState, useCallback, memo } from 'react'
import soundwaves from '@/constants/soundwaves.json'

enum CallStatus {
  INACTIVE = 'INACTIVE',
  CONNECTING = 'CONNECTING',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
}

const CompanionComponent = memo(({
  userName,
  userImage,
  subject,
  name,
  style,
  topic,
  voice
}: CompanionComponentProps) => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [messages, setMessages] = useState<SavedMessage[]>([])
  const lottieRef = useRef<LottieRefCurrentProps>(null)
  const transcriptContainerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (transcriptContainerRef.current) {
      transcriptContainerRef.current.scrollTop = transcriptContainerRef.current.scrollHeight
    }
  }, [messages])

  // Optimize Lottie animation based on speaking state
  useEffect(() => {
    if (lottieRef.current) {
      if (isSpeaking) {
        lottieRef.current.play()
      } else {
        lottieRef.current.stop()
      }
    }
  }, [isSpeaking])

  // Properly manage Vapi event listeners with useCallback
  useEffect(() => {
    const handleCallStart = () => {
      console.log('Call started')
      setCallStatus(CallStatus.ACTIVE)
    }
    
    const handleCallEnd = () => {
      console.log('Call ended')
      setCallStatus(CallStatus.FINISHED)
    }
    
    const handleSpeechStart = () => {
      console.log('Speech started')
      setIsSpeaking(true)
    }
    
    const handleSpeechEnd = () => {
      console.log('Speech ended')
      setIsSpeaking(false)
    }
    
    const handleError = (error: any) => {
      console.error('Vapi Error:', error)
      setCallStatus(CallStatus.FINISHED)
    }
    
    const handleMessage = (message: Message) => {
      if (message.type === 'transcript' && message.transcriptType === 'final') {
        const newMessage = { 
          role: message.role, 
          content: message.transcript,
          timestamp: Date.now()
        }
        setMessages((prev) => [...prev, newMessage]) // Append to end for chronological order
      }
    }

    vapi.on('call-start', handleCallStart)
    vapi.on('call-end', handleCallEnd)
    vapi.on('speech-start', handleSpeechStart)
    vapi.on('speech-end', handleSpeechEnd)
    vapi.on('error', handleError)
    vapi.on('message', handleMessage)

    // Cleanup event listeners
    return () => {
      vapi.off('call-start', handleCallStart)
      vapi.off('call-end', handleCallEnd)
      vapi.off('speech-start', handleSpeechStart)
      vapi.off('speech-end', handleSpeechEnd)
      vapi.off('error', handleError)
      vapi.off('message', handleMessage)
    }
  }, [])

  // Memoize callback functions
  const toggleMicrophone = useCallback(() => {
    const currentMutedState = vapi.isMuted()
    vapi.setMuted(!currentMutedState)
    setIsMuted(!currentMutedState)
  }, [])

  const handleCall = useCallback(async () => {
    console.log('Attempting to start call with:', { subject, topic, style, voice })

    // Validate required parameters before attempting to start
    if (!voice || !style || !subject) {
      console.error('Missing required parameters for Vapi call:', { voice, style, subject })
      setCallStatus(CallStatus.FINISHED)
      return
    }

    setCallStatus(CallStatus.CONNECTING)
    setMessages([]) // Clear previous messages

    try {
      const assistantConfig = configureAssistant(voice, style, subject, topic)

      // Check if assistant config is valid
      if (!assistantConfig || Object.keys(assistantConfig).length === 0) {
        console.error('Invalid assistant configuration returned by configureAssistant')
        setCallStatus(CallStatus.FINISHED)
        return
      }

      const assistantOverrides = {
        variableValues: { subject, topic, style },
        clientMessages: ['transcript'],
        serverMessages: {}
      }
      console.log('Assistant overrides:', assistantOverrides)

      const result = await vapi.start(assistantConfig, assistantOverrides)
      console.log('Vapi start result:', result)
    } catch (error: any) {
      console.error('Error starting Vapi call:', error)
      console.error('Error details:', {
        message: error?.message || 'No message',
        name: error?.name || 'No name',
        stack: error?.stack || 'No stack'
      })
      setCallStatus(CallStatus.FINISHED)
    }
  }, [subject, topic, style, voice])

  const handleDisconnect = useCallback(async () => {
    setCallStatus(CallStatus.FINISHED)
    await vapi.stop()
  }, [])

  // Define button click handler to prevent unnecessary recalculations
  const handleButtonClick = useCallback(() => {
    if (callStatus === CallStatus.ACTIVE) {
      handleDisconnect()
    } else {
      handleCall()
    }
  }, [callStatus, handleDisconnect, handleCall])

  // Format name for display (remove special characters)
  const displayName = name ? name.split('')[0].replace(/[.,]/g, '') : ''

  console.log("Assistant config:", configureAssistant(voice, style))

  return (
    <section className="flex flex-col h-[70vh] w-full justify-center items-center px-4">
      <section className="flex w-full gap-10 justify-center items-start max-md:flex-col max-md:items-center">

        {/* Big Companion Box */}
        <div
          className="relative flex flex-col items-center justify-center rounded-2xl p-10 shadow-xl border-orange-500 border-3 bg-white flex-1 min-h-[400px] h-[600px] w-full"
          style={{ backgroundColor: getSubjectColor(subject) }}
        >
          {/* Static Icon */}
          <div
            className={cn('transition-opacity duration-700 mb-6', {
              'opacity-100': callStatus !== CallStatus.CONNECTING,
              'opacity-40 animate-pulse': callStatus === CallStatus.CONNECTING,
            })}
          >
            <Image
              src={`/icons/${subject || 'default'}.svg`}
              alt={subject || 'Default icon'}
              width={120}
              height={120}
              priority={callStatus === CallStatus.INACTIVE}
              unoptimized={true}
            />
          </div>

          {/* Speaking Lottie */}
          <div
            className={cn('absolute top-10 transition-opacity duration-700', {
              'opacity-100': callStatus === CallStatus.ACTIVE,
              'opacity-0': callStatus !== CallStatus.ACTIVE,
            })}
          >
            <Lottie
              lottieRef={lottieRef}
              animationData={soundwaves}
              autoPlay={false}
              loop={true}
              className="w-[120px]"
            />
          </div>

          <h2 className="font-bold text-2xl text-black mt-4">{name}</h2>
        </div>

        {/* Right User Box */}
        <div
          className="flex flex-col items-center border-black border-2 rounded-2xl p-6 w-[260px] shadow-md max-md:w-[80%] max-sm:w-full bg-white"
        >
          <div className="flex flex-col items-center justify-center w-full">
            <div className="flex items-center justify-center shadow-sm w-[150px] h-[150px] mb-6 rounded-full overflow-hidden">
              <Image
                src={userImage}
                alt={userName}
                width={120}
                height={120}
                priority={false}
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-lg font-semibold text-black mt-6">{userName}</p>
            </div>
            <button
              className='btn-mic flex items-center gap-2 mt-4'
              onClick={toggleMicrophone}
            >
              <Image
                src={isMuted ? `/icons/mic-off.svg` : `/icons/mic-on.svg`}
                alt={isMuted ? "microphone muted" : "microphone unmuted"}
                width={36}
                height={36}
                unoptimized={true}
              />
              <p className='max-sm:hidden'>
                {isMuted ? 'Muted' : 'Unmuted'}
              </p>
            </button>
            <button
              className={cn(
                'mt-5 rounded-lg py-3 cursor-pointer transition-all duration-300 w-full text-white font-medium',
                callStatus === CallStatus.ACTIVE
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-primary hover:bg-blue-600',
                callStatus === CallStatus.CONNECTING && 'animate-pulse cursor-not-allowed',
              )}
              onClick={handleButtonClick}
              disabled={callStatus === CallStatus.CONNECTING}
            >
              {callStatus === CallStatus.ACTIVE
                ? 'End Session'
                : callStatus === CallStatus.CONNECTING
                  ? 'Connecting...'
                  : 'Start Session'}
            </button>
          </div>
        </div>

      </section>
      
      {/* Fixed Transcript Section */}
      <section className='transcript mt-6 w-full max-w-5xl'>
        <div 
          ref={transcriptContainerRef}
          className='transcript-messages no-scrollbar bg-gray-100 p-4 rounded-lg min-h-[100px] max-h-[200px] overflow-y-auto'
        >
          {messages.length === 0 ? (
            <p className="text-gray-500 text-center">No messages yet. Start a session to begin chatting!</p>
          ) : (
            messages.map((message, index) => (
              <div 
                key={`${message.timestamp}-${index}`} 
                className={cn(
                  'mb-2 p-2 rounded-lg',
                  message.role === 'assistant' 
                    ? 'bg-blue-100 text-blue-800 ml-4' 
                    : 'bg-green-100 text-green-800 mr-4'
                )}
              >
                <p className="font-semibold text-sm">
                  {message.role === 'assistant' ? displayName : userName}:
                </p>
                <p className="max-sm:text-sm">{message.content}</p>
              </div>
            ))
          )}
        </div>
        <div className='transcript-fade h-4 bg-linear-to-b from-gray-100 to-transparent'/>
      </section>
    </section>
  )
})

export default CompanionComponent