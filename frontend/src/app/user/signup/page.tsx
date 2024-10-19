"use client";
import { useState } from "react";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, role: "user" }),
      });
      const data = await res.json();
      if (data?.token) {
        localStorage.setItem("token", data?.token);
        router.push("/user/dashboard");
      }
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="h-[100vh] flex flex-col justify-center items-center">
      <Card className="">
        <CardHeader>
          <h2 className="text-3xl font-bold">Sign Up</h2>
        </CardHeader>
        <form onSubmit={handleSignup}>
          <CardContent className="flex flex-col gap-5 ">
            <Input
              type="text"
              placeholder="Name"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
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
            <Button type="submit">Sign Up</Button>
          </CardContent>
        </form>
      </Card>
    </div>
  );
};

export default Signup;
