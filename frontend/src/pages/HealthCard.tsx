import {
  Activity,
  ArrowLeft,
  CreditCard,
  HeartPulse,
  IdCard,
  Pencil,
  Plus,
  QrCode,
  Save,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type InsuranceCard = {
  id: number;
  provider: string;
  policyHolder: string;
  policyId: string;
  policyType: string;
  coverageAmount: string;
  validFrom: string;
  expiryDate: string;
  tpa: string;
  helpline: string;
};

function HealthCard() {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  const [healthInfo, setHealthInfo] = useState({
    name: "Shaina",
    dateOfBirth: "",
    bloodGroup: "",
    allergies: "",
    conditions: "",
    medications: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    healthId: "TT-2026-00124",
  });

  const [insuranceCards, setInsuranceCards] = useState<InsuranceCard[]>([
    {
      id: 1,
      provider: "",
      policyHolder: "",
      policyId: "",
      policyType: "",
      coverageAmount: "",
      validFrom: "",
      expiryDate: "",
      tpa: "",
      helpline: "",
    },
  ]);

  const updateHealthInfo = (
    field: keyof typeof healthInfo,
    value: string
  ) => {
    setHealthInfo((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const updateInsuranceCard = (
    id: number,
    field: keyof InsuranceCard,
    value: string
  ) => {
    setInsuranceCards((cards) =>
      cards.map((card) =>
        card.id === id
          ? {
              ...card,
              [field]: value,
            }
          : card
      )
    );
  };

  const addInsuranceCard = () => {
    const nextId =
      insuranceCards.length > 0
        ? Math.max(...insuranceCards.map((card) => card.id)) + 1
        : 1;

    setInsuranceCards((cards) => [
      ...cards,
      {
        id: nextId,
        provider: "",
        policyHolder: "",
        policyId: "",
        policyType: "",
        coverageAmount: "",
        validFrom: "",
        expiryDate: "",
        tpa: "",
        helpline: "",
      },
    ]);
  };

  const removeInsuranceCard = (id: number) => {
    setInsuranceCards((cards) =>
      cards.filter((card) => card.id !== id)
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

      <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8">

        {/* TITLE */}
        <section className="rounded-[2rem] bg-gradient-to-br from-[#edf6ed] to-white p-8 sm:p-10">

          <div className="flex items-center gap-2 text-[#315c47]">
            <IdCard size={22} />
            <span className="font-semibold">
              Digital Health Card
            </span>
          </div>

          <h1 className="mt-5 text-4xl font-bold text-[#203f32] sm:text-5xl">
            Your Health Card
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Keep important health and insurance information together for
            quick access when needed.
          </p>

        </section>

        {/* ACTION BUTTON */}
        <div className="mt-8 flex justify-end">

          <button
            type="button"
            onClick={() => setIsEditing((value) => !value)}
            className="flex items-center gap-2 rounded-xl bg-[#315c47] px-5 py-3 font-semibold text-white"
          >
            {isEditing ? <Save size={18} /> : <Pencil size={18} />}

            {isEditing ? "Save Health Card" : "Edit Health Card"}
          </button>

        </div>

        {/* HEALTH CARD */}
        <section className="mt-6 rounded-3xl border border-emerald-100 bg-white p-7 shadow-sm">

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e9f2e8] text-[#4d7356]">
                <HeartPulse size={28} />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  TrueTest Health ID
                </p>

                <p className="text-xl font-bold text-[#294b3c]">
                  {healthInfo.healthId}
                </p>
              </div>

            </div>

            <div className="flex h-28 w-28 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-slate-400">
              <div className="text-center">
                <QrCode size={34} className="mx-auto" />
                <p className="mt-1 text-xs">QR Code</p>
              </div>
            </div>

          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">

            <div>
              <label className="text-sm font-semibold text-slate-600">
                Full name
              </label>

              <input
                type="text"
                value={healthInfo.name}
                disabled={!isEditing}
                onChange={(event) =>
                  updateHealthInfo("name", event.target.value)
                }
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 disabled:bg-slate-50"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-600">
                Date of birth
              </label>

              <input
                type="date"
                value={healthInfo.dateOfBirth}
                disabled={!isEditing}
                onChange={(event) =>
                  updateHealthInfo(
                    "dateOfBirth",
                    event.target.value
                  )
                }
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 disabled:bg-slate-50"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-600">
                Blood group
              </label>

              <input
                type="text"
                value={healthInfo.bloodGroup}
                disabled={!isEditing}
                onChange={(event) =>
                  updateHealthInfo(
                    "bloodGroup",
                    event.target.value
                  )
                }
                placeholder="Example: O+"
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 disabled:bg-slate-50"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-600">
                Allergies
              </label>

              <input
                type="text"
                value={healthInfo.allergies}
                disabled={!isEditing}
                onChange={(event) =>
                  updateHealthInfo(
                    "allergies",
                    event.target.value
                  )
                }
                placeholder="Example: Penicillin"
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 disabled:bg-slate-50"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-600">
                Medical conditions
              </label>

              <textarea
                value={healthInfo.conditions}
                disabled={!isEditing}
                onChange={(event) =>
                  updateHealthInfo(
                    "conditions",
                    event.target.value
                  )
                }
                placeholder="Important medical conditions"
                className="mt-2 min-h-28 w-full rounded-xl border border-slate-200 px-4 py-3 disabled:bg-slate-50"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-600">
                Current medications
              </label>

              <textarea
                value={healthInfo.medications}
                disabled={!isEditing}
                onChange={(event) =>
                  updateHealthInfo(
                    "medications",
                    event.target.value
                  )
                }
                placeholder="Current medicines"
                className="mt-2 min-h-28 w-full rounded-xl border border-slate-200 px-4 py-3 disabled:bg-slate-50"
              />
            </div>

          </div>

        </section>

        {/* EMERGENCY CONTACT */}
        <section className="mt-6 rounded-3xl border border-red-100 bg-white p-7">

          <h2 className="text-2xl font-bold text-[#294b3c]">
            Emergency Contact
          </h2>

          <div className="mt-5 grid gap-5 md:grid-cols-2">

            <div>
              <label className="text-sm font-semibold text-slate-600">
                Contact name
              </label>

              <input
                type="text"
                value={healthInfo.emergencyContactName}
                disabled={!isEditing}
                onChange={(event) =>
                  updateHealthInfo(
                    "emergencyContactName",
                    event.target.value
                  )
                }
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 disabled:bg-slate-50"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-600">
                Phone number
              </label>

              <input
                type="tel"
                value={healthInfo.emergencyContactPhone}
                disabled={!isEditing}
                onChange={(event) =>
                  updateHealthInfo(
                    "emergencyContactPhone",
                    event.target.value
                  )
                }
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 disabled:bg-slate-50"
              />
            </div>

          </div>

        </section>

        {/* INSURANCE SECTION */}
        <section className="mt-8 rounded-3xl border border-blue-100 bg-white p-7">

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            <div className="flex items-center gap-3">
              <CreditCard className="text-blue-600" />

              <div>
                <h2 className="text-2xl font-bold text-[#294b3c]">
                  Insurance Cards
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Add personal, family, employer or secondary insurance details.
                </p>
              </div>
            </div>

            {isEditing && (
              <button
                type="button"
                onClick={addInsuranceCard}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white"
              >
                <Plus size={18} />
                Add Insurance
              </button>
            )}

          </div>

          <div className="mt-7 space-y-6">

            {insuranceCards.map((card, index) => (
              <div
                key={card.id}
                className="rounded-2xl border border-blue-100 bg-blue-50/30 p-6"
              >

                <div className="flex items-center justify-between">

                  <p className="font-bold text-blue-900">
                    Insurance Card {index + 1}
                  </p>

                  {isEditing && insuranceCards.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        removeInsuranceCard(card.id)
                      }
                      className="text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}

                </div>

                <div className="mt-5 grid gap-5 md:grid-cols-2">

                  <div>
                    <label className="text-sm font-semibold text-slate-600">
                      Insurance provider
                    </label>

                    <input
                      type="text"
                      value={card.provider}
                      disabled={!isEditing}
                      onChange={(event) =>
                        updateInsuranceCard(
                          card.id,
                          "provider",
                          event.target.value
                        )
                      }
                      className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 disabled:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-600">
                      Policyholder name
                    </label>

                    <input
                      type="text"
                      value={card.policyHolder}
                      disabled={!isEditing}
                      onChange={(event) =>
                        updateInsuranceCard(
                          card.id,
                          "policyHolder",
                          event.target.value
                        )
                      }
                      className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 disabled:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-600">
                      Policy / Member ID
                    </label>

                    <input
                      type="text"
                      value={card.policyId}
                      disabled={!isEditing}
                      onChange={(event) =>
                        updateInsuranceCard(
                          card.id,
                          "policyId",
                          event.target.value
                        )
                      }
                      className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 disabled:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-600">
                      Policy type
                    </label>

                    <input
                      type="text"
                      value={card.policyType}
                      disabled={!isEditing}
                      onChange={(event) =>
                        updateInsuranceCard(
                          card.id,
                          "policyType",
                          event.target.value
                        )
                      }
                      placeholder="Individual / Family / Employer"
                      className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 disabled:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-600">
                      Coverage amount
                    </label>

                    <input
                      type="text"
                      value={card.coverageAmount}
                      disabled={!isEditing}
                      onChange={(event) =>
                        updateInsuranceCard(
                          card.id,
                          "coverageAmount",
                          event.target.value
                        )
                      }
                      placeholder="Example: ₹5,00,000"
                      className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 disabled:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-600">
                      TPA
                    </label>

                    <input
                      type="text"
                      value={card.tpa}
                      disabled={!isEditing}
                      onChange={(event) =>
                        updateInsuranceCard(
                          card.id,
                          "tpa",
                          event.target.value
                        )
                      }
                      className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 disabled:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-600">
                      Valid from
                    </label>

                    <input
                      type="date"
                      value={card.validFrom}
                      disabled={!isEditing}
                      onChange={(event) =>
                        updateInsuranceCard(
                          card.id,
                          "validFrom",
                          event.target.value
                        )
                      }
                      className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 disabled:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-600">
                      Expiry date
                    </label>

                    <input
                      type="date"
                      value={card.expiryDate}
                      disabled={!isEditing}
                      onChange={(event) =>
                        updateInsuranceCard(
                          card.id,
                          "expiryDate",
                          event.target.value
                        )
                      }
                      className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 disabled:bg-white"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm font-semibold text-slate-600">
                      Insurance helpline
                    </label>

                    <input
                      type="tel"
                      value={card.helpline}
                      disabled={!isEditing}
                      onChange={(event) =>
                        updateInsuranceCard(
                          card.id,
                          "helpline",
                          event.target.value
                        )
                      }
                      className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 disabled:bg-white"
                    />
                  </div>

                </div>

              </div>
            ))}

          </div>

        </section>

        {/* PRIVACY */}
        <section className="mt-8 flex gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-6">

          <ShieldCheck
            className="shrink-0 text-amber-700"
            size={24}
          />

          <div>
            <p className="font-bold text-amber-900">
              Privacy notice
            </p>

            <p className="mt-1 text-sm leading-6 text-amber-800">
              Health and insurance information is sensitive personal data.
              Only information chosen by the user should be shared through
              emergency access or a QR code. Avoid exposing complete medical
              records or insurance documents publicly.
            </p>
          </div>

        </section>

      </main>
    </div>
  );
}

export default HealthCard;