import HealthCard from "./pages/HealthCard";
import PriceComparison from "./pages/PriceComparison";
import HospitalFinder from "./pages/HospitalFinder";
import TestDetails from "./pages/TestDetails";
import DiseaseDetails from "./pages/DiseaseDetails";
import { useLocation, useNavigate } from "react-router-dom";
import Diseases from "./pages/Diseases";
import {
  Activity,
  ArrowRight,
  Building2,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  FileHeart,
  HeartPulse,
  Menu,
  Microscope,
  PhoneCall,
  Search,
  ShieldCheck,
  Stethoscope,
  TestTube2,
  X,
} from "lucide-react";
import { useState } from "react";

const features = [
  {
    title: "Disease Information",
    description:
      "Understand common diseases, symptoms, causes, prevention and treatment options.",
    icon: Stethoscope,
  },
  {
    title: "Medical Tests",
    description:
      "Learn why medical tests are performed, preparation requirements and result details.",
    icon: Microscope,
  },
  {
    title: "Compare Test Prices",
    description:
      "Compare estimated demonstration prices across hospitals and diagnostic centres.",
    icon: TestTube2,
  },
  {
    title: "Hospital Finder",
    description:
      "Find hospitals based on city, specialty, emergency services and test availability.",
    icon: Building2,
  },
  {
    title: "Symptom Guidance",
    description:
      "Receive safe general guidance and know which healthcare specialist to consult.",
    icon: HeartPulse,
  },
  {
    title: "Health Locker",
    description:
      "Store prescriptions, laboratory reports, vaccination records and health documents.",
    icon: FileHeart,
  },
  {
    title: "Health Reminders",
    description:
      "Create reminders for medicines, appointments, tests, vaccinations and follow-ups.",
    icon: CalendarClock,
  },
  {
    title: "Emergency Help",
    description:
      "Quickly access first-aid guidance and important emergency actions.",
    icon: PhoneCall,
  },
  {
  title: "Health Card",
  description:
    "Create a quick digital health summary and securely store personal and insurance card details.",
  icon: ShieldCheck,
},
];

const popularTests = [
  {
    name: "Complete Blood Count",
    shortName: "CBC",
    preparation: "No fasting required",
    price: "₹250 – ₹650",
  },
  {
    name: "HbA1c Test",
    shortName: "HbA1c",
    preparation: "No fasting required",
    price: "₹450 – ₹1,000",
  },
  {
    name: "Thyroid Function Test",
    shortName: "TFT",
    preparation: "Usually no fasting",
    price: "₹600 – ₹1,500",
  },
  {
    name: "Lipid Profile",
    shortName: "Lipid",
    preparation: "Fasting may be advised",
    price: "₹500 – ₹1,200",
  },
];

const commonConditions = [
  "Diabetes",
  "Hypertension",
  "Anaemia",
  "Asthma",
  "Migraine",
  "Hypothyroidism",
  "PCOS",
  "Dengue",
];

function App() { 
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    const value = searchText.trim();

    if (!value) {
      alert("Please enter a disease or medical test.");
      return;
    }

    alert(`Search feature will be connected next for: ${value}`);
  };
  if (location.pathname === "/hospital-finder") {
  return <HospitalFinder />;
}
if (location.pathname === "/price-comparison") {
  return <PriceComparison />;
}
if (location.pathname.startsWith("/test-details/")) {
  return <TestDetails />;
}
if (location.pathname.startsWith("/disease-details/")) {
  return <DiseaseDetails />;
}
if (location.pathname === "/diseases") {
  return <Diseases />;
}

if (location.pathname === "/health-card") {
  return <HealthCard />;
}
  return (
    <div className="min-h-screen bg-[#f8fbf8] text-slate-800">
      {/* Top information bar */}
      <div className="bg-[#274c3b] px-4 py-2 text-center text-sm text-white">
        Educational healthcare platform — not a substitute for professional
        medical diagnosis.
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-emerald-100 bg-white/95 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#6f8f72] text-white shadow-sm">
              <Activity size={25} strokeWidth={2.3} />
            </div>

            <div>
              <p className="text-xl font-bold tracking-tight text-[#274c3b]">
                TrueTest
              </p>
              <p className="text-xs text-slate-500">
                Health information made simple
              </p>
            </div>
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            <a
              href="#home"
              className="text-sm font-semibold text-[#315c47] hover:text-[#6f8f72]"
            >
              Home
            </a>

            <a
              href="#features"
              className="text-sm font-medium text-slate-600 hover:text-[#315c47]"
            >
              Services
            </a>

            <a
              href="#tests"
              className="text-sm font-medium text-slate-600 hover:text-[#315c47]"
            >
              Medical Tests
            </a>

           <button
  type="button"
  onClick={() => navigate("/diseases")}
  className="text-sm font-medium text-slate-600 hover:text-[#315c47]"
>
  Diseases
</button>
            <button className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-[#315c47]">
              More
              <ChevronDown size={16} />
            </button>
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <button className="rounded-xl border border-[#6f8f72] px-5 py-2.5 text-sm font-semibold text-[#315c47] transition hover:bg-emerald-50">
              Log in
            </button>

            <button className="rounded-xl bg-[#5f7f65] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#4d6d54]">
              Create account
            </button>
          </div>

          <button
            type="button"
            className="rounded-lg p-2 text-slate-700 lg:hidden"
            onClick={() => setMobileMenuOpen((current) => !current)}
            aria-label="Open navigation menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </nav>

        {mobileMenuOpen && (
          <div className="border-t border-emerald-100 bg-white px-5 py-5 lg:hidden">
            <div className="flex flex-col gap-4">
              <a href="#home" className="font-semibold text-[#315c47]">
                Home
              </a>
              <a href="#features" className="text-slate-700">
                Services
              </a>
              <a href="#tests" className="text-slate-700">
                Medical Tests
              </a>
              <a href="#conditions" className="text-slate-700">
                Diseases
              </a>

              <div className="mt-2 grid grid-cols-2 gap-3">
                <button className="rounded-xl border border-[#6f8f72] py-2.5 font-semibold text-[#315c47]">
                  Log in
                </button>
                <button className="rounded-xl bg-[#5f7f65] py-2.5 font-semibold text-white">
                  Sign up
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero */}
        <section
          id="home"
          className="relative overflow-hidden bg-gradient-to-br from-[#edf6ed] via-white to-[#e5f2ed]"
        >
          <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-[#c8ddc8]/60 blur-3xl" />
          <div className="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-[#d9eee6]/70 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-medium text-[#315c47] shadow-sm">
                <ShieldCheck size={17} />
                Reliable educational health guidance
              </div>

              <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-[#203f32] sm:text-5xl lg:text-6xl">
                Understand your health.
                <span className="block text-[#688d6b]">
                  Compare tests. Find care.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Explore disease information, understand medical tests, compare
                estimated prices and find suitable healthcare services through
                one simple platform.
              </p>

              <div className="mt-8 max-w-2xl rounded-2xl border border-emerald-100 bg-white p-2 shadow-lg shadow-emerald-900/5">
                <div className="flex flex-col gap-2 sm:flex-row">
                  <div className="flex flex-1 items-center gap-3 px-3">
                    <Search className="shrink-0 text-[#6f8f72]" size={22} />
                    <input
                      type="text"
                      value={searchText}
                      onChange={(event) => setSearchText(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          handleSearch();
                        }
                      }}
                      placeholder="Search a disease or medical test"
                      className="w-full bg-transparent py-3 text-base outline-none placeholder:text-slate-400"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleSearch}
                    className="rounded-xl bg-[#58775e] px-7 py-3.5 font-semibold text-white transition hover:bg-[#46654d]"
                  >
                    Search
                  </button>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <button className="flex items-center gap-2 rounded-xl bg-[#315c47] px-6 py-3.5 font-semibold text-white transition hover:bg-[#274c3b]">
                  Check symptoms
                  <ArrowRight size={18} />
                </button>

                <button className="rounded-xl border border-[#6f8f72] bg-white px-6 py-3.5 font-semibold text-[#315c47] transition hover:bg-emerald-50">
                  Compare test prices
                </button>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600">
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={17} className="text-[#6f8f72]" />
                  Simple health information
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={17} className="text-[#6f8f72]" />
                  Demonstration price comparison
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={17} className="text-[#6f8f72]" />
                  Emergency guidance
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[2rem] border border-white bg-white/85 p-6 shadow-2xl shadow-emerald-900/10 backdrop-blur">
                <div className="rounded-[1.5rem] bg-gradient-to-br from-[#315c47] to-[#789b76] p-7 text-white">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-emerald-100">
                        TrueTest Health Assistant
                      </p>
                      <h2 className="mt-2 text-2xl font-bold">
                        How can we help today?
                      </h2>
                    </div>

                    <div className="rounded-2xl bg-white/15 p-3">
                      <HeartPulse size={29} />
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-3">
                    {[
                      ["Explore diseases", Stethoscope],
                      ["Understand tests", TestTube2],
                      ["Find hospitals", Building2],
                      ["Emergency help", PhoneCall],
                    ].map(([label, Icon]) => {
                      const CardIcon = Icon as typeof Stethoscope;

                      return (
                        <button
                          key={label as string}
                          className="rounded-2xl bg-white/12 p-4 text-left transition hover:bg-white/20"
                        >
                          <CardIcon size={22} />
                          <p className="mt-3 text-sm font-semibold">
                            {label as string}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl bg-[#eff6ef] p-4">
                    <p className="text-2xl font-bold text-[#315c47]">50+</p>
                    <p className="mt-1 text-sm text-slate-600">
                      Disease records
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#edf5f3] p-4">
                    <p className="text-2xl font-bold text-[#315c47]">40+</p>
                    <p className="mt-1 text-sm text-slate-600">Medical tests</p>
                  </div>

                  <div className="rounded-2xl bg-[#f5f5eb] p-4">
                    <p className="text-2xl font-bold text-[#315c47]">5</p>
                    <p className="mt-1 text-sm text-slate-600">Indian cities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="features" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-semibold uppercase tracking-[0.18em] text-[#6f8f72]">
              Explore TrueTest
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#203f32] sm:text-4xl">
              Everything you need to make better-informed health decisions
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Access clear information and useful tools through one easy and
              patient-friendly platform.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="group rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-900/5"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e9f2e8] text-[#4d7356] transition group-hover:bg-[#5f7f65] group-hover:text-white">
                    <Icon size={24} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-[#294b3c]">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {feature.description}
                  </p>

                  <button className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#58775e]">
                    Explore
                    <ArrowRight
                      size={16}
                      className="transition group-hover:translate-x-1"
                    />
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        {/* Tests */}
        <section id="tests" className="bg-[#edf5ef] py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="font-semibold uppercase tracking-[0.18em] text-[#6f8f72]">
                  Popular tests
                </p>
                <h2 className="mt-3 text-3xl font-bold text-[#203f32]">
                  Understand common medical tests
                </h2>
                <p className="mt-3 max-w-2xl text-slate-600">
                  View test purpose, preparation, sample type and estimated
                  demonstration price ranges.
                </p>
              </div>

              <button className="flex items-center gap-2 font-semibold text-[#315c47]">
                View all tests
                <ArrowRight size={18} />
              </button>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {popularTests.map((test) => (
                <article
                  key={test.name}
                  className="rounded-3xl border border-white bg-white p-6 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf5ef] text-[#58775e]">
                      <TestTube2 size={23} />
                    </div>

                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      {test.shortName}
                    </span>
                  </div>

                  <h3 className="mt-5 font-bold text-[#294b3c]">{test.name}</h3>
                  <p className="mt-3 text-sm text-slate-500">
                    {test.preparation}
                  </p>

                  <div className="mt-5 border-t border-slate-100 pt-4">
                    <p className="text-xs text-slate-500">
                      Estimated demo price
                    </p>
                    <p className="mt-1 font-bold text-[#315c47]">{test.price}</p>
                  </div>
                </article>
              ))}
            </div>

            <p className="mt-6 text-center text-sm text-slate-500">
              Prices are fictional demonstration values and must not be treated
              as current hospital quotations.
            </p>
          </div>
        </section>

        {/* Conditions */}
        <section
          id="conditions"
          className="mx-auto max-w-7xl px-5 py-20 lg:px-8"
        >
          <div className="rounded-[2rem] bg-[#274c3b] px-6 py-12 text-white sm:px-10 lg:px-14">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
              <div>
                <p className="font-semibold uppercase tracking-[0.18em] text-emerald-200">
                  Common conditions
                </p>
                <h2 className="mt-3 text-3xl font-bold">
                  Learn about symptoms, causes and prevention
                </h2>
                <p className="mt-4 leading-7 text-emerald-50/80">
                  Disease information will be written in simple language and
                  supported by clearly structured educational content.
                </p>

                <button className="mt-7 flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-[#274c3b]">
                  Browse diseases
                  <ArrowRight size={18} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {commonConditions.map((condition) => (
                  <button
                    key={condition}
                    className="rounded-2xl border border-white/15 bg-white/10 px-4 py-5 text-left font-semibold transition hover:bg-white/20"
                  >
                    {condition}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Emergency section */}
        <section className="border-y border-red-100 bg-red-50 py-10">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 sm:flex-row sm:items-center lg:px-8">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-700">
                <PhoneCall size={23} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-red-900">
                  Medical emergency?
                </h2>
                <p className="mt-1 text-red-800/80">
                  For severe chest pain, breathing difficulty, unconsciousness,
                  major bleeding or stroke warning signs, seek emergency help
                  immediately.
                </p>
              </div>
            </div>

            <a
              href="tel:112"
              className="shrink-0 rounded-xl bg-red-700 px-6 py-3 font-bold text-white transition hover:bg-red-800"
            >
              Call 112
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#1f382e] px-5 py-12 text-white lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                <Activity size={24} />
              </div>

              <div>
                <p className="text-xl font-bold">TrueTest</p>
                <p className="text-sm text-emerald-100/70">
                  Health information made simple
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-md text-sm leading-6 text-emerald-50/70">
              TrueTest is a student health-informatics project created for
              educational and demonstration purposes.
            </p>
          </div>

          <div>
            <h3 className="font-bold">Quick links</h3>
            <div className="mt-4 flex flex-col gap-3 text-sm text-emerald-50/70">
              <a href="#features">Services</a>
              <a href="#tests">Medical Tests</a>
              <a href="#conditions">Diseases</a>
              <a href="#">Hospital Finder</a>
            </div>
          </div>

          <div>
            <h3 className="font-bold">Important</h3>
            <div className="mt-4 flex flex-col gap-3 text-sm text-emerald-50/70">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Safety Disclaimer</a>
              <a href="#">Contact</a>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-sm text-emerald-50/60">
          © 2026 TrueTest. Educational demonstration project.
        </div>
      </footer>
    </div>
  );
}

export default App;
