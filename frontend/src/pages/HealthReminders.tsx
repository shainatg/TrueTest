import {
  Activity,
  ArrowLeft,
  BellRing,
  CalendarDays,
  CheckCircle2,
  Clock,
  Edit3,
  Filter,
  Pill,
  Search,
  ShieldCheck,
  Stethoscope,
  Syringe,
  TestTube2,
  Trash2,
  UserRoundCheck,
  XCircle,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

type ReminderType =
  | "Medicine"
  | "Appointment"
  | "Medical Test"
  | "Vaccination"
  | "Follow-up";

type ReminderStatus =
  | "Upcoming"
  | "Completed";

type HealthReminder = {
  id: string;
  title: string;
  type: ReminderType;
  date: string;
  time: string;
  hospital: string;
  notes: string;
  status: ReminderStatus;
};

const reminderTypes: ReminderType[] = [
  "Medicine",
  "Appointment",
  "Medical Test",
  "Vaccination",
  "Follow-up",
];

const getReminderIcon = (
  type: ReminderType
) => {
  if (type === "Medicine") {
    return Pill;
  }

  if (type === "Appointment") {
    return Stethoscope;
  }

  if (type === "Medical Test") {
    return TestTube2;
  }

  if (type === "Vaccination") {
    return Syringe;
  }

  return UserRoundCheck;
};

function HealthReminders() {
  const navigate = useNavigate();

  const [reminders, setReminders] = useState<HealthReminder[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [form, setForm] = useState({
    title: "", type: "Medicine" as ReminderType, date: "", time: "", hospital: "", notes: "",
  });
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const loadReminders = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate("/login"); return; }
      setUserId(user.id);
      const { data, error } = await supabase
        .from("health_reminders")
        .select("id,title,reminder_type,reminder_date,reminder_time,hospital,notes,status")
        .eq("user_id", user.id)
        .order("reminder_date", { ascending: true })
        .order("reminder_time", { ascending: true });
      if (error) {
        console.error(error);
        setStatusMessage("Unable to load your reminders.");
        setLoading(false);
        return;
      }
      setReminders((data ?? []).map((x) => ({
        id: x.id, title: x.title, type: x.reminder_type as ReminderType,
        date: x.reminder_date, time: String(x.reminder_time).slice(0,5),
        hospital: x.hospital ?? "", notes: x.notes ?? "",
        status: x.status as ReminderStatus,
      })));
      setLoading(false);
    };
    loadReminders();
  }, [navigate]);

  const resetForm = () => {
    setForm({
      title: "",
      type: "Medicine",
      date: "",
      time: "",
      hospital: "",
      notes: "",
    });

    setEditingId(null);
  };

  const addOrUpdateReminder = async () => {
    if (!form.title.trim()) { alert("Please enter a reminder title."); return; }
    if (!form.date) { alert("Please select a reminder date."); return; }
    if (!form.time) { alert("Please select a reminder time."); return; }
    if (!userId) { navigate("/login"); return; }

    setSaving(true);
    setStatusMessage("");

    const payload = {
      title: form.title.trim(),
      reminder_type: form.type,
      reminder_date: form.date,
      reminder_time: form.time,
      hospital: form.hospital.trim(),
      notes: form.notes.trim(),
      updated_at: new Date().toISOString(),
    };

    if (editingId !== null) {
      const { data, error } = await supabase.from("health_reminders")
        .update(payload).eq("id", editingId).eq("user_id", userId)
        .select("id,title,reminder_type,reminder_date,reminder_time,hospital,notes,status").single();
      if (error) { console.error(error); setSaving(false); setStatusMessage("Unable to update this reminder."); return; }
      const updated: HealthReminder = {
        id:data.id,title:data.title,type:data.reminder_type as ReminderType,
        date:data.reminder_date,time:String(data.reminder_time).slice(0,5),
        hospital:data.hospital??"",notes:data.notes??"",status:data.status as ReminderStatus
      };
      setReminders(c => c.map(r => r.id === editingId ? updated : r));
      resetForm(); setSaving(false); setStatusMessage("Reminder updated in your account."); return;
    }

    const { data, error } = await supabase.from("health_reminders")
      .insert({ ...payload, user_id:userId, status:"Upcoming" })
      .select("id,title,reminder_type,reminder_date,reminder_time,hospital,notes,status").single();
    if (error) { console.error(error); setSaving(false); setStatusMessage("Unable to save this reminder."); return; }
    const added: HealthReminder = {
      id:data.id,title:data.title,type:data.reminder_type as ReminderType,
      date:data.reminder_date,time:String(data.reminder_time).slice(0,5),
      hospital:data.hospital??"",notes:data.notes??"",status:data.status as ReminderStatus
    };
    setReminders(c => [added,...c]);
    resetForm(); setSaving(false); setStatusMessage("Reminder saved to your account.");
  };

  const editReminder = (
    reminder: HealthReminder
  ) => {
    setEditingId(reminder.id);

    setForm({
      title: reminder.title,
      type: reminder.type,
      date: reminder.date,
      time: reminder.time,
      hospital: reminder.hospital,
      notes: reminder.notes,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deleteReminder = async (reminderId: string) => {
    if (!window.confirm("Delete this reminder?") || !userId) return;
    const { error } = await supabase.from("health_reminders").delete()
      .eq("id", reminderId).eq("user_id", userId);
    if (error) { console.error(error); alert("Unable to delete this reminder."); return; }
    setReminders(c => c.filter(r => r.id !== reminderId));
  };

  const toggleCompleted = async (reminderId: string) => {
    if (!userId) return;
    const r = reminders.find(x => x.id === reminderId);
    if (!r) return;
    const newStatus: ReminderStatus = r.status === "Completed" ? "Upcoming" : "Completed";
    const { error } = await supabase.from("health_reminders")
      .update({ status:newStatus, updated_at:new Date().toISOString() })
      .eq("id", reminderId).eq("user_id", userId);
    if (error) { console.error(error); alert("Unable to update reminder status."); return; }
    setReminders(c => c.map(x => x.id === reminderId ? {...x,status:newStatus} : x));
  };

  const isOverdue = (
    reminder: HealthReminder
  ) => {
    if (
      reminder.status === "Completed"
    ) {
      return false;
    }

    const reminderDate =
      new Date(
        `${reminder.date}T${reminder.time}`
      );

    return (
      reminderDate.getTime() <
      Date.now()
    );
  };

  const filteredReminders =
    useMemo(() => {
      const search =
        searchText
          .toLowerCase()
          .trim();

      return reminders.filter(
        (reminder) => {
          const matchesSearch =
            !search ||
            reminder.title
              .toLowerCase()
              .includes(search) ||
            reminder.hospital
              .toLowerCase()
              .includes(search) ||
            reminder.type
              .toLowerCase()
              .includes(search);

          const matchesType =
            filterType === "All" ||
            reminder.type ===
              filterType;

          const matchesStatus =
            filterStatus === "All" ||
            reminder.status ===
              filterStatus;

          return (
            matchesSearch &&
            matchesType &&
            matchesStatus
          );
        }
      );
    }, [
      reminders,
      searchText,
      filterType,
      filterStatus,
    ]);

  const upcomingCount =
    reminders.filter(
      (reminder) =>
        reminder.status ===
        "Upcoming"
    ).length;

  const completedCount =
    reminders.filter(
      (reminder) =>
        reminder.status ===
        "Completed"
    ).length;

  const overdueCount =
    reminders.filter(isOverdue)
      .length;

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-[#f8fbf8] text-[#315c47]"><p className="font-semibold">Loading your Health Reminders...</p></div>;
  }

  return (
    <div className="min-h-screen bg-[#f8fbf8] text-slate-800">

      {/* HEADER */}

      <header className="border-b border-emerald-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">

          <button
            type="button"
            onClick={() =>
              navigate("/")
            }
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
            onClick={() =>
              navigate("/")
            }
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
            <BellRing size={23} />

            <span className="font-semibold">
              Health Reminders
            </span>
          </div>

          <h1 className="mt-5 text-4xl font-bold text-[#203f32] sm:text-5xl">
            Never miss an important
            health task
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Create reminders for medicines,
            appointments, tests,
            vaccinations and follow-ups.
          </p>

        </section>

        {/* STATS */}

        <section className="mt-7 grid gap-4 sm:grid-cols-3">

          <div className="rounded-2xl border border-blue-100 bg-white p-5">
            <p className="text-sm text-slate-500">
              Upcoming
            </p>

            <p className="mt-2 text-3xl font-bold text-blue-700">
              {upcomingCount}
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-white p-5">
            <p className="text-sm text-slate-500">
              Completed
            </p>

            <p className="mt-2 text-3xl font-bold text-emerald-700">
              {completedCount}
            </p>
          </div>

          <div className="rounded-2xl border border-red-100 bg-white p-5">
            <p className="text-sm text-slate-500">
              Overdue
            </p>

            <p className="mt-2 text-3xl font-bold text-red-700">
              {overdueCount}
            </p>
          </div>

        </section>

        {/* ADD REMINDER */}

        <section className="mt-8 rounded-3xl border border-emerald-100 bg-white p-7 shadow-sm">

          <div className="flex items-center gap-3">

            <CalendarDays className="text-[#5f7f65]" />

            <h2 className="text-2xl font-bold text-[#294b3c]">
              {editingId !== null
                ? "Edit Reminder"
                : "Create Reminder"}
            </h2>

          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">

            <div>
              <label className="text-sm font-semibold text-slate-600">
                Reminder title
              </label>

              <input
                type="text"
                value={form.title}
                onChange={(event) =>
                  setForm(
                    (current) => ({
                      ...current,
                      title:
                        event.target
                          .value,
                    })
                  )
                }
                placeholder="Example: Take BP medicine"
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#6f8f72]"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-600">
                Reminder type
              </label>

              <select
                value={form.type}
                onChange={(event) =>
                  setForm(
                    (current) => ({
                      ...current,
                      type:
                        event.target
                          .value as ReminderType,
                    })
                  )
                }
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#6f8f72]"
              >
                {reminderTypes.map(
                  (type) => (
                    <option
                      key={type}
                      value={type}
                    >
                      {type}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-600">
                Date
              </label>

              <input
                type="date"
                value={form.date}
                onChange={(event) =>
                  setForm(
                    (current) => ({
                      ...current,
                      date:
                        event.target
                          .value,
                    })
                  )
                }
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#6f8f72]"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-600">
                Time
              </label>

              <input
                type="time"
                value={form.time}
                onChange={(event) =>
                  setForm(
                    (current) => ({
                      ...current,
                      time:
                        event.target
                          .value,
                    })
                  )
                }
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#6f8f72]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-slate-600">
                Doctor / Hospital
              </label>

              <input
                type="text"
                value={form.hospital}
                onChange={(event) =>
                  setForm(
                    (current) => ({
                      ...current,
                      hospital:
                        event.target
                          .value,
                    })
                  )
                }
                placeholder="Optional"
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#6f8f72]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-slate-600">
                Notes
              </label>

              <textarea
                value={form.notes}
                onChange={(event) =>
                  setForm(
                    (current) => ({
                      ...current,
                      notes:
                        event.target
                          .value,
                    })
                  )
                }
                placeholder="Optional notes"
                className="mt-2 min-h-24 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#6f8f72]"
              />
            </div>

          </div>

          <div className="mt-6 flex flex-wrap gap-3">

            <button
              type="button"
              onClick={
                addOrUpdateReminder
              }
              disabled={saving}
              className="rounded-xl bg-[#315c47] px-6 py-3 font-semibold text-white disabled:opacity-60"
            >
              {saving ? "Saving..." : editingId !== null
                ? "Update Reminder"
                : "Save Reminder"}
            </button>

            {editingId !== null && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700"
              >
                Cancel
              </button>
            )}

          </div>

        </section>

        {/* SEARCH FILTER */}

        <section className="mt-8 grid gap-4 md:grid-cols-[1fr_auto_auto]">

          <div className="relative">

            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={searchText}
              onChange={(event) =>
                setSearchText(
                  event.target.value
                )
              }
              placeholder="Search reminders..."
              className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 outline-none"
            />

          </div>

          <div className="relative">

            <Filter
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              value={filterType}
              onChange={(event) =>
                setFilterType(
                  event.target.value
                )
              }
              className="rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-5"
            >
              <option value="All">
                All Types
              </option>

              {reminderTypes.map(
                (type) => (
                  <option
                    key={type}
                    value={type}
                  >
                    {type}
                  </option>
                )
              )}
            </select>

          </div>

          <select
            value={filterStatus}
            onChange={(event) =>
              setFilterStatus(
                event.target.value
              )
            }
            className="rounded-xl border border-slate-300 bg-white px-4 py-3"
          >
            <option value="All">
              All Status
            </option>

            <option value="Upcoming">
              Upcoming
            </option>

            <option value="Completed">
              Completed
            </option>
          </select>

        </section>

        {/* REMINDERS */}

        <section className="mt-8">

          <div className="flex items-center justify-between">

            <h2 className="text-3xl font-bold text-[#294b3c]">
              Your Reminders
            </h2>

            <p className="text-sm text-slate-500">
              {filteredReminders.length}{" "}
              reminder
              {filteredReminders.length ===
              1
                ? ""
                : "s"}
            </p>

          </div>

          {filteredReminders.length ===
          0 ? (
            <div className="mt-6 rounded-3xl border border-dashed border-emerald-200 bg-white p-12 text-center">

              <BellRing
                size={44}
                className="mx-auto text-[#6f8f72]"
              />

              <h3 className="mt-4 text-xl font-bold text-[#294b3c]">
                No reminders found
              </h3>

              <p className="mt-2 text-slate-500">
                Create your first health
                reminder above.
              </p>

            </div>
          ) : (
            <div className="mt-6 grid gap-5 md:grid-cols-2">

              {filteredReminders.map(
                (reminder) => {
                  const Icon =
                    getReminderIcon(
                      reminder.type
                    );

                  const overdue =
                    isOverdue(
                      reminder
                    );

                  return (
                    <article
                      key={
                        reminder.id
                      }
                      className={`rounded-2xl border bg-white p-6 shadow-sm ${
                        overdue
                          ? "border-red-200"
                          : reminder.status ===
                            "Completed"
                          ? "border-emerald-200"
                          : "border-slate-200"
                      }`}
                    >

                      <div className="flex items-start justify-between gap-4">

                        <div className="flex items-start gap-4">

                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#edf5ef] text-[#58775e]">
                            <Icon
                              size={22}
                            />
                          </div>

                          <div>

                            <p className="text-lg font-bold text-slate-800">
                              {
                                reminder.title
                              }
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                              {
                                reminder.type
                              }
                            </p>

                          </div>

                        </div>

                        <div className="flex gap-1">

                          <button
                            type="button"
                            onClick={() =>
                              editReminder(
                                reminder
                              )
                            }
                            className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                          >
                            <Edit3
                              size={17}
                            />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              deleteReminder(
                                reminder.id
                              )
                            }
                            className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                          >
                            <Trash2
                              size={17}
                            />
                          </button>

                        </div>

                      </div>

                      <div className="mt-5 flex flex-wrap gap-3">

                        <span className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-600">
                          <CalendarDays
                            size={16}
                          />
                          {
                            reminder.date
                          }
                        </span>

                        <span className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-600">
                          <Clock
                            size={16}
                          />
                          {
                            reminder.time
                          }
                        </span>

                      </div>

                      {reminder.hospital && (
                        <p className="mt-4 text-sm text-slate-600">
                          <span className="font-semibold">
                            Doctor /
                            Hospital:
                          </span>{" "}
                          {
                            reminder.hospital
                          }
                        </p>
                      )}

                      {reminder.notes && (
                        <p className="mt-3 text-sm leading-6 text-slate-500">
                          {
                            reminder.notes
                          }
                        </p>
                      )}

                      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5">

                        <div>

                          {reminder.status ===
                          "Completed" ? (
                            <span className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
                              <CheckCircle2
                                size={17}
                              />
                              Completed
                            </span>
                          ) : overdue ? (
                            <span className="flex items-center gap-2 text-sm font-semibold text-red-700">
                              <XCircle
                                size={17}
                              />
                              Overdue
                            </span>
                          ) : (
                            <span className="text-sm font-semibold text-blue-700">
                              Upcoming
                            </span>
                          )}

                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            toggleCompleted(
                              reminder.id
                            )
                          }
                          className={`rounded-xl px-4 py-2 text-sm font-semibold ${
                            reminder.status ===
                            "Completed"
                              ? "border border-slate-300 text-slate-600"
                              : "bg-[#315c47] text-white"
                          }`}
                        >
                          {reminder.status ===
                          "Completed"
                            ? "Mark Upcoming"
                            : "Mark Completed"}
                        </button>

                      </div>

                    </article>
                  );
                }
              )}

            </div>
          )}

        </section>

        {/* LOCAL STORAGE */}

        <section className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-6">

          <div className="flex gap-4">

            <ShieldCheck className="shrink-0 text-blue-700" />

            <div>

              <p className="font-bold text-blue-900">
                Saved to your TrueTest account
              </p>

              <p className="mt-1 text-sm leading-6 text-blue-800">
                Your health reminders are linked
                to your signed-in account and protected
                by Supabase Row Level Security.
              </p>

              {statusMessage && (
                <p className="mt-2 text-sm font-semibold text-blue-900">
                  {statusMessage}
                </p>
              )}

              <p className="hidden">
              </p>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default HealthReminders;