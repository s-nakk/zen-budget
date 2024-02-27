'use client'

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React, {useEffect, useState} from "react";
import {getUserById, saveUserInfo} from "@/lib/actions/profile-actions";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {UserInfoSchema} from "@/lib/types/schemata";
import {useToast} from "@/components/ui/use-toast";
import {AvatarDropZone} from "@/components/settings/avatar-drop-zone";
import useFetch from "@/lib/hooks/use-fetch";
import {createImageUrl} from "@/lib/utils/utils";
import {Messages} from "@/lib/constants/messages";
import {useSession} from "next-auth/react";
import ExecutingOverlay from "@/components/share/executing-overlay";

export default function UserInfoForm() {
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const {update} = useSession()
  const [isExecuting, setIsExecuting] = useState(false);
  const {fetchData, error, mutate} = useFetch('profile', () => getUserById());
  const form = useForm<z.infer<typeof UserInfoSchema>>({
    resolver: zodResolver(UserInfoSchema),
    defaultValues: {
      name: fetchData?.name || "", // dataがundefinedの場合は空文字列を設定
      email: fetchData?.email || "",
      avatar: null,
    },
    mode: "onChange",
  })
  const [file, setFile] = useState<File | null>(null);
  const {toast} = useToast();
  useEffect(() => {
    try {
      if (!fetchData) mutate();
    } catch (e) {
      toast({
        title: 'error',
        variant: 'destructive',
        description: error
      })
    } finally {
      setPreviewUrl(fetchData?.avatarPath);
      form.reset({
        name: fetchData?.name || "",
        email: fetchData?.email || "",
      });
    }
  }, [fetchData, mutate]);

  const selectFile = (newFile: File | null) => {
    setFile(newFile);
    form.setValue('avatar', newFile, {shouldDirty: true});
  }

  const onSubmit = async (data: z.infer<typeof UserInfoSchema>) => {
    setIsExecuting(true);
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    if (file)
      formData.append('avatar', file);
    const {user, detail} = await saveUserInfo(formData);
    if (user) {
      await update({
        email: user.email,
        name: user.name,
        avatarPath: user.avatarPath
      })
    }
    setIsExecuting(false);
    toast({
      title: detail.title,
      variant: detail.success ? "default" : "destructive",
      description: detail.message
    })
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="relative">
            <CardHeader>
              <CardTitle>ユーザー情報</CardTitle>
            </CardHeader>
            <CardContent className="group grid gap-2 relative">
              <div className="lg:absolute lg:w-1/3 inline-block top-0 right-2 ">
                <FormField
                  control={form.control}
                  name="avatar"
                  render={() => (
                    <FormItem>
                      <FormControl>
                        <AvatarDropZone file={file} selectFile={(newFile) => selectFile(newFile)}
                                        previewUrl={createImageUrl(previewUrl)}/>
                      </FormControl>
                    </FormItem>
                  )}/>
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({field,}) => (
                  <FormItem>
                    <FormLabel>ユーザー名</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        type="text"
                        className="lg:w-3/5"
                        required={true}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}/>
              <FormField
                control={form.control}
                name="email"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>メールアドレス</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        className="lg:w-3/5"
                        required={true}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}/>
            </CardContent>
            <CardFooter>
              <Button disabled={!form.formState.isValid || !form.formState.isDirty || isExecuting}>変更を保存</Button>
            </CardFooter>
            {isExecuting && <ExecutingOverlay message={Messages.UPDATING}/>}
          </Card>
        </form>
      </Form>
    </div>
  )
}