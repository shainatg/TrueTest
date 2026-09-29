import {
  Activity,
  ArrowLeft,
  Bluetooth,
  Footprints,
  HeartPulse,
  Moon,
  Plus,
  RefreshCw,
  ShieldCheck,
  Flame,
  TimerReset,
  Waves,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

type WearableReading = {
  id: string;
  recorded_at: string;
  heart_rate: number | null;
  steps: number | null;
  spo2: number | null;
  sleep_hours: number | null;
  calories: number | null;
  active_minutes: number | null;
  source: string | null;
};

function WearableHealth() {
  const navigate = useNavigate();

  const [userId, setUserId] =
    useState<string | null>(null);

  const [readings, setReadings] =
    useState<WearableReading[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [showForm, setShowForm] =
    useState(false);

  const [form, setForm] = useState({
    heartRate: "",
    steps: "",
    spo2: "",
    sleepHours: "",
    calories: "",
    activeMinutes: "",
  });

  const loadReadings = async () => {
    setLoading(true);
    setMessage("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/login");
      return;
    }

    setUserId(user.id);

    const { data, error } = await supabase
      .from("wearable_readings")
      .select(
        "id, recorded_at, heart_rate, steps, spo2, sleep_hours, calories, active_minutes, source"
      )
      .eq("user_id", user.id)
      .order("recorded_at", {
        ascending: false,
      })
      .limit(30);

    if (error) {
      console.error(error);
      setMessage(
        "Unable to load wearable data."
      );
      setLoading(false);
      return;
    }

    setReadings(
      (data ?? []) as WearableReading[]
    );

    setLoading(false);
  };

  useEffect(() => {
    loadReadings();
  }, []);

  const latest = readings[0] ?? null;

  const averageHeartRate = useMemo(() => {
    const values = readings
      .map((item) => item.heart_rate)
      .filter(
        (value): value is number =>
          value !== null
      );

    if (values.length === 0) return null;

    return Math.round(
      values.reduce(
        (sum, value) => sum + value,
        0
      ) / values.length
    );
  }, [readings]);

  const totalSteps = useMemo(() => {
    return readings.reduce(
      (sum, item) =>
        sum + (item.steps ?? 0),
      0
    );
  }, [readings]);

  const saveReading = async () => {
    if (!userId) {
      navigate("/login");
      return;
    }

    const payload = {
      user_id: userId,
      heart_rate: form.heartRate
        ? Number(form.heartRate)
        : null,
      steps: form.steps
        ? Number(form.steps)
        : null,
      spo2: form.spo2
        ? Number(form.spo2)
        : null,
      sleep_hours: form.sleepHours
        ? Number(form.sleepHours)
        : null,
      calories: form.calories
        ? Number(form.calories)
        : null,
      active_minutes: form.activeMinutes
        ? Number(form.activeMinutes)
        : null,
      source: "manual",
    };

    const hasAnyValue =
      payload.heart_rate !== null ||
      payload.steps !== null ||
      payload.spo2 !== null ||
      payload.sleep_hours !== null ||
      payload.calories !== null ||
      payload.active_minutes !== null;

    if (!hasAnyValue) {
      setMessage(
        "Enter at least one wearable value."
      );
      return;
    }

    setSaving(true);
    setMessage("");

    const { error } = await supabase
      .from("wearable_readings")
      .insert(payload);

    if (error) {
      console.error(error);
      setMessage(
        "Unable to save wearable reading."
      );
      setSaving(false);
      return;
    }

    setForm({
      heartRate: "",
      steps: "",
      spo2: "",
      sleepHours: "",
      calories: "",
      activeMinutes: "",
    });

    setShowForm(false);
    setMessage(
      "Wearable reading saved to your account."
    );
    setSaving(false);

    await loadReadings();
  };

  const metricCards = [
    {
      label: "Heart Rate",
      value:
        latest?.heart_rate !== null &&
        latest?.heart_rate !== undefined
          ? `${latest.heart_rate} bpm`
          : "No data",
      icon: HeartPulse,
    },
    {
      label: "Steps",
      value:
        latest?.steps !== null &&
        latest?.steps !== undefined
          ? latest.steps.toLocaleString()
          : "No data",
      icon: Footprints,
    },
    {
      label: "SpO₂",
      value:
        latest?.spo2 !== null &&
        latest?.spo2 !== undefined
          ? `${latest.spo2}%`
          : "No data",
      icon: Waves,
    },
    {
      label: "Sleep",
      value:
        latest?.sleep_hours !== null &&
        latest?.sleep_hours !== undefined
          ? `${latest.sleep_hours} hrs`
          : "No data",
      icon: Moon,
    },
    {
      label: "Calories",
      value:
        latest?.calories !== null &&
        latest?.calories !== undefined
          ? `${latest.calories} kcal`
          : "No data",
      icon: Flame,
    },
    {
      label: "Active Time",
      value:
        latest?.active_minutes !== null &&
        latest?.active_minutes !== undefined
          ? `${latest.active_minutes} min`
          : "No data",
      icon: TimerReset,
    },
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fbf8] text-[#315c47]">
        <p className="font-semibold">
          Loading wearable health data...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fbf8] text-slate-800">
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
        <section className="rounded-[2rem] bg-gradient-to-br from-[#edf6ed] to-white p-8 sm:p-10">
          <div className="flex items-center gap-2 text-[#315c47]">
            <Bluetooth size={23} />
            <span className="font-semibold">
              Wearable Health
            </span>
          </div>

          <h1 className="mt-5 text-4xl font-bold text-[#203f32] sm:text-5xl">
            Smartwatch Health Data
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Keep selected wearable health metrics
            together with your TrueTest account.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() =>
                setShowForm(
                  (current) => !current
                )
              }
              className="flex items-center gap-2 rounded-xl bg-[#315c47] px-5 py-3 font-semibold text-white"
            >
              <Plus size={18} />
              Add wearable reading
            </button>

            <button
              type="button"
              onClick={loadReadings}
              className="flex items-center gap-2 rounded-xl border border-[#6f8f72] bg-white px-5 py-3 font-semibold text-[#315c47]"
            >
              <RefreshCw size={18} />
              Refresh
            </button>
          </div>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {metricCards.map((metric) => {
            const Icon = metric.icon;

            return (
              <div
                key={metric.label}
                className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-500">
                    {metric.label}
                  </p>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf5ef] text-[#58775e]">
                    <Icon size={20} />
                  </div>
                </div>

                <p className="mt-4 text-3xl font-bold text-[#294b3c]">
                  {metric.value}
                </p>
              </div>
            );
          })}
        </section>

        {showForm && (
          <section className="mt-8 rounded-3xl border border-emerald-100 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-bold text-[#294b3c]">
              Add Wearable Reading
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Manual entry is for testing the
              wearable module before a real device
              connector is added.
            </p>

            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="text-sm font-semibold text-slate-600">
                  Heart rate (bpm)
                </label>
                <input
                  type="number"
                  value={form.heartRate}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      heartRate:
                        event.target.value,
                    }))
                  }
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-600">
                  Steps
                </label>
                <input
                  type="number"
                  value={form.steps}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      steps: event.target.value,
                    }))
                  }
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-600">
                  SpO₂ (%)
                </label>
                <input
                  type="number"
                  value={form.spo2}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      spo2: event.target.value,
                    }))
                  }
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-600">
                  Sleep (hours)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={form.sleepHours}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      sleepHours:
                        event.target.value,
                    }))
                  }
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-600">
                  Calories (kcal)
                </label>
                <input
                  type="number"
                  value={form.calories}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      calories:
                        event.target.value,
                    }))
                  }
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-600">
                  Active minutes
                </label>
                <input
                  type="number"
                  value={form.activeMinutes}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      activeMinutes:
                        event.target.value,
                    }))
                  }
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={saveReading}
              disabled={saving}
              className="mt-6 rounded-xl bg-[#315c47] px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving
                ? "Saving..."
                : "Save Reading"}
            </button>
          </section>
        )}

        <section className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-emerald-100 bg-white p-6">
            <h2 className="text-xl font-bold text-[#294b3c]">
              Summary
            </h2>

            <div className="mt-5 space-y-3 text-sm text-slate-600">
              <p>
                Average recorded heart rate:{" "}
                <span className="font-semibold text-slate-800">
                  {averageHeartRate !== null
                    ? `${averageHeartRate} bpm`
                    : "No data"}
                </span>
              </p>

              <p>
                Steps across saved readings:{" "}
                <span className="font-semibold text-slate-800">
                  {totalSteps.toLocaleString()}
                </span>
              </p>

              <p>
                Saved readings:{" "}
                <span className="font-semibold text-slate-800">
                  {readings.length}
                </span>
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
            <div className="flex gap-4">
              <Bluetooth className="shrink-0 text-blue-700" />

              <div>
                <p className="font-bold text-blue-900">
                  Device connection
                </p>

                <p className="mt-2 text-sm leading-6 text-blue-800">
                  This page is ready to receive
                  wearable readings. Direct smartwatch
                  sync will be added through a supported
                  health platform or device API rather
                  than pretending the browser can read
                  every watch directly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {message && (
          <div className="mt-6 rounded-xl bg-[#edf5ef] px-5 py-4 text-sm font-semibold text-[#315c47]">
            {message}
          </div>
        )}

        <section className="mt-6 flex gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <ShieldCheck className="shrink-0 text-amber-700" />

          <div>
            <p className="font-bold text-amber-900">
              Wearable data notice
            </p>

            <p className="mt-1 text-sm leading-6 text-amber-800">
              Consumer wearable measurements may be
              useful for personal tracking but are not
              a diagnosis and should not replace
              professional medical evaluation.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default WearableHealth;
