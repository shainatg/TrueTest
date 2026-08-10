import {
  Activity,
  ArrowLeft,
  Building2,
  Clock3,
  FlaskConical,
  MapPin,
  ShieldCheck,
  TestTube2,
  UtensilsCrossed,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";

import { hospitals } from "../data/hospitals";
import { testData } from "../data/medicalTests";
import { testPrices } from "../data/prices";

function TestDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const testSlug = location.pathname.split("/").pop();

  const test =
    testData[testSlug as keyof typeof testData];

  const normalizeTestName = (name: string) =>
    name
      .toLowerCase()
      .replace(/\(.*?\)/g, "")
      .replace(/\btest\b/g, "")
      .replace(/\bfbs\b/g, "fasting blood sugar")
      .replace(/\bcbc\b/g, "complete blood count")
      .replace(/\s+/g, " ")
      .trim();

  const makeSlug = (name: string) =>
    name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");

  if (!test) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fbf8] px-5">
        <div className="max-w-lg rounded-3xl bg-white p-10 text-center shadow-sm">
          <h1 className="text-3xl font-bold text-[#274c3b]">
            Test information coming soon
          </h1>

          <p className="mt-4 text-slate-600">
            Detailed information for this medical test has not been added yet.
          </p>

          <button
            type="button"
            onClick={() => navigate("/diseases")}
            className="mt-6 rounded-xl bg-[#315c47] px-6 py-3 font-semibold text-white"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  const selectedTestName = normalizeTestName(test.name);

  const providerPrices = testPrices
    .filter(
      (priceItem) =>
        normalizeTestName(priceItem.test) === selectedTestName
    )
    .map((priceItem) => {
      const hospital = hospitals.find(
        (item) => item.id === priceItem.hospitalId
      );

      if (!hospital) {
        return null;
      }

      return {
        hospitalId: hospital.id,
        hospitalName: hospital.name,
        city: hospital.city,
        area: hospital.area,
        type: hospital.type,
        price: priceItem.price,
      };
    })
    .filter(
      (
        provider
      ): provider is NonNullable<typeof provider> =>
        provider !== null
    );

  return (
    <div className="min-h-screen bg-[#f8fbf8] text-slate-800">

      {/* HEADER */}
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
            className="flex items-center gap-2 rounded-xl border border-[#6f8f72] px-4 py-2 font-semibold text-[#315c47]"
          >
            <ArrowLeft size={18} />
            Back
          </button>

        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8">

        {/* TEST TITLE */}
        <section className="rounded-[2rem] bg-gradient-to-br from-[#edf6ed] to-white p-8 sm:p-10">

          <div className="flex flex-wrap gap-3">

            <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#315c47]">
              {test.category}
            </span>

            <span className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-slate-600">
              <TestTube2 size={16} />
              Medical test
            </span>

          </div>

          <h1 className="mt-6 text-4xl font-bold text-[#203f32] sm:text-5xl">
            {test.name}
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            {test.purpose}
          </p>

        </section>

        {/* QUICK INFORMATION */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-3xl border border-emerald-100 bg-white p-6">
            <FlaskConical className="text-[#5f7f65]" />

            <p className="mt-4 text-sm text-slate-500">
              Sample type
            </p>

            <p className="mt-1 font-bold text-[#294b3c]">
              {test.sampleType}
            </p>
          </div>

          <div className="rounded-3xl border border-emerald-100 bg-white p-6">
            <UtensilsCrossed className="text-[#5f7f65]" />

            <p className="mt-4 text-sm text-slate-500">
              Fasting
            </p>

            <p className="mt-1 font-bold text-[#294b3c]">
              {test.fastingRequired}
            </p>
          </div>

          <div className="rounded-3xl border border-emerald-100 bg-white p-6">
            <Clock3 className="text-[#5f7f65]" />

            <p className="mt-4 text-sm text-slate-500">
              Test duration
            </p>

            <p className="mt-1 font-bold text-[#294b3c]">
              {test.duration}
            </p>
          </div>

          <div className="rounded-3xl border border-emerald-100 bg-white p-6">
            <Clock3 className="text-[#5f7f65]" />

            <p className="mt-4 text-sm text-slate-500">
              Result time
            </p>

            <p className="mt-1 font-bold text-[#294b3c]">
              {test.resultTime}
            </p>
          </div>

        </div>

        {/* PREPARATION */}
        <section className="mt-6 rounded-3xl border border-emerald-100 bg-white p-7">

          <h2 className="text-2xl font-bold text-[#294b3c]">
            How to Prepare
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Fasting requirement: {test.fastingHours}
          </p>

          <div className="mt-5 space-y-3">

            {test.preparation.map((item) => (
              <div
                key={item}
                className="flex gap-3 text-slate-600"
              >
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#6f8f72]" />

                <p>{item}</p>
              </div>
            ))}

          </div>

        </section>

        {/* RELATED DISEASES */}
        <section className="mt-6 rounded-3xl border border-emerald-100 bg-white p-7">

          <h2 className="text-2xl font-bold text-[#294b3c]">
            Related Diseases
          </h2>

          <div className="mt-5 flex flex-wrap gap-3">

            {test.relatedDiseases.map((disease) => (
              <button
                key={disease}
                type="button"
                onClick={() =>
                  navigate(
                    `/disease-details/${makeSlug(disease)}`
                  )
                }
                className="rounded-xl border border-emerald-100 bg-[#f8fbf8] px-4 py-3 font-semibold text-[#315c47] hover:bg-emerald-50"
              >
                {disease}
              </button>
            ))}

          </div>

        </section>

        {/* HOSPITALS & LABS */}
        <section className="mt-8 rounded-3xl border border-emerald-100 bg-white p-7">

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            <div>

              <div className="flex items-center gap-3">
                <Building2 className="text-[#5f7f65]" />

                <h2 className="text-2xl font-bold text-[#294b3c]">
                  Hospitals & Labs
                </h2>
              </div>

              <p className="mt-2 text-slate-500">
                Providers offering this test.
              </p>

            </div>

            <button
              type="button"
              onClick={() =>
                navigate(
                  `/hospital-finder?test=${encodeURIComponent(
                    test.name
                  )}`
                )
              }
              className="rounded-xl bg-[#315c47] px-5 py-3 font-semibold text-white"
            >
              Open Hospital Finder
            </button>

          </div>

          {/* PROVIDER CARDS */}
          {providerPrices.length > 0 ? (
            <div className="mt-6 grid gap-4 lg:grid-cols-3">

              {providerPrices.map((provider) => (
                <div
                  key={`${provider.hospitalId}-${test.name}`}
                  className="rounded-2xl border border-emerald-100 bg-[#f8fbf8] p-5"
                >

                  <div className="flex items-start justify-between gap-3">

                    <div>

                      <h3 className="font-bold text-[#294b3c]">
                        {provider.hospitalName}
                      </h3>

                      <div className="mt-2 flex items-center gap-1 text-sm text-slate-500">
                        <MapPin size={15} />

                        {provider.area}, {provider.city}
                      </div>

                    </div>

                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#58775e]">
                      {provider.type}
                    </span>

                  </div>

                  <p className="mt-5 text-sm text-slate-500">
                    Estimated price
                  </p>

                  <p className="mt-1 text-2xl font-bold text-[#315c47]">
                    ₹{provider.price}
                  </p>

                </div>
              ))}

            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-emerald-200 bg-[#f8fbf8] p-8 text-center">

              <p className="font-semibold text-[#294b3c]">
                Provider pricing is currently unavailable for this test.
              </p>

              <p className="mt-2 text-sm text-slate-500">
                You can still search the Hospital Finder for available providers.
              </p>

            </div>
          )}

        </section>

        {/* PRICE COMPARISON */}
        <section className="mt-6 rounded-3xl bg-[#274c3b] p-7 text-white">

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

            <div>

              <h2 className="text-2xl font-bold">
                Compare Test Prices
              </h2>

              <p className="mt-2 text-emerald-50/80">
                Compare estimated prices across available hospitals
                and diagnostic centres.
              </p>

            </div>

            <button
              type="button"
              onClick={() =>
                navigate(
                  `/price-comparison?test=${encodeURIComponent(
                    test.name
                  )}`
                )
              }
              className="rounded-xl bg-white px-5 py-3 font-bold text-[#274c3b]"
            >
              Compare Prices
            </button>

          </div>

        </section>

        {/* DISCLAIMER — KEEPING IT */}
        <section className="mt-6 flex gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-6">

          <ShieldCheck className="shrink-0 text-amber-700" />

          <div>

            <p className="font-bold text-amber-900">
              Important notice
            </p>

            <p className="mt-1 text-sm leading-6 text-amber-800">
              Preparation requirements may vary depending on the laboratory,
              clinical situation and other tests ordered. Always follow the
              instructions provided by the healthcare professional or testing
              centre. Prices shown in TrueTest are fictional demonstration
              values and are not live hospital quotations.
            </p>

          </div>

        </section>

      </main>
    </div>
  );
}

export default TestDetails;