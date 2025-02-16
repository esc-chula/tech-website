'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { SquarePen } from 'lucide-react'
import Image from 'next/image'
import { default as QrCodeLib } from 'qrcode'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { logoOptions } from '~/constants/qr-code-generator'
import { useToast } from '~/hooks/use-toast'
import { isURL } from '~/lib/utils'
import { updateQrCode } from '~/server/actions/qr-code'
import { type QrCode } from '~/types/qr-code'

import ColorSelector from './color-selector'
import LogoSelector from './logo-selector'
import QrCodeLogo from './qr-code-logo'

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'Name is required',
    })
    .max(50, {
      message: 'Name must be less than 50 characters',
    }),
  url: z.string().url({
    message: 'Please enter a valid URL',
  }),
})

interface EditQrCodeProps {
  data: QrCode
}

const EditQrCode: React.FC<EditQrCodeProps> = ({ data }) => {
  const [open, setOpen] = useState(false)
  const [url, setUrl] = useState(data.url)
  const [qrCodeData, setQrCodeData] = useState(data.qrCode)
  const [selectedColor, setSelectedColor] = useState<string>(data.color)
  const [selectedLogo, setSelectedLogo] = useState<{
    name: string
    data: string
  } | null>(
    data.logo
      ? {
          name: data.logo,
          data: logoOptions.find((logo) => logo.name === data.logo)?.data ?? '',
        }
      : null
  )
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const isUrlValid = useMemo(() => isURL(url), [url])

  useEffect(() => {
    const generate = async (): Promise<void> => {
      if (!isUrlValid) {
        return
      }

      try {
        const qrCodeGen = await QrCodeLib.toDataURL(url, {
          errorCorrectionLevel: 'Q',
          margin: 1,
          color: {
            dark: selectedColor,
            light: '#fafafa',
          },
          width: 256,
        })
        setQrCodeData(qrCodeGen)
      } catch (error) {
        console.error('EditQrCode, QR code generation error:', error)
      }
    }

    generate().catch((error: unknown) => {
      console.error('EditQrCode, QR code generation error:', error)
    })
  }, [isUrlValid, selectedColor, url])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data.name,
      url: data.url,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    try {
      setLoading(true)

      const res = await updateQrCode({
        id: data.id,
        name: values.name,
        url: values.url,
        qrCode: qrCodeData,
        color: selectedColor,
        logo: selectedLogo ? selectedLogo.name : '',
      })

      if (!res.success) {
        console.error('Failed to update QR code:', res.errors)
        toast({
          title: 'Failed to update QR code',
          description: res.message,
          variant: 'destructive',
        })

        if (res.errors[0] === 'The QR Code name already exists') {
          form.setError('name', {
            message: 'The QR Code name already exists',
          })
        }
        setLoading(false)
        return
      }

      form.reset()
      setOpen(false)
      setLoading(false)
    } catch (error) {
      console.error('EditQrCode, failed to update QR code:', error)
      toast({
        title: 'Failed to update QR code',
        description:
          error instanceof Error ? error.message : 'Something went wrong',
        variant: 'destructive',
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='transparent'>
          <SquarePen size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className='md:max-w-md'>
        <Form {...form}>
          <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
            {/* header */}
            <DialogHeader>
              <DialogTitle>Create QR Code</DialogTitle>
            </DialogHeader>

            {/* form */}
            <div className='space-y-2'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='My QR Code'
                        {...field}
                        onChange={(e) => {
                          form.setValue('name', e.target.value)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='url'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='https://example.com'
                        {...field}
                        value={url}
                        onChange={(e) => {
                          setUrl(e.target.value)
                          form.setValue('url', e.target.value)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* preview */}
            <div className='grid grid-cols-2 gap-4'>
              <div className='relative grid aspect-square w-full select-none place-content-center bg-white'>
                {isUrlValid ? (
                  <>
                    <Image
                      fill
                      alt='preview'
                      className='object-contain'
                      src={qrCodeData}
                    />
                    <QrCodeLogo logoName={selectedLogo?.name ?? null} />
                  </>
                ) : (
                  <p className='text-center text-neutral-400'>
                    Enter a valid URL to preview QR code
                  </p>
                )}
              </div>
              <div className='flex flex-col gap-5'>
                <ColorSelector
                  color={selectedColor}
                  setColor={(color) => setSelectedColor(color)}
                  title='Select Foreground Color'
                />
                <LogoSelector
                  logo={selectedLogo}
                  setLogo={(logo) => setSelectedLogo(logo)}
                  title='Select Logo'
                />
              </div>
            </div>

            {/* footer */}
            <DialogFooter>
              <Button disabled={loading} type='submit' variant='primary'>
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default EditQrCode
