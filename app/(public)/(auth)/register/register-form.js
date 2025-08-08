'use client'
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Form, FormField, FormItem, FormMessage } from "@/src/components/ui/form"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { RegisterBodySchema } from "@/src/schemaValidations/auth.schema"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { useRegisterMutation } from "@/src/queries/useAuth"
import { toast } from "sonner"
import Link from "next/link"
import { useRouter } from "next/navigation"


export default function RegisterForm() {
    const { mutateAsync: registerMutation, isPending } = useRegisterMutation();
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(RegisterBodySchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    })

    const onSubmit = async (data) => {
        if (isPending) return;
        try {
            const { payload } = await registerMutation(data)
            if (payload.meta.code === 401) {
                toast.error("Email or password is incorrect", {
                    position: "top-right",
                    duration: 3000,
                })
            } else {
                toast.success('Register successful', {
                    position: "top-right",
                    duration: 3000,
                })
            }
            router.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Card>
            <CardHeader >
                <CardTitle className='text-2xl'>Sign up</CardTitle>
                <CardDescription>Enter your information to sign up to your account</CardDescription>
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
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <div className='grid gap-2'>
                                            <Label htmlFor='name'>Name</Label>
                                            <Input id='name' type='text' placeholder='John Doe' required {...field} />
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
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
                            <FormField
                                control={form.control}
                                name='confirmPassword'
                                render={({ field }) => (
                                    <FormItem>
                                        <div className='grid gap-2'>
                                            <Label htmlFor='confirmPassword'>Confirm Password</Label>
                                            <Input id='confirmPassword' type='password' required {...field} />
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <Button type='submit' className='w-full'>
                                Sign up
                            </Button>
                            <Button variant='outline' className='w-full' type='button'>
                                Sign in with Google
                            </Button>
                            <p className='text-sm text-center'>
                                Already have an account? <Link href='/login'>Sign in</Link>
                            </p>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
