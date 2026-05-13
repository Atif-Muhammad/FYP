import { useState, useEffect } from "react";
import { Mail, Lock, Loader, ChevronRight } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signin, userWho } from "../../config/apis";
import logo from "../assets/logo.png";

function Auth() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const queryClient = useQueryClient();

  // Pre-warm the Render server the moment the login page appears.
  // Render free tier sleeps after 15 min — this fires a cheap request
  // so the server is awake by the time the user fills in credentials.
  useEffect(() => {
    userWho().catch(() => {});
  }, []);

  const { mutate, isPending } = useMutation({
    mutationFn: () => signin({ email, password }),
    onSuccess: () => {
      sessionStorage.removeItem("fyp_logout");
      // Directly update the cache instead of doing a full page reload.
      // App.jsx re-renders immediately — no second userWho round-trip needed.
      queryClient.setQueryData(["currentUser"], true);
    },
    onError: () => {
      setErrorMsg("Invalid email or password. Please try again.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || isPending) return;
    setErrorMsg("");
    mutate();
  };

  const isDisabled = !email || !password || isPending;

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "Inter, sans-serif" }}>

      {/* ── Left branding panel (desktop only) ── */}
      <div
        className="hidden lg:flex flex-col justify-between w-[45%] p-14 relative overflow-hidden"
        style={{ background: "var(--color-bg-dark)" }}
      >
        {/* Decorative gold rings */}
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full"
          style={{ border: "1px solid rgba(212,175,55,0.12)" }}
        />
        <div
          className="absolute -top-16 -right-16 w-64 h-64 rounded-full"
          style={{ border: "1px solid rgba(212,175,55,0.08)" }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-[28rem] h-[28rem] rounded-full"
          style={{ border: "1px solid rgba(212,175,55,0.08)" }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full"
          style={{ border: "1px solid rgba(212,175,55,0.06)" }}
        />

        {/* Logo mark */}
        <div className="flex items-center gap-3 relative z-10">
          <div
            className="w-10 h-10 rounded-full overflow-hidden ring-1 shrink-0"
            style={{ ringColor: "rgba(212,175,55,0.4)" }}
          >
            <img src={logo} alt="Federal Youth Parliament" className="w-full h-full object-cover" />
          </div>
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.5)" }}>
            Federal Youth Parliament
          </span>
        </div>

        {/* Main copy */}
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-px w-8" style={{ background: "var(--color-accent)" }} />
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--color-accent)" }}>
              Admin Panel
            </span>
          </div>
          <h1
            className="text-5xl font-bold leading-tight"
            style={{ color: "white", letterSpacing: "-0.03em" }}
          >
            Manage.<br />
            Govern.<br />
            <span style={{ color: "var(--color-accent)" }}>Lead.</span>
          </h1>
          <p className="text-base leading-relaxed max-w-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
            One secure workspace to manage members, events, achievements, and all operations of the Federal Youth Parliament.
          </p>
        </div>

        {/* Footer */}
        <div className="relative z-10">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
            © {new Date().getFullYear()} Federal Youth Parliament. All rights reserved.
          </p>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div
        className="flex-1 flex flex-col items-center justify-center p-8 relative"
        style={{ background: "var(--color-bg-base)" }}
      >
        {/* Subtle top-right accent */}
        <div
          className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(1,68,33,0.05) 0%, transparent 70%)",
            transform: "translate(30%, -30%)",
          }}
        />

        <div className="w-full max-w-sm relative z-10">

          {/* Mobile-only logo */}
          <div className="flex flex-col items-center mb-10 lg:hidden">
            <img src={logo} alt="FYP" className="w-14 h-14 rounded-full object-cover ring-2 mb-3"
                 style={{ ringColor: "var(--color-accent)" }} />
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--color-accent)" }}>
              Federal Youth Parliament
            </p>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h2
              className="text-3xl font-bold mb-1.5"
              style={{ color: "var(--color-text-primary)", letterSpacing: "-0.025em" }}
            >
              Welcome back
            </h2>
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
              Sign in to your admin account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-xs font-semibold uppercase tracking-wide"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Email address
              </label>
              <div className="relative">
                <Mail
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: "var(--color-text-muted)" }}
                />
                <input
                  id="email"
                  type="email"
                  placeholder="admin@fyp.gov.pk"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrorMsg(""); }}
                  required
                  autoComplete="email"
                  className="fyp-input"
                  style={{ paddingLeft: "2.5rem" }}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="text-xs font-semibold uppercase tracking-wide"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: "var(--color-text-muted)" }}
                />
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrorMsg(""); }}
                  required
                  autoComplete="current-password"
                  className="fyp-input"
                  style={{ paddingLeft: "2.5rem" }}
                />
              </div>
            </div>

            {/* Error message */}
            {errorMsg && (
              <div
                className="flex items-start gap-2 px-3.5 py-2.5 rounded-lg text-xs font-medium"
                style={{ background: "var(--color-danger-light)", color: "var(--color-danger)" }}
              >
                {errorMsg}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isDisabled}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200 mt-2"
              style={{
                background: isDisabled
                  ? "var(--color-border)"
                  : "linear-gradient(135deg, var(--color-fyp-green) 0%, var(--color-fyp-green-light) 100%)",
                color: isDisabled ? "var(--color-text-muted)" : "white",
                boxShadow: isDisabled ? "none" : "0 4px 14px rgba(1,68,33,0.35)",
                cursor: isDisabled ? "not-allowed" : "pointer",
                transform: "translateY(0)",
              }}
              onMouseEnter={(e) => {
                if (!isDisabled) e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {isPending ? (
                <>
                  <Loader className="animate-spin w-4 h-4" />
                  Signing in…
                </>
              ) : (
                <>
                  Sign In
                  <ChevronRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Bottom badge */}
          <div className="flex items-center justify-center gap-2 mt-10">
            <div className="h-px flex-1" style={{ background: "var(--color-border)" }} />
            <span className="text-xs px-3" style={{ color: "var(--color-text-muted)" }}>
              Secure admin access
            </span>
            <div className="h-px flex-1" style={{ background: "var(--color-border)" }} />
          </div>
        </div>
      </div>

    </div>
  );
}

export default Auth;
