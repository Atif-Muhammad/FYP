import React, { useState } from "react";
import { Mail, Lock, Loader } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { signin } from "../../config/apis";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const { mutate, isPending } = useMutation({
    mutationFn: () => signin({ email, password }),
    onSuccess: (data) => {
      console.log("Signed in:", data);
    
    },
    onError: (err) => {
      console.error("Sign in failed:", err);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    mutate();
  };

  const isDisabled = !email || !password || isPending;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 animate-fadeIn">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-6 animate-slideDown">
          Sign In
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute top-3 left-3 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute top-3 left-3 text-gray-400" size={20} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isDisabled}
            className={`w-full py-2 rounded-xl font-semibold text-white transition-all duration-200 
              ${isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-[#101828] hover:bg-[#101828eb]"}`}
          >
            {isPending ? (
              <div className="flex items-center justify-center gap-2">
                <Loader className="animate-spin w-5 h-5" />
                Signing In...
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Auth;
