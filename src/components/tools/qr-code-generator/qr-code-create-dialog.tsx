'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import { default as QRCode } from 'qrcode';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { colorOptions } from '~/constants/qr-code-generator';
import { isURL } from '~/lib/utils';

import ColorSelector from './color-selector';
import LogoSelector from './logo-selector';
import QrCodeLogo from './qr-code-logo';

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
});

const QRCodeCreateDialog: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [qrCodeData, setQrCodeData] = useState('');
  const [selectedForegroundColor, setSelectedForegroundColor] =
    useState<string>(colorOptions[0] ?? '');
  const [selectedBackgroundColor, setSelectedBackgroundColor] =
    useState<string>(colorOptions[1] ?? '');
  const [selectedLogo, setSelectedLogo] = useState<{
    name: string;
    data: string;
  } | null>(null);

  const isUrlValid = useMemo(() => isURL(url), [url]);

  useEffect(() => {
    const generate = async (): Promise<void> => {
      if (!isUrlValid) {
        return;
      }

      try {
        const qrCodeGen = await QRCode.toDataURL(url, {
          errorCorrectionLevel: 'Q',
          margin: 1,
          color: {
            dark: selectedForegroundColor,
            light: selectedBackgroundColor,
          },
          width: 256,
        });
        setQrCodeData(qrCodeGen);
      } catch (error) {
        console.error('QR Code generation error:', error);
      }
    };

    generate().catch((error: unknown) => {
      console.error('QR Code generation error:', error);
    });
  }, [isUrlValid, selectedForegroundColor, selectedBackgroundColor, url]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      url: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>): void {
    const userQrCodeData = {
      name: values.name,
      url: values.url,
      qrCode: qrCodeData,
      foregroundColor: selectedForegroundColor,
      backgroundColor: selectedBackgroundColor,
      logo: selectedLogo?.name ?? '',
    };

    // API call to save userQrCodeData
    console.log(userQrCodeData);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="hidden md:flex justify-center items-center border-4 border-neutral-800 border-dashed rounded-3xl w-full h-full"
          type="button"
        >
          <div className="flex justify-center items-center border-4 border-neutral-800 border-dashed rounded-full w-1/2 aspect-square">
            <Plus color="#262626" size={60} strokeWidth={4} />
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="md:max-w-md">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            {/* header */}
            <DialogHeader>
              <DialogTitle>Create QR Code</DialogTitle>
            </DialogHeader>

            {/* form */}
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="My QR Code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com"
                        {...field}
                        value={url}
                        onChange={(e) => {
                          setUrl(e.target.value);
                          form.setValue('url', e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* preview */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative w-full aspect-square grid place-content-center bg-white select-none">
                {isUrlValid ? (
                  <>
                    <Image
                      fill
                      alt="preview"
                      className="object-contain"
                      src={qrCodeData}
                    />
                    <QrCodeLogo
                      backgroundColor={selectedBackgroundColor}
                      logoName={selectedLogo?.name ?? null}
                    />
                  </>
                ) : (
                  <p className="text-center text-neutral-400">
                    Enter a valid URL to preview QR code
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-5">
                <ColorSelector
                  color={selectedForegroundColor}
                  setColor={(color) => setSelectedForegroundColor(color)}
                  title="Select Foreground Color"
                />
                <ColorSelector
                  color={selectedBackgroundColor}
                  setColor={(color) => setSelectedBackgroundColor(color)}
                  title="Select Background Color"
                />
                <LogoSelector
                  logo={selectedLogo}
                  setLogo={(logo) => setSelectedLogo(logo)}
                  title="Select Logo"
                />
              </div>
            </div>

            {/* footer */}
            <DialogFooter>
              <Button type="submit" variant="primary">
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeCreateDialog;
