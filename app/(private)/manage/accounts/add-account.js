"use client";

import { Button } from "@/src/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/src/components/ui/dialog";
import { Form, FormField, FormItem, FormMessage } from "@/src/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AccountCreateBodySchema } from "@/src/schemaValidations/account.schema";
import { useMemo, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { Upload } from "lucide-react";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { useCreateAccount } from "@/src/hooks/queries/useAccount";
const AddAccount = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { mutate: createAccount, isPending: isCreatingAccount } = useCreateAccount();
    const { mutateAsync: uploadAvatar } = useMediaUploadAvatar();
    const [file, setFile] = useState(null);
    const avatarInputRef = useRef(null);
    const form = useForm({
        resolver: zodResolver(AccountCreateBodySchema),
        defaultValues: {
            name: '',
            email: '',
            avatar: undefined,
            password: '',
            confirmPassword: ''
        }
    })

    const avatar = form.watch('avatar');

    const previewAvatar = useMemo(() => {
        if (file) {
            return URL.createObjectURL(file);
        }
        return avatar;
    }, [file, avatar]);



    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            console.log(data);
            let dataUpdate = {
                ...data
            };
            if (data.avatar instanceof File) {
                const formData = new FormData();
                formData.append("avatar", data.avatar);
                const { status, payload } = await uploadAvatar(formData);
                if (status === 200) {
                    dataUpdate.avatar = payload.data.url;
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }

    }

    return <Dialog >
        <DialogTrigger asChild>
            <Button className="cursor-pointer" size="sm">Create Account</Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
            <DialogHeader>
                <DialogTitle>Create Account</DialogTitle>
                <DialogDescription>
                    Name, email, and password are required.
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form noValidate onSubmit={form.handleSubmit(onSubmit, (errors) => {
                    console.warn(errors)
                })}>
                    <div className='grid gap-6 mb-6'>
                        <FormField
                            control={form.control}
                            name='avatar'
                            render={({ field }) => (
                                <FormItem>
                                    <div className='flex gap-2 items-start justify-start'>
                                        <Avatar className='aspect-square w-[100px] h-[100px] rounded-md object-cover'>
                                            <AvatarImage src={previewAvatar} />
                                            <AvatarFallback className='rounded-none'>Upload</AvatarFallback>
                                        </Avatar>
                                        <input ref={avatarInputRef} type='file' accept='image/*' className='hidden' onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setFile(file);
                                                field.onChange(file);
                                            }
                                        }} />
                                        <button
                                            htmlFor='avatar'
                                            className='flex aspect-square w-[100px] items-center justify-center rounded-md border border-dashed'
                                            type='button'
                                            onClick={() => avatarInputRef.current.click()}
                                        >
                                            <Upload className='h-4 w-4 text-muted-foreground' />
                                            <span className='sr-only'>Upload</span>
                                        </button>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <div className='grid gap-3'>
                                        <Label htmlFor='name'>Name</Label>
                                        <Input id='name' type='text' className='w-full' {...field} />
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
                                    <div className='grid gap-3'>
                                        <Label htmlFor='email'>Email</Label>
                                        <Input id='email' type='email' className='w-full' {...field} />
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
                                        <Label htmlFor='password'>Password</Label>
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
                                        <Label htmlFor='confirmPassword'>Confirm Password</Label>
                                        <Input id='confirmPassword' type='password' className='w-full' {...field} />
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button className="cursor-pointer" variant='outline'>Cancel</Button>
                        </DialogClose>
                        <Button className="cursor-pointer" type='submit' disabled={isLoading || !form.formState.isDirty}>
                            {isLoading ? <Loader2Icon className="animate-spin" /> : "Create"}
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    </Dialog>;
};

export default AddAccount;