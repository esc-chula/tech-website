/* eslint-disable react/no-array-index-key -- Required for dynamic form fields */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as Scroll } from 'react-scroll';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { type Student } from '~/generated/intania/auth/student/v1/student';

import FormSection from '../common/form-section';
import Input from '../common/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../common/select';

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
      pronoun: z.enum([
        'he/him/his',
        'she/her/hers',
        'they/them/theirs',
        'other',
      ]),
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
    }),
  ),
});

interface RegistrationFormProps {
  currentUserData: Student;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  currentUserData,
}) => {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

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
        {},
        {},
      ],
    },
  });

  useEffect(() => {
    setMounted(true);

    form.setValue('teamMembers.0.firstName', currentUserData.firstNameEn ?? '');
    form.setValue('teamMembers.0.lastName', currentUserData.familyNameEn ?? '');
    form.setValue('teamMembers.0.nickname', currentUserData.nicknameEn ?? '');
    form.setValue(
      'teamMembers.0.pronoun',
      currentUserData.preferredPronoun as z.infer<
        typeof formSchema
      >['teamMembers'][0]['pronoun'],
    );
    form.setValue(
      'teamMembers.0.phoneNumber',
      currentUserData.phoneNumber ?? '',
    );
    form.setValue('teamMembers.0.email', currentUserData.email ?? '');
    form.setValue('teamMembers.0.studentId', currentUserData.studentId ?? '');
    form.setValue(
      'teamMembers.0.department',
      currentUserData.department?.nameEn ?? '',
    );
    form.setValue(
      'teamMembers.0.foodRestriction',
      currentUserData.foodLimitations ?? '',
    );
    form.setValue(
      'teamMembers.0.medication',
      currentUserData.medications ?? '',
    );
    form.setValue(
      'teamMembers.0.medicalCondition',
      currentUserData.medicalConditions ?? '',
    );
  }, [currentUserData, form]);

  function onSubmit(values: z.infer<typeof formSchema>): void {
    setLoading(true);

    console.log(values);
  }

  if (!mounted) {
    return <LoaderCircle className="animate-spin opacity-50" size={32} />;
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col items-center gap-5 w-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormSection title="Team">
          <FormField
            control={form.control}
            name="teamName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Team Name<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Please Fill Your Team Name" />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  Team name will be public, please be appropriate.
                </FormDescription>
              </FormItem>
            )}
          />
        </FormSection>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 max-w-screen-sm w-full">
          {form.watch('teamMembers').map((_, index) => (
            <Scroll
              key={index}
              smooth
              className="bg-white/5 backdrop-blur-md border-2 border-white/10 hover:border-white/50 rounded-2xl w-full aspect-square flex flex-col items-center justify-center gap-2 cursor-pointer text-center"
              offset={-20}
              to={`Member #${index + 1}`}
            >
              <div className="relative aspect-square w-[50%]">
                <Image
                  fill
                  alt="member"
                  className="object-contain select-none pointer-events-none"
                  sizes="(max-width: 640px) 50vw, 25vw"
                  src="/hackathon/assets/registration-member.png"
                />
              </div>
              <span className="text-xs sm:text-sm font-ndot47">
                Member #{index + 1}
              </span>
            </Scroll>
          ))}
          {form.watch('teamMembers').length < 5 && (
            <button
              className="bg-white/5 backdrop-blur-md border-2 border-white/10 hover:border-white/50 rounded-2xl w-full aspect-square flex flex-col items-center justify-center gap-2 cursor-pointer"
              type="button"
              onClick={() => {
                form.setValue('teamMembers', [
                  ...form.getValues('teamMembers'),
                  {} as z.infer<typeof formSchema>['teamMembers'][0],
                ]);
              }}
            >
              <span className="font-ndot47 text-3xl">+</span>
              <span className="text-xs text-white/60">
                Add Member #{form.watch('teamMembers').length + 1}
              </span>
            </button>
          )}
        </div>
        {form.watch('teamMembers').map((_, index) => (
          <FormSection
            key={index}
            title={`Member #${index + 1}`}
            description={
              index <= 1 ? 'Must be Chulalongkorn student.' : undefined
            }
          >
            <div className="grid sm:grid-cols-2 gap-2 md:gap-6">
              <FormField
                control={form.control}
                name={`teamMembers.${index}.firstName`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      First Name<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Please Fill Your First Name"
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
                      Last Name<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Please Fill Your Last Name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-2 md:gap-6">
              <FormField
                control={form.control}
                name={`teamMembers.${index}.nickname`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Nickname<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Please Fill Your Nickname"
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
                      Pronoun<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          if (!value) {
                            return;
                          }
                          form.setValue(
                            `teamMembers.${index}.role`,
                            value as 'DEVELOPER' | 'DESIGNER' | 'PRODUCT',
                          );
                        }}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Please Select Your Pronoun" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="he/him/his">He/Him/His</SelectItem>
                          <SelectItem value="she/her/hers">
                            She/Her/Hers
                          </SelectItem>
                          <SelectItem value="they/them/theirs">
                            They/Them/Theirs
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
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
                    Email<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Please Fill Your Email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid sm:grid-cols-2 gap-2 md:gap-6">
              <FormField
                control={form.control}
                name={`teamMembers.${index}.phoneNumber`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Phone Number<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Please Fill Your Phone Number"
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>Format: 0XX-XXX-XXXX</FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`teamMembers.${index}.studentId`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Student ID<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Please Fill Your Student ID"
                        readOnly={index === 0}
                      />
                    </FormControl>
                    <FormMessage />
                    {index <= 1 ? (
                      <FormDescription>
                        Must be Chulalongkorn and Engineering Student ID.
                      </FormDescription>
                    ) : null}
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
                    Faculty<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Please Fill Your Faculty" />
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
                    Department<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Please Fill Your Department"
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
                    University<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Please Fill Your University"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid sm:grid-cols-2 gap-2 md:gap-6">
              <FormField
                control={form.control}
                name={`teamMembers.${index}.role`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Role<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          if (!value) {
                            return;
                          }
                          form.setValue(
                            `teamMembers.${index}.role`,
                            value as 'DEVELOPER' | 'DESIGNER' | 'PRODUCT',
                          );
                        }}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Please Select Your Role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="DEVELOPER">Developer</SelectItem>
                          <SelectItem value="DESIGNER">Designer</SelectItem>
                          <SelectItem value="PRODUCT">Product</SelectItem>
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
                        placeholder="Please Fill Your Food Restriction"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-2 md:gap-6">
              <FormField
                control={form.control}
                name={`teamMembers.${index}.medication`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Medication</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Please Fill Your Medication"
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
                        placeholder="Please Fill Your Medical Condition"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </FormSection>
        ))}
        <div className="fixed max-w-md w-full bottom-2 sm:bottom-5 px-3">
          <div className="bg-black/20 backdrop-blur-md border-2 border-white/20 rounded-2xl flex justify-between items-center p-2">
            <div />
            <div>
              <button
                className="bg-hackathon-primary hover:bg-hackathon-primary/90 rounded-xl h-10 px-4"
                disabled={loading}
                type="submit"
              >
                {loading ? (
                  <LoaderCircle className="animate-spin opacity-50" />
                ) : (
                  'Submit'
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default RegistrationForm;
