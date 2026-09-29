import {
  Activity,
  ArrowLeft,
  Camera,
  CreditCard,
  HeartPulse,
  IdCard,
  ImagePlus,
  Pencil,
  Plus,
  QrCode,
  Save,
  ShieldCheck,
  Trash2,
  Upload,
  UserRound,
  X,
} from "lucide-react";

import {
  useEffect,
  useState,
  type ChangeEvent,
} from "react";

import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

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
  cardImage: string;
};

type HealthCardItem = {
  id: number;
  healthId: string;
  uhid: string;

  mode: "manual" | "image";

  name: string;
  relation: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;

  allergies: string;
  conditions: string;
  medications: string;

  emergencyContactName: string;
  emergencyContactPhone: string;

  profileImage: string;

  healthCardImage: string;

  insuranceCards: InsuranceCard[];
};

const createInsuranceCard = (): InsuranceCard => ({
  id: Date.now() + Math.random(),

  provider: "",
  policyHolder: "",
  policyId: "",
  policyType: "",
  coverageAmount: "",
  validFrom: "",
  expiryDate: "",
  tpa: "",
  helpline: "",

  cardImage: "",
});

const createHealthCard = (
  mode: "manual" | "image"
): HealthCardItem => {
  const id = Date.now();

  return {
    id,

    healthId: `TT-${id.toString().slice(-8)}`,
    uhid: "",

    mode,

    name: "",
    relation: "",
    dateOfBirth: "",
    gender: "",
    bloodGroup: "",

    allergies: "",
    conditions: "",
    medications: "",

    emergencyContactName: "",
    emergencyContactPhone: "",

    profileImage: "",

    healthCardImage: "",

    insuranceCards: [],
  };
};

function HealthCard() {
  const navigate = useNavigate();

  const [healthCards, setHealthCards] =
    useState<HealthCardItem[]>([]);

  const [editingCardId, setEditingCardId] =
    useState<number | null>(null);

  const [showAddOptions, setShowAddOptions] =
    useState(false);

  const [userId, setUserId] =
    useState<string | null>(null);

  const [loadingCards, setLoadingCards] =
    useState(true);

  const [saveMessage, setSaveMessage] =
    useState("");

  useEffect(() => {
    const loadHealthCards = async () => {
      setLoadingCards(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login");
        return;
      }

      setUserId(user.id);

      const { data, error } = await supabase
        .from("health_cards")
        .select("card_data")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) {
        console.error(error);
        setSaveMessage(
          "Unable to load Health Card data."
        );
        setLoadingCards(false);
        return;
      }

      const savedCards = Array.isArray(data?.card_data)
        ? (data.card_data as HealthCardItem[])
        : [];

      setHealthCards(savedCards);
      setLoadingCards(false);
    };

    loadHealthCards();
  }, [navigate]);

  useEffect(() => {
    if (!userId || loadingCards) return;

    const saveHealthCards = async () => {
      const { error } = await supabase
        .from("health_cards")
        .upsert(
          {
            user_id: userId,
            card_data: healthCards,
            updated_at: new Date().toISOString(),
          },
          {
            onConflict: "user_id",
          }
        );

      if (error) {
        console.error(error);
        setSaveMessage(
          "Unable to save Health Card data."
        );
        return;
      }

      setSaveMessage("Saved to your account.");
    };

    const timeout = window.setTimeout(
      saveHealthCards,
      500
    );

    return () => {
      window.clearTimeout(timeout);
    };
  }, [healthCards, userId, loadingCards]);

  const readImage = (
    file: File
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result as string);
      };

      reader.onerror = () => {
        reject(
          new Error("Unable to read image")
        );
      };

      reader.readAsDataURL(file);
    });
  };

  const addManualHealthCard = () => {
    const newCard =
      createHealthCard("manual");

    setHealthCards((cards) => [
      ...cards,
      newCard,
    ]);

    setEditingCardId(newCard.id);
    setShowAddOptions(false);
  };

  const addImageHealthCard = () => {
    const newCard =
      createHealthCard("image");

    setHealthCards((cards) => [
      ...cards,
      newCard,
    ]);

    setEditingCardId(newCard.id);
    setShowAddOptions(false);
  };

  const updateHealthCard = (
    cardId: number,
    field: keyof HealthCardItem,
    value: string
  ) => {
    setHealthCards((cards) =>
      cards.map((card) =>
        card.id === cardId
          ? {
              ...card,
              [field]: value,
            }
          : card
      )
    );
  };

  const deleteHealthCard = (
    cardId: number
  ) => {
    const confirmed = window.confirm(
      "Delete this Health Card?"
    );

    if (!confirmed) return;

    setHealthCards((cards) =>
      cards.filter(
        (card) => card.id !== cardId
      )
    );

    if (editingCardId === cardId) {
      setEditingCardId(null);
    }
  };

  const handleProfileImageUpload =
    async (
      event: ChangeEvent<HTMLInputElement>,
      cardId: number
    ) => {
      const file =
        event.target.files?.[0];

      if (!file) return;

      try {
        const image =
          await readImage(file);

        updateHealthCard(
          cardId,
          "profileImage",
          image
        );
      } catch {
        alert(
          "Unable to upload this image."
        );
      }
    };

  const handleHealthCardImageUpload =
    async (
      event: ChangeEvent<HTMLInputElement>,
      cardId: number
    ) => {
      const file =
        event.target.files?.[0];

      if (!file) return;

      try {
        const image =
          await readImage(file);

        updateHealthCard(
          cardId,
          "healthCardImage",
          image
        );
      } catch {
        alert(
          "Unable to upload this Health Card image."
        );
      }
    };

  const addInsuranceCard = (
    healthCardId: number
  ) => {
    setHealthCards((cards) =>
      cards.map((card) =>
        card.id === healthCardId
          ? {
              ...card,

              insuranceCards: [
                ...card.insuranceCards,
                createInsuranceCard(),
              ],
            }
          : card
      )
    );
  };

  const updateInsuranceCard = (
    healthCardId: number,
    insuranceId: number,
    field: keyof InsuranceCard,
    value: string
  ) => {
    setHealthCards((cards) =>
      cards.map((card) =>
        card.id === healthCardId
          ? {
              ...card,

              insuranceCards:
                card.insuranceCards.map(
                  (insurance) =>
                    insurance.id ===
                    insuranceId
                      ? {
                          ...insurance,

                          [field]:
                            value,
                        }
                      : insurance
                ),
            }
          : card
      )
    );
  };

  const removeInsuranceCard = (
    healthCardId: number,
    insuranceId: number
  ) => {
    setHealthCards((cards) =>
      cards.map((card) =>
        card.id === healthCardId
          ? {
              ...card,

              insuranceCards:
                card.insuranceCards.filter(
                  (insurance) =>
                    insurance.id !==
                    insuranceId
                ),
            }
          : card
      )
    );
  };

  const handleInsuranceImageUpload =
    async (
      event: ChangeEvent<HTMLInputElement>,
      healthCardId: number,
      insuranceId: number
    ) => {
      const file =
        event.target.files?.[0];

      if (!file) return;

      try {
        const image =
          await readImage(file);

        updateInsuranceCard(
          healthCardId,
          insuranceId,
          "cardImage",
          image
        );
      } catch {
        alert(
          "Unable to upload this insurance card image."
        );
      }
    };

  if (loadingCards) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fbf8] text-[#315c47]">
        <p className="font-semibold">
          Loading your Health Card...
        </p>
      </div>
    );
  }

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
            Health Card
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Create and manage multiple Health
            Cards and keep important health,
            emergency and insurance information
            together.
          </p>

          <button
            type="button"
            onClick={() =>
              setShowAddOptions(
                (current) => !current
              )
            }
            className="mt-7 flex items-center gap-2 rounded-xl bg-[#315c47] px-5 py-3 font-semibold text-white"
          >
            <Plus size={19} />
            Add Health Card
          </button>

        </section>

        {/* ADD OPTIONS */}

        {showAddOptions && (
          <section className="mt-6 rounded-3xl border border-emerald-100 bg-white p-7 shadow-sm">

            <div className="flex items-start justify-between gap-4">

              <div>
                <h2 className="text-2xl font-bold text-[#294b3c]">
                  Add Health Card
                </h2>

                <p className="mt-2 text-slate-500">
                  Choose how you would like to
                  add the Health Card.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowAddOptions(false)
                }
                className="rounded-full p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>

            </div>

            <div className="mt-7 grid gap-5 md:grid-cols-2">

              {/* MANUAL OPTION */}

              <button
                type="button"
                onClick={
                  addManualHealthCard
                }
                className="rounded-2xl border-2 border-emerald-100 bg-[#f8fbf8] p-7 text-left transition hover:border-[#6f8f72]"
              >

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e9f2e8] text-[#4d7356]">
                  <Pencil size={23} />
                </div>

                <h3 className="mt-5 text-xl font-bold text-[#294b3c]">
                  Enter Details Manually
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Enter health information,
                  emergency contact and insurance
                  details.
                </p>

              </button>

              {/* IMAGE OPTION */}

              <button
                type="button"
                onClick={
                  addImageHealthCard
                }
                className="rounded-2xl border-2 border-blue-100 bg-blue-50/40 p-7 text-left transition hover:border-blue-300"
              >

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                  <ImagePlus size={23} />
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-800">
                  Upload Health Card Photo
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Upload a photo of an existing
                  Health Card instead of entering
                  all the information manually.
                </p>

              </button>

            </div>

          </section>
        )}

        {/* NO CARDS */}

        {healthCards.length === 0 && (
          <section className="mt-8 rounded-3xl border border-dashed border-emerald-200 bg-white p-12 text-center">

            <IdCard
              size={44}
              className="mx-auto text-[#6f8f72]"
            />

            <h2 className="mt-4 text-2xl font-bold text-[#294b3c]">
              No Health Cards added
            </h2>

            <p className="mt-2 text-slate-500">
              Add your first Health Card to get
              started.
            </p>

          </section>
        )}

        {/* CARDS */}

        <div className="mt-8 space-y-8">

          {healthCards.map((card) => {
            const isEditing =
              editingCardId === card.id;

            return (
              <section
                key={card.id}
                className="overflow-hidden rounded-[2rem] border border-emerald-100 bg-white shadow-sm"
              >

                {/* CARD HEADER */}

                <div className="bg-[#274c3b] p-7 text-white">

                  <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">

                    <div className="flex items-center gap-5">

                      {card.mode ===
                      "manual" ? (
                        <div className="relative">

                          {card.profileImage ? (
                            <img
                              src={
                                card.profileImage
                              }
                              alt="Profile"
                              className="h-24 w-24 rounded-2xl object-cover"
                            />
                          ) : (
                            <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-white/10">
                              <UserRound
                                size={38}
                              />
                            </div>
                          )}

                          {isEditing && (
                            <label className="absolute -bottom-2 -right-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-[#274c3b] shadow">

                              <Camera
                                size={18}
                              />

                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(
                                  event
                                ) =>
                                  handleProfileImageUpload(
                                    event,
                                    card.id
                                  )
                                }
                              />

                            </label>
                          )}

                        </div>
                      ) : (
                        <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-white/10">
                          <IdCard size={38} />
                        </div>
                      )}

                      <div>

                        <p className="text-sm text-emerald-100">
                          TrueTest Health ID
                        </p>

                        <p className="font-semibold">
                          {card.healthId}
                        </p>

                        <h2 className="mt-3 text-2xl font-bold">
                          {card.name ||
                            "Health Card"}
                        </h2>

                        {card.relation && (
                          <p className="mt-1 text-emerald-100">
                            {card.relation}
                          </p>
                        )}

                      </div>

                    </div>

                    <div className="flex gap-2">

                      <button
                        type="button"
                        onClick={() =>
                          setEditingCardId(
                            isEditing
                              ? null
                              : card.id
                          )
                        }
                        className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 font-semibold text-[#274c3b]"
                      >

                        {isEditing ? (
                          <Save size={17} />
                        ) : (
                          <Pencil
                            size={17}
                          />
                        )}

                        {isEditing
                          ? "Save"
                          : "Edit"}

                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          deleteHealthCard(
                            card.id
                          )
                        }
                        className="rounded-xl bg-red-600 p-2.5 text-white"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                  </div>

                </div>

                <div className="p-7">

                  {/* IMAGE MODE */}

                  {card.mode === "image" && (
                    <div>

                      <div className="flex items-center gap-3">

                        <ImagePlus className="text-[#5f7f65]" />

                        <h3 className="text-2xl font-bold text-[#294b3c]">
                          Health Card Photo
                        </h3>

                      </div>

                      {!card.healthCardImage ? (
                        isEditing ? (
                          <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-emerald-200 bg-[#f8fbf8] px-6 py-12 text-center">

                            <Upload
                              size={32}
                              className="text-[#5f7f65]"
                            />

                            <p className="mt-4 font-bold text-[#315c47]">
                              Upload Health Card
                              Photo
                            </p>

                            <p className="mt-2 text-sm text-slate-500">
                              Choose an image from
                              your device.
                            </p>

                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(
                                event
                              ) =>
                                handleHealthCardImageUpload(
                                  event,
                                  card.id
                                )
                              }
                            />

                          </label>
                        ) : (
                          <p className="mt-5 text-slate-500">
                            No Health Card image
                            uploaded.
                          </p>
                        )
                      ) : (
                        <div className="mt-6">

                          <div className="relative mx-auto max-w-3xl">

                            <img
                              src={
                                card.healthCardImage
                              }
                              alt="Health Card"
                              className="w-full rounded-2xl border border-slate-200 object-contain"
                            />

                            {isEditing && (
                              <button
                                type="button"
                                onClick={() =>
                                  updateHealthCard(
                                    card.id,
                                    "healthCardImage",
                                    ""
                                  )
                                }
                                className="absolute right-3 top-3 rounded-full bg-red-600 p-2 text-white"
                              >
                                <Trash2
                                  size={17}
                                />
                              </button>
                            )}

                          </div>

                          {isEditing && (
                            <label className="mx-auto mt-5 flex max-w-3xl cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#6f8f72] px-5 py-3 font-semibold text-[#315c47]">

                              <Camera
                                size={18}
                              />

                              Replace Health Card
                              Photo

                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(
                                  event
                                ) =>
                                  handleHealthCardImageUpload(
                                    event,
                                    card.id
                                  )
                                }
                              />

                            </label>
                          )}

                        </div>
                      )}

                      {/* OPTIONAL LABEL */}

                      {isEditing && (
                        <div className="mx-auto mt-7 max-w-3xl">

                          <label className="text-sm font-semibold text-slate-600">
                            Card name
                            (optional)
                          </label>

                          <input
                            type="text"
                            value={card.name}
                            onChange={(
                              event
                            ) =>
                              updateHealthCard(
                                card.id,
                                "name",
                                event.target
                                  .value
                              )
                            }
                            placeholder="Example: My Health Card"
                            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3"
                          />

                        </div>
                      )}

                    </div>
                  )}

                  {/* MANUAL MODE */}

                  {card.mode === "manual" && (
                    <>

                      {/* HEALTH INFO */}

                      <div>

                        <div className="flex items-center gap-3">

                          <HeartPulse className="text-[#5f7f65]" />

                          <h3 className="text-2xl font-bold text-[#294b3c]">
                            Health Information
                          </h3>

                        </div>

                        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                          <div>

                            <label className="text-sm font-semibold text-slate-600">
                              Full name
                            </label>

                            <input
                              type="text"
                              disabled={
                                !isEditing
                              }
                              value={
                                card.name
                              }
                              onChange={(
                                event
                              ) =>
                                updateHealthCard(
                                  card.id,
                                  "name",
                                  event.target
                                    .value
                                )
                              }
                              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 disabled:bg-slate-50"
                            />

                          </div>

                          <div>

                            <label className="text-sm font-semibold text-slate-600">
                              UHID
                            </label>

                            <input
                              type="text"
                              disabled={
                                !isEditing
                              }
                              value={
                                card.uhid || ""
                              }
                              onChange={(
                                event
                              ) =>
                                updateHealthCard(
                                  card.id,
                                  "uhid",
                                  event.target
                                    .value
                                )
                              }
                              placeholder="Enter hospital UHID"
                              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 disabled:bg-slate-50"
                            />

                          </div>

                          <div>

                            <label className="text-sm font-semibold text-slate-600">
                              Relationship
                            </label>

                            <select
                              disabled={
                                !isEditing
                              }
                              value={
                                card.relation
                              }
                              onChange={(
                                event
                              ) =>
                                updateHealthCard(
                                  card.id,
                                  "relation",
                                  event.target
                                    .value
                                )
                              }
                              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 disabled:bg-slate-50"
                            >

                              <option value="">
                                Select
                              </option>

                              <option value="Self">
                                Self
                              </option>

                              <option value="Father">
                                Father
                              </option>

                              <option value="Mother">
                                Mother
                              </option>

                              <option value="Spouse">
                                Spouse
                              </option>

                              <option value="Child">
                                Child
                              </option>

                              <option value="Sibling">
                                Sibling
                              </option>

                              <option value="Dependent">
                                Dependent
                              </option>

                              <option value="Other">
                                Other
                              </option>

                            </select>

                          </div>

                          <div>

                            <label className="text-sm font-semibold text-slate-600">
                              Date of birth
                            </label>

                            <input
                              type="date"
                              disabled={
                                !isEditing
                              }
                              value={
                                card.dateOfBirth
                              }
                              onChange={(
                                event
                              ) =>
                                updateHealthCard(
                                  card.id,
                                  "dateOfBirth",
                                  event.target
                                    .value
                                )
                              }
                              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 disabled:bg-slate-50"
                            />

                          </div>

                          <div>

                            <label className="text-sm font-semibold text-slate-600">
                              Gender
                            </label>

                            <select
                              disabled={
                                !isEditing
                              }
                              value={
                                card.gender
                              }
                              onChange={(
                                event
                              ) =>
                                updateHealthCard(
                                  card.id,
                                  "gender",
                                  event.target
                                    .value
                                )
                              }
                              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 disabled:bg-slate-50"
                            >

                              <option value="">
                                Select
                              </option>

                              <option value="Female">
                                Female
                              </option>

                              <option value="Male">
                                Male
                              </option>

                              <option value="Other">
                                Other
                              </option>

                              <option value="Prefer not to say">
                                Prefer not to
                                say
                              </option>

                            </select>

                          </div>

                          <div>

                            <label className="text-sm font-semibold text-slate-600">
                              Blood group
                            </label>

                            <select
                              disabled={
                                !isEditing
                              }
                              value={
                                card.bloodGroup
                              }
                              onChange={(
                                event
                              ) =>
                                updateHealthCard(
                                  card.id,
                                  "bloodGroup",
                                  event.target
                                    .value
                                )
                              }
                              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 disabled:bg-slate-50"
                            >

                              <option value="">
                                Select
                              </option>

                              <option value="A+">
                                A+
                              </option>

                              <option value="A-">
                                A-
                              </option>

                              <option value="B+">
                                B+
                              </option>

                              <option value="B-">
                                B-
                              </option>

                              <option value="AB+">
                                AB+
                              </option>

                              <option value="AB-">
                                AB-
                              </option>

                              <option value="O+">
                                O+
                              </option>

                              <option value="O-">
                                O-
                              </option>

                            </select>

                          </div>

                        </div>

                        <div className="mt-5 grid gap-5 md:grid-cols-3">

                          <div>

                            <label className="text-sm font-semibold text-slate-600">
                              Allergies
                            </label>

                            <textarea
                              disabled={
                                !isEditing
                              }
                              value={
                                card.allergies
                              }
                              onChange={(
                                event
                              ) =>
                                updateHealthCard(
                                  card.id,
                                  "allergies",
                                  event.target
                                    .value
                                )
                              }
                              placeholder="Known allergies"
                              className="mt-2 min-h-28 w-full rounded-xl border border-slate-200 px-4 py-3 disabled:bg-slate-50"
                            />

                          </div>

                          <div>

                            <label className="text-sm font-semibold text-slate-600">
                              Medical conditions
                            </label>

                            <textarea
                              disabled={
                                !isEditing
                              }
                              value={
                                card.conditions
                              }
                              onChange={(
                                event
                              ) =>
                                updateHealthCard(
                                  card.id,
                                  "conditions",
                                  event.target
                                    .value
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
                              disabled={
                                !isEditing
                              }
                              value={
                                card.medications
                              }
                              onChange={(
                                event
                              ) =>
                                updateHealthCard(
                                  card.id,
                                  "medications",
                                  event.target
                                    .value
                                )
                              }
                              placeholder="Current medicines"
                              className="mt-2 min-h-28 w-full rounded-xl border border-slate-200 px-4 py-3 disabled:bg-slate-50"
                            />

                          </div>

                        </div>

                      </div>

                      {/* EMERGENCY */}

                      <div className="mt-9 border-t border-slate-100 pt-8">

                        <h3 className="text-2xl font-bold text-[#294b3c]">
                          Emergency Contact
                        </h3>

                        <div className="mt-5 grid gap-5 md:grid-cols-2">

                          <div>

                            <label className="text-sm font-semibold text-slate-600">
                              Contact name
                            </label>

                            <input
                              type="text"
                              disabled={
                                !isEditing
                              }
                              value={
                                card.emergencyContactName
                              }
                              onChange={(
                                event
                              ) =>
                                updateHealthCard(
                                  card.id,
                                  "emergencyContactName",
                                  event.target
                                    .value
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
                              disabled={
                                !isEditing
                              }
                              value={
                                card.emergencyContactPhone
                              }
                              onChange={(
                                event
                              ) =>
                                updateHealthCard(
                                  card.id,
                                  "emergencyContactPhone",
                                  event.target
                                    .value
                                )
                              }
                              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 disabled:bg-slate-50"
                            />

                          </div>

                        </div>

                      </div>

                      {/* INSURANCE */}

                      <div className="mt-9 border-t border-slate-100 pt-8">

                        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                          <div className="flex items-center gap-3">

                            <CreditCard className="text-blue-600" />

                            <div>

                              <h3 className="text-2xl font-bold text-[#294b3c]">
                                Insurance Cards
                              </h3>

                              <p className="mt-1 text-sm text-slate-500">
                                Add insurance
                                details or upload
                                a photo of the
                                insurance card.
                              </p>

                            </div>

                          </div>

                          {isEditing && (
                            <button
                              type="button"
                              onClick={() =>
                                addInsuranceCard(
                                  card.id
                                )
                              }
                              className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white"
                            >
                              <Plus
                                size={18}
                              />

                              Add Insurance
                            </button>
                          )}

                        </div>

                        {card
                          .insuranceCards
                          .length === 0 && (
                          <div className="mt-6 rounded-2xl border border-dashed border-blue-200 p-7 text-center text-slate-500">
                            No insurance card
                            added.
                          </div>
                        )}

                        <div className="mt-6 space-y-6">

                          {card.insuranceCards.map(
                            (
                              insurance,
                              index
                            ) => (
                              <div
                                key={
                                  insurance.id
                                }
                                className="rounded-2xl border border-blue-100 bg-blue-50/30 p-6"
                              >

                                <div className="flex items-center justify-between">

                                  <p className="font-bold text-blue-900">
                                    Insurance
                                    Card{" "}
                                    {index +
                                      1}
                                  </p>

                                  {isEditing && (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        removeInsuranceCard(
                                          card.id,
                                          insurance.id
                                        )
                                      }
                                      className="text-red-600"
                                    >
                                      <Trash2
                                        size={
                                          18
                                        }
                                      />
                                    </button>
                                  )}

                                </div>

                                {/* INSURANCE IMAGE */}

                                <div className="mt-5">

                                  {insurance.cardImage ? (
                                    <div className="relative max-w-md">

                                      <img
                                        src={
                                          insurance.cardImage
                                        }
                                        alt="Insurance card"
                                        className="w-full rounded-2xl border border-blue-100 object-contain"
                                      />

                                      {isEditing && (
                                        <button
                                          type="button"
                                          onClick={() =>
                                            updateInsuranceCard(
                                              card.id,
                                              insurance.id,
                                              "cardImage",
                                              ""
                                            )
                                          }
                                          className="absolute right-2 top-2 rounded-full bg-red-600 p-2 text-white"
                                        >
                                          <X
                                            size={
                                              16
                                            }
                                          />
                                        </button>
                                      )}

                                    </div>
                                  ) : (
                                    isEditing && (
                                      <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-blue-200 bg-white px-5 py-6 font-semibold text-blue-700">

                                        <Upload
                                          size={
                                            19
                                          }
                                        />

                                        Upload
                                        Insurance
                                        Card Photo

                                        <input
                                          type="file"
                                          accept="image/*"
                                          className="hidden"
                                          onChange={(
                                            event
                                          ) =>
                                            handleInsuranceImageUpload(
                                              event,
                                              card.id,
                                              insurance.id
                                            )
                                          }
                                        />

                                      </label>
                                    )
                                  )}

                                </div>

                                {/* INSURANCE DETAILS */}

                                <div className="mt-6 grid gap-5 md:grid-cols-2">

                                  <div>

                                    <label className="text-sm font-semibold text-slate-600">
                                      Insurance
                                      provider
                                    </label>

                                    <input
                                      type="text"
                                      disabled={
                                        !isEditing
                                      }
                                      value={
                                        insurance.provider
                                      }
                                      onChange={(
                                        event
                                      ) =>
                                        updateInsuranceCard(
                                          card.id,
                                          insurance.id,
                                          "provider",
                                          event
                                            .target
                                            .value
                                        )
                                      }
                                      className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 disabled:bg-white"
                                    />

                                  </div>

                                  <div>

                                    <label className="text-sm font-semibold text-slate-600">
                                      Policyholder
                                      name
                                    </label>

                                    <input
                                      type="text"
                                      disabled={
                                        !isEditing
                                      }
                                      value={
                                        insurance.policyHolder
                                      }
                                      onChange={(
                                        event
                                      ) =>
                                        updateInsuranceCard(
                                          card.id,
                                          insurance.id,
                                          "policyHolder",
                                          event
                                            .target
                                            .value
                                        )
                                      }
                                      className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 disabled:bg-white"
                                    />

                                  </div>

                                  <div>

                                    <label className="text-sm font-semibold text-slate-600">
                                      Policy /
                                      Member ID
                                    </label>

                                    <input
                                      type="text"
                                      disabled={
                                        !isEditing
                                      }
                                      value={
                                        insurance.policyId
                                      }
                                      onChange={(
                                        event
                                      ) =>
                                        updateInsuranceCard(
                                          card.id,
                                          insurance.id,
                                          "policyId",
                                          event
                                            .target
                                            .value
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
                                      disabled={
                                        !isEditing
                                      }
                                      value={
                                        insurance.policyType
                                      }
                                      onChange={(
                                        event
                                      ) =>
                                        updateInsuranceCard(
                                          card.id,
                                          insurance.id,
                                          "policyType",
                                          event
                                            .target
                                            .value
                                        )
                                      }
                                      placeholder="Individual / Family / Employer"
                                      className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 disabled:bg-white"
                                    />

                                  </div>

                                  <div>

                                    <label className="text-sm font-semibold text-slate-600">
                                      Coverage
                                      amount
                                    </label>

                                    <input
                                      type="text"
                                      disabled={
                                        !isEditing
                                      }
                                      value={
                                        insurance.coverageAmount
                                      }
                                      onChange={(
                                        event
                                      ) =>
                                        updateInsuranceCard(
                                          card.id,
                                          insurance.id,
                                          "coverageAmount",
                                          event
                                            .target
                                            .value
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
                                      disabled={
                                        !isEditing
                                      }
                                      value={
                                        insurance.tpa
                                      }
                                      onChange={(
                                        event
                                      ) =>
                                        updateInsuranceCard(
                                          card.id,
                                          insurance.id,
                                          "tpa",
                                          event
                                            .target
                                            .value
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
                                      disabled={
                                        !isEditing
                                      }
                                      value={
                                        insurance.validFrom
                                      }
                                      onChange={(
                                        event
                                      ) =>
                                        updateInsuranceCard(
                                          card.id,
                                          insurance.id,
                                          "validFrom",
                                          event
                                            .target
                                            .value
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
                                      disabled={
                                        !isEditing
                                      }
                                      value={
                                        insurance.expiryDate
                                      }
                                      onChange={(
                                        event
                                      ) =>
                                        updateInsuranceCard(
                                          card.id,
                                          insurance.id,
                                          "expiryDate",
                                          event
                                            .target
                                            .value
                                        )
                                      }
                                      className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 disabled:bg-white"
                                    />

                                  </div>

                                  <div className="md:col-span-2">

                                    <label className="text-sm font-semibold text-slate-600">
                                      Insurance
                                      helpline
                                    </label>

                                    <input
                                      type="tel"
                                      disabled={
                                        !isEditing
                                      }
                                      value={
                                        insurance.helpline
                                      }
                                      onChange={(
                                        event
                                      ) =>
                                        updateInsuranceCard(
                                          card.id,
                                          insurance.id,
                                          "helpline",
                                          event
                                            .target
                                            .value
                                        )
                                      }
                                      className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 disabled:bg-white"
                                    />

                                  </div>

                                </div>

                              </div>
                            )
                          )}

                        </div>

                      </div>

                      {/* QR */}

                      <div className="mt-9 border-t border-slate-100 pt-8">

                        <div className="flex flex-col justify-between gap-5 rounded-2xl bg-[#f4f8f4] p-6 sm:flex-row sm:items-center">

                          <div>

                            <h3 className="font-bold text-[#294b3c]">
                              Emergency
                              Health QR
                            </h3>

                            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                              A QR code can later
                              provide a limited
                              emergency view using
                              only information
                              selected for sharing.
                            </p>

                          </div>

                          <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white text-slate-400">

                            <div className="text-center">

                              <QrCode
                                size={36}
                                className="mx-auto"
                              />

                              <p className="mt-1 text-xs">
                                QR Code
                              </p>

                            </div>

                          </div>

                        </div>

                      </div>

                    </>
                  )}

                </div>

              </section>
            );
          })}

        </div>

        {/* ACCOUNT STORAGE */}

        <section className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-6">

          <div className="flex gap-4">

            <Save className="shrink-0 text-blue-700" />

            <div>

              <p className="font-bold text-blue-900">
                Saved to your TrueTest account
              </p>

              <p className="mt-1 text-sm leading-6 text-blue-800">
                Your Health Card data is linked to
                your signed-in account and protected
                by Supabase Row Level Security.
              </p>

              {saveMessage && (
                <p className="mt-2 text-sm font-semibold text-blue-900">
                  {saveMessage}
                </p>
              )}

            </div>

          </div>

        </section>

        {/* PRIVACY */}

        <section className="mt-6 flex gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-6">

          <ShieldCheck className="shrink-0 text-amber-700" />

          <div>

            <p className="font-bold text-amber-900">
              Privacy notice
            </p>

            <p className="mt-1 text-sm leading-6 text-amber-800">
              Health, identity and insurance
              information is sensitive personal
              data. Only information chosen by the
              user should be shared through
              emergency access or a QR code. Avoid
              exposing complete medical or
              insurance information publicly.
            </p>

          </div>

        </section>

      </main>

    </div>
  );
}

export default HealthCard;