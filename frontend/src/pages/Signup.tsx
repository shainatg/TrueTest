import { useState } from "react";
import {
  ArrowLeft,
  Home,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

function Signup() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [locality, setLocality] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    setMessage("");

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !age.trim() ||
      !gender ||
      !locality.trim() ||
      !address.trim() ||
      !contactNumber.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setMessage("Please complete all fields.");
      return;
    }

    const numericAge = Number(age);

    if (
      !Number.isInteger(numericAge) ||
      numericAge < 1 ||
      numericAge > 120
    ) {
      setMessage("Please enter a valid age.");
      return;
    }

    if (contactNumber.replace(/\D/g, "").length < 10) {
      setMessage("Please enter a valid contact number.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setMessage(
        "Password must be at least 6 characters."
      );
      return;
    }

    try {
      setLoading(true);

      const fullName =
        `${firstName.trim()} ${lastName.trim()}`;

      const { data, error } =
        await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              first_name: firstName.trim(),
              last_name: lastName.trim(),

              // Kept because the homepage currently
              // reads full_name after login.
              full_name: fullName,

              age: numericAge,
              gender,
              locality: locality.trim(),
              address: address.trim(),
              contact_number:
                contactNumber.trim(),
            },
          },
        });

      if (error) {
        setMessage(error.message);
        return;
      }

      if (data.session) {
        setMessage(
          "Account created successfully."
        );

        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setMessage(
          "Account created successfully. Please check your email and confirm your account before logging in."
        );
      }
    } catch (error) {
      console.error(error);

      setMessage(
        "Something went wrong. Please try again."
      );
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
        <div className="w-full max-w-2xl rounded-3xl border border-emerald-100 bg-white p-8 shadow-xl shadow-emerald-900/5">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#edf5ef] text-[#58775e]">
              <UserRound size={27} />
            </div>

            <h1 className="mt-5 text-3xl font-bold text-[#203f32]">
              Create account
            </h1>

            <p className="mt-2 text-slate-500">
              Create your TrueTest account.
            </p>
          </div>

          {/* FIRST NAME + LAST NAME */}

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-slate-600">
                First name
              </label>

              <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-300 px-4">
                <UserRound
                  size={18}
                  className="text-slate-400"
                />

                <input
                  type="text"
                  value={firstName}
                  onChange={(event) =>
                    setFirstName(
                      event.target.value
                    )
                  }
                  placeholder="Enter first name"
                  className="w-full py-3 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-600">
                Last name
              </label>

              <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-300 px-4">
                <UserRound
                  size={18}
                  className="text-slate-400"
                />

                <input
                  type="text"
                  value={lastName}
                  onChange={(event) =>
                    setLastName(
                      event.target.value
                    )
                  }
                  placeholder="Enter last name"
                  className="w-full py-3 outline-none"
                />
              </div>
            </div>
          </div>

          {/* AGE + GENDER */}

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-slate-600">
                Age
              </label>

              <input
                type="number"
                min="1"
                max="120"
                value={age}
                onChange={(event) =>
                  setAge(event.target.value)
                }
                placeholder="Enter age"
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#6f8f72]"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-600">
                Gender
              </label>

              <select
                value={gender}
                onChange={(event) =>
                  setGender(event.target.value)
                }
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#6f8f72]"
              >
                <option value="">
                  Select gender
                </option>

                <option value="Female">
                  Female
                </option>

                <option value="Male">
                  Male
                </option>

                <option value="Other">
                  Other
                </option>

                <option value="Prefer not to say">
                  Prefer not to say
                </option>
              </select>
            </div>
          </div>

          {/* LOCALITY */}

          <div className="mt-5">
            <label className="text-sm font-semibold text-slate-600">
              Locality
            </label>

            <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-300 px-4">
              <MapPin
                size={18}
                className="text-slate-400"
              />

              <input
                type="text"
                value={locality}
                onChange={(event) =>
                  setLocality(event.target.value)
                }
                placeholder="Example: Banjara Hills"
                className="w-full py-3 outline-none"
              />
            </div>
          </div>

          {/* ADDRESS */}

          <div className="mt-5">
            <label className="text-sm font-semibold text-slate-600">
              Address
            </label>

            <div className="mt-2 flex gap-3 rounded-xl border border-slate-300 px-4">
              <Home
                size={18}
                className="mt-3.5 shrink-0 text-slate-400"
              />

              <textarea
                value={address}
                onChange={(event) =>
                  setAddress(event.target.value)
                }
                placeholder="Enter full address"
                className="min-h-24 w-full py-3 outline-none"
              />
            </div>
          </div>

          {/* CONTACT NUMBER */}

          <div className="mt-5">
            <label className="text-sm font-semibold text-slate-600">
              Contact number
            </label>

            <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-300 px-4">
              <Phone
                size={18}
                className="text-slate-400"
              />

              <input
                type="tel"
                value={contactNumber}
                onChange={(event) =>
                  setContactNumber(
                    event.target.value
                  )
                }
                placeholder="Enter contact number"
                className="w-full py-3 outline-none"
              />
            </div>
          </div>

          {/* EMAIL */}

          <div className="mt-5">
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

          {/* PASSWORD */}

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
                  setPassword(
                    event.target.value
                  )
                }
                placeholder="Create password"
                className="w-full py-3 outline-none"
              />
            </div>
          </div>

          {/* CONFIRM PASSWORD */}

          <div className="mt-5">
            <label className="text-sm font-semibold text-slate-600">
              Confirm password
            </label>

            <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-300 px-4">
              <LockKeyhole
                size={18}
                className="text-slate-400"
              />

              <input
                type="password"
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(
                    event.target.value
                  )
                }
                placeholder="Confirm password"
                className="w-full py-3 outline-none"
              />
            </div>
          </div>

          {/* MESSAGE */}

          {message && (
            <div className="mt-5 rounded-xl bg-[#f1f7f1] px-4 py-3 text-sm text-[#315c47]">
              {message}
            </div>
          )}

          {/* CREATE ACCOUNT */}

          <button
            type="button"
            onClick={handleSignup}
            disabled={loading}
            className="mt-7 w-full rounded-xl bg-[#315c47] py-3.5 font-semibold text-white transition hover:bg-[#274c3b] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Creating account..."
              : "Create account"}
          </button>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() =>
                navigate("/login")
              }
              className="font-semibold text-[#315c47]"
            >
              Log in
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Signup;