import { useState } from "react";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  HeartPulse,
  Search,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const diseases = [
  {
    name: "Diabetes Mellitus",
    category: "Endocrine",
    description:
      "A chronic condition that affects how the body regulates blood glucose.",
    symptoms: ["Increased thirst", "Frequent urination", "Fatigue"],
  },
  {
    name: "Hypertension",
    category: "Cardiovascular",
    description:
      "A condition in which blood pressure remains consistently higher than normal.",
    symptoms: ["Often no symptoms", "Headache", "Dizziness"],
  },
  {
    name: "Asthma",
    category: "Respiratory",
    description:
      "A chronic respiratory condition in which the airways become inflamed and narrowed.",
    symptoms: ["Wheezing", "Shortness of breath", "Cough"],
  },
  {
    name: "Iron Deficiency Anaemia",
    category: "Blood",
    description:
      "A condition where the body does not have enough healthy red blood cells due to low iron.",
    symptoms: ["Fatigue", "Weakness", "Pale skin"],
  },
  {
    name: "Hypothyroidism",
    category: "Endocrine",
    description:
      "A condition where the thyroid gland does not produce enough thyroid hormone.",
    symptoms: ["Fatigue", "Weight gain", "Cold sensitivity"],
  },
  {
    name: "Migraine",
    category: "Neurological",
    description:
      "A neurological condition that can cause recurrent moderate to severe headaches.",
    symptoms: ["Headache", "Nausea", "Light sensitivity"],
  },
  {
    name: "PCOS",
    category: "Women's Health",
    description:
      "A hormonal disorder that can affect menstrual cycles, hormone levels and ovarian function.",
    symptoms: ["Irregular periods", "Acne", "Excess hair growth"],
  },
  {
    name: "Dengue",
    category: "Infectious Disease",
    description:
      "A mosquito-borne viral infection that may cause fever and other systemic symptoms.",
    symptoms: ["High fever", "Body pain", "Headache"],
  },
];

const categories = [
  "All",
  "Cardiovascular",
  "Endocrine",
  "Respiratory",
  "Blood",
  "Neurological",
  "Women's Health",
  "Infectious Disease",
];

function Diseases() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredDiseases = diseases.filter((disease) => {
    const matchesSearch =
      disease.name.toLowerCase().includes(search.toLowerCase()) ||
      disease.symptoms.some((symptom) =>
        symptom.toLowerCase().includes(search.toLowerCase())
      );

    const matchesCategory =
      category === "All" || disease.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#f8fbf8] text-slate-800">

      {/* Navbar */}
      <header className="border-b border-emerald-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#6f8f72] text-white">
              <Activity size={24} />
            </div>

            <div className="text-left">
              <p className="text-xl font-bold text-[#274c3b]">
                TrueTest
              </p>
              <p className="text-xs text-slate-500">
                Health information made simple
              </p>
            </div>
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 rounded-xl border border-[#6f8f72] px-4 py-2 font-semibold text-[#315c47] hover:bg-emerald-50"
          >
            <ArrowLeft size={18} />
            Home
          </button>

        </div>
      </header>

      {/* Heading */}
      <section className="bg-gradient-to-br from-[#edf6ed] via-white to-[#e5f2ed]">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">

          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-medium text-[#315c47]">
            <Stethoscope size={17} />
            Disease Library
          </div>

          <h1 className="mt-5 text-4xl font-bold tracking-tight text-[#203f32] sm:text-5xl">
            Disease Information
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            Search common health conditions and learn about their symptoms,
            causes, diagnosis, treatment and prevention in simple language.
          </p>

          {/* Search */}
          <div className="mt-8 max-w-3xl rounded-2xl border border-emerald-100 bg-white p-2 shadow-lg shadow-emerald-900/5">

            <div className="flex items-center gap-3 px-4">

              <Search
                size={22}
                className="shrink-0 text-[#6f8f72]"
              />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search disease or symptom..."
                className="w-full bg-transparent py-4 outline-none placeholder:text-slate-400"
              />

            </div>
          </div>

        </div>
      </section>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8">

        {/* Categories */}
        <div>
          <p className="mb-4 font-semibold text-[#294b3c]">
            Browse by category
          </p>

          <div className="flex flex-wrap gap-2">

            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  category === item
                    ? "bg-[#315c47] text-white"
                    : "border border-emerald-100 bg-white text-slate-600 hover:bg-emerald-50"
                }`}
              >
                {item}
              </button>
            ))}

          </div>
        </div>

        {/* Results heading */}
        <div className="mt-12 flex items-end justify-between">

          <div>
            <h2 className="text-2xl font-bold text-[#203f32]">
              Health Conditions
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {filteredDiseases.length} condition
              {filteredDiseases.length !== 1 ? "s" : ""} found
            </p>
          </div>

        </div>

        {/* Disease cards */}
        <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

          {filteredDiseases.map((disease) => (
            <article
              key={disease.name}
              className="group rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >

              <div className="flex items-start justify-between gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e9f2e8] text-[#4d7356]">
                  <HeartPulse size={23} />
                </div>

                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  {disease.category}
                </span>

              </div>

              <h3 className="mt-5 text-xl font-bold text-[#294b3c]">
                {disease.name}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {disease.description}
              </p>

              <div className="mt-5">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Common symptoms
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {disease.symptoms.map((symptom) => (
                    <span
                      key={symptom}
                      className="rounded-lg bg-[#f1f6f1] px-3 py-1.5 text-xs text-slate-600"
                    >
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>
<button
  type="button"
  onClick={() =>
    navigate(
      `/disease-details/${disease.name
        .toLowerCase()
        .replace(/\s+/g, "-")}`
    )
  }
  className="mt-6 flex items-center gap-2 font-semibold text-[#58775e]"
>
  View details
  <ArrowRight
    size={17}
    className="transition group-hover:translate-x-1"
  />
</button>
            </article>
          ))}

        </div>

        {filteredDiseases.length === 0 && (
          <div className="mt-10 rounded-3xl border border-dashed border-emerald-200 bg-white py-16 text-center">
            <Search
              size={32}
              className="mx-auto text-slate-300"
            />

            <h3 className="mt-4 font-bold text-slate-700">
              No disease found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Try another disease name, symptom or category.
            </p>
          </div>
        )}

        {/* Safety notice */}
        <div className="mt-12 flex gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5">

          <ShieldCheck
            className="shrink-0 text-amber-700"
            size={24}
          />

          <div>
            <p className="font-bold text-amber-900">
              Medical information notice
            </p>

            <p className="mt-1 text-sm leading-6 text-amber-800">
              This information is provided for educational purposes and
              should not be used for self-diagnosis or as a replacement for
              professional medical advice.
            </p>
          </div>

        </div>

      </main>
    </div>
  );
}

export default Diseases;