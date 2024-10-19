"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { useToast } from "../../../hooks/use-toast";

const UserLogin = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        toast({
          title: "Successs!",
          description: "Loggin you in!",
        });
        router.push("/user/dashboard");
      }
    } catch (error) {
      toast({
        variant: "desctructive",
        title: "Error logging in!",
      });
      setError(
        error.response?.data?.message || "Login failed, please try again."
      );
    }
  };

  return (
    <div className="flex flex-row justify-center items-center h-[100vh]">
      <Card className="">
        <CardHeader>
          <h2 className="text-3xl font-bold">User Login</h2>
        </CardHeader>
        <CardContent className="flex flex-col gap-10">
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
            <Button type="submit">Login</Button>
          </form>
        </CardContent>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </Card>
    </div>
  );
};

export default UserLogin;
