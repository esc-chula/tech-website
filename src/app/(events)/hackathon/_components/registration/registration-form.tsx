/* eslint-disable react/no-array-index-key -- Required for dynamic form fields */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';

import FormSection from '../common/form-section';
import Input from '../common/input';

const formSchema = z.object({
  teamName: z.string().min(1, {
    message: 'Team name is required',
  }),
  teamMembers: z.array(
    z.object({
      firstName: z.string().min(1, {
        message: 'First Name is required',
      }),
      lastName: z.string().min(1, {
        message: 'Last Name is required',
      }),
      nickname: z.string().min(1, {
        message: 'Nickname is required',
      }),
      pronoun: z.string().min(1, {
        message: 'Pronoun is required',
      }),
      phoneNumber: z.string().min(1, {
        message: 'Phone number is required',
      }),
      email: z.string().email().min(1, {
        message: 'Email is required',
      }),
      studentId: z.string().min(1, {
        message: 'Student ID is required',
      }),
      faculty: z.string().min(1, {
        message: 'Faculty is required',
      }),
      department: z.string().min(1, {
        message: 'Department is required',
      }),
      university: z.string().min(1, {
        message: 'University is required',
      }),
      role: z.enum(['DEVELOPER', 'DESIGNER', 'PRODUCT']),
      foodRestriction: z.string().optional(),
      medication: z.string().optional(),
      medicalCondition: z.string().optional(),
    }),
  ),
});

const RegistrationForm: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teamName: '',
      teamMembers: [
        {
          firstName: '',
          lastName: '',
          studentId: '',
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

  function onSubmit(values: z.infer<typeof formSchema>): void {
    console.log(values);
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
                <FormLabel>Team Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Please Fill Your Team Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormSection>
        {form.watch('teamMembers').map((_, index) => (
          <FormSection key={index} title={`Member #${index + 1}`}>
            <div className="grid sm:grid-cols-2 gap-2 md:gap-6">
              <FormField
                control={form.control}
                name={`teamMembers.${index}.firstName`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
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
                    <FormLabel>Last Name</FormLabel>
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
                    <FormLabel>Nickname</FormLabel>
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
                    <FormLabel>Pronoun</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Please Select Your Pronoun"
                      />
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
                  <FormLabel>Email</FormLabel>
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
                name={`teamMembers.${index}.nickname`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Please Fill Your Phone Number"
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
                    <FormLabel>Student ID</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Please Fill Your Student ID"
                      />
                    </FormControl>
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
                  <FormLabel>Faculty</FormLabel>
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
                  <FormLabel>Department</FormLabel>
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
                  <FormLabel>University</FormLabel>
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
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Please Select Your Role" />
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
      </form>
    </Form>
  );
};

export default RegistrationForm;
