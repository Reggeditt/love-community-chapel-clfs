'use client'

import { GalleryVerticalEnd } from "lucide-react";
import { LoginForm } from "@/components/login/login-form";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { Appconfig } from "@/app.config";

export default function LoginPage() {
  // useEffect(() => {
  //   if (auth.currentUser) {
  //     redirect("/dashboard");
  //   }
  // }, [auth.currentUser]);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href={Appconfig.routes.index}
          className="flex items-center gap-2 self-center font-medium"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          {Appconfig.constants.appName}
        </Link>
        <LoginForm />
      </div>
    </div>
  );
}
