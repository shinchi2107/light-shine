"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Form, FormField, FormItem, FormMessage } from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdatePasswordBodySchema } from "@/src/schemaValidations/account.schema";
import { useUpdateAccountPassword } from "@/src/hooks/queries/useAccount";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
const ChangePasswordForm = () => {
    const { mutateAsync: updateAccountPassword, isPending: isUpdatingAccountPassword } = useUpdateAccountPassword();
    const form = useForm({
        resolver: zodResolver(UpdatePasswordBodySchema),
        defaultValues: {
            oldPassword: "",
            password: "",
            confirmPassword: "",
        },
    })

    const onSubmit = async (data) => {
        try {
            const dataUpdate = {
                password: data.oldPassword,
                newPassword: data.password,
            }
            const { status, payload } = await updateAccountPassword(dataUpdate);
            if (status === 200) {
                toast.success("Change password successfully");
            }
        } catch (error) {
            console.log(error?.payload)
            if (error?.payload?.error) {
                const { errors } = error.payload.error;
                toast.error(errors.message);
            }
        }
    }
    return (
        <Form {...form}>
            <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Change Password</CardTitle>
                        <CardDescription>Update your password</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className='grid gap-6'>
                            <FormField
                                control={form.control}
                                name='oldPassword'
                                render={({ field }) => (
                                    <FormItem>
                                        <div className='grid gap-3'>
                                            <Label htmlFor='oldPassword'>Old Password</Label>
                                            <Input id='oldPassword' type='password' className='w-full' {...field} />
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
                                        <div className='grid gap-3'>
                                            <Label htmlFor='password'>New Password</Label>
                                            <Input id='password' type='password' className='w-full' {...field} />
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
                                        <div className='grid gap-3'>
                                            <Label htmlFor='confirmPassword'>Confirm New Password</Label>
                                            <Input id='confirmPassword' type='password' className='w-full' {...field} />
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>

                    </CardContent>
                    <CardFooter>
                        <div className=' items-center gap-2 md:ml-auto flex'>
                            <Button className="cursor-pointer" variant='outline' size='sm' type='reset' disabled={!form.formState.isDirty}>
                                Cancel
                            </Button>
                            <Button className="cursor-pointer" size='sm' type='submit' disabled={!form.formState.isDirty}>
                                {isUpdatingAccountPassword ? <Loader2Icon className="w-4 h-4 animate-spin" /> : "Save"}
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    )
}

export default ChangePasswordForm;