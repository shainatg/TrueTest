import { useState } from "react";
import {
  ArrowLeft,
  LockKeyhole,
  Mail,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    setMessage("");

    if (!email.trim() || !password.trim()) {
      setMessage("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const { data, error } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (error) {
        setMessage(error.message);
        return;
      }

      if (data.user) {
        setMessage("Login successful.");

        setTimeout(() => {
          navigate("/");
        }, 700);
      }
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fbf8] text-slate-800">
      <header className="border-b border-emerald-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 font-semibold text-[#315c47]"
          >
            <ArrowLeft size={19} />
            Back to Home
          </button>

          <p className="text-xl font-bold text-[#274c3b]">
            TrueTest
          </p>
        </div>
      </header>

      <main className="flex min-h-[calc(100vh-74px)] items-center justify-center px-5 py-12">
        <div className="w-full max-w-md rounded-3xl border border-emerald-100 bg-white p-8 shadow-xl shadow-emerald-900/5">

          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#edf5ef] text-[#58775e]">
              <LockKeyhole size={27} />
            </div>

            <h1 className="mt-5 text-3xl font-bold text-[#203f32]">
              Welcome back
            </h1>

            <p className="mt-2 text-slate-500">
              Log in to your TrueTest account.
            </p>
          </div>

          <div className="mt-8">
            <label className="text-sm font-semibold text-slate-600">
              Email address
            </label>

            <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-300 px-4">
              <Mail
                size={18}
                className="text-slate-400"
              />

              <input
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="Enter your email"
                className="w-full py-3 outline-none"
              />
            </div>
          </div>

          <div className="mt-5">
            <label className="text-sm font-semibold text-slate-600">
              Password
            </label>

            <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-300 px-4">
              <LockKeyhole
                size={18}
                className="text-slate-400"
              />

              <input
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="Enter your password"
                className="w-full py-3 outline-none"
              />
            </div>
          </div>

          {message && (
            <div className="mt-5 rounded-xl bg-[#f1f7f1] px-4 py-3 text-sm text-[#315c47]">
              {message}
            </div>
          )}

          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            className="mt-7 w-full rounded-xl bg-[#315c47] py-3.5 font-semibold text-white transition hover:bg-[#274c3b] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="font-semibold text-[#315c47]"
            >
              Create account
            </button>
          </p>

        </div>
      </main>
    </div>
  );
}

export default Login;