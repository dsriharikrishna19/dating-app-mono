import AuthForm from "@/components/auth/AuthForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-background relative overflow-hidden">
      <Link 
        href="/" 
        className="absolute top-10 left-10 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
      >
        <ChevronLeft className="size-5" />
        <span className="text-sm font-semibold">Back to Home</span>
      </Link>

      <AuthForm type="login" />
      
      <p className="mt-8 text-slate-500 text-sm">
        Don't have an account?{" "}
        <Link href="/register" className="text-primary font-bold hover:underline decoration-2 underline-offset-4">
          Register now
        </Link>
      </p>
    </div>
  );
}
