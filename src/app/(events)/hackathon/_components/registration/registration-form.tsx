/* eslint-disable react/no-array-index-key -- Required for dynamic form fields */
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
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
import { type Student } from '~/generated/intania/auth/student/v1/student'
import { useToast } from '~/hooks/use-toast'
import {
  findMyTeamTicket,
  registerHackathonTeam,
} from '~/server/actions/hackathon'

import FormSection from '../common/form-section'
import Input from '../common/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../common/select'

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
    })
  ),
})

interface RegistrationFormProps {
  currentUserData: Student
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  currentUserData,
}) => {
  const router = useRouter()
  const { toast } = useToast()

  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teamName: '',
      teamMembers: [
        {
          faculty: 'Engineering',
          university: 'Chulalongkorn University',
        },
        {
          faculty: 'Engineering',
          university: 'Chulalongkorn University',
        },
      ],
    },
  })

  useEffect(() => {
    setMounted(true)

    form.setValue('teamMembers.0.firstName', currentUserData.firstNameEn ?? '')
    form.setValue('teamMembers.0.lastName', currentUserData.familyNameEn ?? '')
    form.setValue('teamMembers.0.nickname', currentUserData.nicknameEn ?? '')
    const currentPronoun = (): z.infer<
      typeof formSchema
    >['teamMembers'][0]['pronoun'] => {
      switch (currentUserData.preferredPronoun) {
        case 'he/him/his':
          return 'HE'
        case 'she/her/hers':
          return 'SHE'
        case 'they/them/theirs':
          return 'THEY'
        case 'other':
          return 'OTHER'
        default:
          return 'OTHER'
      }
    }
    form.setValue('teamMembers.0.pronoun', currentPronoun())
    form.setValue(
      'teamMembers.0.phoneNumber',
      currentUserData.phoneNumber ?? ''
    )
    form.setValue('teamMembers.0.email', currentUserData.email ?? '')
    form.setValue('teamMembers.0.studentId', currentUserData.studentId ?? '')
    form.setValue(
      'teamMembers.0.department',
      currentUserData.department?.nameEn ?? ''
    )
    form.setValue(
      'teamMembers.0.foodRestriction',
      currentUserData.foodLimitations ?? ''
    )
    form.setValue('teamMembers.0.medication', currentUserData.medications ?? '')
    form.setValue(
      'teamMembers.0.medicalCondition',
      currentUserData.medicalConditions ?? ''
    )
  }, [currentUserData, form])

  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    setLoading(true)

    // simulate validation loading for 1.5 seconds
    await new Promise((resolve) => {
      setTimeout(resolve, 1500)
    })

    // team members must be 4-5 members
    if (values.teamMembers.length < 4) {
      form.setError('teamMembers', {
        type: 'manual',
        message: 'Team must have at least 4 hackers',
      })
      setLoading(false)
    }

    // validate first 2 members student id
    const studentIdRegex = /^6[4-7]3\d{5}21$/
    values.teamMembers.forEach((member, index) => {
      if (index <= 1 && !studentIdRegex.test(member.studentId)) {
        form.setError(`teamMembers.${index}.studentId`, {
          type: 'manual',
          message: 'Invalid Student ID',
        })
        setLoading(false)
      }
    })

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
        setLoading(false)
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
        setLoading(false)
      }
      studentIds.add(studentId)
      names.add(name)
    })

    if (!form.formState.isValid) {
      setLoading(false)

      return
    }

    // TODO: integrate with api, redirect to success page, check if user has team ticket and not registered yet
    const resTeamTicket = await findMyTeamTicket()
    if (!resTeamTicket.success) {
      toast({
        title: 'Registration Failed',
        description: resTeamTicket.message,
        variant: 'destructive',
      })

      setLoading(false)

      return
    }
    if (!resTeamTicket.data) {
      toast({
        title: 'Registration Failed',
        description: 'You do not have a team ticket',
        variant: 'destructive',
      })

      setLoading(false)

      return
    }

    const resRegister = await registerHackathonTeam(
      resTeamTicket.data.id,
      values.teamName,
      values.teamMembers
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

    router.push('/hackathon/registration/success')

    setLoading(false)
  }

  if (!mounted) {
    return <LoaderCircle className='animate-spin opacity-50' size={32} />
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
            <Scroll
              key={index}
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
          ))}
          {form.watch('teamMembers').length < 5 && (
            <button
              className='flex aspect-square w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-white/10 bg-white/5 backdrop-blur-md hover:border-white/50'
              type='button'
              onClick={() => {
                form.setValue('teamMembers', [
                  ...form.getValues('teamMembers'),
                  {} as z.infer<typeof formSchema>['teamMembers'][0],
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
          <FormSection
            key={index}
            title={`Hacker #${index + 1}`}
            description={
              index <= 1 ? 'Must be Chulalongkorn student.' : undefined
            }
          >
            <div className='grid gap-2 sm:grid-cols-2 md:gap-6'>
              <FormField
                control={form.control}
                name={`teamMembers.${index}.firstName`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      First Name<span className='text-red-500'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='Please Fill Your First Name'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`teamMembers.${index}.lastName`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Last Name<span className='text-red-500'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='Please Fill Your Last Name'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='grid gap-2 sm:grid-cols-2 md:gap-6'>
              <FormField
                control={form.control}
                name={`teamMembers.${index}.nickname`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Nickname<span className='text-red-500'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='Please Fill Your Nickname'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`teamMembers.${index}.pronoun`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Pronoun<span className='text-red-500'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          if (!value) {
                            return
                          }
                          form.setValue(
                            `teamMembers.${index}.pronoun`,
                            value as z.infer<
                              typeof formSchema
                            >['teamMembers'][0]['pronoun']
                          )
                        }}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Please Select Your Pronoun' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='HE'>He/Him/His</SelectItem>
                          <SelectItem value='SHE'>She/Her/Hers</SelectItem>
                          <SelectItem value='THEY'>They/Them/Theirs</SelectItem>
                          <SelectItem value='OTHER'>Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name={`teamMembers.${index}.email`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email<span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Please Fill Your Email' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='grid gap-2 sm:grid-cols-2 md:gap-6'>
              <FormField
                control={form.control}
                name={`teamMembers.${index}.phoneNumber`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Phone Number<span className='text-red-500'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='Please Fill Your Phone Number'
                      />
                    </FormControl>
                    <FormDescription>Format: 0XX-XXX-XXXX</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`teamMembers.${index}.studentId`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Student ID<span className='text-red-500'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='Please Fill Your Student ID'
                        readOnly={index === 0}
                      />
                    </FormControl>
                    {index <= 1 ? (
                      <FormDescription>
                        Must be Chulalongkorn and Engineering Student ID.
                      </FormDescription>
                    ) : null}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name={`teamMembers.${index}.faculty`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Faculty<span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Please Fill Your Faculty' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`teamMembers.${index}.department`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Department<span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Please Fill Your Department'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`teamMembers.${index}.university`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    University<span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Please Fill Your University'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='grid gap-2 sm:grid-cols-2 md:gap-6'>
              <FormField
                control={form.control}
                name={`teamMembers.${index}.role`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Role<span className='text-red-500'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          if (!value) {
                            return
                          }
                          form.setValue(
                            `teamMembers.${index}.role`,
                            value as z.infer<
                              typeof formSchema
                            >['teamMembers'][0]['role']
                          )
                        }}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Please Select Your Role' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='DEVELOPER'>Developer</SelectItem>
                          <SelectItem value='DESIGNER'>Designer</SelectItem>
                          <SelectItem value='PRODUCT'>Product</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`teamMembers.${index}.foodRestriction`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Food Restriction</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='Please Fill Your Food Restriction'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='grid gap-2 sm:grid-cols-2 md:gap-6'>
              <FormField
                control={form.control}
                name={`teamMembers.${index}.medication`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Medication</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='Please Fill Your Medication'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`teamMembers.${index}.medicalCondition`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Medical Condition</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='Please Fill Your Medical Condition'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </FormSection>
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

export default RegistrationForm
