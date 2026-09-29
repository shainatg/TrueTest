import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  Building2,
  CheckCircle2,
  HeartPulse,
  Search,
  ShieldAlert,
  Stethoscope,
  TestTube2,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Assessment = {
  title: string;
  summary: string;
  possibilities: string[];
  specialist: string;
  specialty: string;
  tests: {
    name: string;
    slug: string;
  }[];
  urgency: "Routine" | "Medical review advised" | "Urgent";
  redFlags: string[];
  advice: string[];
};

const assessments: {
  keywords: string[];
  result: Assessment;
}[] = [
  {
    keywords: [
      "chest pain",
      "chest pressure",
      "chest tightness",
      "palpitation",
      "palpitations",
      "heart racing",
    ],

    result: {
      title: "Cardiovascular symptom pattern",

      summary:
        "Your symptoms involve the chest or heartbeat. Several causes are possible, ranging from non-cardiac conditions to heart rhythm or cardiovascular problems. Symptoms alone cannot confirm the cause.",

      possibilities: [
        "Musculoskeletal chest discomfort",
        "Acid reflux or gastrointestinal causes",
        "Anxiety-related symptoms",
        "Heart rhythm disturbance",
        "Cardiovascular disease",
      ],

      specialist: "Cardiologist",
      specialty: "Cardiology",

      tests: [
        {
          name: "ECG",
          slug: "ecg",
        },
        {
          name: "Blood Pressure Measurement",
          slug: "blood-pressure-measurement",
        },
        {
          name: "Lipid Profile",
          slug: "lipid-profile",
        },
      ],

      urgency: "Medical review advised",

      redFlags: [
        "Sudden or persistent chest pressure or severe chest pain",
        "Chest pain spreading to the arm, jaw, neck or back",
        "Chest pain with sweating, fainting, nausea or significant breathlessness",
      ],

      advice: [
        "Avoid strenuous activity until significant chest symptoms are assessed.",
        "Note when the symptoms occur, how long they last and whether activity triggers them.",
        "Seek prompt medical assessment if symptoms are new, recurrent or worsening.",
      ],
    },
  },

  {
    keywords: [
      "headache",
      "migraine",
      "dizziness",
      "weakness",
      "numbness",
      "slurred speech",
      "confusion",
    ],

    result: {
      title: "Neurological symptom pattern",

      summary:
        "These symptoms may involve the nervous system. Headache and dizziness commonly have benign causes, but sudden neurological changes require urgent assessment.",

      possibilities: [
        "Migraine or tension-type headache",
        "Dehydration or fatigue",
        "Blood-pressure related symptoms",
        "Inner-ear or balance disorder",
        "Neurological disorder",
      ],

      specialist: "Neurologist",
      specialty: "Neurology",

      tests: [
        {
          name: "Neurological Examination",
          slug: "neurological-examination",
        },
        {
          name: "MRI Brain",
          slug: "mri-brain",
        },
        {
          name: "CT Brain",
          slug: "ct-brain",
        },
      ],

      urgency: "Medical review advised",

      redFlags: [
        "Sudden weakness or numbness on one side of the body",
        "Sudden difficulty speaking or understanding speech",
        "Sudden loss of balance or vision",
        "Sudden severe headache unlike your usual headaches",
      ],

      advice: [
        "Record when the symptoms started and whether they were sudden or gradual.",
        "Note associated symptoms such as vomiting, vision changes or weakness.",
        "Seek urgent care for sudden neurological deficits.",
      ],
    },
  },

  {
    keywords: [
      "fever",
      "body pain",
      "body ache",
      "chills",
      "fatigue",
      "viral",
    ],

    result: {
      title: "Fever and systemic symptom pattern",

      summary:
        "Fever with body aches or fatigue often occurs with infections, although many different illnesses can produce this pattern. The duration, temperature and associated symptoms are important.",

      possibilities: [
        "Viral illness",
        "Respiratory infection",
        "Dengue or another febrile illness depending on exposure and symptoms",
        "Other bacterial or inflammatory causes",
      ],

      specialist: "General Physician",
      specialty: "General Medicine",

      tests: [
        {
          name: "Complete Blood Count",
          slug: "complete-blood-count",
        },
        {
          name: "Dengue NS1 Antigen",
          slug: "dengue-ns1-antigen",
        },
        {
          name: "Dengue IgM",
          slug: "dengue-igm",
        },
      ],

      urgency: "Medical review advised",

      redFlags: [
        "Persistent high fever with worsening condition",
        "Confusion or unusual drowsiness",
        "Difficulty breathing",
        "Persistent vomiting",
        "Bleeding or severe abdominal pain",
      ],

      advice: [
        "Stay well hydrated unless a clinician has advised fluid restriction.",
        "Monitor your temperature and duration of illness.",
        "Seek medical evaluation if fever persists or additional concerning symptoms appear.",
      ],
    },
  },

  {
    keywords: [
      "breathing",
      "shortness of breath",
      "breathlessness",
      "wheezing",
      "cough",
      "asthma",
    ],

    result: {
      title: "Respiratory symptom pattern",

      summary:
        "Breathlessness, cough or wheezing can arise from respiratory infections, asthma and other lung conditions. Significant or rapidly worsening breathing difficulty should be assessed urgently.",

      possibilities: [
        "Respiratory infection",
        "Asthma or airway narrowing",
        "Allergic respiratory symptoms",
        "Other pulmonary conditions",
      ],

      specialist: "Pulmonologist",
      specialty: "Pulmonology",

      tests: [
        {
          name: "Spirometry",
          slug: "spirometry",
        },
        {
          name: "Peak Flow Test",
          slug: "peak-flow-test",
        },
        {
          name: "Chest X-ray",
          slug: "chest-x-ray",
        },
      ],

      urgency: "Medical review advised",

      redFlags: [
        "Severe difficulty breathing or inability to speak normally because of breathlessness",
        "Blue, grey or very pale lips or skin",
        "Chest tightness or heavy chest discomfort with breathlessness",
        "Sudden confusion or collapse",
      ],

      advice: [
        "Avoid smoke and other known respiratory triggers.",
        "Note whether symptoms occur at rest, with activity or after exposure to allergens.",
        "Seek immediate care if breathing becomes severe or rapidly worsens.",
      ],
    },
  },

  {
    keywords: [
      "thirst",
      "frequent urination",
      "frequent urine",
      "high sugar",
      "blood sugar",
      "weight loss",
      "diabetes",
    ],

    result: {
      title: "Blood glucose symptom pattern",

      summary:
        "Increased thirst, frequent urination and unexplained weight change may occur when blood-glucose regulation is abnormal, although other conditions can also cause these symptoms.",

      possibilities: [
        "Elevated blood glucose",
        "Diabetes mellitus",
        "Prediabetes",
        "Other metabolic or hormonal conditions",
      ],

      specialist: "Endocrinologist",
      specialty: "Endocrinology",

      tests: [
        {
          name: "Fasting Blood Sugar",
          slug: "fasting-blood-sugar",
        },
        {
          name: "Random Blood Sugar",
          slug: "random-blood-sugar",
        },
        {
          name: "HbA1c Test",
          slug: "hba1c",
        },
      ],

      urgency: "Routine",

      redFlags: [
        "Severe weakness or confusion",
        "Persistent vomiting",
        "Rapid breathing with marked illness",
        "Loss of consciousness",
      ],

      advice: [
        "Arrange a blood-glucose evaluation if symptoms persist.",
        "Tell the clinician about family history of diabetes and current medicines.",
        "Do not change prescribed diabetes medication without medical advice.",
      ],
    },
  },

  {
    keywords: [
      "thyroid",
      "weight gain",
      "cold intolerance",
      "hair fall",
      "tired",
      "fatigue",
      "neck swelling",
    ],

    result: {
      title: "Possible endocrine symptom pattern",

      summary:
        "Fatigue, weight changes, temperature intolerance or neck symptoms can sometimes be associated with thyroid or other endocrine conditions, but they are not specific to one diagnosis.",

      possibilities: [
        "Thyroid dysfunction",
        "Nutritional deficiency",
        "Anaemia",
        "Other metabolic or hormonal conditions",
      ],

      specialist: "Endocrinologist",
      specialty: "Endocrinology",

      tests: [
        {
          name: "TSH",
          slug: "tsh",
        },
        {
          name: "Free T4",
          slug: "free-t4",
        },
        {
          name: "Thyroid Antibody Test",
          slug: "thyroid-antibody-test",
        },
      ],

      urgency: "Routine",

      redFlags: [
        "Rapidly increasing neck swelling with breathing or swallowing difficulty",
        "Severe confusion or extreme weakness",
        "Very fast or irregular heartbeat with significant illness",
      ],

      advice: [
        "Discuss persistent symptoms with a clinician.",
        "Mention thyroid medicines, supplements and family history.",
        "Laboratory testing may help determine whether thyroid dysfunction is present.",
      ],
    },
  },

  {
    keywords: [
      "period",
      "irregular periods",
      "pcos",
      "acne",
      "facial hair",
      "pelvic pain",
      "menstrual",
    ],

    result: {
      title: "Reproductive and hormonal symptom pattern",

      summary:
        "Irregular menstrual cycles, acne, unwanted hair growth or pelvic symptoms may be associated with hormonal or gynaecological conditions. A clinical history is important before determining the cause.",

      possibilities: [
        "Polycystic ovary syndrome",
        "Hormonal imbalance",
        "Thyroid-related menstrual changes",
        "Other gynaecological conditions",
      ],

      specialist: "Gynaecologist",
      specialty: "Gynaecology",

      tests: [
        {
          name: "Pelvic Ultrasound",
          slug: "pelvic-ultrasound",
        },
        {
          name: "Hormone Tests",
          slug: "hormone-tests",
        },
        {
          name: "TSH",
          slug: "tsh",
        },
      ],

      urgency: "Routine",

      redFlags: [
        "Severe sudden pelvic or abdominal pain",
        "Heavy bleeding with dizziness or fainting",
        "Possible pregnancy with severe pain or bleeding",
      ],

      advice: [
        "Keep a record of menstrual dates and symptom patterns.",
        "Mention current hormonal medicines and previous diagnoses.",
        "Arrange clinical assessment if symptoms are persistent or affecting daily life.",
      ],
    },
  },
];

const emergencyKeywords = [
  "severe chest pain",
  "crushing chest pain",
  "cannot breathe",
  "can't breathe",
  "severe breathlessness",
  "fainted",
  "fainting",
  "unconscious",
  "one sided weakness",
  "one-sided weakness",
  "face drooping",
  "slurred speech",
  "coughing blood",
];

function SymptomChecker() {
  const navigate = useNavigate();

  const STORAGE_KEY = "truetest-symptom-checker";

const savedData = (() => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
})();

const [symptoms, setSymptoms] = useState(
  savedData?.symptoms || ""
);

const [duration, setDuration] = useState(
  savedData?.duration || ""
);

const [severity, setSeverity] = useState(
  savedData?.severity || ""
);

const [age, setAge] = useState(
  savedData?.age || ""
);

const [medicalHistory, setMedicalHistory] = useState(
  savedData?.medicalHistory || ""
);

const [assessment, setAssessment] =
  useState<Assessment | null>(
    savedData?.assessment || null
  );

const [emergencyDetected, setEmergencyDetected] =
  useState(
    savedData?.emergencyDetected || false
  );
  useEffect(() => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      symptoms,
      duration,
      severity,
      age,
      medicalHistory,
      assessment,
      emergencyDetected,
    })
  );
}, [
  symptoms,
  duration,
  severity,
  age,
  medicalHistory,
  assessment,
  emergencyDetected,
]);

  const analyseSymptoms = () => {
    const input = symptoms
      .toLowerCase()
      .trim();

    if (!input) {
      alert(
        "Please describe your symptoms first."
      );

      return;
    }

    const hasEmergencyKeyword =
      emergencyKeywords.some((keyword) =>
        input.includes(keyword)
      );

    if (hasEmergencyKeyword) {
      setEmergencyDetected(true);

      setAssessment({
        title:
          "Urgent medical assessment recommended",

        summary:
          "The symptoms you entered may include a medical red flag. An online symptom assessment cannot safely rule out a serious condition.",

        possibilities: [
          "A serious cardiovascular, neurological or respiratory condition needs to be excluded.",
        ],

        specialist:
          "Emergency Department / Emergency Physician",

        specialty:
          "Emergency Medicine",

        tests: [],

        urgency: "Urgent",

        redFlags: [
          "Do not rely on the symptom checker to exclude an emergency.",
          "Seek urgent medical care if symptoms are severe, sudden or worsening.",
        ],

        advice: [
          "Contact local emergency medical services or go to the nearest emergency department.",
          "Do not delay urgent evaluation while searching for a specialist online.",
        ],
      });

      return;
    }

    setEmergencyDetected(false);

    const matchedAssessment =
      assessments.find((item) =>
        item.keywords.some((keyword) =>
          input.includes(keyword)
        )
      );

    if (matchedAssessment) {
      setAssessment(
        matchedAssessment.result
      );

      return;
    }

    setAssessment({
      title:
        "General clinical assessment",

      summary:
        "The symptoms entered do not match one of the current predefined symptom patterns closely enough to provide specific guidance. A clinician can assess the complete history and examination.",

      possibilities: [
        "Several different conditions may produce these symptoms.",
        "More history and physical examination may be required.",
      ],

      specialist:
        "General Physician",

      specialty:
        "General Medicine",

      tests: [],

      urgency:
        severity === "Severe"
          ? "Medical review advised"
          : "Routine",

      redFlags: [
        "Rapidly worsening symptoms",
        "Severe pain",
        "Difficulty breathing",
        "Fainting or confusion",
        "New weakness or difficulty speaking",
      ],

      advice: [
        "Arrange a clinical assessment if symptoms persist or worsen.",
        "Provide the doctor with the duration, severity and relevant medical history.",
      ],
    });
  };

  const urgencyClass = (
    urgency: Assessment["urgency"]
  ) => {
    if (urgency === "Urgent") {
      return "border-red-200 bg-red-50 text-red-700";
    }

    if (
      urgency ===
      "Medical review advised"
    ) {
      return "border-amber-200 bg-amber-50 text-amber-700";
    }

    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  };

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
            onClick={() => navigate("/")}
            className="flex items-center gap-2 rounded-xl border border-[#6f8f72] px-4 py-2 font-semibold text-[#315c47]"
          >
            <ArrowLeft size={18} />
            Home
          </button>

        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-12 lg:px-8">

        {/* INTRO */}

        <section className="rounded-[2rem] bg-gradient-to-br from-[#edf6ed] to-white p-8 sm:p-10">

          <div className="flex items-center gap-2 text-[#315c47]">
            <HeartPulse size={22} />

            <span className="font-semibold">
              Symptom Guidance
            </span>
          </div>

          <h1 className="mt-5 text-4xl font-bold text-[#203f32] sm:text-5xl">
            Symptom Checker
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Describe what you are experiencing.
            TrueTest will organise the symptoms,
            highlight important warning signs and
            suggest an appropriate type of
            healthcare professional.
          </p>

        </section>

        {/* INPUT */}

        <section className="mt-8 rounded-3xl border border-emerald-100 bg-white p-7 shadow-sm">

          <h2 className="text-2xl font-bold text-[#294b3c]">
            Tell us what you're experiencing
          </h2>

          <div className="mt-6">

            <label className="text-sm font-semibold text-slate-700">
              Describe your symptoms
            </label>

            <textarea
              value={symptoms}
              onChange={(event) =>
                setSymptoms(
                  event.target.value
                )
              }
              placeholder="Example: I have had fever, headache and body pain for the last 2 days..."
              className="mt-2 min-h-36 w-full rounded-2xl border border-slate-300 px-4 py-4 outline-none focus:border-[#6f8f72]"
            />

          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-3">

            <div>

              <label className="text-sm font-semibold text-slate-700">
                Age
              </label>

              <input
                type="number"
                min="0"
                value={age}
                onChange={(event) =>
                  setAge(
                    event.target.value
                  )
                }
                placeholder="Age"
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#6f8f72]"
              />

            </div>

            <div>

              <label className="text-sm font-semibold text-slate-700">
                Duration
              </label>

              <input
                type="text"
                value={duration}
                onChange={(event) =>
                  setDuration(
                    event.target.value
                  )
                }
                placeholder="Example: 2 days"
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#6f8f72]"
              />

            </div>

            <div>

              <label className="text-sm font-semibold text-slate-700">
                Severity
              </label>

              <select
                value={severity}
                onChange={(event) =>
                  setSeverity(
                    event.target.value
                  )
                }
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#6f8f72]"
              >
                <option value="">
                  Select
                </option>

                <option value="Mild">
                  Mild
                </option>

                <option value="Moderate">
                  Moderate
                </option>

                <option value="Severe">
                  Severe
                </option>
              </select>

            </div>

          </div>

          <div className="mt-5">

            <label className="text-sm font-semibold text-slate-700">
              Relevant medical history
              (optional)
            </label>

            <textarea
              value={medicalHistory}
              onChange={(event) =>
                setMedicalHistory(
                  event.target.value
                )
              }
              placeholder="Example: Diabetes, asthma, high blood pressure, current medicines..."
              className="mt-2 min-h-24 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#6f8f72]"
            />

          </div>

          <button
            type="button"
            onClick={analyseSymptoms}
            className="mt-6 flex items-center gap-2 rounded-xl bg-[#315c47] px-6 py-3.5 font-semibold text-white hover:bg-[#274c3b]"
          >
            <Search size={19} />
            Assess Symptoms
          </button>

        </section>

        {/* RESULT */}

        {assessment && (
          <div className="mt-8 space-y-6">

            {/* URGENCY */}

            <section
              className={`rounded-2xl border p-6 ${urgencyClass(
                assessment.urgency
              )}`}
            >

              <div className="flex items-start gap-3">

                {assessment.urgency ===
                "Urgent" ? (
                  <ShieldAlert
                    size={25}
                    className="shrink-0"
                  />
                ) : (
                  <AlertTriangle
                    size={24}
                    className="shrink-0"
                  />
                )}

                <div>

                  <p className="font-bold">
                    Urgency:{" "}
                    {assessment.urgency}
                  </p>

                  {emergencyDetected && (
                    <p className="mt-2 text-sm leading-6">
                      Your symptom description
                      includes a possible emergency
                      warning sign. Seek immediate
                      medical attention rather than
                      waiting for an online
                      assessment.
                    </p>
                  )}

                </div>

              </div>

            </section>

            {/* CLINICAL IMPRESSION */}

            <section className="rounded-3xl border border-emerald-100 bg-white p-7">

              <div className="flex items-center gap-3">

                <Stethoscope className="text-[#5f7f65]" />

                <h2 className="text-2xl font-bold text-[#294b3c]">
                  Clinical Guidance
                </h2>

              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-800">
                {assessment.title}
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                {assessment.summary}
              </p>

              <div className="mt-6">

                <p className="font-bold text-slate-700">
                  Possible considerations
                </p>

                <div className="mt-3 space-y-2">

                  {assessment.possibilities.map(
                    (item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2
                          size={18}
                          className="mt-1 shrink-0 text-[#6f8f72]"
                        />

                        <p className="text-slate-600">
                          {item}
                        </p>
                      </div>
                    )
                  )}

                </div>

              </div>

            </section>

            {/* RED FLAGS */}

            <section className="rounded-3xl border border-red-100 bg-white p-7">

              <h2 className="text-2xl font-bold text-red-800">
                Warning Signs
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Seek urgent medical attention if
                any of these occur.
              </p>

              <div className="mt-5 space-y-3">

                {assessment.redFlags.map(
                  (flag) => (
                    <div
                      key={flag}
                      className="flex items-start gap-3"
                    >
                      <AlertTriangle
                        size={18}
                        className="mt-1 shrink-0 text-red-600"
                      />

                      <p className="text-slate-600">
                        {flag}
                      </p>
                    </div>
                  )
                )}

              </div>

            </section>

            {/* SPECIALIST */}

            <section className="rounded-3xl border border-blue-100 bg-white p-7">

              <div className="flex items-center gap-3">

                <Building2 className="text-blue-600" />

                <h2 className="text-2xl font-bold text-[#294b3c]">
                  Suggested Specialist
                </h2>

              </div>

              <p className="mt-5 text-sm text-slate-500">
                Based on the symptom pattern,
                consider consulting:
              </p>

              <p className="mt-2 text-3xl font-bold text-blue-700">
                {assessment.specialist}
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/hospital-finder?specialty=${encodeURIComponent(
                      assessment.specialty
                    )}`
                  )
                }
                className="mt-6 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Find {assessment.specialist}
              </button>

            </section>

            {/* TESTS */}

            {assessment.tests.length > 0 && (
              <section className="rounded-3xl border border-emerald-100 bg-white p-7">

                <div className="flex items-center gap-3">

                  <TestTube2 className="text-[#5f7f65]" />

                  <h2 className="text-2xl font-bold text-[#294b3c]">
                    Tests That May Be Considered
                  </h2>

                </div>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  These tests are not automatically
                  required. A healthcare
                  professional should decide which
                  tests are appropriate after
                  clinical assessment.
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">

                  {assessment.tests.map(
                    (test) => (
                      <div
                        key={test.slug}
                        className="rounded-2xl border border-emerald-100 bg-[#f8fbf8] p-5"
                      >

                        <p className="font-bold text-[#294b3c]">
                          {test.name}
                        </p>

                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/test-details/${test.slug}`
                            )
                          }
                          className="mt-4 rounded-xl border border-[#6f8f72] px-4 py-2 text-sm font-semibold text-[#315c47]"
                        >
                          View Test Details
                        </button>

                      </div>
                    )
                  )}

                </div>

              </section>
            )}

            {/* NEXT STEPS */}

            <section className="rounded-3xl border border-emerald-100 bg-white p-7">

              <h2 className="text-2xl font-bold text-[#294b3c]">
                Recommended Next Steps
              </h2>

              <div className="mt-5 space-y-3">

                {assessment.advice.map(
                  (item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3"
                    >

                      <CheckCircle2
                        size={18}
                        className="mt-1 shrink-0 text-[#6f8f72]"
                      />

                      <p className="text-slate-600">
                        {item}
                      </p>

                    </div>
                  )
                )}

              </div>

            </section>

          </div>
        )}

        {/* DISCLAIMER */}

        <section className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">

          <div className="flex items-start gap-3">

            <ShieldAlert
              size={22}
              className="mt-0.5 shrink-0 text-amber-700"
            />

            <div>

              <p className="font-bold text-amber-900">
                Important medical notice
              </p>

              <p className="mt-1 text-sm leading-6 text-amber-800">
                TrueTest provides general symptom
                guidance and cannot diagnose a
                medical condition. Symptoms can
                have many different causes and
                proper diagnosis may require a
                medical history, physical
                examination and appropriate tests.
                Seek professional medical care for
                persistent, worsening or concerning
                symptoms.
              </p>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default SymptomChecker;