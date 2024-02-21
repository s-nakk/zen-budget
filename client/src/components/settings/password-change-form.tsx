'use client'

import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import React, {useState} from "react";
import {Input} from "@/components/ui/input";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {savePassword} from "@/lib/actions/profile-actions";
import {PasswordChangeSchema} from "@/lib/types/schemata";
import {useToast} from "@/components/ui/use-toast";
import {Messages} from "@/lib/constants/messages";
import ExecutingOverlay from "@/components/share/executing-overlay";

export default function PasswordChangeForm() {
  const [isExecuting, setIsExecuting] = useState(false);
  const form = useForm<z.infer<typeof PasswordChangeSchema>>({
    resolver: zodResolver(PasswordChangeSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      newPasswordConfirm: ""
    },
    mode: "onChange",
  });
  const {toast} = useToast();

  const onSubmit = async (data: z.infer<typeof PasswordChangeSchema>) => {
    setIsExecuting(true);
    const result = await savePassword(data);
    toast({
      title: result.title,
      variant: result.success ? "default" : "destructive",
      description: result.message
    })
    setIsExecuting(false);
    form.reset();
  };

  return (
    <div className="relative">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="relative">
            <CardHeader>
              <CardTitle>パスワード変更</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <FormField control={form.control} name="currentPassword" render={({field}) => (
                <FormItem>
                  <FormLabel>現在のパスワード</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      required={true}
                      disabled={isExecuting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>
              <FormField control={form.control} name="newPassword" render={({field}) => (
                <FormItem>
                  <FormLabel>新しいパスワード</FormLabel>
                  <FormControl
                    onBlur={() => form.trigger(["newPassword", "newPasswordConfirm"])}>
                    <Input
                      type="password"
                      required={true}
                      disabled={isExecuting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>
              <FormField control={form.control} name="newPasswordConfirm" render={({field}) => (
                <FormItem>
                  <FormLabel>新しいパスワード(確認)</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      required={true}
                      disabled={isExecuting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>
            </CardContent>
            <CardFooter>
              <Button disabled={!form.formState.isValid || isExecuting}> 変更を保存 </Button>
            </CardFooter>
            {isExecuting && <ExecutingOverlay message={Messages.UPDATING}/>}
          </Card>
        </form>
      </Form>
    </div>
  );
}