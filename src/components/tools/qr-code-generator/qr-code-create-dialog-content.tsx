'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { default as QrCode } from 'qrcode'
import { useContext, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '~/components/ui/button'
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { colorOptions } from '~/constants/qr-code-generator'
import { useToast } from '~/hooks/use-toast'
import { isURL } from '~/lib/utils'
import { createQrCode } from '~/server/actions/qr-code'

import ColorSelector from './color-selector'
import LogoSelector from './logo-selector'
import QrCodeLogo from './qr-code-logo'
import { OpenContext } from './qr-code-open-context'

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

const QrCodeCreateDialogContent: React.FC = () => {
  const { setOpen } = useContext(OpenContext)
  const [url, setUrl] = useState('')
  const [qrCodeData, setQrCodeData] = useState('')
  const [selectedColor, setSelectedColor] = useState<string>(
    colorOptions[0] ?? ''
  )
  const [selectedLogo, setSelectedLogo] = useState<{
    name: string
    data: string
  } | null>(null)
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const isUrlValid = useMemo(() => isURL(url), [url])

  useEffect(() => {
    const generate = async (): Promise<void> => {
      if (!isUrlValid) {
        return
      }

      try {
        const qrCodeGen = await QrCode.toDataURL(url, {
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
        console.error(
          'QrCodeCreateDialogContent, QR code generation error:',
          error
        )
      }
    }

    generate().catch((error: unknown) => {
      console.error(
        'QrCodeCreateDialogContent, QR code generation error:',
        error
      )
    })
  }, [isUrlValid, selectedColor, url])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      url: '',
    },
  })

  const resetForm = (): void => {
    form.reset({
      name: '',
      url: '',
    })
    setUrl('')
    setQrCodeData('')
    setSelectedColor(colorOptions[0] ?? '')
    setSelectedLogo(null)
  }

  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    try {
      setLoading(true)

      const res = await createQrCode({
        name: values.name,
        url: values.url,
        qrCode: qrCodeData,
        color: selectedColor,
        logo: selectedLogo ? selectedLogo.name : '',
      })

      if (!res.success) {
        console.error(
          'QrCodeCreateDialogContent, failed to create QR code: ',
          res.errors
        )
        toast({
          title: 'Failed to create QR code',
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

      resetForm()
      setOpen(false)
      setLoading(false)
    } catch (error) {
      console.error(
        'QrCodeCreateDialogContent, failed to create QR code: ',
        error
      )
      toast({
        title: 'Failed to create QR code',
        description:
          error instanceof Error ? error.message : 'Something went wrong',
        variant: 'destructive',
      })
    }
  }

  return (
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
                    <Input placeholder='My QR Code' {...field} />
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
  )
}

export default QrCodeCreateDialogContent
