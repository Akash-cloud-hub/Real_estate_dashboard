"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import {
  Check,
  ChevronsUpDown,
  Building2,
  Globe2,
  Briefcase,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
import { Badge } from "@/components/ui/badge";

import { BusinessSchema } from "@/schema/Validations";
import { industries } from "@/models/constants";
import { EditBusiness, fetchBusinessById } from "@/action/user";
import { Business } from "@/models/master";
import { User } from "@/models/types";

export default function SaveUser({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = React.use(params);
  const { id } = unwrappedParams;
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const form = useForm<z.infer<typeof BusinessSchema>>({
    resolver: zodResolver(BusinessSchema),
    defaultValues: {
      business_name: "",
      country: "",
      industry: [],
    },
  });

  React.useEffect(() => {
      const loadUser = async () => {
        console.log("Loading business with ID 1111111111111111111111:", id);
        if (id !== "NEW") {
          try {
            const req: Business[] = await fetchBusinessById(parseInt(id));
            
            if (req && req.length > 0) {
              const dbData = req[0];
              
              // --- CRITICAL STEP: SANITIZE DATA ---
              // We create a clean object that perfectly matches what the UI expects.
              // This handles nulls and formats the complex 'industry' object.
              
              const formattedData = {
                business_name: dbData.business_name || "", // Fallback to "" if null
                country: dbData.country || "",             // Fallback to "" if null
                
                // Handle Industry: Ensure it is ALWAYS an array of objects
                industry: Array.isArray(dbData.industry) 
                  ? dbData.industry 
                  : dbData.industry 
                    ? [{ industry: dbData.industry }] // If it's a string, wrap it
                    : [], // If it's null/empty, use empty array
              };

              console.log("Resetting form with:", formattedData);
              
              // Force the form to accept this new structure
              form.reset(formattedData);
            }
          } catch (error) {
            console.error("Error fetching business:", error);
            toast.error("Could not load business details.");
          }
        }
      };
      
      loadUser();
    }, [id]);

  const onSubmit = async (data: z.infer<typeof BusinessSchema>) => {
    setIsSubmitting(true);
    try {
      const result = await EditBusiness(data);
      const business_id = parseInt(result);
      toast.success(id === "NEW" ? "Business created!" : "Business updated!");
      router.push(`/addUser/${business_id}`);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isNew = id === "NEW";

  return (
    <div className="min-h-screen bg-[#fafafa] relative flex items-center justify-center p-6 overflow-hidden">
      {/* --- DECORATIVE BACKGROUND --- */}
      <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-violet-200 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200 blur-[120px]" />
      </div>

      <div className="w-full max-w-[500px] relative z-10 animate-in fade-in zoom-in-95 duration-500">
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-[32px] shadow-2xl shadow-slate-200/60 overflow-hidden">
          {/* --- HEADER --- */}
          <div className="p-8 pb-4 text-center">
            <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 text-white shadow-lg mb-4">
              <Building2 className="size-7" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              {isNew ? "Create Business Profile" : "Edit Business Profile"}
            </h1>
            <p className="text-slate-500 text-sm mt-2">
              {isNew
                ? "Let's set up your agency workspace to start automating."
                : "Keep your agency information up to date."}
            </p>
          </div>

          <div className="px-8 pb-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                {/* BUSINESS NAME */}
                <FormField
                  control={form.control}
                  name="business_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-semibold flex items-center gap-2">
                        <Sparkles className="size-3.5 text-violet-500" />
                        Agency Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Echo Properties"
                          {...field}
                          value={field.value ?? ""}
                          className="h-12 border-slate-200 bg-slate-50/50 rounded-xl focus:ring-violet-500 focus:border-violet-500 transition-all"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* COUNTRY */}
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-semibold flex items-center gap-2">
                        <Globe2 className="size-3.5 text-violet-500" />
                        Operating Country
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Australia"
                          {...field}
                          value={field.value ?? ""}
                          className="h-12 border-slate-200 bg-slate-50/50 rounded-xl focus:ring-violet-500 focus:border-violet-500 transition-all"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* INDUSTRY COMBOBOX */}
                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-slate-700 font-semibold flex items-center gap-2 mb-1">
                        <Briefcase className="size-3.5 text-violet-500" />
                        Industry Sector
                      </FormLabel>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full h-12 justify-between rounded-xl border-slate-200 bg-slate-50/50 text-slate-700 hover:bg-slate-100 transition-all",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value && field.value.length > 0
                                ? field.value[0].industry
                                : "Select sector..."}
                              <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 rounded-xl shadow-xl border-slate-200">
                          <Command>
                            <CommandInput
                              placeholder="Search industries..."
                              className="h-11"
                            />
                            <CommandList>
                              <CommandEmpty>No industry found.</CommandEmpty>
                              <CommandGroup>
                                {industries.map((item) => (
                                  <CommandItem
                                    key={item.industry}
                                    value={item.industry}
                                    onSelect={() => {
                                      form.setValue("industry", [
                                        { industry: item.industry },
                                      ]);
                                      setOpen(false);
                                    }}
                                    className="py-3"
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 size-4 text-violet-600",
                                        field.value?.[0]?.industry ===
                                          item.industry
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {item.industry}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* SUBMIT BUTTON */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-violet-200 transition-all active:scale-[0.98] group"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Saving...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      {isNew ? "Launch Business" : "Update Profile"}
                      <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>

        {/* --- SECONDARY SECTION (Add Users etc) --- */}
        {/* Only show this if the business actually exists */}
        {!isNew && (
          <div className="mt-6 animate-in fade-in slide-in-from-top-4 duration-700 delay-200">
            <div className="bg-white/50 border border-white rounded-3xl p-1">
              <div className="bg-white border border-slate-100 rounded-[28px] p-6 shadow-sm">
                <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <div className="size-2 rounded-full bg-violet-500 animate-pulse" />
                  Live Configuration
                </h4>
                <div className="space-y-2">
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Currently editing business ID:{" "}
                    <span className="font-mono text-violet-600">{id}</span>. You
                    can now proceed to invite your team or configure AI voice
                    agents.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
