import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  Building2,
  ChevronDown,
  ChevronUp,
  HeartPulse,
  IdCard,
  Phone,
  ShieldAlert,
  Stethoscope,
  Ambulance,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

type FirstAidItem = {
  title: string;
  icon: string;
  steps: string[];
  warning?: string;
};

const firstAidItems: FirstAidItem[] = [
  {
    title: "CPR",
    icon: "❤️",
    steps: [
      "Make sure the area is safe before approaching.",
      "Check whether the person responds and is breathing normally.",
      "If the person is unresponsive and not breathing normally, call emergency services immediately.",
      "Place the heel of one hand in the centre of the chest and place your other hand on top.",
      "Give chest compressions at a rate of about 100–120 per minute.",
      "Continue until emergency help arrives or the person begins breathing normally.",
    ],
    warning:
      "If an AED is available, switch it on and follow its spoken instructions.",
  },

  {
    title: "Choking",
    icon: "🫁",
    steps: [
      "If the person can cough or speak, encourage them to keep coughing.",
      "If they cannot breathe, speak or cough effectively, give up to 5 firm back blows between the shoulder blades.",
      "Check whether the obstruction has cleared.",
      "If it has not cleared, an appropriately trained person can give abdominal thrusts to an adult or child over 1 year old.",
      "Call emergency services if the obstruction does not clear or the person becomes unresponsive.",
    ],
    warning:
      "Do not blindly put your fingers into the person's mouth. First-aid techniques differ for infants and pregnant people.",
  },

  {
    title: "Seizure",
    icon: "🧠",
    steps: [
      "Stay with the person and note when the seizure started.",
      "Move dangerous objects away from them.",
      "Cushion their head if possible.",
      "Do not restrain their movements.",
      "After the convulsions stop, if they are breathing, place them on their side when safe to do so.",
      "Stay with them until they recover.",
    ],
    warning:
      "Never put an object, food, drink or your fingers into the person's mouth during a seizure.",
  },

  {
    title: "Severe Bleeding",
    icon: "🩸",
    steps: [
      "Make sure the area is safe before helping.",
      "Call emergency services for severe or uncontrolled bleeding.",
      "Apply firm direct pressure to the wound using clean material if available.",
      "Keep pressure on the wound while waiting for emergency help.",
      "Keep the injured person as still as possible.",
    ],
    warning:
      "Heavy or uncontrolled bleeding can become life-threatening quickly.",
  },

  {
    title: "Burns",
    icon: "🔥",
    steps: [
      "Move the person away from the source of the burn if it is safe.",
      "Remove nearby clothing or jewellery unless it is stuck to the skin.",
      "Cool the burn with cool or lukewarm running water.",
      "Do not apply ice directly to the burn.",
      "Seek medical care for serious, extensive, chemical or electrical burns.",
    ],
    warning:
      "Chemical and electrical burns require medical assessment even when the visible injury appears small.",
  },

  {
    title: "Unconscious but Breathing",
    icon: "🚑",
    steps: [
      "Call emergency services.",
      "Check that the person is breathing normally.",
      "If they are unconscious but breathing normally and there is no reason they must remain still because of major trauma, place them in the recovery position.",
      "Keep checking their breathing while waiting for help.",
      "If normal breathing stops, begin CPR.",
    ],
  },
];

function EmergencyHelp() {
  const navigate = useNavigate();

  const [openGuide, setOpenGuide] =
    useState<string | null>(null);

  const toggleGuide = (title: string) => {
    setOpenGuide((current) =>
      current === title ? null : title
    );
  };

  const findEmergencyHospital = () => {
    navigate(
      "/hospital-finder?specialty=Emergency%20Medicine"
    );
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

      <main className="mx-auto max-w-7xl px-5 py-10 lg:px-8">

        {/* EMERGENCY HERO */}

        <section className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-red-600 to-red-700 p-8 text-white sm:p-10">

          <div className="flex items-center gap-2 text-red-100">
            <ShieldAlert size={23} />

            <span className="font-semibold">
              Emergency Assistance
            </span>
          </div>

          <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
            Need urgent help?
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-red-50">
            If you or someone around you is in immediate
            danger or experiencing a serious medical
            emergency, contact emergency services
            immediately.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">

            <a
              href="tel:112"
              className="flex items-center justify-center gap-3 rounded-xl bg-white px-7 py-4 text-lg font-bold text-red-700 shadow-sm"
            >
              <Phone size={22} />
              Call 112
            </a>

            <a
              href="tel:108"
              className="flex items-center justify-center gap-3 rounded-xl border border-white/50 bg-white/10 px-7 py-4 text-lg font-bold text-white"
            >
              <Ambulance size={22} />
              Call Ambulance 108
            </a>

            <button
              type="button"
              onClick={findEmergencyHospital}
              className="flex items-center justify-center gap-3 rounded-xl border border-white/50 bg-white/10 px-7 py-4 text-lg font-bold text-white"
            >
              <Building2 size={22} />
              Find Emergency Hospital
            </button>

          </div>

          <p className="mt-5 text-sm text-red-100">
            112 — Integrated emergency assistance •
            108 — Emergency ambulance service
          </p>

        </section>

        {/* RED FLAGS */}

        <section className="mt-8 rounded-3xl border border-red-200 bg-white p-7">

          <div className="flex items-center gap-3">
            <AlertTriangle className="text-red-600" />

            <h2 className="text-2xl font-bold text-red-800">
              Get Emergency Help Immediately
            </h2>
          </div>

          <p className="mt-3 text-slate-600">
            Call emergency services if someone has a
            serious or rapidly worsening condition,
            including:
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">

            {[
              "Severe or persistent chest pain or pressure",
              "Severe difficulty breathing or choking",
              "Sudden weakness, facial drooping or difficulty speaking",
              "Loss of consciousness or inability to wake",
              "Severe uncontrolled bleeding",
              "A serious accident or major injury",
              "Severe allergic reaction with breathing difficulty",
              "A prolonged seizure or repeated seizures without recovery",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-xl bg-red-50 p-4"
              >
                <ShieldAlert
                  size={19}
                  className="mt-0.5 shrink-0 text-red-600"
                />

                <p className="text-sm font-medium leading-6 text-red-900">
                  {item}
                </p>
              </div>
            ))}

          </div>
        </section>

        {/* QUICK ACTIONS */}

        <section className="mt-8">

          <h2 className="text-3xl font-bold text-[#294b3c]">
            Quick Actions
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

            {/* 112 */}

            <a
              href="tel:112"
              className="rounded-2xl border border-red-200 bg-white p-6 transition hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                <Phone size={23} />
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-800">
                Emergency Services
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Contact India's integrated emergency
                response service.
              </p>

              <p className="mt-5 font-bold text-red-600">
                Call 112 →
              </p>
            </a>

            {/* 108 */}

            <a
              href="tel:108"
              className="rounded-2xl border border-orange-200 bg-white p-6 transition hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-700">
                <Ambulance size={23} />
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-800">
                Ambulance
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Call the 108 emergency ambulance
                service where available.
              </p>

              <p className="mt-5 font-bold text-orange-700">
                Call 108 →
              </p>
            </a>

            {/* HOSPITAL */}

            <button
              type="button"
              onClick={findEmergencyHospital}
              className="rounded-2xl border border-blue-200 bg-white p-6 text-left transition hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                <Building2 size={23} />
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-800">
                Emergency Hospital
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Search TrueTest for hospitals offering
                emergency services.
              </p>

              <p className="mt-5 font-bold text-blue-600">
                Find Hospital →
              </p>
            </button>

            {/* HEALTH CARD */}

            <button
              type="button"
              onClick={() => navigate("/health-card")}
              className="rounded-2xl border border-emerald-200 bg-white p-6 text-left transition hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                <IdCard size={23} />
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-800">
                Health Card
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Quickly access saved health and
                emergency information.
              </p>

              <p className="mt-5 font-bold text-emerald-700">
                Open Health Card →
              </p>
            </button>

          </div>
        </section>

        {/* FIRST AID */}

        <section className="mt-12">

          <div className="flex items-center gap-3">
            <HeartPulse className="text-[#5f7f65]" />

            <h2 className="text-3xl font-bold text-[#294b3c]">
              Quick First-Aid Guidance
            </h2>
          </div>

          <p className="mt-3 max-w-3xl leading-7 text-slate-500">
            Select an emergency situation for basic
            steps to follow while arranging professional
            medical assistance.
          </p>

          <div className="mt-7 grid gap-4">

            {firstAidItems.map((item) => {
              const isOpen = openGuide === item.title;

              return (
                <article
                  key={item.title}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                >
                  <button
                    type="button"
                    onClick={() => toggleGuide(item.title)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  >
                    <div className="flex items-center gap-4">

                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f1f6f1] text-2xl">
                        {item.icon}
                      </div>

                      <div>
                        <p className="text-lg font-bold text-slate-800">
                          {item.title}
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          View first-aid steps
                        </p>
                      </div>

                    </div>

                    {isOpen ? (
                      <ChevronUp className="text-slate-500" />
                    ) : (
                      <ChevronDown className="text-slate-500" />
                    )}

                  </button>

                  {isOpen && (
                    <div className="border-t border-slate-100 px-6 py-6">

                      <ol className="space-y-4">

                        {item.steps.map((step, index) => (
                          <li
                            key={step}
                            className="flex items-start gap-4"
                          >
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#315c47] text-sm font-bold text-white">
                              {index + 1}
                            </div>

                            <p className="pt-0.5 leading-6 text-slate-600">
                              {step}
                            </p>
                          </li>
                        ))}

                      </ol>

                      {item.warning && (
                        <div className="mt-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">

                          <AlertTriangle
                            size={19}
                            className="mt-0.5 shrink-0 text-amber-700"
                          />

                          <p className="text-sm leading-6 text-amber-900">
                            {item.warning}
                          </p>

                        </div>
                      )}

                    </div>
                  )}

                </article>
              );
            })}

          </div>
        </section>

        {/* EMERGENCY NUMBERS */}

        <section className="mt-10 rounded-3xl bg-[#274c3b] p-7 text-white">

          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">

            <div>

              <div className="flex items-center gap-2 text-emerald-100">
                <Phone size={19} />
                Emergency Numbers
              </div>

              <div className="mt-5 flex flex-wrap gap-10">

                <div>
                  <p className="text-5xl font-bold">
                    112
                  </p>

                  <p className="mt-2 text-emerald-100">
                    Emergency Services
                  </p>
                </div>

                <div>
                  <p className="text-5xl font-bold">
                    108
                  </p>

                  <p className="mt-2 text-emerald-100">
                    Emergency Ambulance
                  </p>
                </div>

              </div>

              <p className="mt-5 max-w-xl leading-7 text-emerald-50">
                Use 112 for integrated emergency
                assistance. 108 provides emergency
                ambulance services through participating
                state systems.
              </p>

            </div>

            <div className="flex flex-col gap-3 sm:flex-row">

              <a
                href="tel:112"
                className="flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 font-bold text-[#274c3b]"
              >
                <Phone size={20} />
                Call 112
              </a>

              <a
                href="tel:108"
                className="flex items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/10 px-7 py-4 font-bold text-white"
              >
                <Ambulance size={20} />
                Call 108
              </a>

            </div>

          </div>
        </section>

        {/* NOTICE */}

        <section className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">

          <div className="flex items-start gap-3">

            <Stethoscope
              size={21}
              className="mt-0.5 shrink-0 text-amber-700"
            />

            <div>
              <p className="font-bold text-amber-900">
                Important
              </p>

              <p className="mt-1 text-sm leading-6 text-amber-800">
                First-aid guidance is intended to
                support immediate action while
                professional help is being arranged.
                It does not replace emergency medical
                care or certified first-aid training.
              </p>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}

export default EmergencyHelp;