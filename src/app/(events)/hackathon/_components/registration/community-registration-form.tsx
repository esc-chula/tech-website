/* eslint-disable react/no-array-index-key -- Required for dynamic form fields */
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle, Minus } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link as Scroll } from 'react-scroll'
import { z } from 'zod'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { useToast } from '~/hooks/use-toast'
import { createCommunityTeam } from '~/server/actions/hackathon'

import CommunityMembersForm from './community-members-form'

import FormSection from '../common/form-section'
import Input from '../common/input'

const formSchema = z.object({
  teamName: z.string().min(1, {
    message: 'Team name is required',
  }),
  teamMembers: z.array(
    z.object({
      firstName: z
        .string()
        .min(1, {
          message: 'First Name is required',
        })
        .max(90, {
          message: 'Invalid First Name',
        }),
      lastName: z
        .string()
        .min(1, {
          message: 'Last Name is required',
        })
        .max(90, {
          message: 'Invalid Last Name',
        }),
      nickname: z
        .string()
        .min(1, {
          message: 'Nickname is required',
        })
        .max(50, {
          message: 'Invalid Nickname',
        }),
      pronoun: z.enum(['HE', 'SHE', 'THEY', 'OTHER']),
      phoneNumber: z
        .string()
        .regex(/^\d{2,3}-\d{3,4}-\d{3,4}$/)
        .min(1, {
          message: 'Phone number is required',
        })
        .max(16, {
          message: 'Invalid Phone number',
        }),
      email: z
        .string()
        .email()
        .min(1, {
          message: 'Email is required',
        })
        .max(60, {
          message: 'Invalid Email',
        }),
      studentId: z.string().min(1, {
        message: 'Student ID is required',
      }),
      faculty: z
        .string()
        .min(1, {
          message: 'Faculty is required',
        })
        .max(90, {
          message: 'Invalid Faculty',
        }),
      department: z
        .string()
        .min(1, {
          message: 'Department is required',
        })
        .max(90, {
          message: 'Invalid Department',
        }),
      university: z
        .string()
        .min(1, {
          message: 'University is required',
        })
        .max(90, {
          message: 'Invalid University',
        }),
      role: z.enum(['DEVELOPER', 'DESIGNER', 'PRODUCT']),
      foodRestriction: z
        .string()
        .max(90, {
          message: 'Invalid Food Restriction',
        })
        .optional(),
      medication: z
        .string()
        .max(90, {
          message: 'Invalid Medication',
        })
        .optional(),
      medicalCondition: z
        .string()
        .max(90, {
          message: 'Invalid Medical Condition',
        })
        .optional(),
      chestSize: z
        .string()
        .min(1, {
          message: 'Chest Size is required',
        })
        .max(2, {
          message: 'Invalid Chest Size',
        }),
    })
  ),
})

export type CommunityRegistrationFormSchema = z.infer<typeof formSchema>

interface CommunityRegistrationFormProps {
  communityCode: string
  requiredUniversity: string | null
}

interface FormTeamMember {
  firstName: string
  lastName: string
  nickname: string
  pronoun: 'HE' | 'SHE' | 'THEY' | 'OTHER'
  phoneNumber: string
  email: string
  studentId: string
  faculty: string
  department: string
  university: string
  role: 'DEVELOPER' | 'DESIGNER' | 'PRODUCT'
  foodRestriction?: string
  medication?: string
  medicalCondition?: string
  chestSize: string
}

const createDefaultTeamMember = (university?: string): FormTeamMember => ({
  firstName: '',
  lastName: '',
  nickname: '',
  pronoun: 'HE' as const,
  phoneNumber: '',
  email: '',
  studentId: '',
  faculty: '',
  department: '',
  university: university ?? '',
  role: 'DEVELOPER' as const,
  foodRestriction: '',
  medication: '',
  medicalCondition: '',
  chestSize: '',
})

const createChulalongkornEngineeringTeamMember = (): FormTeamMember => ({
  firstName: '',
  lastName: '',
  nickname: '',
  pronoun: 'HE' as const,
  phoneNumber: '',
  email: '',
  studentId: '',
  faculty: 'Engineering',
  department: '',
  university: 'Chulalongkorn University',
  role: 'DEVELOPER' as const,
  foodRestriction: '',
  medication: '',
  medicalCondition: '',
  chestSize: '',
})

const CommunityRegistrationForm: React.FC<CommunityRegistrationFormProps> = ({
  communityCode,
  requiredUniversity,
}) => {
  const router = useRouter()
  const { toast } = useToast()

  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teamName: '',
      teamMembers: [
        createDefaultTeamMember(requiredUniversity ?? ''),
        createDefaultTeamMember(requiredUniversity ?? ''),
        createChulalongkornEngineeringTeamMember(),
        createChulalongkornEngineeringTeamMember(),
      ],
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    setLoading(true)

    let isError = false

    // team members must be 4-5 members
    if (values.teamMembers.length < 4) {
      form.setError('teamMembers', {
        type: 'manual',
        message: 'Team must have at least 4 hackers',
      })
      isError = true
    }

    // Check if at least 2 members are from required university
    const membersFromRequiredUniversity = values.teamMembers.filter(
      (member) => member.university === requiredUniversity
    )

    if (membersFromRequiredUniversity.length < 2) {
      toast({
        title: 'Validation Error',
        description: `At least 2 team members must be from ${requiredUniversity ?? 'Your University'}`,
        variant: 'destructive',
      })
      isError = true
    }

    // validate if any team member has the same student id or first and last name
    const studentIds = new Set<string>()
    const names = new Set<string>()
    values.teamMembers.forEach((member, index) => {
      const studentId = member.studentId
      const name = `${member.firstName} ${member.lastName}`
      if (studentIds.has(studentId)) {
        form.setError(`teamMembers.${index}.studentId`, {
          type: 'manual',
          message: 'Duplicate Student ID',
        })
        isError = true
      }
      if (names.has(name)) {
        form.setError(`teamMembers.${index}.firstName`, {
          type: 'manual',
          message: 'Duplicate Name',
        })
        form.setError(`teamMembers.${index}.lastName`, {
          type: 'manual',
          message: 'Duplicate Name',
        })
        isError = true
      }
      studentIds.add(studentId)
      names.add(name)
    })

    // validate each members chest size, convert to number
    const memberChestSizes = [] as number[]
    values.teamMembers.forEach((member, index) => {
      const chestSize = parseInt(member.chestSize)
      if (isNaN(chestSize)) {
        form.setError(`teamMembers.${index}.chestSize`, {
          type: 'manual',
          message: 'Invalid Chest Size',
        })
        isError = true
      }
      if (chestSize < 30 || chestSize > 60) {
        form.setError(`teamMembers.${index}.chestSize`, {
          type: 'manual',
          message: 'Chest Size must be between 30-60 inches',
        })
        isError = true
      }
      // set member chest size if valid
      if (!isNaN(chestSize)) {
        memberChestSizes.push(chestSize)
      }
    })
    if (memberChestSizes.length !== values.teamMembers.length) {
      isError = true
    }

    if (!form.formState.isValid || isError) {
      setLoading(false)
      return
    }

    // create community team
    try {
      const resRegister = await createCommunityTeam(
        communityCode,
        values.teamName,
        values.teamMembers.map((member, index) => ({
          ...member,
          chestSize: memberChestSizes[index] ?? 0,
        }))
      )

      if (!resRegister.success) {
        toast({
          title: 'Registration Failed',
          description: resRegister.message,
          variant: 'destructive',
        })
        setLoading(false)
        return
      }

      router.push(
        `/hackathon/community/${communityCode}/registration/success?teamId=${resRegister.data.teamId}`
      )
      setLoading(false)
    } catch (error) {
      toast({
        title: 'Submission Error',
        description: 'An error occurred while submitting the form',
        variant: 'destructive',
      })
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        className='flex w-full flex-col items-center gap-5'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/* team name */}
        <FormSection title='Team'>
          <FormField
            control={form.control}
            name='teamName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Team Name<span className='text-red-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Please Fill Your Team Name' />
                </FormControl>
                <FormDescription>Team name will be public.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormSection>
        {/* members */}
        <div className='grid w-full max-w-screen-sm grid-cols-3 gap-3 sm:grid-cols-5'>
          {form.watch('teamMembers').map((_, index) => (
            <div key={index} className='relative'>
              <Scroll
                smooth
                className='flex aspect-square w-full cursor-pointer select-none flex-col items-center justify-center gap-2 rounded-2xl border-2 border-white/10 bg-white/5 text-center backdrop-blur-md hover:border-white/50'
                offset={-64}
                to={`Hacker #${index + 1}`}
              >
                <div className='relative aspect-square h-[50%]'>
                  <Image
                    fill
                    alt='member'
                    className='pointer-events-none select-none object-contain'
                    sizes='(min-width: 640px) 100px, 80px'
                    src='/hackathon/assets/registration-member.png'
                  />
                </div>
                <span className='font-ndot47 text-xs sm:text-sm'>
                  Hacker #{index + 1}
                </span>
              </Scroll>

              {index === 4 ? (
                <button
                  className='absolute -right-1.5 -top-1.5 aspect-square rounded-full bg-hackathon-primary p-1 text-white'
                  type='button'
                  onClick={() => {
                    form.setValue(
                      'teamMembers',
                      form.getValues('teamMembers').slice(0, 4)
                    )
                  }}
                >
                  <Minus size={12} />
                </button>
              ) : null}
            </div>
          ))}
          {form.watch('teamMembers').length < 5 && (
            <button
              className='flex aspect-square w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-white/10 bg-white/5 backdrop-blur-md hover:border-white/50'
              type='button'
              onClick={() => {
                form.setValue('teamMembers', [
                  ...form.getValues('teamMembers'),
                  createDefaultTeamMember(),
                ])
              }}
            >
              <span className='font-ndot47 text-3xl'>+</span>
              <span className='text-xs text-white/60'>
                Add Member #{form.watch('teamMembers').length + 1}
              </span>
            </button>
          )}
        </div>
        {/* team members error */}
        {form.formState.errors.teamMembers ? (
          <p className='text-center text-sm text-red-500'>
            {form.formState.errors.teamMembers.message}
          </p>
        ) : null}
        {/* members form */}
        {form.watch('teamMembers').map((_, index) => (
          <CommunityMembersForm
            key={index}
            community
            form={form}
            index={index}
            requiredUniversity={requiredUniversity}
            lockedFields={{
              university: index < 4,
              faculty: index >= 2 && index < 4,
            }}
          />
        ))}
        {/* submit */}
        <div className='fixed bottom-2 w-full max-w-md px-3 sm:bottom-5'>
          <div className='flex items-center justify-between rounded-2xl border-2 border-white/20 bg-black/20 p-2 backdrop-blur-md'>
            <div className='pl-2'>
              <p className='text-xs text-white/50'>
                {loading ? (
                  'Validating your team informations...'
                ) : (
                  <>
                    Please review your team informations
                    <br />
                    before submitting.
                  </>
                )}
              </p>
            </div>
            <div>
              <button
                className='h-10 rounded-xl bg-hackathon-primary px-4 hover:bg-hackathon-primary/90'
                disabled={loading}
                type='submit'
              >
                {loading ? (
                  <LoaderCircle className='animate-spin opacity-50' />
                ) : (
                  'Submit'
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default CommunityRegistrationForm
