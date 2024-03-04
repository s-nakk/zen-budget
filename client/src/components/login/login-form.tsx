'use client';
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {zodResolver} from "@hookform/resolvers/zod";
import {useFormState} from 'react-dom';
import * as z from "zod"
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {ExclamationCircleIcon} from "@heroicons/react/16/solid";
import {authenticate} from "@/lib/actions/auth-actions";
import {format} from "@/lib/utils/utils";
import {ValidateError} from "@/lib/constants/validate-error-messages";

const FormSchema = z.object({
  email: z.string().email(format(ValidateError.INCORRECT_FORMAT_1, "メールアドレス"))
    .min(4, format(ValidateError.DIGITS_UNDER_1, 4)).max(40, format(ValidateError.DIGITS_OVER_1, 40)),
  password: z.string().min(6, format(ValidateError.DIGITS_UNDER_ALPHANUMERIC_1, 6)).max(40, format(ValidateError.DIGITS_OVER_ALPHANUMERIC_1, 40)),
});

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  })

  return (
    <Form {...form} key={"login-form"}>
      <form action={dispatch}>
        <FormField
          control={form.control}
          name="email"
          render={({field}) => (
            <FormItem className="flex-row items-center justify-center rounded-md py-[9px] pl-10 ">
              <FormLabel>メールアドレス</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="example@mail.com"
                  autoComplete={"on"}
                  required={true}
                  {...field}
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({field}) => (
            <FormItem className="flex-row items-center justify-center rounded-md py-[9px] pl-10 ">
              <FormLabel>パスワード</FormLabel>
              <FormControl>
                <Input type="password" placeholder="英数字(6桁以上)" required={true} autoComplete={"on"} {...field}
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <div className="flex justify-center items-center">
          <Button type="submit" className="my-3" size="lg">ログイン</Button>
        </div>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500"/>
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </form>
    </Form>
  )
}
