'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod'

import { Button } from "./ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'

// Zodスキーマ
const formSchema = z.object({
  username: z.string().min(2).max(50),
  picture: z.custom<FileList>().refine((file) => file && file.length !== 0, {
    message: 'ファイルが選択されていません',
  }).transform((file) => file[0]),
})

// フォーム
const ProfileForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append('username', values.username)
    formData.append('picture', values.picture)

    await fetch('/api/profile', {
      method: 'post',
      body: formData,
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>UserName</FormLabel>

                <FormControl>
                  <Input
                    placeholder="shadcn"
                    {...field}
                    />
                </FormControl>
                
                <FormDescription>
                  This is your public display name.
                </FormDescription>

                <FormMessage />
                
              </FormItem>
            )}
            />

          <FormField
            control={form.control}
            name="picture"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Profile Picture</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    {...fieldProps}
                    accept="image/*"
                    onChange={(event) => {
                      onChange(event.target.files && event.target.files);
                    }}
                  />
                </FormControl>
                <FormDescription>Select Your Profile Picture</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default ProfileForm