import {
  Activity,
  ArrowLeft,
  Download,
  FileImage,
  FileText,
  FolderHeart,
  Search,
  ShieldCheck,
  Trash2,
  Upload,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
} from "react";

import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

type LockerDocument = {
  id: string;
  name: string;
  category: string;
  hospital: string;
  date: string;
  notes: string;

  fileName: string;
  fileType: string;
  filePath: string;
};

const categories = [
  "All",
  "Lab Report",
  "Prescription",
  "Vaccination Record",
  "Scan / Imaging Report",
  "Discharge Summary",
  "Other Health Record",
];

function HealthLocker() {
  const navigate = useNavigate();

  const [documents, setDocuments] =
    useState<LockerDocument[]>([]);

  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [form, setForm] = useState({
    name: "",
    category: "Lab Report",
    hospital: "",
    date: "",
    notes: "",
  });

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [userId, setUserId] =
    useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] =
    useState("");

  useEffect(() => {
    const loadDocuments = async () => {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login");
        return;
      }

      setUserId(user.id);

      const { data, error } = await supabase
        .from("health_locker")
        .select(
          "id, document_name, category, hospital, document_date, notes, file_name, file_type, file_url, created_at"
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        setStatusMessage(
          "Unable to load Health Locker records."
        );
        setLoading(false);
        return;
      }

      const mapped: LockerDocument[] = (data ?? []).map(
        (item) => ({
          id: item.id,
          name: item.document_name ?? "",
          category: item.category ?? "",
          hospital: item.hospital ?? "",
          date: item.document_date ?? "",
          notes: item.notes ?? "",
          fileName: item.file_name ?? "",
          fileType: item.file_type ?? "",
          filePath: item.file_url ?? "",
        })
      );

      setDocuments(mapped);
      setLoading(false);
    };

    loadDocuments();
  }, [navigate]);

  const handleFileSelect = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a PDF or image file.");
      event.target.value = "";
      return;
    }

    setSelectedFile(file);
  };

  const sanitizeFileName = (name: string) =>
    name.replace(/[^a-zA-Z0-9._-]/g, "_");

  const addDocument = async () => {
    if (!form.name.trim()) {
      alert("Please enter a document name.");
      return;
    }

    if (!selectedFile) {
      alert("Please upload a file.");
      return;
    }

    if (!userId) {
      navigate("/login");
      return;
    }

    setSaving(true);
    setStatusMessage("");

    const safeFileName = sanitizeFileName(
      selectedFile.name
    );

    const filePath = `${userId}/${Date.now()}-${safeFileName}`;

    const { error: uploadError } = await supabase.storage
      .from("health-documents")
      .upload(filePath, selectedFile, {
        contentType: selectedFile.type,
        upsert: false,
      });

    if (uploadError) {
      console.error(uploadError);
      setSaving(false);
      setStatusMessage(
        "Unable to upload this file."
      );
      return;
    }

    const { data, error: insertError } = await supabase
      .from("health_locker")
      .insert({
        user_id: userId,
        document_name: form.name.trim(),
        category: form.category,
        hospital: form.hospital.trim(),
        document_date: form.date || null,
        notes: form.notes.trim(),
        file_name: selectedFile.name,
        file_type: selectedFile.type,
        file_url: filePath,
      })
      .select(
        "id, document_name, category, hospital, document_date, notes, file_name, file_type, file_url"
      )
      .single();

    if (insertError) {
      console.error(insertError);

      await supabase.storage
        .from("health-documents")
        .remove([filePath]);

      setSaving(false);
      setStatusMessage(
        "Unable to save this Health Locker record."
      );
      return;
    }

    const newDocument: LockerDocument = {
      id: data.id,
      name: data.document_name ?? "",
      category: data.category ?? "",
      hospital: data.hospital ?? "",
      date: data.document_date ?? "",
      notes: data.notes ?? "",
      fileName: data.file_name ?? "",
      fileType: data.file_type ?? "",
      filePath: data.file_url ?? "",
    };

    setDocuments((current) => [
      newDocument,
      ...current,
    ]);

    setForm({
      name: "",
      category: "Lab Report",
      hospital: "",
      date: "",
      notes: "",
    });

    setSelectedFile(null);
    setSaving(false);
    setStatusMessage("Saved to your account.");
  };

  const deleteDocument = async (
    document: LockerDocument
  ) => {
    const confirmed = window.confirm(
      "Delete this document from Health Locker?"
    );

    if (!confirmed) return;

    const { error: storageError } =
      await supabase.storage
        .from("health-documents")
        .remove([document.filePath]);

    if (storageError) {
      console.error(storageError);
      alert("Unable to delete the stored file.");
      return;
    }

    const { error: databaseError } = await supabase
      .from("health_locker")
      .delete()
      .eq("id", document.id);

    if (databaseError) {
      console.error(databaseError);
      alert(
        "The file was removed, but the record could not be deleted."
      );
      return;
    }

    setDocuments((current) =>
      current.filter(
        (item) => item.id !== document.id
      )
    );
  };

  const filteredDocuments = useMemo(() => {
    const search = searchText.toLowerCase().trim();

    return documents.filter((document) => {
      const matchesCategory =
        categoryFilter === "All" ||
        document.category === categoryFilter;

      const matchesSearch =
        !search ||
        document.name.toLowerCase().includes(search) ||
        document.hospital.toLowerCase().includes(search) ||
        document.category.toLowerCase().includes(search);

      return matchesCategory && matchesSearch;
    });
  }, [documents, searchText, categoryFilter]);

  const openDocument = async (
    document: LockerDocument
  ) => {
    const { data, error } = await supabase.storage
      .from("health-documents")
      .createSignedUrl(document.filePath, 60);

    if (error || !data?.signedUrl) {
      console.error(error);
      alert("Unable to open this document.");
      return;
    }

    window.open(
      data.signedUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const downloadDocument = async (
    document: LockerDocument
  ) => {
    const { data, error } = await supabase.storage
      .from("health-documents")
      .download(document.filePath);

    if (error || !data) {
      console.error(error);
      alert("Unable to download this document.");
      return;
    }

    const url = URL.createObjectURL(data);
    const link = window.document.createElement("a");

    link.href = url;
    link.download = document.fileName;
    link.click();

    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fbf8] text-[#315c47]">
        <p className="font-semibold">
          Loading your Health Locker...
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
            <FolderHeart size={23} />

            <span className="font-semibold">
              Personal Health Records
            </span>
          </div>

          <h1 className="mt-5 text-4xl font-bold text-[#203f32] sm:text-5xl">
            Health Locker
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Keep important prescriptions, reports,
            vaccination records and other health
            documents together for quick access.
          </p>

        </section>

        {/* ADD DOCUMENT */}

        <section className="mt-8 rounded-3xl border border-emerald-100 bg-white p-7 shadow-sm">

          <div className="flex items-center gap-3">

            <Upload className="text-[#5f7f65]" />

            <h2 className="text-2xl font-bold text-[#294b3c]">
              Add Health Record
            </h2>

          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">

            <div>
              <label className="text-sm font-semibold text-slate-600">
                Document name
              </label>

              <input
                type="text"
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
                placeholder="Example: CBC Report"
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#6f8f72]"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-600">
                Category
              </label>

              <select
                value={form.category}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    category: event.target.value,
                  }))
                }
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#6f8f72]"
              >
                {categories
                  .filter((category) => category !== "All")
                  .map((category) => (
                    <option
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-600">
                Hospital / Lab
              </label>

              <input
                type="text"
                value={form.hospital}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    hospital: event.target.value,
                  }))
                }
                placeholder="Optional"
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#6f8f72]"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-600">
                Date
              </label>

              <input
                type="date"
                value={form.date}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    date: event.target.value,
                  }))
                }
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#6f8f72]"
              />
            </div>

          </div>

          <div className="mt-5">

            <label className="text-sm font-semibold text-slate-600">
              Notes
            </label>

            <textarea
              value={form.notes}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  notes: event.target.value,
                }))
              }
              placeholder="Optional notes about this record"
              className="mt-2 min-h-24 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#6f8f72]"
            />

          </div>

          {/* FILE UPLOAD */}

          <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-emerald-200 bg-[#f8fbf8] px-6 py-10 text-center">

            <Upload
              size={30}
              className="text-[#5f7f65]"
            />

            <p className="mt-4 font-bold text-[#315c47]">
              Upload PDF or Image
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Accepted: PDF, JPG, PNG, WEBP
            </p>

            {selectedFile && (
              <p className="mt-4 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-700">
                {selectedFile.name}
              </p>
            )}

            <input
              type="file"
              accept=".pdf,image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleFileSelect}
            />

          </label>

          <button
            type="button"
            onClick={addDocument}
            disabled={saving}
            className="mt-6 rounded-xl bg-[#315c47] px-6 py-3 font-semibold text-white hover:bg-[#274c3b] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save to Health Locker"}
          </button>

        </section>

        {/* SEARCH & FILTER */}

        <section className="mt-8">

          <div className="flex flex-col gap-4 md:flex-row">

            <div className="relative flex-1">

              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={searchText}
                onChange={(event) =>
                  setSearchText(event.target.value)
                }
                placeholder="Search saved records..."
                className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 outline-none focus:border-[#6f8f72]"
              />

            </div>

            <select
              value={categoryFilter}
              onChange={(event) =>
                setCategoryFilter(event.target.value)
              }
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none"
            >
              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ))}
            </select>

          </div>

        </section>

        {/* RECORDS */}

        <section className="mt-8">

          <div className="flex items-center justify-between">

            <h2 className="text-3xl font-bold text-[#294b3c]">
              Saved Records
            </h2>

            <p className="text-sm text-slate-500">
              {filteredDocuments.length} record
              {filteredDocuments.length === 1 ? "" : "s"}
            </p>

          </div>

          {filteredDocuments.length === 0 ? (
            <div className="mt-6 rounded-3xl border border-dashed border-emerald-200 bg-white p-12 text-center">

              <FolderHeart
                size={44}
                className="mx-auto text-[#6f8f72]"
              />

              <h3 className="mt-4 text-xl font-bold text-[#294b3c]">
                No health records found
              </h3>

              <p className="mt-2 text-slate-500">
                Upload your first record or change
                the search filter.
              </p>

            </div>
          ) : (
            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

              {filteredDocuments.map((document) => (
                <article
                  key={document.id}
                  className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm"
                >

                  <div className="flex items-start justify-between gap-4">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf5ef] text-[#58775e]">

                      {document.fileType ===
                      "application/pdf" ? (
                        <FileText size={23} />
                      ) : (
                        <FileImage size={23} />
                      )}

                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        deleteDocument(document)
                      }
                      className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                  <h3 className="mt-5 text-lg font-bold text-[#294b3c]">
                    {document.name}
                  </h3>

                  <span className="mt-3 inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    {document.category}
                  </span>

                  {document.hospital && (
                    <p className="mt-4 text-sm text-slate-500">
                      Hospital / Lab:
                      <span className="ml-1 font-medium text-slate-700">
                        {document.hospital}
                      </span>
                    </p>
                  )}

                  {document.date && (
                    <p className="mt-2 text-sm text-slate-500">
                      Date:
                      <span className="ml-1 font-medium text-slate-700">
                        {document.date}
                      </span>
                    </p>
                  )}

                  {document.notes && (
                    <p className="mt-4 text-sm leading-6 text-slate-600">
                      {document.notes}
                    </p>
                  )}

                  <div className="mt-6 flex gap-3">

                    <button
                      type="button"
                      onClick={() =>
                        openDocument(document)
                      }
                      className="flex-1 rounded-xl border border-[#6f8f72] px-4 py-2.5 text-sm font-semibold text-[#315c47]"
                    >
                      View
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        downloadDocument(document)
                      }
                      className="flex items-center justify-center gap-2 rounded-xl bg-[#315c47] px-4 py-2.5 text-sm font-semibold text-white"
                    >
                      <Download size={17} />
                      Download
                    </button>

                  </div>

                </article>
              ))}

            </div>
          )}

        </section>

        {/* ACCOUNT STORAGE */}

        <section className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-6">

          <div className="flex gap-4">

            <ShieldCheck className="shrink-0 text-blue-700" />

            <div>

              <p className="font-bold text-blue-900">
                Saved to your TrueTest account
              </p>

              <p className="mt-1 text-sm leading-6 text-blue-800">
                Your Health Locker records are linked
                to your signed-in account. Files are
                stored in a private Supabase Storage
                bucket and database access is restricted
                by Row Level Security.
              </p>

              {statusMessage && (
                <p className="mt-2 text-sm font-semibold text-blue-900">
                  {statusMessage}
                </p>
              )}

            </div>

          </div>

        </section>

        {/* PRIVACY */}

        <section className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-6">

          <p className="font-bold text-amber-900">
            Privacy notice
          </p>

          <p className="mt-2 text-sm leading-6 text-amber-800">
            Health records can contain sensitive
            personal and medical information. Avoid
            uploading records on shared or public
            devices and do not expose private
            documents publicly.
          </p>

        </section>

      </main>
    </div>
  );
}

export default HealthLocker;