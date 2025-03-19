'use client'

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { type UseFormReturn } from 'react-hook-form'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'

import FormSection from '../common/form-section'
import Input from '../common/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../common/select'

import { type RegistrationFormSchema } from './registration-form'

interface MembersForm {
  form: UseFormReturn<RegistrationFormSchema>
  index: number
}

const MembersForm: React.FC<MembersForm> = ({ form, index }) => {
  const [showMoreFields, setShowMoreFields] = useState(false)

  return (
    <FormSection
      key={index}
      description={undefined}
      title={`Hacker #${index + 1}`}
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
                <Input {...field} placeholder='Please Fill Your First Name' />
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
                <Input {...field} placeholder='Please Fill Your Last Name' />
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
                <Input {...field} placeholder='Please Fill Your Nickname' />
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
                      value as RegistrationFormSchema['teamMembers'][0]['pronoun']
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
                <Input {...field} placeholder='Please Fill Your Phone Number' />
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
                  Chulalongkorn and Engineering Student ID.
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
              <Input {...field} placeholder='Please Fill Your Department' />
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
              <Input {...field} placeholder='Please Fill Your University' />
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
                      value as RegistrationFormSchema['teamMembers'][0]['role']
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
          name={`teamMembers.${index}.chestSize`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Chest Size<span className='text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder='Please Fill Your Chest Size' />
              </FormControl>
              <FormDescription>Size in inches (Ex. 40)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      {showMoreFields ? (
        <>
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
          <FormField
            control={form.control}
            name={`teamMembers.${index}.medication`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Medication</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Please Fill Your Medication' />
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
        </>
      ) : (
        <button
          className='mb-1.5 mt-4 flex flex-col items-center gap-1 py-2 text-center text-xs text-white/50 hover:text-white/70 md:text-sm'
          type='button'
          onClick={() => {
            setShowMoreFields(true)
          }}
        >
          <span>Show Food Restriction, Medication, and Medical Condition</span>
          <ChevronDown size={16} />
        </button>
      )}
    </FormSection>
  )
}

export default MembersForm
