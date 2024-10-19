"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { useToast } from "../../../hooks/use-toast";
import { Toast, ToastAction } from "../../../components/ui/toast";

const AdminLogin = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, role: "admin" }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        toast({
          title: "Success! ",
          description: "Loggin in",
        });
        router.push("/admin/dashboard");
      }
    } catch (error) {
      toast({
        variant: "desctructive",
        title: "Error llogging in",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div className="flex justify-center">
      <Card className=" flex flex-col items-center gap-5  ">
        <CardHeader>
          <h2>Admin Login</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <Input
              type="email"
              placeholder="Email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <Button type="submit">Login</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
