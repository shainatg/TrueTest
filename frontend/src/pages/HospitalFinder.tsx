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
  Stethoscope,
  TestTube2,
} from "lucide-react";

import { hospitals } from "../data/hospitals";

type SuggestionType =
  | "Test"
  | "Hospital"
  | "City"
  | "Specialty";

type SearchSuggestion = {
  type: SuggestionType;
  name: string;
  searchValue: string;
};

function HospitalFinder() {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const requestedTest =
    params.get("test") || "";

  const requestedSpecialty =
    params.get("specialty") || "";

  const [city, setCity] =
    useState("All");

  const [type, setType] =
    useState("All");

  const [hospitalName, setHospitalName] =
    useState("All");

  const [specialty, setSpecialty] =
    useState(
      requestedSpecialty || "All"
    );

  const [searchText, setSearchText] =
    useState("");

  const [searchFocused, setSearchFocused] =
    useState(false);

  // ------------------------------------------------
  // NORMALIZE SEARCH TERMS
  // ------------------------------------------------

  const normalize = (value: string) =>
    value
      .toLowerCase()
      .replace(/\(.*?\)/g, "")
      .replace(/\btest\b/g, "")
      .replace(
        /\bcbc\b/g,
        "complete blood count"
      )
      .replace(
        /\bfbs\b/g,
        "fasting blood sugar"
      )
      .replace(
        /\blft\b/g,
        "liver function"
      )
      .replace(
        /\bkft\b/g,
        "kidney function"
      )
      .replace(
        /\brft\b/g,
        "kidney function"
      )
      .replace(
        /\btft\b/g,
        "thyroid"
      )
      .replace(
        /\bcrp\b/g,
        "c-reactive protein"
      )
      .replace(
        /\besr\b/g,
        "erythrocyte sedimentation rate"
      )
      .replace(
        /\bvit d\b/g,
        "vitamin d"
      )
      .replace(
        /\bvit b12\b/g,
        "vitamin b12"
      )
      .replace(/\s+/g, " ")
      .trim();

  // ------------------------------------------------
  // TEST ALIASES
  // ------------------------------------------------

  const testAliases = [
    {
      name: "Complete Blood Count",
      aliases: ["cbc"],
    },
    {
      name: "HbA1c",
      aliases: [
        "hba1c",
        "glycated hemoglobin",
      ],
    },
    {
      name: "Lipid Profile",
      aliases: [
        "lipid",
        "cholesterol",
      ],
    },
    {
      name: "Thyroid Profile",
      aliases: [
        "thyroid",
        "tft",
        "thyroid function test",
        "tsh",
      ],
    },
    {
      name: "Liver Function Test",
      aliases: [
        "lft",
        "liver function",
      ],
    },
    {
      name: "Kidney Function Test",
      aliases: [
        "kft",
        "rft",
        "kidney function",
        "renal function",
      ],
    },
    {
      name: "Vitamin D",
      aliases: [
        "vitamin d",
        "vit d",
      ],
    },
    {
      name: "Vitamin B12",
      aliases: [
        "vitamin b12",
        "vit b12",
        "b12",
      ],
    },
    {
      name: "Fasting Blood Sugar",
      aliases: [
        "fbs",
        "fasting blood sugar",
        "fasting glucose",
      ],
    },
    {
      name: "C-Reactive Protein",
      aliases: [
        "crp",
        "c-reactive protein",
        "c reactive protein",
      ],
    },
    {
      name:
        "Erythrocyte Sedimentation Rate",
      aliases: [
        "esr",
        "erythrocyte sedimentation rate",
      ],
    },
    {
      name: "Urine Routine Examination",
      aliases: [
        "urine",
        "urine routine",
        "urinalysis",
      ],
    },
    {
      name: "Creatinine",
      aliases: [
        "creatinine",
        "serum creatinine",
      ],
    },
    {
      name: "Iron Profile",
      aliases: [
        "iron",
        "iron profile",
        "iron studies",
      ],
    },
  ];

  // ------------------------------------------------
  // CONVERT REQUESTED TEST TO HOSPITAL TEST NAME
  // ------------------------------------------------

  const getCanonicalTestName = (
    value: string
  ) => {
    const search =
      value.toLowerCase().trim();

    const match = testAliases.find(
      (test) =>
        test.name
          .toLowerCase()
          .includes(search) ||
        search.includes(
          test.name.toLowerCase()
        ) ||
        test.aliases.some(
          (alias) =>
            alias.includes(search) ||
            search.includes(alias)
        )
    );

    return match
      ? match.name
      : value;
  };

  const canonicalRequestedTest =
    getCanonicalTestName(
      requestedTest
    );

  // ------------------------------------------------
  // FILTER OPTIONS
  // ------------------------------------------------

  const cities = useMemo(
    () => [
      "All",
      ...Array.from(
        new Set(
          hospitals.map(
            (hospital) =>
              hospital.city
          )
        )
      ),
    ],
    []
  );

  const types = useMemo(
    () => [
      "All",
      ...Array.from(
        new Set(
          hospitals.map(
            (hospital) =>
              hospital.type
          )
        )
      ),
    ],
    []
  );

  const hospitalNames = useMemo(
    () => [
      "All",
      ...hospitals.map(
        (hospital) =>
          hospital.name
      ),
    ],
    []
  );

  const specialties = useMemo(
    () => [
      "All",
      ...Array.from(
        new Set(
          hospitals.flatMap(
            (hospital) =>
              hospital.specialties
          )
        )
      ),
    ],
    []
  );

  const availableTestNames =
    useMemo(
      () =>
        Array.from(
          new Set(
            hospitals.flatMap(
              (hospital) =>
                hospital.tests.map(
                  (test) =>
                    test.name
                )
            )
          )
        ),
      []
    );

  // ------------------------------------------------
  // SMART SEARCH SUGGESTIONS
  // ------------------------------------------------

  const searchSuggestions =
    useMemo(() => {
      const search =
        searchText
          .trim()
          .toLowerCase();

      if (!search) {
        return [];
      }

      const suggestions:
        SearchSuggestion[] = [];

      // TESTS

      testAliases.forEach(
        (test) => {
          const matches =
            test.name
              .toLowerCase()
              .includes(search) ||
            test.aliases.some(
              (alias) =>
                alias.includes(
                  search
                )
            );

          const exists =
            availableTestNames.some(
              (availableTest) =>
                normalize(
                  availableTest
                ).includes(
                  normalize(
                    test.name
                  )
                ) ||
                normalize(
                  test.name
                ).includes(
                  normalize(
                    availableTest
                  )
                )
            );

          if (matches && exists) {
            suggestions.push({
              type: "Test",
              name: test.name,
              searchValue:
                test.name,
            });
          }
        }
      );

      // OTHER TESTS FROM DATABASE

      availableTestNames.forEach(
        (testName) => {
          if (
            testName
              .toLowerCase()
              .includes(search) &&
            !suggestions.some(
              (item) =>
                item.type ===
                  "Test" &&
                item.name ===
                  testName
            )
          ) {
            suggestions.push({
              type: "Test",
              name: testName,
              searchValue:
                testName,
            });
          }
        }
      );

      // HOSPITALS

      hospitals.forEach(
        (hospital) => {
          if (
            hospital.name
              .toLowerCase()
              .includes(search)
          ) {
            suggestions.push({
              type: "Hospital",
              name: hospital.name,
              searchValue:
                hospital.name,
            });
          }
        }
      );

      // CITIES

      cities
        .filter(
          (item) =>
            item !== "All"
        )
        .forEach((item) => {
          if (
            item
              .toLowerCase()
              .includes(search)
          ) {
            suggestions.push({
              type: "City",
              name: item,
              searchValue: item,
            });
          }
        });

      // SPECIALTIES

      specialties
        .filter(
          (item) =>
            item !== "All"
        )
        .forEach((item) => {
          if (
            item
              .toLowerCase()
              .includes(search)
          ) {
            suggestions.push({
              type: "Specialty",
              name: item,
              searchValue: item,
            });
          }
        });

      return suggestions.slice(
        0,
        10
      );
    }, [
      searchText,
      cities,
      specialties,
      availableTestNames,
    ]);

  // ------------------------------------------------
  // SELECT SMART SEARCH SUGGESTION
  // ------------------------------------------------

  const selectSuggestion = (
    suggestion: SearchSuggestion
  ) => {
    setSearchText(
      suggestion.searchValue
    );

    setSearchFocused(false);

    if (
      suggestion.type ===
      "City"
    ) {
      setCity(
        suggestion.name
      );
    }

    if (
      suggestion.type ===
      "Hospital"
    ) {
      setHospitalName(
        suggestion.name
      );
    }

    if (
      suggestion.type ===
      "Specialty"
    ) {
      setSpecialty(
        suggestion.name
      );
    }
  };

  // ------------------------------------------------
  // FILTER HOSPITALS
  // ------------------------------------------------

  const filteredHospitals =
    hospitals.filter(
      (hospital) => {
        const matchesCity =
          city === "All" ||
          hospital.city === city;

        const matchesType =
          type === "All" ||
          hospital.type === type;

        const matchesHospital =
          hospitalName === "All" ||
          hospital.name ===
            hospitalName;

        const matchesSpecialty =
          specialty === "All" ||
          hospital.specialties.some(
            (item) =>
              normalize(item) ===
              normalize(
                specialty
              )
          );

        const search =
          normalize(searchText);

        const matchesSearch =
          !search ||
          normalize(
            hospital.name
          ).includes(search) ||
          normalize(
            hospital.city
          ).includes(search) ||
          normalize(
            hospital.area
          ).includes(search) ||
          hospital.specialties.some(
            (item) =>
              normalize(
                item
              ).includes(
                search
              )
          ) ||
          hospital.tests.some(
            (test) => {
              const testName =
                normalize(
                  test.name
                );

              return (
                testName.includes(
                  search
                ) ||
                search.includes(
                  testName
                )
              );
            }
          );

        const wantedTest =
          normalize(
            canonicalRequestedTest
          );

        const matchesRequestedTest =
          !wantedTest ||
          hospital.tests.some(
            (test) => {
              const hospitalTest =
                normalize(
                  test.name
                );

              return (
                hospitalTest ===
                  wantedTest ||
                hospitalTest.includes(
                  wantedTest
                ) ||
                wantedTest.includes(
                  hospitalTest
                )
              );
            }
          );

        return (
          matchesCity &&
          matchesType &&
          matchesHospital &&
          matchesSpecialty &&
          matchesSearch &&
          matchesRequestedTest
        );
      }
    );

  // ------------------------------------------------
  // COMPARE HOSPITAL
  // ------------------------------------------------

  const compareHospital = (
    hospitalId: number
  ) => {
    if (requestedTest) {
      navigate(
        `/price-comparison?hospital=${hospitalId}&test=${encodeURIComponent(
          requestedTest
        )}`
      );

      return;
    }

    navigate(
      `/price-comparison?hospital=${hospitalId}`
    );
  };

  // ------------------------------------------------
  // CLEAR FILTERS
  // ------------------------------------------------

  const clearFilters = () => {
    setCity("All");
    setType("All");
    setHospitalName("All");
    setSpecialty("All");
    setSearchText("");
    setSearchFocused(false);

    navigate(
      "/hospital-finder"
    );
  };

  // ------------------------------------------------
  // ICON FOR SUGGESTIONS
  // ------------------------------------------------

  const getSuggestionIcon = (
    suggestionType:
      SuggestionType
  ) => {
    if (
      suggestionType ===
      "Test"
    ) {
      return (
        <TestTube2 size={18} />
      );
    }

    if (
      suggestionType ===
      "Hospital"
    ) {
      return (
        <Building2 size={18} />
      );
    }

    if (
      suggestionType ===
      "City"
    ) {
      return (
        <MapPin size={18} />
      );
    }

    return (
      <Stethoscope size={18} />
    );
  };

  return (
    <div className="min-h-screen bg-white text-slate-800">

      {/* HEADER */}

      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">

          <button
            type="button"
            onClick={() =>
              navigate("/")
            }
            className="flex items-center gap-3"
          >

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <Activity
                size={25}
              />
            </div>

            <span className="text-2xl font-bold text-sky-600">
              TrueTest
            </span>

          </button>

          <button
            type="button"
            onClick={() =>
              navigate(
                "/price-comparison"
              )
            }
            className="rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700"
          >
            Compare Prices
          </button>

        </div>

      </header>

      <main className="mx-auto max-w-7xl px-5 py-10 lg:px-8">

        {/* TITLE */}

        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Hospital Finder
        </h1>

        <p className="mt-4 text-lg text-slate-500">
          Find hospitals by location,
          specialty, services and test
          availability.
        </p>

        {/* SPECIALTY REQUEST */}

        {requestedSpecialty && (
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 px-5 py-4">

            <Stethoscope
              size={21}
              className="mt-0.5 shrink-0 text-blue-700"
            />

            <div>

              <p className="font-semibold text-blue-800">
                Suggested specialty:{" "}
                {requestedSpecialty}
              </p>

              <p className="mt-1 text-sm text-blue-700">
                Showing healthcare
                providers offering this
                specialty.
              </p>

            </div>

          </div>
        )}

        {/* TEST REQUEST */}

        {requestedTest && (
          <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4">

            <p className="font-semibold text-emerald-800">
              Showing hospitals offering:{" "}
              {canonicalRequestedTest}
            </p>

          </div>
        )}

        {/* SMART SEARCH */}

        <div className="relative mt-8">

          <div className="relative">

            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={searchText}

              onFocus={() =>
                setSearchFocused(
                  true
                )
              }

              onBlur={() => {
                window.setTimeout(
                  () =>
                    setSearchFocused(
                      false
                    ),
                  150
                );
              }}

              onChange={(
                event
              ) => {
                setSearchText(
                  event.target
                    .value
                );

                setSearchFocused(
                  true
                );
              }}

              onKeyDown={(
                event
              ) => {
                if (
                  event.key ===
                  "Escape"
                ) {
                  setSearchFocused(
                    false
                  );
                }
              }}

              placeholder="Search hospital, city, specialty or medical test..."
              autoComplete="off"

              className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-12 pr-4 outline-none focus:border-blue-500"
            />

          </div>

          {/* AUTOCOMPLETE */}

          {searchFocused &&
            searchText.trim() && (

              <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-xl">

                {searchSuggestions.length >
                0 ? (

                  <div className="max-h-80 overflow-y-auto py-2">

                    {searchSuggestions.map(
                      (
                        suggestion,
                        index
                      ) => (

                        <button
                          key={`${suggestion.type}-${suggestion.name}-${index}`}
                          type="button"

                          onMouseDown={(
                            event
                          ) =>
                            event.preventDefault()
                          }

                          onClick={() =>
                            selectSuggestion(
                              suggestion
                            )
                          }

                          className="flex w-full items-center justify-between gap-4 px-5 py-3 text-left transition hover:bg-[#f1f7f1]"
                        >

                          <div className="flex items-center gap-3">

                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#edf5ef] text-[#58775e]">

                              {getSuggestionIcon(
                                suggestion.type
                              )}

                            </div>

                            <div>

                              <p className="font-semibold text-[#294b3c]">
                                {
                                  suggestion.name
                                }
                              </p>

                              <p className="mt-0.5 text-xs text-slate-500">
                                {
                                  suggestion.type
                                }
                              </p>

                            </div>

                          </div>

                          <ChevronRight
                            size={18}
                            className="text-[#6f8f72]"
                          />

                        </button>

                      )
                    )}

                  </div>

                ) : (

                  <div className="px-5 py-4 text-sm text-slate-500">
                    No matching
                    hospital, test,
                    city or specialty
                    found.
                  </div>

                )}

              </div>
            )}

        </div>

        {/* FILTERS */}

        <section className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <select
            value={city}
            onChange={(event) =>
              setCity(
                event.target.value
              )
            }
            className="rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-slate-700 outline-none"
          >

            {cities.map(
              (item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item === "All"
                    ? "All Cities"
                    : item}
                </option>
              )
            )}

          </select>

          <select
            value={type}
            onChange={(event) =>
              setType(
                event.target.value
              )
            }
            className="rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-slate-700 outline-none"
          >

            {types.map(
              (item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item === "All"
                    ? "All Types"
                    : item}
                </option>
              )
            )}

          </select>

          <select
            value={specialty}
            onChange={(event) =>
              setSpecialty(
                event.target.value
              )
            }
            className="rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-slate-700 outline-none"
          >

            {specialties.map(
              (item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item === "All"
                    ? "All Specialties"
                    : item}
                </option>
              )
            )}

          </select>

          <select
            value={hospitalName}
            onChange={(event) =>
              setHospitalName(
                event.target.value
              )
            }
            className="rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-slate-700 outline-none"
          >

            {hospitalNames.map(
              (item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item === "All"
                    ? "All Hospitals"
                    : item}
                </option>
              )
            )}

          </select>

        </section>

        {/* RESULT COUNT */}

        <div className="mt-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

          <p className="text-slate-500">
            Showing{" "}
            {filteredHospitals.length}{" "}
            of {hospitals.length}{" "}
            hospitals
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className="w-fit text-sm font-semibold text-blue-700"
          >
            Clear filters
          </button>

        </div>

        {/* HOSPITAL CARDS */}

        {filteredHospitals.length >
        0 ? (

          <section className="mt-8 grid gap-7 lg:grid-cols-2">

            {filteredHospitals.map(
              (hospital) => {

                const selectedTest =
                  requestedTest
                    ? hospital.tests.find(
                        (test) => {
                          const hospitalTest =
                            normalize(
                              test.name
                            );

                          const wantedTest =
                            normalize(
                              canonicalRequestedTest
                            );

                          return (
                            hospitalTest ===
                              wantedTest ||
                            hospitalTest.includes(
                              wantedTest
                            ) ||
                            wantedTest.includes(
                              hospitalTest
                            )
                          );
                        }
                      )
                    : undefined;

                return (

                  <article
                    key={hospital.id}
                    className="rounded-2xl border border-slate-300 bg-white p-7 shadow-sm transition hover:shadow-md"
                  >

                    {/* NAME */}

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

                    {/* TYPE */}

                    <div className="mt-4 flex flex-wrap items-center gap-2">

                      <span
                        className={`rounded-lg px-3 py-1 text-sm font-semibold text-white ${
                          hospital.type.includes(
                            "Government"
                          )
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

                    {/* SPECIALTIES */}

                    <div className="mt-6">

                      <p className="text-sm font-medium text-slate-500">
                        Specialties:
                      </p>

                      <div className="mt-2 flex flex-wrap gap-2">

                        {hospital.specialties.map(
                          (item) => (

                            <span
                              key={`${hospital.id}-${item}`}
                              className="rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700"
                            >
                              {item}
                            </span>

                          )
                        )}

                      </div>

                    </div>

                    {/* LOCATION */}

                    <div className="mt-6 flex items-start gap-3 text-slate-600">

                      <MapPin
                        size={20}
                        className="mt-0.5 shrink-0"
                      />

                      <span>
                        {hospital.address}
                      </span>

                    </div>

                    {/* PHONE */}

                    <div className="mt-3 flex items-center gap-3 text-slate-600">

                      <Phone
                        size={20}
                      />

                      <span>
                        {hospital.phone}
                      </span>

                    </div>

                    {/* TESTS */}

                    <div className="mt-7">

                      <p className="text-sm font-medium text-slate-500">
                        Available tests:
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">

                        {hospital.tests
                          .slice(0, 6)
                          .map(
                            (test) => (

                              <span
                                key={`${hospital.id}-${test.name}`}
                                className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700"
                              >
                                {test.name}
                              </span>

                            )
                          )}

                        {hospital.tests
                          .length > 6 && (

                          <span className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700">

                            +
                            {hospital.tests
                              .length -
                              6}{" "}
                            more

                          </span>

                        )}

                      </div>

                    </div>

                    {/* SELECTED TEST PRICE */}

                    {requestedTest &&
                      selectedTest && (

                        <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">

                          <p className="text-sm text-emerald-700">
                            {
                              selectedTest.name
                            }
                          </p>

                          <p className="mt-1 text-xl font-bold text-emerald-700">
                            ₹
                            {
                              selectedTest.price
                            }
                          </p>

                        </div>

                      )}

                    {/* ACTIONS */}

                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">

                      <a
                        href={`tel:${hospital.phone}`}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-blue-200 px-4 py-3 font-semibold text-blue-700 hover:bg-blue-50"
                      >

                        <Phone
                          size={18}
                        />

                        Call

                      </a>

                      {requestedTest && (

                        <button
                          type="button"

                          onClick={() =>
                            compareHospital(
                              hospital.id
                            )
                          }

                          className="flex-1 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700"
                        >
                          Compare Prices
                        </button>

                      )}

                    </div>

                  </article>

                );
              }
            )}

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
              Try changing the city,
              specialty, hospital type or
              medical test.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white"
            >
              Clear Filters
            </button>

          </div>

        )}

        {/* DISCLAIMER */}

        <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-900">

          <p className="font-semibold">
            Hospital information
          </p>

          <p className="mt-2 text-sm leading-6">
            Hospital services,
            specialist availability,
            test availability, prices
            and emergency availability
            may change. Confirm the
            required specialist,
            service, final price and
            availability directly with
            the healthcare provider
            before visiting.
          </p>

        </div>

      </main>

    </div>
  );
}

export default HospitalFinder;