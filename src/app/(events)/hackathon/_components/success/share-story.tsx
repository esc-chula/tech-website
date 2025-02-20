'use client'

import html2canvas from 'html2canvas-pro'
import { useRef, useState } from 'react'

import { useToast } from '~/hooks/use-toast'

import Button from '../ui/button'

import Story from './story'

interface ShareStoryProps {
  teamNo: number
}

const ShareStory: React.FC<ShareStoryProps> = ({ teamNo }) => {
  const { toast } = useToast()

  const storyRef = useRef<HTMLDivElement>(null)
  const [background, setBackground] = useState<1 | 2 | 3>(1)
  const [layoutType, setLayoutType] = useState<1 | 2 | 3>(1)
  const [emoji, setEmoji] = useState('🏆')
  const [phrase, setPhrase] = useState('48 HRS NON-STOP')

  const handleDownload = (): void => {
    if (!storyRef.current) {
      return
    }

    html2canvas(storyRef.current)
      .then((canvas) => {
        const link = document.createElement('a')
        link.href = canvas.toDataURL()
        link.download = 'image.png'
        link.click()
      })
      .catch((error: unknown) => {
        toast({
          title: 'Error sharing story',
          description:
            error instanceof Error ? error.message : 'An error occurred',
          variant: 'destructive',
        })
      })
  }

  const handleShare = async (): Promise<void> => {
    try {
      if (!storyRef.current) {
        return
      }

      const dataUrl = await html2canvas(storyRef.current).then((canvas) => {
        const dataUrl = canvas.toDataURL()
        return dataUrl
      })

      const dataBlob = await (await fetch(dataUrl)).blob()

      const image = new File([dataBlob], 'intania_hackathon_story.png', {
        type: dataBlob.type,
      })

      const shareData: ShareData = {
        title: 'Intania Hackathon',
        text: 'We are selected to join Intania Hackathon!',
        files: [image],
      }

      await navigator.share(shareData)
    } catch (error) {
      console.error(error)
      handleDownload()
    }
  }

  const handleGenerate = (): void => {
    // background
    setBackground((prev) => ((prev % 3) + 1) as 1 | 2 | 3)

    // layout type
    const layoutTypes = [1, 2, 3]
    setLayoutType(
      (layoutTypes[Math.floor(Math.random() * layoutTypes.length)] ?? 1) as
        | 1
        | 2
        | 3
    )

    // emoji
    if (layoutType === 3) {
      const emojis = ['🏆', '🐞', '💵', '🍔', '💘', '💡']
      setEmoji((prev) => {
        const filteredEmojis = emojis.filter((e) => e !== prev)
        const newEmoji =
          filteredEmojis[Math.floor(Math.random() * filteredEmojis.length)] ??
          '🏆'
        return newEmoji
      })
    }

    // phrase
    if (layoutType === 1) {
      const phrases = [
        '48 HRS NON-STOP',
        'MILLION IS OURS',
        'WHAT THE HACK?!',
        'GEN_BLPVF2THML',
      ]
      setPhrase((prev) => {
        const filteredPhrases = phrases.filter((p) => p !== prev)
        const newPhrase =
          filteredPhrases[Math.floor(Math.random() * filteredPhrases.length)] ??
          '48 HRS NON-STOP'
        return newPhrase
      })
    }
  }

  return (
    <>
      <div className='pointer-events-none flex w-full max-w-screen-sm flex-col items-center'>
        <div className='aspect-[9/16] w-[85%] rounded-3xl border-2 border-white/10 bg-white/10 p-3 backdrop-blur-md md:h-[55vh] md:w-auto'>
          <div className='h-full w-full overflow-hidden rounded-2xl'>
            <Story
              background={background}
              className='h-full w-full'
              emoji={emoji}
              layoutType={layoutType}
              phrase={phrase}
              teamNo={teamNo}
            />
          </div>
        </div>
      </div>
      <div ref={storyRef} className='absolute bottom-[100vh]'>
        <Story
          background={background}
          className='w-[1080px]'
          emoji={emoji}
          layoutType={layoutType}
          phrase={phrase}
          teamNo={teamNo}
        />
      </div>
      <div className='flex flex-col items-center gap-6'>
        <button
          className='rounded-full border border-white px-6 py-2 hover:bg-white/20'
          type='button'
          onClick={handleGenerate}
        >
          Generate
        </button>
        <Button onClick={handleShare}>Share</Button>
      </div>
    </>
  )
}

export default ShareStory
