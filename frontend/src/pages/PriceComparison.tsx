import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  Building2,
  Search,
  TestTube2,
} from "lucide-react";

import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type ProviderType = "government" | "private" | "clinic";

type Provider = {
  hospital: string;
  city: string;
  type: ProviderType;
  price: number;
  rating: number;
  available: boolean;
};

const testOptions = [
  {
    name: "Complete Blood Count",
    shortName: "CBC",
    key: "cbc",
  },
  {
    name: "HbA1c",
    shortName: "HbA1c",
    key: "hba1c",
  },
  {
    name: "Lipid Profile",
    shortName: "Lipid",
    key: "lipid",
  },
  {
    name: "Thyroid Function Test",
    shortName: "TFT",
    key: "thyroid",
  },
  {
    name: "Liver Function Test",
    shortName: "LFT",
    key: "lft",
  },
  {
    name: "Kidney Function Test",
    shortName: "KFT",
    key: "kft",
  },
  {
    name: "Renal Function Test",
    shortName: "RFT",
    key: "kft",
  },
  {
    name: "Vitamin D",
    shortName: "Vit D",
    key: "vitamin-d",
  },
  {
    name: "Vitamin B12",
    shortName: "B12",
    key: "vitamin-b12",
  },
  {
    name: "Fasting Blood Sugar",
    shortName: "FBS",
    key: "fbs",
  },
  {
    name: "C-Reactive Protein",
    shortName: "CRP",
    key: "crp",
  },
  {
    name: "Erythrocyte Sedimentation Rate",
    shortName: "ESR",
    key: "esr",
  },
  {
    name: "Urine Routine Examination",
    shortName: "Urine Routine",
    key: "urine",
  },
  {
    name: "Serum Creatinine",
    shortName: "Creatinine",
    key: "creatinine",
  },
  {
    name: "Iron Profile",
    shortName: "Iron Studies",
    key: "iron",
  },
];

function PriceComparison() {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const selectedTestFromUrl = params.get("test") || "";

  const [searchTerm, setSearchTerm] =
    useState(selectedTestFromUrl);

  const [searchFocused, setSearchFocused] =
    useState(false);

  const [providers, setProviders] =
    useState<Provider[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // --------------------------------------------
  // TEST SEARCH SUGGESTIONS
  // --------------------------------------------

  const normalizedSearch =
    searchTerm.trim().toLowerCase();

  const testSuggestions = normalizedSearch
    ? testOptions
        .filter((test) => {
          return (
            test.name
              .toLowerCase()
              .includes(normalizedSearch) ||
            test.shortName
              .toLowerCase()
              .includes(normalizedSearch) ||
            test.key
              .toLowerCase()
              .includes(normalizedSearch)
          );
        })
        .slice(0, 8)
    : [];

  // --------------------------------------------
  // CONVERT SEARCH TO BACKEND KEY
  // --------------------------------------------

  const getTestKey = (value: string) => {
    const normalized =
      value.toLowerCase().trim();

    if (
      normalized.includes("cbc") ||
      normalized.includes(
        "complete blood count"
      )
    ) {
      return "cbc";
    }

    if (
      normalized.includes("hba1c") ||
      normalized.includes(
        "glycated hemoglobin"
      )
    ) {
      return "hba1c";
    }

    if (
      normalized.includes("lipid") ||
      normalized.includes("cholesterol")
    ) {
      return "lipid";
    }

    if (
      normalized.includes("thyroid") ||
      normalized.includes("tft")
    ) {
      return "thyroid";
    }

    if (
      normalized === "lft" ||
      normalized.includes(
        "liver function"
      )
    ) {
      return "lft";
    }

    if (
      normalized === "kft" ||
      normalized === "rft" ||
      normalized.includes(
        "kidney function"
      ) ||
      normalized.includes(
        "renal function"
      )
    ) {
      return "kft";
    }

    if (
      normalized.includes("vitamin d") ||
      normalized.includes("vit d")
    ) {
      return "vitamin-d";
    }

    if (
      normalized.includes(
        "vitamin b12"
      ) ||
      normalized.includes("vit b12") ||
      normalized === "b12"
    ) {
      return "vitamin-b12";
    }

    if (
      normalized === "fbs" ||
      normalized.includes(
        "fasting blood sugar"
      ) ||
      normalized.includes(
        "fasting glucose"
      )
    ) {
      return "fbs";
    }

    if (
      normalized === "crp" ||
      normalized.includes(
        "c-reactive protein"
      ) ||
      normalized.includes(
        "c reactive protein"
      )
    ) {
      return "crp";
    }

    if (
      normalized === "esr" ||
      normalized.includes(
        "erythrocyte sedimentation"
      )
    ) {
      return "esr";
    }

    if (
      normalized === "urine" ||
      normalized.includes(
        "urine routine"
      ) ||
      normalized.includes(
        "urinalysis"
      )
    ) {
      return "urine";
    }

    if (
      normalized.includes("creatinine")
    ) {
      return "creatinine";
    }

    if (
      normalized === "iron" ||
      normalized.includes(
        "iron profile"
      ) ||
      normalized.includes(
        "iron studies"
      )
    ) {
      return "iron";
    }

    return "";
  };

  const testKey =
    getTestKey(searchTerm);

  // --------------------------------------------
  // FETCH PRICES FROM FLASK
  // --------------------------------------------

  useEffect(() => {
    if (!testKey) {
      setProviders([]);
      setError("");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    fetch(
      `http://127.0.0.1:5000/api/prices?test=${encodeURIComponent(
        testKey
      )}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Unable to load price information."
          );
        }

        return response.json();
      })

      .then((data) => {
        setProviders(
          data.results || []
        );
      })

      .catch((error) => {
        console.error(
          "Backend connection error:",
          error
        );

        setProviders([]);

        setError(
          "Could not connect to the TrueTest backend."
        );
      })

      .finally(() => {
        setLoading(false);
      });
  }, [testKey]);

  // --------------------------------------------
  // CALCULATE CATEGORY AVERAGES
  // --------------------------------------------

  const comparison = useMemo(() => {
    const governmentProviders =
      providers.filter(
        (provider) =>
          provider.type === "government"
      );

    const privateProviders =
      providers.filter(
        (provider) =>
          provider.type === "private"
      );

    const clinicProviders =
      providers.filter(
        (provider) =>
          provider.type === "clinic"
      );

    const average = (
      items: Provider[]
    ) => {
      if (items.length === 0) {
        return null;
      }

      return Math.round(
        items.reduce(
          (sum, provider) =>
            sum + provider.price,
          0
        ) / items.length
      );
    };

    return {
      government: {
        averagePrice:
          average(governmentProviders),

        providerCount:
          governmentProviders.length,
      },

      private: {
        averagePrice:
          average(privateProviders),

        providerCount:
          privateProviders.length,
      },

      clinic: {
        averagePrice:
          average(clinicProviders),

        providerCount:
          clinicProviders.length,
      },
    };
  }, [providers]);

  // --------------------------------------------
  // PRICE RANGE
  // --------------------------------------------

  const minimumPrice =
    providers.length > 0
      ? Math.min(
          ...providers.map(
            (provider) =>
              provider.price
          )
        )
      : null;

  const maximumPrice =
    providers.length > 0
      ? Math.max(
          ...providers.map(
            (provider) =>
              provider.price
          )
        )
      : null;

  // --------------------------------------------
  // SELECT SUGGESTION
  // --------------------------------------------

  const selectTest = (
    test: (typeof testOptions)[number]
  ) => {
    setSearchTerm(test.name);
    setSearchFocused(false);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800">

      {/* HEADER */}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">

          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <Activity size={24} />
            </div>

            <p className="text-xl font-bold text-sky-600">
              TrueTest
            </p>
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50"
          >
            <ArrowLeft size={18} />
            Home
          </button>

        </div>
      </header>

      {/* MAIN */}

      <main className="mx-auto max-w-6xl px-5 py-10 lg:px-8">

        <section>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Test Price Comparison
          </h1>

          <p className="mt-4 text-lg text-slate-500">
            Compare estimated prices between
            government hospitals, private
            hospitals and small clinics or
            diagnostic laboratories.
          </p>

          {/* SMART SEARCH */}

          <div className="relative mt-7">

            <div className="relative">

              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={searchTerm}

                onFocus={() =>
                  setSearchFocused(true)
                }

                onBlur={() => {
                  window.setTimeout(
                    () =>
                      setSearchFocused(false),
                    150
                  );
                }}

                onChange={(event) => {
                  setSearchTerm(
                    event.target.value
                  );

                  setSearchFocused(true);
                }}

                onKeyDown={(event) => {
                  if (
                    event.key === "Escape"
                  ) {
                    setSearchFocused(false);
                  }
                }}

                placeholder="Search medical test..."
                autoComplete="off"

                className="w-full rounded-xl border border-slate-300 py-3.5 pl-12 pr-4 text-slate-700 outline-none focus:border-blue-500"
              />

            </div>

            {/* SUGGESTIONS */}

            {searchFocused &&
              normalizedSearch && (

                <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-xl">

                  {testSuggestions.length >
                  0 ? (

                    <div className="max-h-80 overflow-y-auto py-2">

                      {testSuggestions.map(
                        (test) => (

                          <button
                            key={`${test.key}-${test.name}`}
                            type="button"

                            onMouseDown={(
                              event
                            ) =>
                              event.preventDefault()
                            }

                            onClick={() =>
                              selectTest(test)
                            }

                            className="flex w-full items-center justify-between gap-4 px-5 py-3 text-left transition hover:bg-[#f1f7f1]"
                          >

                            <div className="flex items-center gap-3">

                              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#edf5ef] text-[#58775e]">
                                <TestTube2
                                  size={18}
                                />
                              </div>

                              <div>

                                <p className="font-semibold text-[#294b3c]">
                                  {test.name}
                                </p>

                                <p className="mt-0.5 text-xs text-slate-500">
                                  Medical Test •{" "}
                                  {
                                    test.shortName
                                  }
                                </p>

                              </div>

                            </div>

                            <span className="rounded-lg bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                              {
                                test.shortName
                              }
                            </span>

                          </button>
                        )
                      )}

                    </div>

                  ) : (

                    <div className="px-5 py-4 text-sm text-slate-500">
                      No matching medical
                      test found.
                    </div>

                  )}

                </div>
              )}

          </div>

        </section>

        {/* LOADING */}

        {loading && (
          <div className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
            <p className="font-semibold text-blue-700">
              Loading price information...
            </p>
          </div>
        )}

        {/* ERROR */}

        {error && (
          <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-5">
            <p className="font-semibold text-red-600">
              {error}
            </p>
          </div>
        )}

        {/* MAIN COMPARISON */}

        {!loading &&
          !error &&
          providers.length > 0 && (

            <section className="mt-8">

              <article className="rounded-2xl border border-slate-300 bg-white p-7 shadow-sm">

                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">

                  <div>

                    <h2 className="text-2xl font-bold text-slate-900">
                      Price Comparison
                    </h2>

                    <p className="mt-2 font-semibold text-blue-600">
                      {searchTerm}
                    </p>

                    {minimumPrice !== null &&
                      maximumPrice !== null && (

                        <p className="mt-3 text-base text-slate-500">
                          ₹{minimumPrice} - ₹
                          {maximumPrice}
                        </p>

                      )}

                    <p className="mt-2 text-sm text-slate-400">
                      Available at{" "}
                      {providers.length}{" "}
                      provider
                      {providers.length !==
                      1
                        ? "s"
                        : ""}
                    </p>

                  </div>

                  <span className="w-fit rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700">
                    Compare provider types
                  </span>

                </div>

                {/* PROVIDER TYPE CARDS */}

                <div className="mt-8 grid gap-5 lg:grid-cols-3">

                  {/* GOVERNMENT */}

                  <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50 p-6">

                    <div className="flex items-center gap-3 text-emerald-600">
                      <Building2 size={22} />

                      <p className="text-lg font-bold">
                        Government Hospitals
                      </p>
                    </div>

                    {comparison.government
                      .averagePrice !==
                    null ? (
                      <>
                        <p className="mt-5 text-4xl font-bold text-emerald-600">
                          ₹
                          {
                            comparison
                              .government
                              .averagePrice
                          }
                        </p>

                        <p className="mt-2 text-base text-slate-500">
                          Average price
                        </p>
                      </>
                    ) : (
                      <p className="mt-5 text-base font-medium text-slate-500">
                        Price currently
                        unavailable
                      </p>
                    )}

                    <p className="mt-5 border-t border-emerald-200 pt-4 text-sm text-slate-500">
                      {
                        comparison
                          .government
                          .providerCount
                      }{" "}
                      provider
                      {comparison.government
                        .providerCount !== 1
                        ? "s"
                        : ""}
                    </p>

                  </div>

                  {/* PRIVATE */}

                  <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-6">

                    <div className="flex items-center gap-3 text-blue-600">
                      <Building2 size={22} />

                      <p className="text-lg font-bold">
                        Private Hospitals
                      </p>
                    </div>

                    {comparison.private
                      .averagePrice !==
                    null ? (
                      <>
                        <p className="mt-5 text-4xl font-bold text-blue-600">
                          ₹
                          {
                            comparison
                              .private
                              .averagePrice
                          }
                        </p>

                        <p className="mt-2 text-base text-slate-500">
                          Average price
                        </p>
                      </>
                    ) : (
                      <p className="mt-5 text-base font-medium text-slate-500">
                        Price currently
                        unavailable
                      </p>
                    )}

                    <p className="mt-5 border-t border-blue-200 pt-4 text-sm text-slate-500">
                      {
                        comparison.private
                          .providerCount
                      }{" "}
                      provider
                      {comparison.private
                        .providerCount !== 1
                        ? "s"
                        : ""}
                    </p>

                  </div>

                  {/* CLINIC */}

                  <div className="rounded-xl border-2 border-violet-200 bg-violet-50 p-6">

                    <div className="flex items-center gap-3 text-violet-600">
                      <Building2 size={22} />

                      <p className="text-lg font-bold">
                        Small Clinics / Labs
                      </p>
                    </div>

                    {comparison.clinic
                      .averagePrice !==
                    null ? (
                      <>
                        <p className="mt-5 text-4xl font-bold text-violet-600">
                          ₹
                          {
                            comparison.clinic
                              .averagePrice
                          }
                        </p>

                        <p className="mt-2 text-base text-slate-500">
                          Average price
                        </p>
                      </>
                    ) : (
                      <p className="mt-5 text-base font-medium text-slate-500">
                        Price currently
                        unavailable
                      </p>
                    )}

                    <p className="mt-5 border-t border-violet-200 pt-4 text-sm text-slate-500">
                      {
                        comparison.clinic
                          .providerCount
                      }{" "}
                      provider
                      {comparison.clinic
                        .providerCount !== 1
                        ? "s"
                        : ""}
                    </p>

                  </div>

                </div>

                {/* PRICE WARNING */}

                <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">

                  <AlertTriangle
                    size={20}
                    className="mt-0.5 shrink-0 text-amber-700"
                  />

                  <p className="text-sm leading-6 text-slate-600">
                    Prices may differ
                    considerably between
                    government hospitals,
                    private hospitals and
                    smaller clinics or
                    diagnostic laboratories.
                    Compare providers before
                    deciding where to get the
                    test.
                  </p>

                </div>

              </article>

            </section>
          )}

        {/* AVAILABLE PROVIDERS */}

        {!loading &&
          !error &&
          providers.length > 0 && (

            <section className="mt-10">

              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Available Providers
                </h2>

                <p className="mt-2 text-slate-500">
                  View individual
                  demonstration prices.
                </p>
              </div>

              <div className="mt-6 grid gap-5 md:grid-cols-2">

                {providers.map(
                  (provider) => (

                    <article
                      key={`${provider.hospital}-${provider.type}`}
                      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                    >

                      <div className="flex items-start justify-between gap-4">

                        <div className="flex items-center gap-3">

                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            <Building2
                              size={22}
                            />
                          </div>

                          <div>

                            <h3 className="font-bold text-slate-900">
                              {
                                provider.hospital
                              }
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                              {provider.city}
                            </p>

                          </div>

                        </div>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            provider.type ===
                            "government"
                              ? "bg-emerald-50 text-emerald-700"
                              : provider.type ===
                                "private"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-violet-50 text-violet-700"
                          }`}
                        >

                          {provider.type ===
                          "government"
                            ? "Government"
                            : provider.type ===
                              "private"
                            ? "Private"
                            : "Clinic / Lab"}

                        </span>

                      </div>

                      <div className="mt-6 border-t border-slate-100 pt-5">

                        <p className="text-sm text-slate-500">
                          Estimated test price
                        </p>

                        <p className="mt-1 text-3xl font-bold text-blue-600">
                          ₹{provider.price}
                        </p>

                      </div>

                      <div className="mt-4 flex items-center justify-between">

                        <p className="text-sm text-slate-500">
                          Rating:{" "}
                          {provider.rating}
                        </p>

                        <span
                          className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                            provider.available
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-red-50 text-red-600"
                          }`}
                        >

                          {provider.available
                            ? "Available"
                            : "Unavailable"}

                        </span>

                      </div>

                      <button
                        type="button"

                        onClick={() =>
                          navigate(
                            `/hospital-finder?test=${encodeURIComponent(
                              searchTerm
                            )}`
                          )
                        }

                        className="mt-5 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
                      >
                        Find Hospital
                      </button>

                    </article>

                  )
                )}

              </div>

            </section>
          )}

        {/* EMPTY SEARCH */}

        {!searchTerm.trim() && (

          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 py-14 text-center">

            <Search
              size={34}
              className="mx-auto text-slate-400"
            />

            <h2 className="mt-4 text-xl font-bold text-slate-800">
              Search for a medical test
            </h2>

            <p className="mx-auto mt-2 max-w-xl text-slate-500">
              Try CBC, HbA1c, LFT, KFT,
              Vitamin D, Vitamin B12, FBS,
              CRP, ESR, Creatinine or Iron
              Profile.
            </p>

          </div>

        )}

        {/* TEST NOT FOUND */}

        {searchTerm.trim() &&
          !testKey &&
          !loading && (

            <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 py-14 text-center">

              <Search
                size={34}
                className="mx-auto text-slate-400"
              />

              <h2 className="mt-4 text-xl font-bold text-slate-800">
                No test found
              </h2>

              <p className="mt-2 text-slate-500">
                Select a medical test from
                the suggestions above.
              </p>

            </div>

          )}

        {/* DISCLAIMER */}

        <section className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-6">

          <div className="flex items-start gap-3">

            <AlertTriangle
              size={22}
              className="mt-0.5 shrink-0 text-amber-700"
            />

            <div>

              <p className="font-bold text-amber-900">
                Price information
              </p>

              <p className="mt-1 text-sm leading-6 text-amber-800">
                Prices shown are
                demonstration values for the
                TrueTest student project.
                They are not current
                hospital, clinic or
                laboratory quotations.
                Actual charges can vary by
                provider, location and
                services included. Confirm
                the final price directly
                with the healthcare
                provider.
              </p>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default PriceComparison;