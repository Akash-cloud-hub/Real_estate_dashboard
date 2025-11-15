"use client";
import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserSchema } from "@/schema/Validations";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { roles } from "@/models/constants";
import { EditUser, fetchUsersById } from "@/action/user";
import { User } from "@/models/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SaveUser({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = React.use(params);
  const { id } = unwrappedParams;

  React.useEffect(() => {
    console.log(id);
    // fetch user by id and set as default value
    const fetchUser = async () => {
      if (id !== "NEW") {
        const res: User[] = await fetchUsersById(parseInt(id));
        const user: User = res[0];
        console.log(user);
        form.reset(user as User as z.infer<typeof UserSchema>);
      }
    };

    fetchUser();
    toast.success("User loaded");
  }, [id]);

  const router = useRouter();
  const onSubmit = async (data: z.infer<typeof UserSchema>) => {
    console.log("Submitting", data);
    await EditUser(data);
    toast.success("User saved");
    router.push(`/`);
  };

  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      username: "",
      email: "",
      mobile_number: "",
      role: [],
    },
  });

  const {formState:{errors}} = form;
  

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <div>
      {/* Create a form to create a new user using zod */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        {Object.keys(errors).length > 0 && (
            <div className="text-red-500">
              <h3 className="font-bold">Validation Errors:</h3>
              <ul>
                {Object.entries(errors).map(([field, error]) => (
                  <li key={field}>
                    <strong>{field}:</strong> {error?.message as string}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Joe" {...field} />
                </FormControl>
                {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="joe25.success@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mobile_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile Number</FormLabel>
                <FormControl>
                  <Input placeholder="0917281739" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile Number</FormLabel>
                <FormControl>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                      >
                        {field.value
                          ? roles.find(
                              (role) => role.role === field.value[0]?.role
                            )?.role
                          : "Select a role..."}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search Role..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No framework found.</CommandEmpty>
                          <CommandGroup>
                            {roles.map((role) => (
                              <CommandItem
                                key={role.role}
                                value={role.role}
                                onSelect={(currentValue) => {
                                  form.setValue("role", [
                                    { role: currentValue },
                                  ]);
                                  setOpen(false);
                                }}
                              >
                                {role.role}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    value === role.role
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
