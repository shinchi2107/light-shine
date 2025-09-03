"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Form, FormField, FormItem, FormMessage } from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { Loader2Icon, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AccountUpdateBodySchema } from "@/src/schemaValidations/account.schema";
import { useMemo, useRef, useState, useEffect } from "react";
import { useAccountProfile, useUpdateAccountProfile } from "@/src/hooks/queries/useAccount";
import { useMediaUploadAvatar } from "@/src/hooks/queries/useMedia";
import { toast } from "sonner";

const UpdateProfileForm = () => {
    const [file, setFile] = useState(null);
    const avatarInputRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const { data: account, refetch: refetchAccountProfile } = useAccountProfile();
    const { mutateAsync: uploadAvatar } = useMediaUploadAvatar();
    const { mutateAsync: updateAccountProfile } = useUpdateAccountProfile();
    const form = useForm({
        resolver: zodResolver(AccountUpdateBodySchema),
        defaultValues: {
            name: "",
            avatar: undefined,
        },
    });

    useEffect(() => {
        if (account) {
            const { name, avatar } = account.payload.data;
            form.reset({
                name,
                avatar: avatar ?? undefined,
            });
        }
    }, [account]);

    const avatar = form.watch('avatar');

    const previewAvatar = useMemo(() => {
        if (file) {
            return URL.createObjectURL(file);
        }
        return avatar;
    }, [file, avatar]);

    const resetForm = () => {
        form.reset();
        setFile(null);
    }

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            let dataUpdate = {
                name: data.name,
            };
            if (data.avatar instanceof File) {
                let oldFileName = '';
                if (account?.payload?.data?.avatar) {
                    oldFileName = account?.payload?.data?.avatar.split("/").pop().split(".")[0];
                }
                if (data.avatar.name !== oldFileName) {
                    const formData = new FormData();
                    formData.append("avatar", data.avatar);
                    const { status, payload } = await uploadAvatar(formData);
                    if (status === 200) {
                        dataUpdate.avatar = payload.data.url;
                    }
                }
            }

            const { status } = await updateAccountProfile(dataUpdate);
            if (status === 200) {
                refetchAccountProfile();
                toast.success("Update profile successfully", {
                    position: "bottom-right",
                    duration: 1500,
                });
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form noValidate onReset={resetForm} onSubmit={form.handleSubmit(onSubmit, (errors) => {
                console.warn(errors)
            })}>
                <Card>
                    <CardHeader>
                        <CardTitle>Update Profile</CardTitle>
                        <CardDescription>Update your profile information</CardDescription>
                    </CardHeader>
                    <CardContent>

                        <div className='grid gap-6'>
                            <FormField
                                control={form.control}
                                name='avatar'
                                render={({ field }) => (
                                    <FormItem>
                                        <div className='flex gap-2 items-start justify-start'>
                                            <Avatar className='aspect-square w-[100px] h-[100px] rounded-md object-cover'>
                                                <AvatarImage src={previewAvatar} />
                                                <AvatarFallback className='rounded-none'>{account?.payload?.data?.name?.charAt(0)}</AvatarFallback>
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
                        </div>

                    </CardContent>
                    <CardFooter>
                        <div className=' items-center gap-2 md:ml-auto flex'>
                            <Button variant='outline' size='sm' type='reset' disabled={!form.formState.isDirty}>
                                Cancel
                            </Button>
                            <Button size='sm' type='submit' disabled={isLoading || !form.formState.isDirty}>
                                {isLoading ? <Loader2Icon className="animate-spin" /> : "Save"}
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </form>
        </Form >
    )
}

export default UpdateProfileForm;