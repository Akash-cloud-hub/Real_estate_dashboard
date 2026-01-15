// app/access-denied/page.tsx
import { SignOutButton } from "@clerk/nextjs";
import { ShieldAlert } from "lucide-react";

export default function AccessDenied() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-slate-50">
      <div className="size-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6">
        <ShieldAlert className="size-10" />
      </div>
      <h1 className="text-3xl font-bold text-slate-900">Access Restricted</h1>
      <p className="text-slate-500 mt-4 max-w-md text-lg">
        This portal is for invited clients only. Your email address is not currently on our authorized list.
      </p>
      
      <div className="mt-8 flex flex-col gap-4">
        <SignOutButton>
          <button className="px-6 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors">
            Sign out and try another account
          </button>
        </SignOutButton>
        
        <a href="mailto:support@youragency.com" className="text-violet-600 font-medium hover:underline">
          Contact support if you believe this is an error
        </a>
      </div>
    </div>
  );
}