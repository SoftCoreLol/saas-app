'use client'
import {z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { subjects, voices } from '@/constants'
import { Textarea } from './ui/textarea'
import { createCompanion } from '@/lib/actions/companion.actions'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  name: z.string().min(1,'Companion is Required'),
  subject: z.string().min(1,'Subject is Required'),
  topic: z.string().min(1,'Topic is Required'),
  duration: z.preprocess((val) => Number(val), z.number().min(1, 'Duration is Required')),
  voice: z.string().min(1,'Voice is Required'),
  style: z.string().min(1,'Style is Required'),
})

const CompanionForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      subject:'',
      topic:'',
      duration:15,
      voice:'',
      style:''
    },
  })


   // 2. Define a submit handler.
  const onSubmit = async(values: z.infer<typeof formSchema>) => {
    try {
      const companion = await createCompanion(values);

      if(companion){
        router.push(`/companions/${companion.id}`);
      }else{
        console.log('Failed to create a companion');
        router.push('/');
      }
    } catch (error) {
      console.error('Error creating companion:', error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Companion Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter the companion name" {...field} className='input' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>


                <Select onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="input capitalize">
                      <SelectValue placeholder="Select the Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject)=>(
                      <SelectItem key={subject} value={subject} className='capitalize'>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>


              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What should the companion help with?</FormLabel>
              <FormControl>
                <Textarea placeholder="Ex. Derivatives and Integrals" {...field} className='input' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        

        <FormField
          control={form.control}
          name="voice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voice</FormLabel>
              <FormControl>


                <Select onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="input">
                      <SelectValue placeholder="Select the voice" />
                  </SelectTrigger>
                  <SelectContent>
                    
                    <SelectItem value='male' className='capitalize'>
                      Male
                    </SelectItem>
                    <SelectItem value='female' className='capitalize'>
                      Female
                    </SelectItem>
                  </SelectContent>
                </Select>


              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="style"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Style</FormLabel>
              <FormControl>


                <Select onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="input">
                      <SelectValue placeholder="Select the Style" />
                  </SelectTrigger>
                  <SelectContent>
                    
                    <SelectItem value='formal' className='capitalize'>
                      Formal
                    </SelectItem>
                    <SelectItem value='casual' className='capitalize'>
                      Casual
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estimated Session Duration in minutes</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  placeholder="15"
                  {...field}
                  value={field.value || ''}
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                  className='input'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className='w-full cursor-pointer bg-black'>Build Your Companion</Button>
      </form>
    </Form>
  )
}

export default CompanionForm
