import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Activity,
  Building2,
  ChevronRight,
  MapPin,
  Phone,
  Search,
  Star,
} from "lucide-react";

import { hospitals } from "../data/hospitals";

function HospitalFinder() {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const requestedTest = params.get("test") || "";

  const [city, setCity] = useState("All");
  const [type, setType] = useState("All");
  const [hospitalName, setHospitalName] = useState("All");
  const [searchText, setSearchText] = useState("");

  const cities = useMemo(
    () => ["All", ...Array.from(new Set(hospitals.map((h) => h.city)))],
    []
  );

  const types = useMemo(
    () => ["All", ...Array.from(new Set(hospitals.map((h) => h.type)))],
    []
  );

  const hospitalNames = useMemo(
    () => ["All", ...hospitals.map((h) => h.name)],
    []
  );

  const normalize = (value: string) =>
    value
      .toLowerCase()
      .replace(/\(.*?\)/g, "")
      .replace(/\btest\b/g, "")
      .replace(/\bfbs\b/g, "fasting blood sugar")
      .replace(/\bcbc\b/g, "complete blood count")
      .replace(/\s+/g, " ")
      .trim();

  const filteredHospitals = hospitals.filter((hospital) => {
    const matchesCity = city === "All" || hospital.city === city;

    const matchesType = type === "All" || hospital.type === type;

    const matchesHospital =
      hospitalName === "All" || hospital.name === hospitalName;

    const search = normalize(searchText);

    const matchesSearch =
      !search ||
      normalize(hospital.name).includes(search) ||
      normalize(hospital.city).includes(search) ||
      normalize(hospital.area).includes(search) ||
      hospital.tests.some((test) =>
        normalize(test.name).includes(search)
      );

    const testWanted = normalize(requestedTest);

    const matchesRequestedTest =
      !testWanted ||
      hospital.tests.some((test) => {
        const hospitalTest = normalize(test.name);

        return (
          hospitalTest === testWanted ||
          hospitalTest.includes(testWanted) ||
          testWanted.includes(hospitalTest)
        );
      });

    return (
      matchesCity &&
      matchesType &&
      matchesHospital &&
      matchesSearch &&
      matchesRequestedTest
    );
  });

  const compareHospital = (hospitalId: number) => {
    if (requestedTest) {
      navigate(
        `/price-comparison?hospital=${hospitalId}&test=${encodeURIComponent(
          requestedTest
        )}`
      );
    } else {
      navigate(`/price-comparison?hospital=${hospitalId}`);
    }
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
              <Activity size={25} />
            </div>

            <span className="text-2xl font-bold text-sky-600">
              TrueTest
            </span>
          </button>

          <button
            type="button"
            onClick={() => navigate("/price-comparison")}
            className="rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700"
          >
            Compare Prices
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Hospital Finder
        </h1>

        <p className="mt-4 text-lg text-slate-500">
          Find hospitals with services, prices, and emergency availability
        </p>

        {requestedTest && (
          <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 px-5 py-4">
            <p className="font-semibold text-blue-800">
              Showing hospitals offering: {requestedTest}
            </p>
          </div>
        )}

        {/* SEARCH */}
        <div className="relative mt-8">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search hospital, city, area, or medical test..."
            className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-12 pr-4 outline-none focus:border-blue-500"
          />
        </div>

        {/* FILTERS */}
        <section className="mt-5 grid gap-4 md:grid-cols-3">
          <select
            value={city}
            onChange={(event) => setCity(event.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-slate-700 outline-none"
          >
            {cities.map((item) => (
              <option key={item} value={item}>
                {item === "All" ? "All Cities" : item}
              </option>
            ))}
          </select>

          <select
            value={type}
            onChange={(event) => setType(event.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-slate-700 outline-none"
          >
            {types.map((item) => (
              <option key={item} value={item}>
                {item === "All" ? "All Types" : item}
              </option>
            ))}
          </select>

          <select
            value={hospitalName}
            onChange={(event) => setHospitalName(event.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-slate-700 outline-none"
          >
            {hospitalNames.map((item) => (
              <option key={item} value={item}>
                {item === "All" ? "All Hospitals" : item}
              </option>
            ))}
          </select>
        </section>

        {/* NUMBER OF RESULTS */}
        <p className="mt-8 text-slate-500">
          Showing {filteredHospitals.length} of {hospitals.length} hospitals
        </p>

        {/* HOSPITAL CARDS */}
        {filteredHospitals.length > 0 ? (
          <section className="mt-8 grid gap-7 lg:grid-cols-2">
            {filteredHospitals.map((hospital) => (
              <article
                key={hospital.id}
                className="rounded-2xl border border-slate-300 bg-white p-7 shadow-sm transition hover:shadow-md"
              >
                {/* HOSPITAL NAME */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Building2
                      size={27}
                      className="text-blue-600"
                    />

                    <h2 className="text-2xl font-bold text-slate-900">
                      {hospital.name}
                    </h2>
                  </div>

                  <ChevronRight
                    size={24}
                    className="text-slate-500"
                  />
                </div>

                {/* TYPE + EMERGENCY + RATING */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-lg px-3 py-1 text-sm font-semibold text-white ${
                      hospital.type.includes("Government")
                        ? "bg-emerald-500"
                        : "bg-blue-600"
                    }`}
                  >
                    {hospital.type}
                  </span>

                  {hospital.emergency && (
                    <span className="rounded-lg bg-red-500 px-3 py-1 text-sm font-semibold text-white">
                      24/7 Emergency
                    </span>
                  )}

                  <span className="flex items-center gap-1 text-slate-600">
                    <Star
                      size={18}
                      className="fill-yellow-400 text-yellow-400"
                    />
                    {hospital.rating}
                  </span>
                </div>

                {/* LOCATION */}
                <div className="mt-7 flex items-start gap-3 text-slate-600">
                  <MapPin size={20} className="mt-0.5 shrink-0" />

                  <span>{hospital.address}</span>
                </div>

                {/* PHONE */}
                <div className="mt-3 flex items-center gap-3 text-slate-600">
                  <Phone size={20} />

                  <span>{hospital.phone}</span>
                </div>

                {/* SERVICES */}
                <div className="mt-7">
                  <p className="text-sm font-medium text-slate-500">
                    Services:
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {hospital.tests.slice(0, 4).map((test) => (
                      <span
                        key={`${hospital.id}-${test.name}`}
                        className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700"
                      >
                        {test.name}
                      </span>
                    ))}

                    {hospital.tests.length > 4 && (
                      <span className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700">
                        +{hospital.tests.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* SELECTED TEST PRICE */}
                {requestedTest && (
                  <div className="mt-6">
                    {hospital.tests
                      .filter((test) => {
                        const hospitalTest = normalize(test.name);
                        const wantedTest = normalize(requestedTest);

                        return (
                          hospitalTest === wantedTest ||
                          hospitalTest.includes(wantedTest) ||
                          wantedTest.includes(hospitalTest)
                        );
                      })
                      .map((test) => (
                        <div
                          key={`${hospital.id}-${test.name}-price`}
                          className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3"
                        >
                          <p className="text-sm text-emerald-700">
                            {test.name}
                          </p>

                          <p className="mt-1 text-xl font-bold text-emerald-700">
                            ₹{test.price}
                          </p>
                        </div>
                      ))}
                  </div>
                )}

                {/* BUTTONS */}
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={`tel:${hospital.phone}`}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-blue-200 px-4 py-3 font-semibold text-blue-700 hover:bg-blue-50"
                  >
                    <Phone size={18} />
                    Call
                  </a>

                  <button
                    type="button"
                    onClick={() => compareHospital(hospital.id)}
                    className="flex-1 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700"
                  >
                    Compare Prices
                  </button>
                </div>
              </article>
            ))}
          </section>
        ) : (
          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center">
            <Building2
              size={42}
              className="mx-auto text-slate-400"
            />

            <h2 className="mt-4 text-xl font-bold text-slate-800">
              No hospitals found
            </h2>

            <p className="mt-2 text-slate-500">
              Try changing the city, hospital type, hospital name, or medical
              test.
            </p>

            <button
              type="button"
              onClick={() => {
                setCity("All");
                setType("All");
                setHospitalName("All");
                setSearchText("");
                navigate("/hospital-finder");
              }}
              className="mt-5 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* DISCLAIMER */}
        <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-900">
          <p className="font-semibold">Hospital information</p>

          <p className="mt-2 text-sm leading-6">
            Hospital services, test availability, prices, and emergency
            availability may change. Confirm the required service, final price,
            and availability directly with the healthcare provider before
            visiting.
          </p>
        </div>
      </main>
    </div>
  );
}

export default HospitalFinder;