import HealthReminders from "./pages/HealthReminders";
import WearableHealth from "./pages/WearableHealth";
import HealthLocker from "./pages/HealthLocker";
import EmergencyHelp from "./pages/EmergencyHelp";
import SymptomChecker from "./pages/SymptomChecker";
import HealthCard from "./pages/HealthCard";
import PriceComparison from "./pages/PriceComparison";
import HospitalFinder from "./pages/HospitalFinder";
import TestDetails from "./pages/TestDetails";
import DiseaseDetails from "./pages/DiseaseDetails";
import { diseaseData } from "./data/diseases";
import { testData } from "./data/medicalTests";
import { useLocation, useNavigate } from "react-router-dom";
import Diseases from "./pages/Diseases";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AllTests from "./pages/AllTests";
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
import { useEffect, useState } from "react";

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
    title: "Wearable Health",
    description:
      "Track smartwatch and wearable health data such as heart rate, steps, sleep, SpO₂ and activity.",
    icon: Activity,
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

  const [backendMessage, setBackendMessage] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
  fetch("http://127.0.0.1:5000/")
    .then((response) => response.json())
    .then((data) => {
      console.log("TrueTest backend:", data);
      setBackendMessage(data.message);
    })
    .catch((error) => {
      console.error("Backend connection error:", error);
    });
}, []);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const normalizedSearch = searchText.trim().toLowerCase();

  const searchSuggestions = normalizedSearch
    ? [
        ...Object.entries(diseaseData)
          .filter(
            ([slug, disease]) =>
              slug.toLowerCase().includes(normalizedSearch) ||
              disease.name.toLowerCase().includes(normalizedSearch)
          )
          .map(([slug, disease]) => ({
            type: "Disease" as const,
            name: disease.name,
            slug,
          })),
        ...Object.entries(testData)
          .filter(([slug, test]) => {
            const aliases =
              slug === "complete-blood-count"
                ? ["cbc"]
                : slug === "fasting-blood-sugar"
                ? ["fbs"]
                : [];

            return (
              slug.toLowerCase().includes(normalizedSearch) ||
              test.name.toLowerCase().includes(normalizedSearch) ||
              aliases.some((alias) => alias.includes(normalizedSearch))
            );
          })
          .map(([slug, test]) => ({
            type: "Test" as const,
            name: test.name,
            slug,
          })),
      ].slice(0, 8)
    : [];

  const openSuggestion = (
    suggestion: (typeof searchSuggestions)[number]
  ) => {
    setSearchText(suggestion.name);
    setSearchFocused(false);

    if (suggestion.type === "Disease") {
      navigate(`/disease-details/${suggestion.slug}`);
      return;
    }

    navigate(`/test-details/${suggestion.slug}`);
  };

const handleSearch = () => {
  const value = searchText.trim().toLowerCase();

  if (!value) {
    alert("Please enter a disease or medical test.");
    return;
  }

  const diseaseMatch = Object.entries(diseaseData).find(
    ([slug, disease]) =>
      slug.toLowerCase().includes(value) ||
      disease.name.toLowerCase().includes(value)
  );

  if (diseaseMatch) {
    const [slug] = diseaseMatch;
    navigate(`/disease-details/${slug}`);
    return;
  }

  const testMatch = Object.entries(testData).find(
    ([slug, test]) => {
      const name = test.name.toLowerCase();

      const aliases =
        slug === "complete-blood-count"
          ? ["cbc"]
          : slug === "fasting-blood-sugar"
          ? ["fbs"]
          : [];

      return (
        slug.toLowerCase().includes(value) ||
        name.includes(value) ||
        aliases.some((alias) => alias.includes(value))
      );
    }
  );

  if (testMatch) {
    const [slug] = testMatch;
    navigate(`/test-details/${slug}`);
    return;
  }

  alert("No matching disease or medical test found.");
};

  const handleFeatureClick = (title: string) => {
    if (title === "Disease Information") {
      navigate("/diseases");
      return;
    }

    if (title === "Compare Test Prices") {
      navigate("/price-comparison");
      return;
    }

    if (title === "Hospital Finder") {
      navigate("/hospital-finder");
      return;
    }

    if (title === "Health Card") {
      navigate("/health-card");
      return;
    }
    if (title === "Symptom Guidance") {
  navigate("/symptom-checker");
  return;
}
if (title === "Emergency Help") {
  navigate("/emergency-help");
  return;
}
if (title === "Health Locker") {
  navigate("/health-locker");
  return;
}
if (title === "Health Reminders") {
  navigate("/health-reminders");
  return;
}
if (title === "Wearable Health") {
  navigate("/wearable-health");
  return;
}
    if (title === "Medical Tests") {
      navigate("/tests");
      return;
    }

    alert(`${title} feature will be connected next.`);
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
if (location.pathname === "/tests") {
  return <AllTests />;
}

if (location.pathname === "/health-card") {
  return <HealthCard />;
}
if (location.pathname === "/symptom-checker") {
  return <SymptomChecker />;
}

if (location.pathname === "/emergency-help") {
  return <EmergencyHelp />;
}
if (location.pathname === "/health-locker") {
  return <HealthLocker />;
}
if (location.pathname === "/health-reminders") {
  return <HealthReminders />;
}
if (location.pathname === "/wearable-health") {
  return <WearableHealth />;
}
if (location.pathname === "/login") {
  return <Login />;
}
if (location.pathname === "/signup") {
  return <Signup />;
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
            <div className="relative">
              <button
                type="button"
                onClick={() => setMoreMenuOpen((current) => !current)}
                className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-[#315c47]"
              >
                More
                <ChevronDown size={16} />
              </button>

              {moreMenuOpen && (
                <div className="absolute right-0 top-full z-50 mt-3 w-56 overflow-hidden rounded-2xl border border-emerald-100 bg-white py-2 shadow-xl">
                  {[
                    ["Hospital Finder", "/hospital-finder"],
                    ["Symptom Guidance", "/symptom-checker"],
                    ["Health Card", "/health-card"],
                    ["Health Locker", "/health-locker"],
                    ["Health Reminders", "/health-reminders"],
                    ["Wearable Health", "/wearable-health"],
                    ["Emergency Help", "/emergency-help"],
                  ].map(([label, path]) => (
                    <button
                      key={path}
                      type="button"
                      onClick={() => {
                        setMoreMenuOpen(false);
                        navigate(path);
                      }}
                      className="block w-full px-4 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:bg-[#f1f7f1] hover:text-[#315c47]"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="rounded-xl border border-[#6f8f72] px-5 py-2.5 text-sm font-semibold text-[#315c47] transition hover:bg-emerald-50"
            >
              Log in
            </button>

            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="rounded-xl bg-[#5f7f65] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#4d6d54]"
            >
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
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/diseases");
                }}
                className="text-left text-slate-700"
              >
                Diseases
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/hospital-finder");
                }}
                className="text-left text-slate-700"
              >
                Hospital Finder
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/emergency-help");
                }}
                className="text-left text-slate-700"
              >
                Emergency Help
              </button>

              <div className="mt-2 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate("/login");
                  }}
                  className="rounded-xl border border-[#6f8f72] py-2.5 font-semibold text-[#315c47]"
                >
                  Log in
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate("/signup");
                  }}
                  className="rounded-xl bg-[#5f7f65] py-2.5 font-semibold text-white"
                >
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

              <div className="relative mt-8 max-w-2xl">
                <div className="rounded-2xl border border-emerald-100 bg-white p-2 shadow-lg shadow-emerald-900/5">
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <div className="flex flex-1 items-center gap-3 px-3">
                      <Search className="shrink-0 text-[#6f8f72]" size={22} />
                      <input
                        type="text"
                        value={searchText}
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => {
                          window.setTimeout(() => setSearchFocused(false), 150);
                        }}
                        onChange={(event) => {
                          setSearchText(event.target.value);
                          setSearchFocused(true);
                        }}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            handleSearch();
                            setSearchFocused(false);
                          }

                          if (event.key === "Escape") {
                            setSearchFocused(false);
                          }
                        }}
                        placeholder="Search a disease or medical test"
                        autoComplete="off"
                        className="w-full bg-transparent py-3 text-base outline-none placeholder:text-slate-400"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        handleSearch();
                        setSearchFocused(false);
                      }}
                      className="rounded-xl bg-[#58775e] px-7 py-3.5 font-semibold text-white transition hover:bg-[#46654d]"
                    >
                      Search
                    </button>
                  </div>
                </div>

                {searchFocused && normalizedSearch && (
                  <div className="absolute left-0 right-0 top-full z-40 mt-2 overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-xl shadow-emerald-900/10">
                    {searchSuggestions.length > 0 ? (
                      <div className="max-h-80 overflow-y-auto py-2">
                        {searchSuggestions.map((suggestion) => (
                          <button
                            key={`${suggestion.type}-${suggestion.slug}`}
                            type="button"
                            onMouseDown={(event) => event.preventDefault()}
                            onClick={() => openSuggestion(suggestion)}
                            className="flex w-full items-center justify-between gap-4 px-5 py-3 text-left transition hover:bg-[#f1f7f1]"
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#edf5ef] text-[#58775e]">
                                {suggestion.type === "Disease" ? (
                                  <Stethoscope size={18} />
                                ) : (
                                  <TestTube2 size={18} />
                                )}
                              </div>

                              <div>
                                <p className="font-semibold text-[#294b3c]">
                                  {suggestion.name}
                                </p>
                                <p className="mt-0.5 text-xs text-slate-500">
                                  {suggestion.type}
                                </p>
                              </div>
                            </div>

                            <ArrowRight
                              size={17}
                              className="shrink-0 text-[#6f8f72]"
                            />
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="px-5 py-4 text-sm text-slate-500">
                        No matching disease or medical test found.
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
               <button
  type="button"
  onClick={() => navigate("/symptom-checker")}
  className="flex items-center gap-2 rounded-xl bg-[#315c47] px-6 py-3.5 font-semibold text-white transition hover:bg-[#274c3b]"
>
  Check symptoms
  <ArrowRight size={18} />
</button>
                <button
  type="button"
  onClick={() => navigate("/price-comparison")}
  className="rounded-xl border border-[#6f8f72] bg-white px-6 py-3.5 font-semibold text-[#315c47] transition hover:bg-emerald-50"
>
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
  onClick={() => {
    if (label === "Explore diseases") {
      navigate("/diseases");
    } else if (label === "Understand tests") {
  document
    .getElementById("tests")
    ?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    } else if (label === "Find hospitals") {
      navigate("/hospital-finder");
    } else if (label === "Emergency help") {
      navigate("/emergency-help");
    }
  }}
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
                    <p className="text-2xl font-bold text-[#315c47]">{Object.keys(diseaseData).length}</p>
                    <p className="mt-1 text-sm text-slate-600">
                      Disease records
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#edf5f3] p-4">
                    <p className="text-2xl font-bold text-[#315c47]">{Object.keys(testData).length}</p>
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

                  <button
                    type="button"
                    onClick={() => handleFeatureClick(feature.title)}
                    className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#58775e]"
                  >
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

              <button
                type="button"
                onClick={() => navigate("/tests")}
                className="flex items-center gap-2 font-semibold text-[#315c47]"
              >
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
                      Estimated price
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

                <button
                  type="button"
                  onClick={() => navigate("/diseases")}
                  className="mt-7 flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-[#274c3b]"
                >
                  Browse diseases
                  <ArrowRight size={18} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {commonConditions.map((condition) => (
                  <button
                    key={condition}
                    type="button"
                    onClick={() => {
                      const value = condition.toLowerCase();
                      const match = Object.entries(diseaseData).find(
                        ([slug, disease]) =>
                          slug.toLowerCase().includes(value) ||
                          disease.name.toLowerCase().includes(value)
                      );

                      if (match) {
                        navigate(`/disease-details/${match[0]}`);
                      } else {
                        navigate("/diseases");
                      }
                    }}
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
              <button
                type="button"
                onClick={() => navigate("/tests")}
                className="text-left"
              >
                Medical Tests
              </button>
              <button
                type="button"
                onClick={() => navigate("/diseases")}
                className="text-left"
              >
                Diseases
              </button>
              <button
                type="button"
                onClick={() => navigate("/hospital-finder")}
                className="text-left"
              >
                Hospital Finder
              </button>
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