export const testSearchOptions = [
  { name: "Complete Blood Count", shortName: "CBC", key: "cbc" },
  { name: "HbA1c", shortName: "HbA1c", key: "hba1c" },
  { name: "Lipid Profile", shortName: "Lipid", key: "lipid" },
  { name: "Thyroid Function Test", shortName: "TFT", key: "thyroid" },

  { name: "Liver Function Test", shortName: "LFT", key: "lft" },
  { name: "Kidney Function Test", shortName: "KFT", key: "kft" },
  { name: "Renal Function Test", shortName: "RFT", key: "kft" },

  { name: "Vitamin D", shortName: "Vit D", key: "vitamin-d" },
  { name: "Vitamin B12", shortName: "B12", key: "vitamin-b12" },

  {
    name: "Fasting Blood Sugar",
    shortName: "FBS",
    key: "fbs",
  },

  {
    name: "C-Reactive Protein",
    shortName: "CRP",
    key: "crp",
  },

  {
    name: "Erythrocyte Sedimentation Rate",
    shortName: "ESR",
    key: "esr",
  },

  {
    name: "Urine Routine Examination",
    shortName: "Urine Routine",
    key: "urine",
  },

  {
    name: "Serum Creatinine",
    shortName: "Creatinine",
    key: "creatinine",
  },

  {
    name: "Iron Profile",
    shortName: "Iron Studies",
    key: "iron",
  },
];

export const getTestSuggestions = (value: string) => {
  const search = value.trim().toLowerCase();

  if (!search) return [];

  return testSearchOptions
    .filter((test) => {
      return (
        test.name.toLowerCase().includes(search) ||
        test.shortName.toLowerCase().includes(search) ||
        test.key.toLowerCase().includes(search)
      );
    })
    .slice(0, 8);
};