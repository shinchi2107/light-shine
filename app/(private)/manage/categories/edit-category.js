"use client";

import { Button } from "@/src/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/src/components/ui/dialog";
import { Form, FormField, FormItem, FormMessage } from "@/src/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { Loader2Icon, Upload } from "lucide-react";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { useFindCategoryById, useGetAllCategories, useUpdateCategoryById } from "@/src/hooks/queries/useCategory";
import { useMediaUploadAvatar } from "@/src/hooks/queries/useMedia";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { CategoryUpdateBodySchema } from "@/src/schemaValidations/category.schema";

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

const EditCategory = ({
  id,
  setId
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);
  const search = searchParams.get("search") ?? "";
  const { refetch: refetchAllCategories } = useGetAllCategories({ page, limit: 2, search });
  const { mutateAsync: updateCategoryById } = useUpdateCategoryById({ id });
  const { mutateAsync: uploadAvatar } = useMediaUploadAvatar();
  const { data: category, refetch: refetchCategory } = useFindCategoryById({ id });
  const [file, setFile] = useState(null);
  const imageInputRef = useRef(null);
  const form = useForm({
    resolver: zodResolver(CategoryUpdateBodySchema),
    defaultValues: {
      name: '',
      description: '',
      image: '',
    }
  })

  useEffect(() => {
    if (category) {
      const { name, image, description } = category.payload.data;
      form.reset({
        name,
        image: image ?? '',
        description,
      });
    }
  }, [category]);

  const image = form.watch('image');

  const previewImage = useMemo(() => {
    if (file) {
      return URL.createObjectURL(file);
    }
    return image;
  }, [file, image]);



  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      let dataUpdate = {
        ...data
      };
      if (data.image instanceof File) {
        const formData = new FormData();
        formData.append("avatar", data.image);
        const { status, payload } = await uploadAvatar(formData);
        if (status === 200) {
          dataUpdate.image = payload.data.url;
        }
      }
      const { status } = await updateCategoryById(dataUpdate);
      if (status === 200) {            
        refetchAllCategories();
        refetchCategory();
        toast.success("Update category successfully", {
          position: "bottom-right",
          duration: 1500,
        });
      }
    } catch (error) {
      if (error?.payload?.error) {
        const { errors } = error.payload.error;
        console.log(JSON.stringify(errors));
        toast.error(errors.message);
      }
    } finally {
      setIsLoading(false);
    }

  }

  const reset = () => {
    form.reset();
    setFile(null);
    setId(null);
  }

  return <Dialog open={Boolean(id)} onOpenChange={(value) => {
    if (!value) {
      reset();
    }
  }}>

    <DialogContent className="max-w-3xl">
      <DialogHeader>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogDescription>
          Name is required.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form noValidate onSubmit={form.handleSubmit(onSubmit, (errors) => {
          console.warn(errors)
        })}>
          <div className='grid gap-6 mb-6'>
            <FormField
              control={form.control}
              name='image'
              render={({ field }) => (
                <FormItem>
                  <div className='flex gap-2 items-start justify-start'>
                    <Avatar className='aspect-square w-[100px] h-[100px] rounded-md object-cover'>
                      <AvatarImage src={previewImage} />
                      <AvatarFallback className='rounded-none'>Upload</AvatarFallback>
                    </Avatar>
                    <input ref={imageInputRef} type='file' accept='image/*' className='hidden' onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setFile(file);
                        field.onChange(file);
                      }
                    }} />
                    <button
                      htmlFor='image'
                      className='flex aspect-square w-[100px] items-center justify-center rounded-md border border-dashed'
                      type='button'
                      onClick={() => imageInputRef.current.click()}
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
              name='description'
              render={({ field }) => (
                <FormItem>
                  <div className='grid gap-3'>
                    <Label htmlFor='description'>Description</Label>
                    <Input id='description' type='text' className='w-full' {...field} />
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
              {isLoading ? <Loader2Icon className="animate-spin" /> : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  </Dialog>;
};

export default EditCategory;