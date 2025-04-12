'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Form, Input } from "antd"
import { useAuth } from "@/hooks/contexts/authContext"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

export function LoginForm({className, ...props}) {
  const { signInUser } = useAuth()
  const [isVisible, setIsVisible] = useState(false)

  const handleLogin = (values) => {
    const { email, password } = values
    signInUser(email, password)
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Enter credentials to access your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form onFinish={handleLogin}>
            <Form.Item name={'email'} label="Email" rules={[{ required: true }]}>
              <Input placeholder={'example@mail.com'} />
            </Form.Item>
            <div className="grid gap-2">
              <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                Forgot your password?
              </a>
              <Form.Item name={'password'} label="Password" rules={[{ required: true }]}>
                <div className="flex items-center gap-2">
                  <Input type={isVisible? 'text': 'password'} />
                    {isVisible? <EyeOff onClick={()=> setIsVisible(!isVisible)} />:<Eye onClick={()=> setIsVisible(!isVisible)}/>}
                </div>
              </Form.Item>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="#" className="underline underline-offset-4">
                  request access
                </a>
              </div>
            </div>
          </Form>
        </CardContent>
      </Card>
      <div
        className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
