'use client'
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Form, FormField, FormItem, FormMessage } from "@/src/components/ui/form"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { LoginBodySchema } from "@/src/schemaValidations/auth.schema"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { useLoginMutation } from "@/src/queries/useAuth"
import { toast } from "sonner"
import Link from "next/link"


export default function LoginForm() {
  const { mutateAsync: loginMutation, isPending } = useLoginMutation();
  const form = useForm({
    resolver: zodResolver(LoginBodySchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data) => {
    if (isPending) return;
    try {
      const { payload } = await loginMutation(data)
      if(payload.meta.code === 401) {
        toast.error("Email or password is incorrect", {
            position: "top-right",
            duration: 3000,
        })
      } else {
        toast.success('Login successful', {
            position: "top-right",
            duration: 3000,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Card>
      <CardHeader >
        <CardTitle className='text-2xl'>Sign in</CardTitle>
        <CardDescription>Enter your email and password to sign in to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form 
          onSubmit={form.handleSubmit(onSubmit, (errors) => {
            console.warn(errors)
          })}
          className='space-y-2 w-[300px] sm:w-[400px] flex-shrink-0' noValidate>
            <div className='grid gap-4'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <div className='grid gap-2'>
                      <Label htmlFor='email'>Email</Label>
                      <Input id='email' type='email' placeholder='m@example.com' required {...field} />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <div className='grid gap-2'>
                      <div className='flex items-center'>
                        <Label htmlFor='password'>Password</Label>
                      </div>
                      <Input id='password' type='password' required {...field} />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Button type='submit' className='w-full'>
                Sign in
              </Button>
              <Button variant='outline' className='w-full' type='button'>
                Sign in with Google
              </Button>
              <p className='text-sm text-center'>
                Don't have an account? <Link href='/register'>Sign up</Link>
              </p>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}