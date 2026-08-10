import { diseaseData } from "../data/diseases";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
  TestTube2,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";

function DiseaseDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const diseaseSlug = location.pathname.split("/").pop();

  const disease =
  diseaseData[diseaseSlug as keyof typeof diseaseData];

if (!disease) {
  return (
    <div className="min-h-screen bg-[#f8fbf8] flex items-center justify-center px-5">
      <div className="max-w-lg rounded-3xl bg-white p-10 text-center shadow-sm">
        <h1 className="text-3xl font-bold text-[#274c3b]">
          Disease information coming soon
        </h1>

        <p className="mt-4 text-slate-600">
          Detailed information for this condition has not been added to
          TrueTest yet.
        </p>

        <button
          onClick={() => navigate("/diseases")}
          className="mt-6 rounded-xl bg-[#315c47] px-6 py-3 font-semibold text-white"
        >
          Back to Diseases
        </button>
      </div>
    </div>
  );
}
  const makeSlug = (text: string) =>
    text.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="min-h-screen bg-[#f8fbf8] text-slate-800">

      <header className="border-b border-emerald-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">

          <button
            type="button"
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
            type="button"
            onClick={() => navigate("/diseases")}
            className="flex items-center gap-2 rounded-xl border border-[#6f8f72] px-4 py-2 font-semibold text-[#315c47] hover:bg-emerald-50"
          >
            <ArrowLeft size={18} />
            Back to Diseases
          </button>

        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8">

        <section className="rounded-[2rem] bg-gradient-to-br from-[#edf6ed] to-white p-8 sm:p-10">

          <div className="flex flex-wrap items-center gap-3">

            <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#315c47] shadow-sm">
              {disease.category}
            </span>

            <span className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">
              <Stethoscope size={16} />
              Disease information
            </span>

          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-[#203f32] sm:text-5xl">
            {disease.name}
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            {disease.overview}
          </p>

        </section>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">

          <section className="rounded-3xl border border-emerald-100 bg-white p-7">

            <div className="flex items-center gap-3">
              <HeartPulse className="text-[#5f7f65]" />

              <h2 className="text-2xl font-bold text-[#294b3c]">
                Common Symptoms
              </h2>
            </div>

            <ul className="mt-5 space-y-3">
              {disease.symptoms.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-slate-600"
                >
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#6f8f72]" />
                  {item}
                </li>
              ))}
            </ul>

          </section>

          <section className="rounded-3xl border border-emerald-100 bg-white p-7">

            <h2 className="text-2xl font-bold text-[#294b3c]">
              Causes
            </h2>

            <ul className="mt-5 space-y-3">
              {disease.causes.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-slate-600"
                >
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#6f8f72]" />
                  {item}
                </li>
              ))}
            </ul>

          </section>

          <section className="rounded-3xl border border-emerald-100 bg-white p-7">

            <h2 className="text-2xl font-bold text-[#294b3c]">
              Risk Factors
            </h2>

            <ul className="mt-5 space-y-3">
              {disease.riskFactors.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-slate-600"
                >
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#6f8f72]" />
                  {item}
                </li>
              ))}
            </ul>

          </section>

          <section className="rounded-3xl border border-emerald-100 bg-white p-7">

            <div className="flex items-center gap-3">
              <TestTube2 className="text-[#5f7f65]" />

              <h2 className="text-2xl font-bold text-[#294b3c]">
                Recommended Tests
              </h2>
            </div>

            <div className="mt-5 space-y-3">

              {disease.tests.map((test) => (
                <button
                  key={test}
                  type="button"
                  onClick={() =>
                    navigate(`/test-details/${makeSlug(test)}`)
                  }
                  className="flex w-full items-center justify-between rounded-2xl border border-emerald-100 bg-[#f8fbf8] px-4 py-3 text-left font-semibold text-[#315c47] hover:bg-emerald-50"
                >
                  {test}
                  <ArrowRight size={17} />
                </button>
              ))}

            </div>

          </section>

        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">

          <section className="rounded-3xl border border-emerald-100 bg-white p-7">

            <h2 className="text-2xl font-bold text-[#294b3c]">
              Treatment Overview
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              {disease.treatment}
            </p>

          </section>

          <section className="rounded-3xl border border-emerald-100 bg-white p-7">

            <h2 className="text-2xl font-bold text-[#294b3c]">
              Prevention
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              {disease.prevention}
            </p>

          </section>

        </div>

        <section className="mt-6 rounded-3xl border border-amber-200 bg-amber-50 p-7">

          <div className="flex items-start gap-4">

            <AlertTriangle className="mt-1 shrink-0 text-amber-700" />

            <div>

              <h2 className="text-xl font-bold text-amber-900">
                When to Seek Medical Care
              </h2>

              <p className="mt-3 leading-7 text-amber-800">
                {disease.whenToSeekCare}
              </p>

            </div>

          </div>

        </section>

        <section className="mt-6 rounded-3xl border border-red-200 bg-red-50 p-7">

          <div className="flex items-start gap-4">

            <AlertTriangle className="mt-1 shrink-0 text-red-700" />

            <div>

              <h2 className="text-xl font-bold text-red-900">
                Emergency Warning Signs
              </h2>

              <div className="mt-4 flex flex-wrap gap-2">

                {disease.emergencySigns.map((item) => (
                  <span
                    key={item}
                    className="rounded-xl bg-white px-3 py-2 text-sm text-red-800"
                  >
                    {item}
                  </span>
                ))}

              </div>

            </div>

          </div>

        </section>

        <section className="mt-8 rounded-3xl border border-emerald-100 bg-white p-7">

          <h2 className="text-2xl font-bold text-[#294b3c]">
            Related Diseases
          </h2>

          <div className="mt-5 flex flex-wrap gap-3">

            {disease.relatedDiseases.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() =>
                  navigate(`/disease-details/${makeSlug(item)}`)
                }
                className="rounded-xl border border-emerald-100 bg-[#f8fbf8] px-4 py-3 font-semibold text-[#315c47] hover:bg-emerald-50"
              >
                {item}
              </button>
            ))}

          </div>

        </section>

        <section className="mt-8 flex gap-4 rounded-2xl border border-emerald-100 bg-[#eef6ef] p-6">

          <ShieldCheck
            className="shrink-0 text-[#58775e]"
            size={24}
          />

          <div>

            <p className="font-bold text-[#294b3c]">
              Educational information only
            </p>

            <p className="mt-1 text-sm leading-6 text-slate-600">
              This content is for educational use and is not a substitute
              for professional medical diagnosis, treatment or personalised
              medical advice.
            </p>

          </div>

        </section>

      </main>

    </div>
  );
}

export default DiseaseDetails;