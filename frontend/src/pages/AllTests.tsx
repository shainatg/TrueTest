import { useMemo, useState } from "react";
import { ArrowLeft, Search, TestTube2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { testData } from "../data/medicalTests";

function AllTests() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  const tests = useMemo(() => {
    const value = searchText.trim().toLowerCase();

    return Object.entries(testData)
      .filter(([slug, test]) => {
        if (!value) return true;

        return (
          slug.toLowerCase().includes(value) ||
          test.name.toLowerCase().includes(value) ||
          test.category.toLowerCase().includes(value) ||
          test.purpose.toLowerCase().includes(value)
        );
      })
      .sort(([, a], [, b]) => a.name.localeCompare(b.name));
  }, [searchText]);

  return (
    <div className="min-h-screen bg-[#f8fbf8] text-slate-800">
      <div className="bg-[#274c3b] px-4 py-2 text-center text-sm text-white">
        Educational healthcare platform — not a substitute for professional
        medical diagnosis.
      </div>

      <header className="border-b border-emerald-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 font-semibold text-[#315c47]"
          >
            <ArrowLeft size={19} />
            Back to home
          </button>

          <div className="flex items-center gap-2 font-bold text-[#274c3b]">
            <TestTube2 size={22} />
            TrueTest
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="max-w-3xl">
          <p className="font-semibold uppercase tracking-[0.18em] text-[#6f8f72]">
            Medical Tests
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#203f32]">
            Explore medical tests
          </h1>
          <p className="mt-4 leading-7 text-slate-600">
            Search tests and view their purpose, preparation, sample type and
            other educational information.
          </p>
        </div>

        <div className="mt-8 max-w-2xl rounded-2xl border border-emerald-100 bg-white p-3 shadow-sm">
          <div className="flex items-center gap-3 px-2">
            <Search size={21} className="shrink-0 text-[#6f8f72]" />
            <input
              type="text"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search tests by name, category or purpose"
              className="w-full bg-transparent py-2.5 outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="mt-5 text-sm font-medium text-slate-500">
          Showing {tests.length} {tests.length === 1 ? "test" : "tests"}
        </div>

        {tests.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tests.map(([slug, test]) => (
              <button
                key={slug}
                type="button"
                onClick={() => navigate(`/test-details/${slug}`)}
                className="group rounded-3xl border border-emerald-100 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-900/5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf5ef] text-[#58775e] transition group-hover:bg-[#5f7f65] group-hover:text-white">
                  <TestTube2 size={23} />
                </div>

                <span className="mt-5 inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  {test.category}
                </span>

                <h2 className="mt-3 text-lg font-bold text-[#294b3c]">
                  {test.name}
                </h2>

                <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
                  {test.purpose}
                </p>

                <div className="mt-5 border-t border-slate-100 pt-4 text-sm">
                  <p className="text-slate-500">
                    Sample:{" "}
                    <span className="font-medium text-slate-700">
                      {test.sampleType}
                    </span>
                  </p>
                  <p className="mt-1 text-slate-500">
                    Fasting:{" "}
                    <span className="font-medium text-slate-700">
                      {test.fastingRequired}
                    </span>
                  </p>
                </div>

                <p className="mt-5 font-semibold text-[#58775e]">
                  View test details →
                </p>
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-3xl border border-emerald-100 bg-white p-10 text-center">
            <TestTube2 className="mx-auto text-[#6f8f72]" size={34} />
            <h2 className="mt-4 text-lg font-bold text-[#294b3c]">
              No matching tests found
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Try a different test name or category.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default AllTests;