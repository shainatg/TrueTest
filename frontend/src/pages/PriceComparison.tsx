import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  Building2,
  Search,
} from "lucide-react";

import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { hospitals } from "../data/hospitals";
import { testPrices } from "../data/prices";

function PriceComparison() {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const selectedTestFromUrl = params.get("test") || "";

  const [searchTerm, setSearchTerm] = useState(selectedTestFromUrl);

  const hospitalTypeMap = useMemo(() => {
    return new Map(
      hospitals.map((hospital) => [
        hospital.id,
        hospital.type,
      ])
    );
  }, []);

  const testNames = useMemo(() => {
    return Array.from(
      new Set(testPrices.map((item) => item.test))
    );
  }, []);

  const comparisonData = useMemo(() => {
    return testNames.map((testName) => {
      const pricesForTest = testPrices.filter(
        (item) => item.test === testName
      );

      const governmentPrices = pricesForTest
        .filter((item) => {
          const hospitalType =
            hospitalTypeMap.get(item.hospitalId) || "";

          return hospitalType
            .toLowerCase()
            .includes("government");
        })
        .map((item) => item.price);

      const privatePrices = pricesForTest
        .filter((item) => {
          const hospitalType =
            hospitalTypeMap.get(item.hospitalId) || "";

          return !hospitalType
            .toLowerCase()
            .includes("government");
        })
        .map((item) => item.price);

      const average = (values: readonly number[]) => {
        if (values.length === 0) {
          return null;
        }

        return Math.round(
          values.reduce((sum, value) => sum + value, 0) /
            values.length
        );
      };

      const allPrices = pricesForTest.map(
        (item) => item.price
      );

      return {
        testName,
        governmentPrice: average(governmentPrices),
        privatePrice: average(privatePrices),
        minimumPrice:
          allPrices.length > 0
            ? Math.min(...allPrices)
            : null,
        maximumPrice:
          allPrices.length > 0
            ? Math.max(...allPrices)
            : null,
        providerCount: pricesForTest.length,
      };
    });
  }, [testNames, hospitalTypeMap]);

 const normalizeTestName = (name: string) =>
  name
    .toLowerCase()
    .replace(/\(.*?\)/g, "")
    .replace(/\btest\b/g, "")
    .replace(/\bfbs\b/g, "fasting blood sugar")
    .replace(/\bcbc\b/g, "complete blood count")
    .replace(/\s+/g, " ")
    .trim();

const filteredTests = comparisonData.filter((test) => {
  const testName = normalizeTestName(test.testName);
  const searchName = normalizeTestName(searchTerm);

  return (
    testName.includes(searchName) ||
    searchName.includes(testName)
  );
});

  const calculatePercentageDifference = (
    governmentPrice: number,
    privatePrice: number
  ) => {
    return Math.round(
      ((privatePrice - governmentPrice) /
        governmentPrice) *
        100
    );
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
            Compare average prices between government and
            private hospitals
          </p>

          {/* SEARCH */}
          <div className="relative mt-7">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              placeholder="Search medical test..."
              className="w-full rounded-xl border border-slate-300 py-3.5 pl-12 pr-4 text-slate-700 outline-none focus:border-blue-500"
            />
          </div>

          <p className="mt-4 text-sm text-slate-500">
            {filteredTests.length} test
            {filteredTests.length !== 1 ? "s" : ""} found
          </p>
        </section>

        {/* PRICE CARDS */}
        <section className="mt-8 space-y-6">

          {filteredTests.map((test) => {
            const hasGovernmentPrice =
              test.governmentPrice !== null;

            const hasPrivatePrice =
              test.privatePrice !== null;

            const percentageDifference =
              hasGovernmentPrice &&
              hasPrivatePrice
                ? calculatePercentageDifference(
                    test.governmentPrice!,
                    test.privatePrice!
                  )
                : null;

            return (
              <article
                key={test.testName}
                className="rounded-2xl border border-slate-300 bg-white p-7 shadow-sm"
              >

                {/* TEST NAME */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">

                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {test.testName}
                    </h2>

                    {test.minimumPrice !== null &&
                      test.maximumPrice !== null && (
                        <p className="mt-3 text-base text-slate-500">
                          ₹{test.minimumPrice} - ₹
                          {test.maximumPrice}
                        </p>
                      )}

                    <p className="mt-2 text-sm text-slate-400">
                      Available at {test.providerCount} provider
                      {test.providerCount !== 1 ? "s" : ""}
                    </p>
                  </div>

                  {percentageDifference !== null && (
                    <span
                      className={`w-fit rounded-lg border px-3 py-1.5 text-sm font-medium ${
                        percentageDifference >= 0
                          ? "border-red-400 text-red-500"
                          : "border-emerald-400 text-emerald-600"
                      }`}
                    >
                      {percentageDifference >= 0
                        ? `${percentageDifference}% higher in private`
                        : `${Math.abs(
                            percentageDifference
                          )}% lower in private`}
                    </span>
                  )}

                </div>

                {/* GOVERNMENT + PRIVATE */}
                <div className="mt-8 grid gap-5 md:grid-cols-2">

                  {/* GOVERNMENT */}
                  <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50 p-6">

                    <div className="flex items-center gap-3 text-emerald-600">
                      <Building2 size={22} />

                      <p className="text-lg font-bold">
                        Government Hospitals
                      </p>
                    </div>

                    {hasGovernmentPrice ? (
                      <>
                        <p className="mt-5 text-4xl font-bold text-emerald-600">
                          ₹{test.governmentPrice}
                        </p>

                        <p className="mt-2 text-base text-slate-500">
                          Average price
                        </p>
                      </>
                    ) : (
                      <p className="mt-5 text-base font-medium text-slate-500">
                        Price currently unavailable
                      </p>
                    )}

                  </div>

                  {/* PRIVATE */}
                  <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-6">

                    <div className="flex items-center gap-3 text-blue-600">
                      <Building2 size={22} />

                      <p className="text-lg font-bold">
                        Private Hospitals
                      </p>
                    </div>

                    {hasPrivatePrice ? (
                      <>
                        <p className="mt-5 text-4xl font-bold text-blue-600">
                          ₹{test.privatePrice}
                        </p>

                        <p className="mt-2 text-base text-slate-500">
                          Average price
                        </p>
                      </>
                    ) : (
                      <p className="mt-5 text-base font-medium text-slate-500">
                        Price currently unavailable
                      </p>
                    )}

                  </div>

                </div>

                {/* COMPARISON MESSAGE */}
                {percentageDifference !== null && (
                  <div className="mt-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-4">

                    <AlertTriangle
                      size={20}
                      className="mt-0.5 shrink-0 text-slate-700"
                    />

                    <p className="text-sm leading-6 text-slate-600">
                      Prices differ between provider types.
                      Compare available hospitals before choosing
                      where to get this test.
                    </p>

                  </div>
                )}

                {/* FIND HOSPITALS */}
                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      `/hospital-finder?test=${encodeURIComponent(
                        test.testName
                      )}`
                    )
                  }
                  className="mt-5 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
                >
                  Find Hospitals for This Test
                </button>

              </article>
            );
          })}

        </section>

        {/* NO RESULTS */}
        {filteredTests.length === 0 && (
          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 py-14 text-center">

            <Search
              size={34}
              className="mx-auto text-slate-400"
            />

            <h2 className="mt-4 text-xl font-bold text-slate-800">
              No tests found
            </h2>

            <p className="mt-2 text-slate-500">
              Try searching with another test name.
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
                Prices may vary depending on the hospital,
                location, laboratory and services included.
                Confirm the final price directly with the
                healthcare provider before booking or visiting.
              </p>
            </div>

          </div>

        </section>

      </main>
    </div>
  );
}

export default PriceComparison;