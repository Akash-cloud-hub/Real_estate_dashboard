"use client";

import React, { use } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Plus, Mail, ShieldCheck, UserPlus, Sparkles, X, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { sendBulkInvites } from "@/action/user"; // Your Server Action

// ... Schema definition from above ...

const InviteSchema = z.object({
  invites: z.array(
    z.object({
      email: z.string().email("Please enter a valid email address"),
      role: z.string().min(1, "Please select a role"),
    })
  ).min(1, "At least one invitation is required"),
});

export default function InviteTeam({ params }: { params: Promise<{ id: string }> }) {
  const { id: businessId } = use(params);
  
  const form = useForm<z.infer<typeof InviteSchema>>({
    resolver: zodResolver(InviteSchema),
    defaultValues: {
      invites: [{ email: "", role: "agent" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "invites",
  });

  const onSubmit = async (data: z.infer<typeof InviteSchema>) => {
    try {
      // Assuming adminId is 1 for now, replace with your actual session user ID
      const result = await sendBulkInvites(parseInt(businessId), 1, data.invites);
      
      if (result.success) {
        toast.success(`Successfully sent ${result.count} invitations!`);
        form.reset();
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-4xl mx-auto p-6">
        
        {/* HEADER */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Invite your <span className="text-violet-600">experts.</span></h2>
            <p className="text-slate-500">Add team members to business ID: {businessId}</p>
          </div>
          <Button
            type="button"
            onClick={() => append({ email: "", role: "agent" })}
            variant="outline"
            className="rounded-full border-slate-200 hover:bg-violet-50"
          >
            <Plus className="mr-2 size-4" /> Add Another
          </Button>
        </div>

        {/* INVITE LIST */}
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex flex-col md:flex-row gap-4 p-4 bg-white border border-slate-100 rounded-2xl animate-in fade-in slide-in-from-bottom-2">
              
              {/* EMAIL */}
              <FormField
                control={form.control}
                name={`invites.${index}.email`}
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                        <Input {...field} placeholder="email@agency.com" className="pl-10 h-12 rounded-xl" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ROLE */}
              <FormField
                control={form.control}
                name={`invites.${index}.role`}
                render={({ field }) => (
                  <FormItem className="w-full md:w-48">
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 rounded-xl">
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="size-4 text-violet-500" />
                            <SelectValue />
                          </div>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="agent">Agent</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              {/* DELETE */}
              {fields.length > 1 && (
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={() => remove(index)}
                  className="text-slate-400 hover:text-red-500"
                >
                  <X className="size-5" />
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* CTA FOOTER */}
        <div className="mt-10 p-6 bg-violet-600 rounded-3xl text-white flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden group">
          <Sparkles className="absolute -right-4 -bottom-4 size-32 text-white/10" />
          <div className="relative z-10">
            <h3 className="text-xl font-bold">Ready to scale?</h3>
            <p className="opacity-80">You are about to invite {fields.length} users.</p>
          </div>
          <Button 
            disabled={form.formState.isSubmitting}
            className="bg-white text-violet-600 hover:bg-slate-50 rounded-full px-10 py-6 font-bold relative z-10"
          >
            {form.formState.isSubmitting ? <Loader2 className="animate-spin" /> : <UserPlus className="mr-2" />}
            Send Invites
          </Button>
        </div>
      </form>
    </Form>
  );
}