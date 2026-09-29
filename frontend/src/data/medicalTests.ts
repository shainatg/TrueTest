export const testData = {
  "fasting-blood-sugar": {
    name: "Fasting Blood Sugar",
    category: "Blood Test",
    purpose:
      "Measures blood glucose after a fasting period and helps screen for or monitor diabetes.",
    sampleType: "Blood",
    fastingRequired: "Yes",
    fastingHours: "8–12 hours",
    preparation: [
      "Do not eat during the fasting period.",
      "Plain water is usually allowed.",
      "Avoid tea, coffee, juice and sugary drinks.",
      "Tell the laboratory about medicines you take regularly.",
      "Follow your doctor's instructions regarding diabetes medicines before the test.",
    ],
    duration: "5–10 minutes for sample collection",
    resultTime: "Usually same day",
    relatedDiseases: ["Diabetes Mellitus", "Prediabetes", "Metabolic Syndrome"],
    prices: [
      {
        hospital: "GreenCare Hospital",
        city: "Hyderabad",
        type: "Private",
        price: "₹180",
      },
      {
        hospital: "City Government Hospital",
        city: "Hyderabad",
        type: "Government",
        price: "₹80",
      },
      {
        hospital: "HealthFirst Diagnostics",
        city: "Hyderabad",
        type: "Diagnostic Centre",
        price: "₹150",
      },
    ],
  },

  hba1c: {
    name: "HbA1c Test",
    category: "Blood Test",
    purpose:
      "Measures the average blood glucose level over roughly the previous two to three months.",
    sampleType: "Blood",
    fastingRequired: "No",
    fastingHours: "Not required",
    preparation: [
      "Fasting is usually not required.",
      "You may generally eat and drink normally unless another test is ordered at the same time.",
      "Tell the laboratory about medicines and existing medical conditions.",
      "Bring previous glucose or HbA1c reports if available.",
    ],
    duration: "5–10 minutes for sample collection",
    resultTime: "Usually within 24 hours",
    relatedDiseases: ["Diabetes Mellitus", "Prediabetes", "Metabolic Syndrome"],
    prices: [
      {
        hospital: "GreenCare Hospital",
        city: "Hyderabad",
        type: "Private",
        price: "₹750",
      },
      {
        hospital: "City Government Hospital",
        city: "Hyderabad",
        type: "Government",
        price: "₹300",
      },
      {
        hospital: "HealthFirst Diagnostics",
        city: "Hyderabad",
        type: "Diagnostic Centre",
        price: "₹620",
      },
    ],
  },

  "random-blood-sugar": {
    name: "Random Blood Sugar",
    category: "Blood Test",
    purpose:
      "Measures blood glucose at any time of the day without requiring a fasting period.",
    sampleType: "Blood",
    fastingRequired: "No",
    fastingHours: "Not required",
    preparation: [
      "No fasting is usually required.",
      "Inform the laboratory when you last ate.",
      "Tell the healthcare professional about medicines you currently take.",
    ],
    duration: "5–10 minutes",
    resultTime: "Usually same day",
    relatedDiseases: ["Diabetes Mellitus", "Hyperglycaemia", "Hypoglycaemia"],
    prices: [
      {
        hospital: "GreenCare Hospital",
        city: "Hyderabad",
        type: "Private",
        price: "₹160",
      },
      {
        hospital: "City Government Hospital",
        city: "Hyderabad",
        type: "Government",
        price: "₹70",
      },
      {
        hospital: "HealthFirst Diagnostics",
        city: "Hyderabad",
        type: "Diagnostic Centre",
        price: "₹130",
      },
    ],
  },

  "complete-blood-count": {
    name: "Complete Blood Count",
    category: "Blood Test",
    purpose:
      "Measures different blood-cell components and may help evaluate anaemia, infection and other conditions.",
    sampleType: "Blood",
    fastingRequired: "Usually no",
    fastingHours: "Not required unless combined with another fasting test",
    preparation: [
      "No special preparation is usually required.",
      "Drink enough water before the blood draw.",
      "Tell the laboratory about medicines or supplements you take.",
      "If other fasting tests are ordered together, follow those fasting instructions.",
    ],
    duration: "5–10 minutes",
    resultTime: "Usually same day",
    relatedDiseases: ["Anaemia", "Dengue", "Infections"],
    prices: [
      {
        hospital: "GreenCare Hospital",
        city: "Hyderabad",
        type: "Private",
        price: "₹450",
      },
      {
        hospital: "City Government Hospital",
        city: "Hyderabad",
        type: "Government",
        price: "₹180",
      },
      {
        hospital: "HealthFirst Diagnostics",
        city: "Hyderabad",
        type: "Diagnostic Centre",
        price: "₹350",
      },
    ],
  },

  "kidney-function-test": {
    name: "Kidney Function Test",
    category: "Blood Test",
    purpose:
      "Helps assess how well the kidneys are filtering waste and maintaining normal body chemistry.",
    sampleType: "Blood, sometimes urine",
    fastingRequired: "Depends on laboratory protocol",
    fastingHours: "Follow the laboratory's instructions",
    preparation: [
      "Ask whether fasting is required for the specific panel.",
      "Stay normally hydrated unless advised otherwise.",
      "Tell the doctor about medicines and supplements.",
      "Do not stop prescribed medicines unless specifically instructed.",
    ],
    duration: "5–15 minutes",
    resultTime: "Usually same day or next day",
    relatedDiseases: [
      "Chronic Kidney Disease",
      "Diabetes Mellitus",
      "Hypertension",
    ],
    prices: [
      {
        hospital: "GreenCare Hospital",
        city: "Hyderabad",
        type: "Private",
        price: "₹800",
      },
      {
        hospital: "City Government Hospital",
        city: "Hyderabad",
        type: "Government",
        price: "₹350",
      },
      {
        hospital: "HealthFirst Diagnostics",
        city: "Hyderabad",
        type: "Diagnostic Centre",
        price: "₹650",
      },
    ],
  },
"blood-pressure-measurement": {
  name: "Blood Pressure Measurement",
  category: "Vital Sign",
  purpose:
    "Measures the pressure of blood against the artery walls and helps identify high or low blood pressure.",
  sampleType: "No blood sample required",
  fastingRequired: "No",
  fastingHours: "Not required",
  preparation: [
    "Avoid caffeine, smoking and heavy exercise for about 30 minutes before measurement.",
    "Sit quietly for at least 5 minutes before the reading.",
    "Keep both feet flat on the floor.",
    "Support the arm at heart level.",
    "Avoid talking during the measurement.",
  ],
  duration: "5–10 minutes",
  resultTime: "Immediate",
  relatedDiseases: [
    "Hypertension",
    "Heart Disease",
    "Chronic Kidney Disease",
  ],
  prices: [
    {
      hospital: "GreenCare Hospital",
      city: "Hyderabad",
      type: "Private",
      price: "₹100",
    },
    {
      hospital: "City Government Hospital",
      city: "Hyderabad",
      type: "Government",
      price: "₹30",
    },
    {
      hospital: "HealthFirst Clinic",
      city: "Hyderabad",
      type: "Clinic",
      price: "₹80",
    },
  ],
},

ecg: {
  name: "ECG",
  category: "Cardiac Test",
  purpose:
    "Records the electrical activity of the heart and can help identify rhythm problems and other cardiac abnormalities.",
  sampleType: "No blood sample required",
  fastingRequired: "No",
  fastingHours: "Not required",
  preparation: [
    "Wear comfortable clothing.",
    "Avoid applying lotions or oils to the chest before the test.",
    "Tell the healthcare professional about medicines you take.",
    "Try to remain relaxed and still during recording.",
  ],
  duration: "5–10 minutes",
  resultTime: "Usually immediate",
  relatedDiseases: [
    "Hypertension",
    "Coronary Artery Disease",
    "Arrhythmia",
  ],
  prices: [
    {
      hospital: "GreenCare Hospital",
      city: "Hyderabad",
      type: "Private",
      price: "₹500",
    },
    {
      hospital: "City Government Hospital",
      city: "Hyderabad",
      type: "Government",
      price: "₹150",
    },
    {
      hospital: "HealthFirst Diagnostics",
      city: "Hyderabad",
      type: "Diagnostic Centre",
      price: "₹350",
    },
  ],
},

"lipid-profile": {
  name: "Lipid Profile",
  category: "Blood Test",
  purpose:
    "Measures cholesterol and triglyceride levels and helps assess cardiovascular risk.",
  sampleType: "Blood",
  fastingRequired: "Sometimes",
  fastingHours: "8–12 hours if advised",
  preparation: [
    "Ask the laboratory whether fasting is required.",
    "Plain water is usually allowed during fasting.",
    "Avoid alcohol before testing if instructed.",
    "Tell the healthcare professional about medicines and supplements.",
  ],
  duration: "5–10 minutes",
  resultTime: "Usually same day",
  relatedDiseases: [
    "Hypertension",
    "Coronary Artery Disease",
    "Hyperlipidaemia",
  ],
  prices: [
    {
      hospital: "GreenCare Hospital",
      city: "Hyderabad",
      type: "Private",
      price: "₹850",
    },
    {
      hospital: "City Government Hospital",
      city: "Hyderabad",
      type: "Government",
      price: "₹300",
    },
    {
      hospital: "HealthFirst Diagnostics",
      city: "Hyderabad",
      type: "Diagnostic Centre",
      price: "₹650",
    },
  ],
},

spirometry: {
  name: "Spirometry",
  category: "Pulmonary Function Test",
  purpose:
    "Measures how much air a person can breathe in and out and how quickly air can be exhaled.",
  sampleType: "Breathing test",
  fastingRequired: "No",
  fastingHours: "Not required",
  preparation: [
    "Avoid a heavy meal immediately before the test.",
    "Wear loose clothing.",
    "Avoid smoking before the test.",
    "Ask whether inhalers should be withheld temporarily.",
    "Follow the respiratory technician's instructions closely.",
  ],
  duration: "15–30 minutes",
  resultTime: "Usually immediate",
  relatedDiseases: ["Asthma", "COPD", "Chronic Respiratory Disease"],
  prices: [
    {
      hospital: "GreenCare Hospital",
      city: "Hyderabad",
      type: "Private",
      price: "₹1200",
    },
    {
      hospital: "City Government Hospital",
      city: "Hyderabad",
      type: "Government",
      price: "₹450",
    },
    {
      hospital: "HealthFirst Diagnostics",
      city: "Hyderabad",
      type: "Diagnostic Centre",
      price: "₹900",
    },
  ],
},

"peak-flow-test": {
  name: "Peak Flow Test",
  category: "Respiratory Test",
  purpose:
    "Measures how quickly air can be blown out of the lungs and may help monitor asthma.",
  sampleType: "Breathing test",
  fastingRequired: "No",
  fastingHours: "Not required",
  preparation: [
    "Follow instructions about inhaler use before testing.",
    "Stand or sit upright.",
    "Take the deepest breath possible before blowing into the meter.",
  ],
  duration: "5–10 minutes",
  resultTime: "Immediate",
  relatedDiseases: ["Asthma", "COPD"],
  prices: [
    {
      hospital: "GreenCare Hospital",
      city: "Hyderabad",
      type: "Private",
      price: "₹400",
    },
    {
      hospital: "City Government Hospital",
      city: "Hyderabad",
      type: "Government",
      price: "₹150",
    },
    {
      hospital: "HealthFirst Clinic",
      city: "Hyderabad",
      type: "Clinic",
      price: "₹300",
    },
  ],
},

"chest-x-ray": {
  name: "Chest X-ray",
  category: "Imaging",
  purpose:
    "Produces images of the chest to assess the lungs, heart and surrounding structures.",
  sampleType: "Imaging test",
  fastingRequired: "No",
  fastingHours: "Not required",
  preparation: [
    "Remove jewellery or metal objects from the chest area.",
    "Wear a hospital gown if requested.",
    "Inform staff if pregnancy is possible.",
  ],
  duration: "10–15 minutes",
  resultTime: "Usually same day",
  relatedDiseases: ["Asthma", "Pneumonia", "COPD"],
  prices: [
    {
      hospital: "GreenCare Hospital",
      city: "Hyderabad",
      type: "Private",
      price: "₹900",
    },
    {
      hospital: "City Government Hospital",
      city: "Hyderabad",
      type: "Government",
      price: "₹250",
    },
    {
      hospital: "HealthFirst Diagnostics",
      city: "Hyderabad",
      type: "Diagnostic Centre",
      price: "₹700",
    },
  ],
},

"allergy-testing": {
  name: "Allergy Testing",
  category: "Allergy Test",
  purpose:
    "Helps identify substances that may trigger allergic reactions.",
  sampleType: "Blood or skin test",
  fastingRequired: "Usually no",
  fastingHours: "Not required",
  preparation: [
    "Tell the doctor about antihistamines and allergy medicines.",
    "Some allergy medicines may need to be stopped before skin testing.",
    "Do not stop medicines without medical advice.",
  ],
  duration: "20–60 minutes",
  resultTime: "Immediate for some skin tests; longer for blood tests",
  relatedDiseases: ["Asthma", "Allergic Rhinitis", "Food Allergy"],
  prices: [
    {
      hospital: "GreenCare Hospital",
      city: "Hyderabad",
      type: "Private",
      price: "₹2200",
    },
    {
      hospital: "City Government Hospital",
      city: "Hyderabad",
      type: "Government",
      price: "₹800",
    },
    {
      hospital: "HealthFirst Diagnostics",
      city: "Hyderabad",
      type: "Diagnostic Centre",
      price: "₹1800",
    },
  ],
},

"serum-ferritin": {
  name: "Serum Ferritin",
  category: "Blood Test",
  purpose:
    "Measures stored iron in the body and helps evaluate iron deficiency.",
  sampleType: "Blood",
  fastingRequired: "Usually no",
  fastingHours: "Follow laboratory instructions",
  preparation: [
    "No special preparation is usually needed.",
    "Tell the laboratory about iron supplements and medicines.",
  ],
  duration: "5–10 minutes",
  resultTime: "Usually within 24 hours",
  relatedDiseases: ["Iron Deficiency Anaemia", "Iron Overload"],
  prices: [
    {
      hospital: "GreenCare Hospital",
      city: "Hyderabad",
      type: "Private",
      price: "₹900",
    },
    {
      hospital: "City Government Hospital",
      city: "Hyderabad",
      type: "Government",
      price: "₹350",
    },
    {
      hospital: "HealthFirst Diagnostics",
      city: "Hyderabad",
      type: "Diagnostic Centre",
      price: "₹700",
    },
  ],
},

"serum-iron": {
  name: "Serum Iron",
  category: "Blood Test",
  purpose:
    "Measures the amount of circulating iron in the blood.",
  sampleType: "Blood",
  fastingRequired: "May be advised",
  fastingHours: "Ask the laboratory",
  preparation: [
    "Morning testing may be recommended.",
    "Ask whether fasting is required.",
    "Tell the doctor about iron supplements.",
  ],
  duration: "5–10 minutes",
  resultTime: "Usually same day",
  relatedDiseases: ["Iron Deficiency Anaemia", "Iron Overload"],
  prices: [
    {
      hospital: "GreenCare Hospital",
      city: "Hyderabad",
      type: "Private",
      price: "₹650",
    },
    {
      hospital: "City Government Hospital",
      city: "Hyderabad",
      type: "Government",
      price: "₹250",
    },
    {
      hospital: "HealthFirst Diagnostics",
      city: "Hyderabad",
      type: "Diagnostic Centre",
      price: "₹500",
    },
  ],
},

tibc: {
  name: "TIBC",
  category: "Blood Test",
  purpose:
    "Measures the blood's capacity to bind and transport iron.",
  sampleType: "Blood",
  fastingRequired: "May be advised",
  fastingHours: "Follow laboratory instructions",
  preparation: [
    "Ask the laboratory whether fasting is required.",
    "Tell the doctor about iron supplements and medicines.",
  ],
  duration: "5–10 minutes",
  resultTime: "Usually same day",
  relatedDiseases: ["Iron Deficiency Anaemia", "Iron Overload"],
  prices: [
    {
      hospital: "GreenCare Hospital",
      city: "Hyderabad",
      type: "Private",
      price: "₹700",
    },
    {
      hospital: "City Government Hospital",
      city: "Hyderabad",
      type: "Government",
      price: "₹300",
    },
    {
      hospital: "HealthFirst Diagnostics",
      city: "Hyderabad",
      type: "Diagnostic Centre",
      price: "₹550",
    },
  ],
},

tsh: {
  name: "TSH",
  category: "Blood Test",
  purpose:
    "Measures thyroid-stimulating hormone and is commonly used to assess thyroid function.",
  sampleType: "Blood",
  fastingRequired: "Usually no",
  fastingHours: "Not required",
  preparation: [
    "Tell the doctor about thyroid medicines.",
    "Ask whether thyroid medicine should be taken before the blood draw.",
    "Mention supplements such as biotin because they may interfere with some tests.",
  ],
  duration: "5–10 minutes",
  resultTime: "Usually within 24 hours",
  relatedDiseases: ["Hypothyroidism", "Hyperthyroidism", "Goitre"],
  prices: [
    {
      hospital: "GreenCare Hospital",
      city: "Hyderabad",
      type: "Private",
      price: "₹550",
    },
    {
      hospital: "City Government Hospital",
      city: "Hyderabad",
      type: "Government",
      price: "₹200",
    },
    {
      hospital: "HealthFirst Diagnostics",
      city: "Hyderabad",
      type: "Diagnostic Centre",
      price: "₹450",
    },
  ],
},

"free-t4": {
  name: "Free T4",
  category: "Blood Test",
  purpose:
    "Measures free thyroxine hormone in the blood and helps evaluate thyroid function.",
  sampleType: "Blood",
  fastingRequired: "Usually no",
  fastingHours: "Not required",
  preparation: [
    "Tell the doctor about thyroid medication.",
    "Mention supplements such as biotin.",
    "Follow the doctor's instructions regarding medicine timing.",
  ],
  duration: "5–10 minutes",
  resultTime: "Usually within 24 hours",
  relatedDiseases: ["Hypothyroidism", "Hyperthyroidism"],
  prices: [
    {
      hospital: "GreenCare Hospital",
      city: "Hyderabad",
      type: "Private",
      price: "₹650",
    },
    {
      hospital: "City Government Hospital",
      city: "Hyderabad",
      type: "Government",
      price: "₹250",
    },
    {
      hospital: "HealthFirst Diagnostics",
      city: "Hyderabad",
      type: "Diagnostic Centre",
      price: "₹500",
    },
  ],
},

"thyroid-antibody-test": {
  name: "Thyroid Antibody Test",
  category: "Blood Test",
  purpose:
    "Checks for antibodies associated with autoimmune thyroid disease.",
  sampleType: "Blood",
  fastingRequired: "Usually no",
  fastingHours: "Not required",
  preparation: [
    "No special preparation is usually required.",
    "Tell the doctor about thyroid medicines and supplements.",
  ],
  duration: "5–10 minutes",
  resultTime: "Usually 1–2 days",
  relatedDiseases: ["Hashimoto Thyroiditis", "Graves Disease"],
  prices: [
    {
      hospital: "GreenCare Hospital",
      city: "Hyderabad",
      type: "Private",
      price: "₹1600",
    },
    {
      hospital: "City Government Hospital",
      city: "Hyderabad",
      type: "Government",
      price: "₹700",
    },
    {
      hospital: "HealthFirst Diagnostics",
      city: "Hyderabad",
      type: "Diagnostic Centre",
      price: "₹1300",
    },
  ],
},

"neurological-examination": {
  name: "Neurological Examination",
  category: "Clinical Examination",
  purpose:
    "Assesses nervous-system function such as strength, reflexes, sensation, coordination and mental status.",
  sampleType: "Clinical assessment",
  fastingRequired: "No",
  fastingHours: "Not required",
  preparation: [
    "Bring a list of current medicines.",
    "Bring previous scan or test reports if available.",
    "Describe symptoms and when they began.",
  ],
  duration: "20–45 minutes",
  resultTime: "Immediate clinical assessment",
  relatedDiseases: ["Migraine", "Stroke", "Neurological Disorders"],
  prices: [
    {
      hospital: "GreenCare Hospital",
      city: "Hyderabad",
      type: "Private",
      price: "₹900",
    },
    {
      hospital: "City Government Hospital",
      city: "Hyderabad",
      type: "Government",
      price: "₹250",
    },
    {
      hospital: "HealthFirst Clinic",
      city: "Hyderabad",
      type: "Clinic",
      price: "₹700",
    },
  ],
},

"mri-brain": {
  name: "MRI Brain",
  category: "Imaging",
  purpose:
    "Uses magnetic fields to create detailed images of the brain and surrounding structures.",
  sampleType: "Imaging test",
  fastingRequired: "Depends on contrast or sedation",
  fastingHours: "Follow imaging-centre instructions",
  preparation: [
    "Remove jewellery and metal objects.",
    "Inform staff about implants, pacemakers or metal inside the body.",
    "Tell staff if pregnancy is possible.",
    "If contrast or sedation is planned, follow fasting instructions.",
  ],
  duration: "30–60 minutes",
  resultTime: "Usually same day or next day",
  relatedDiseases: ["Migraine", "Stroke", "Brain Disorders"],
  prices: [
    {
      hospital: "GreenCare Hospital",
      city: "Hyderabad",
      type: "Private",
      price: "₹6500",
    },
    {
      hospital: "City Government Hospital",
      city: "Hyderabad",
      type: "Government",
      price: "₹2200",
    },
    {
      hospital: "HealthFirst Diagnostics",
      city: "Hyderabad",
      type: "Diagnostic Centre",
      price: "₹5200",
    },
  ],
},

"ct-brain": {
  name: "CT Brain",
  category: "Imaging",
  purpose:
    "Uses X-rays to create cross-sectional images of the brain.",
  sampleType: "Imaging test",
  fastingRequired: "May be required if contrast is used",
  fastingHours: "Follow imaging-centre instructions",
  preparation: [
    "Remove metal objects from the head and neck area.",
    "Inform staff about pregnancy.",
    "Tell staff about contrast allergies or kidney problems.",
    "Follow fasting instructions if contrast is planned.",
  ],
  duration: "10–20 minutes",
  resultTime: "Usually same day",
  relatedDiseases: ["Stroke", "Head Injury", "Severe Headache"],
  prices: [
    {
      hospital: "GreenCare Hospital",
      city: "Hyderabad",
      type: "Private",
      price: "₹3500",
    },
    {
      hospital: "City Government Hospital",
      city: "Hyderabad",
      type: "Government",
      price: "₹1200",
    },
    {
      hospital: "HealthFirst Diagnostics",
      city: "Hyderabad",
      type: "Diagnostic Centre",
      price: "₹2800",
    },
  ],
},

"pelvic-ultrasound": {
  name: "Pelvic Ultrasound",
  category: "Imaging",
  purpose:
    "Uses ultrasound waves to examine the uterus, ovaries and other pelvic structures.",
  sampleType: "Imaging test",
  fastingRequired: "No",
  fastingHours: "Not required",
  preparation: [
    "A full bladder may be required for some pelvic ultrasound examinations.",
    "Drink water beforehand if instructed.",
    "Do not empty the bladder until the scan is completed if told to keep it full.",
  ],
  duration: "15–30 minutes",
  resultTime: "Usually same day",
  relatedDiseases: ["PCOS", "Ovarian Cyst", "Uterine Disorders"],
  prices: [
    {
      hospital: "GreenCare Hospital",
      city: "Hyderabad",
      type: "Private",
      price: "₹1400",
    },
    {
      hospital: "City Government Hospital",
      city: "Hyderabad",
      type: "Government",
      price: "₹450",
    },
    {
      hospital: "HealthFirst Diagnostics",
      city: "Hyderabad",
      type: "Diagnostic Centre",
      price: "₹1000",
    },
  ],
},

"hormone-tests": {
  name: "Hormone Tests",
  category: "Blood Test",
  purpose:
    "Measures selected hormone levels and may help evaluate endocrine or reproductive conditions.",
  sampleType: "Blood",
  fastingRequired: "Depends on the hormone tested",
  fastingHours: "Follow laboratory instructions",
  preparation: [
    "Some tests may need to be performed at a specific time of day.",
    "For reproductive hormones, timing within the menstrual cycle may matter.",
    "Tell the doctor about medicines and hormonal treatments.",
  ],
  duration: "5–10 minutes",
  resultTime: "Usually 1–2 days",
  relatedDiseases: ["PCOS", "Thyroid Disorders", "Hormonal Disorders"],
  prices: [
    {
      hospital: "GreenCare Hospital",
      city: "Hyderabad",
      type: "Private",
      price: "₹1800",
    },
    {
      hospital: "City Government Hospital",
      city: "Hyderabad",
      type: "Government",
      price: "₹700",
    },
    {
      hospital: "HealthFirst Diagnostics",
      city: "Hyderabad",
      type: "Diagnostic Centre",
      price: "₹1400",
    },
  ],
},

"blood-glucose": {
  name: "Blood Glucose",
  category: "Blood Test",
  purpose:
    "Measures the amount of glucose in the blood.",
  sampleType: "Blood",
  fastingRequired: "Depends on test type",
  fastingHours: "Depends on whether fasting glucose is requested",
  preparation: [
    "Confirm whether the requested test is fasting or random.",
    "If fasting is required, follow the instructed fasting period.",
    "Tell the laboratory about diabetes medicines.",
  ],
  duration: "5–10 minutes",
  resultTime: "Usually same day",
  relatedDiseases: ["Diabetes Mellitus", "PCOS", "Metabolic Syndrome"],
  prices: [
    {
      hospital: "GreenCare Hospital",
      city: "Hyderabad",
      type: "Private",
      price: "₹180",
    },
    {
      hospital: "City Government Hospital",
      city: "Hyderabad",
      type: "Government",
      price: "₹70",
    },
    {
      hospital: "HealthFirst Diagnostics",
      city: "Hyderabad",
      type: "Diagnostic Centre",
      price: "₹140",
    },
  ],
},

"dengue-ns1-antigen": {
  name: "Dengue NS1 Antigen",
  category: "Blood Test",
  purpose:
    "Detects dengue NS1 antigen and may help identify dengue infection early in the illness.",
  sampleType: "Blood",
  fastingRequired: "No",
  fastingHours: "Not required",
  preparation: [
    "No special fasting preparation is usually required.",
    "Tell the doctor when fever or symptoms started.",
  ],
  duration: "5–10 minutes",
  resultTime: "Usually same day",
  relatedDiseases: ["Dengue", "Viral Fever"],
  prices: [
    {
      hospital: "GreenCare Hospital",
      city: "Hyderabad",
      type: "Private",
      price: "₹1200",
    },
    {
      hospital: "City Government Hospital",
      city: "Hyderabad",
      type: "Government",
      price: "₹450",
    },
    {
      hospital: "HealthFirst Diagnostics",
      city: "Hyderabad",
      type: "Diagnostic Centre",
      price: "₹950",
    },
  ],
},

"dengue-igm": {
  name: "Dengue IgM",
  category: "Blood Test",
  purpose:
    "Detects IgM antibodies that may indicate a recent dengue infection.",
  sampleType: "Blood",
  fastingRequired: "No",
  fastingHours: "Not required",
  preparation: [
    "No special preparation is usually needed.",
    "Tell the doctor when symptoms began.",
  ],
  duration: "5–10 minutes",
  resultTime: "Usually same day or next day",
  relatedDiseases: ["Dengue", "Viral Fever"],
  prices: [
    {
      hospital: "GreenCare Hospital",
      city: "Hyderabad",
      type: "Private",
      price: "₹1000",
    },
    {
      hospital: "City Government Hospital",
      city: "Hyderabad",
      type: "Government",
      price: "₹400",
    },
    {
      hospital: "HealthFirst Diagnostics",
      city: "Hyderabad",
      type: "Diagnostic Centre",
      price: "₹850",
    },
  ],
},

"dengue-igg": {
  name: "Dengue IgG",
  category: "Blood Test",
  purpose:
    "Detects IgG antibodies associated with past or later-stage dengue infection.",
  sampleType: "Blood",
  fastingRequired: "No",
  fastingHours: "Not required",
  preparation: [
    "No special preparation is usually required.",
    "Tell the healthcare professional about previous dengue infection if known.",
  ],
  duration: "5–10 minutes",
  resultTime: "Usually same day or next day",
  relatedDiseases: ["Dengue", "Previous Dengue Infection"],
  prices: [
    {
      hospital: "GreenCare Hospital",
      city: "Hyderabad",
      type: "Private",
      price: "₹1000",
    },
    {
      hospital: "City Government Hospital",
      city: "Hyderabad",
      type: "Government",
      price: "₹400",
    },
    {
      hospital: "HealthFirst Diagnostics",
      city: "Hyderabad",
      type: "Diagnostic Centre",
      price: "₹850",
    },
  ],
},

"liver-function-test": {
    "name": "Liver Function Test",
    "category": "Blood Test",
    "purpose": "Measures selected proteins, enzymes and bilirubin to help assess liver health and investigate possible liver injury or dysfunction.",
    "sampleType": "Blood",
    "fastingRequired": "Depends on laboratory protocol",
    "fastingHours": "Follow laboratory instructions",
    "preparation": [
      "Ask the laboratory whether fasting is required.",
      "Tell the healthcare professional about medicines, supplements and alcohol use.",
      "Do not stop prescribed medicines unless instructed."
    ],
    "duration": "5–10 minutes for sample collection",
    "resultTime": "Usually same day or next day",
    "relatedDiseases": [
      "Fatty Liver Disease",
      "Hepatitis",
      "Liver Disorders"
    ],
    "prices": []
  },
  "urine-routine": {
    "name": "Urine Routine Examination",
    "category": "Urine Test",
    "purpose": "Examines urine for features such as cells, protein, glucose and other substances that may help assess urinary, kidney or metabolic conditions.",
    "sampleType": "Urine",
    "fastingRequired": "No",
    "fastingHours": "Not required",
    "preparation": [
      "Use the collection container provided by the laboratory.",
      "A clean-catch midstream urine sample may be requested.",
      "Follow the laboratory's collection instructions carefully."
    ],
    "duration": "A few minutes for sample collection",
    "resultTime": "Usually same day",
    "relatedDiseases": [
      "Urinary Tract Infection",
      "Chronic Kidney Disease",
      "Diabetes Mellitus"
    ],
    "prices": []
  },
  "urine-culture": {
    "name": "Urine Culture",
    "category": "Microbiology",
    "purpose": "Checks a urine sample for bacteria or other microorganisms that may be causing a urinary tract infection.",
    "sampleType": "Urine",
    "fastingRequired": "No",
    "fastingHours": "Not required",
    "preparation": [
      "A clean-catch midstream urine sample is commonly requested.",
      "Collect the sample before starting antibiotics when possible and when advised.",
      "Follow the laboratory's hygiene and collection instructions."
    ],
    "duration": "A few minutes for sample collection",
    "resultTime": "Often 1–3 days",
    "relatedDiseases": [
      "Urinary Tract Infection",
      "Kidney Infection"
    ],
    "prices": []
  },
  "vitamin-b12": {
    "name": "Vitamin B12 Test",
    "category": "Blood Test",
    "purpose": "Measures vitamin B12 in the blood and may help investigate deficiency, anaemia or neurological symptoms.",
    "sampleType": "Blood",
    "fastingRequired": "May be requested",
    "fastingHours": "Follow laboratory instructions",
    "preparation": [
      "Ask whether fasting is required.",
      "Tell the healthcare professional about vitamin supplements and medicines.",
      "Do not stop supplements or medicines unless instructed."
    ],
    "duration": "5–10 minutes",
    "resultTime": "Usually within 1–2 days",
    "relatedDiseases": [
      "Vitamin B12 Deficiency",
      "Anaemia",
      "Neurological Disorders"
    ],
    "prices": []
  },
  "vitamin-d": {
    "name": "Vitamin D Test",
    "category": "Blood Test",
    "purpose": "Measures vitamin D status and may help assess deficiency related to bone, muscle or metabolic health.",
    "sampleType": "Blood",
    "fastingRequired": "Usually no",
    "fastingHours": "Not usually required",
    "preparation": [
      "Tell the healthcare professional about vitamin D or calcium supplements.",
      "Follow any laboratory-specific instructions."
    ],
    "duration": "5–10 minutes",
    "resultTime": "Usually within 1–2 days",
    "relatedDiseases": [
      "Vitamin D Deficiency",
      "Osteoporosis",
      "Chronic Kidney Disease"
    ],
    "prices": []
  },
  "c-reactive-protein": {
    "name": "C-Reactive Protein",
    "category": "Blood Test",
    "purpose": "Measures C-reactive protein, a marker that can rise when inflammation is present in the body.",
    "sampleType": "Blood",
    "fastingRequired": "Usually no",
    "fastingHours": "Not usually required",
    "preparation": [
      "No special preparation is usually needed.",
      "Tell the healthcare professional about medicines and current illnesses."
    ],
    "duration": "5–10 minutes",
    "resultTime": "Usually same day or next day",
    "relatedDiseases": [
      "Rheumatoid Arthritis",
      "Infection",
      "Inflammatory Disorders"
    ],
    "prices": []
  },
  "esr": {
    "name": "ESR",
    "category": "Blood Test",
    "purpose": "Measures how quickly red blood cells settle in a tube and can provide a general indication of inflammation.",
    "sampleType": "Blood",
    "fastingRequired": "No",
    "fastingHours": "Not required",
    "preparation": [
      "No special preparation is usually required.",
      "Tell the healthcare professional about medicines and current medical conditions."
    ],
    "duration": "5–10 minutes",
    "resultTime": "Usually same day",
    "relatedDiseases": [
      "Rheumatoid Arthritis",
      "Inflammatory Disorders",
      "Infections"
    ],
    "prices": []
  },
  "rheumatoid-factor": {
    "name": "Rheumatoid Factor",
    "category": "Blood Test",
    "purpose": "Measures rheumatoid factor in the blood and is commonly used with other findings when evaluating possible rheumatoid arthritis or related conditions.",
    "sampleType": "Blood",
    "fastingRequired": "No",
    "fastingHours": "Not required",
    "preparation": [
      "No special preparation is usually needed.",
      "Tell the healthcare professional about medicines and autoimmune conditions."
    ],
    "duration": "5–10 minutes",
    "resultTime": "Usually within 1–2 days",
    "relatedDiseases": [
      "Rheumatoid Arthritis",
      "Autoimmune Disorders"
    ],
    "prices": []
  },
  "anti-ccp": {
    "name": "Anti-CCP Antibody Test",
    "category": "Blood Test",
    "purpose": "Checks for CCP antibodies and is used with symptoms and other tests when evaluating possible rheumatoid arthritis.",
    "sampleType": "Blood",
    "fastingRequired": "No",
    "fastingHours": "Not required",
    "preparation": [
      "No special preparation is usually required.",
      "Tell the healthcare professional about autoimmune conditions and medicines."
    ],
    "duration": "5–10 minutes",
    "resultTime": "Usually within 1–3 days",
    "relatedDiseases": [
      "Rheumatoid Arthritis",
      "Autoimmune Disorders"
    ],
    "prices": []
  },
  "troponin": {
    "name": "Troponin Test",
    "category": "Cardiac Blood Test",
    "purpose": "Measures troponin in the blood and can help detect heart muscle injury when interpreted with symptoms, ECG findings and clinical assessment.",
    "sampleType": "Blood",
    "fastingRequired": "No",
    "fastingHours": "Not required",
    "preparation": [
      "No special fasting preparation is usually required.",
      "Tell the healthcare team when symptoms began and about current medicines."
    ],
    "duration": "5–10 minutes for sample collection",
    "resultTime": "Often available urgently in hospital settings",
    "relatedDiseases": [
      "Coronary Artery Disease",
      "Heart Attack",
      "Myocardial Injury"
    ],
    "prices": []
  },
  "echocardiogram": {
    "name": "Echocardiogram",
    "category": "Cardiac Imaging",
    "purpose": "Uses ultrasound to create moving images of the heart and assess its chambers, valves and pumping function.",
    "sampleType": "Ultrasound imaging",
    "fastingRequired": "No for a standard transthoracic echocardiogram",
    "fastingHours": "Not required for standard transthoracic echocardiography",
    "preparation": [
      "No special preparation is usually needed for a standard transthoracic echocardiogram.",
      "Wear clothing that can be easily adjusted for access to the chest.",
      "Different instructions may apply to specialised echocardiography procedures."
    ],
    "duration": "About 30–60 minutes",
    "resultTime": "Depends on facility and reporting workflow",
    "relatedDiseases": [
      "Coronary Artery Disease",
      "Heart Failure",
      "Valve Disease",
      "Hypertension"
    ],
    "prices": []
  },
  "chest-ct": {
    "name": "Chest CT",
    "category": "Imaging",
    "purpose": "Uses X-rays and computer processing to create cross-sectional images of the chest.",
    "sampleType": "Imaging test",
    "fastingRequired": "May depend on whether contrast is used",
    "fastingHours": "Follow imaging-centre instructions",
    "preparation": [
      "Remove metal objects when instructed.",
      "Tell staff if pregnancy is possible.",
      "Tell staff about kidney problems or previous contrast reactions if contrast may be used.",
      "Follow fasting instructions if contrast or sedation is planned."
    ],
    "duration": "Usually several minutes for the scan, with additional preparation time when needed",
    "resultTime": "Depends on reporting workflow",
    "relatedDiseases": [
      "Pneumonia",
      "COPD",
      "Lung Disorders"
    ],
    "prices": []
  },
  "malaria-rapid-test": {
    "name": "Malaria Rapid Diagnostic Test",
    "category": "Blood Test",
    "purpose": "Looks for proteins from malaria parasites in the blood and can provide a rapid indication of malaria infection.",
    "sampleType": "Blood",
    "fastingRequired": "No",
    "fastingHours": "Not required",
    "preparation": [
      "No special preparation is usually required.",
      "Tell the healthcare professional about recent travel and when fever began."
    ],
    "duration": "A few minutes for sample collection",
    "resultTime": "Often available rapidly",
    "relatedDiseases": [
      "Malaria",
      "Febrile Illness"
    ],
    "prices": []
  },
  "malaria-blood-smear": {
    "name": "Malaria Blood Smear",
    "category": "Microscopy",
    "purpose": "Examines a blood smear under a microscope for malaria parasites and can help identify the parasite type.",
    "sampleType": "Blood",
    "fastingRequired": "No",
    "fastingHours": "Not required",
    "preparation": [
      "No special preparation is usually required.",
      "Tell the healthcare professional about recent travel and symptom timing."
    ],
    "duration": "A few minutes for sample collection",
    "resultTime": "Depends on laboratory workflow",
    "relatedDiseases": [
      "Malaria",
      "Febrile Illness"
    ],
    "prices": []
  },
  "typhoid-blood-culture": {
    "name": "Typhoid Blood Culture",
    "category": "Microbiology",
    "purpose": "Cultures a blood sample to look for Salmonella Typhi or related bacteria when typhoid fever is suspected.",
    "sampleType": "Blood",
    "fastingRequired": "No",
    "fastingHours": "Not required",
    "preparation": [
      "No fasting is usually required.",
      "Tell the healthcare professional about recent antibiotic use.",
      "Blood culture is ideally collected before antibiotics when clinically appropriate."
    ],
    "duration": "5–10 minutes for sample collection",
    "resultTime": "Usually several days",
    "relatedDiseases": [
      "Typhoid Fever",
      "Bacterial Infection"
    ],
    "prices": []
  },
  "h-pylori-test": {
    "name": "H. pylori Test",
    "category": "Gastrointestinal Test",
    "purpose": "Checks for Helicobacter pylori infection, which can be associated with gastritis and peptic ulcer disease.",
    "sampleType": "Breath, stool or other sample depending on test method",
    "fastingRequired": "Depends on test method",
    "fastingHours": "Follow test-specific instructions",
    "preparation": [
      "Follow the specific instructions for the type of H. pylori test ordered.",
      "Some medicines can affect certain H. pylori tests, so discuss current medicines with the healthcare professional.",
      "Do not stop medicines unless instructed."
    ],
    "duration": "Depends on test method",
    "resultTime": "Depends on test method and laboratory",
    "relatedDiseases": [
      "Gastritis",
      "Peptic Ulcer Disease"
    ],
    "prices": []
  },
  "upper-gi-endoscopy": {
    "name": "Upper GI Endoscopy",
    "category": "Endoscopy",
    "purpose": "Uses a flexible camera to examine the upper digestive tract, including the oesophagus, stomach and first part of the small intestine.",
    "sampleType": "Endoscopic examination",
    "fastingRequired": "Yes",
    "fastingHours": "Follow hospital or endoscopy-unit instructions",
    "preparation": [
      "Do not eat or drink for the period instructed by the endoscopy unit.",
      "Tell the healthcare team about blood thinners, diabetes medicines and other medicines.",
      "Arrange transport if sedation will be used."
    ],
    "duration": "Procedure time is usually short, with additional preparation and recovery time",
    "resultTime": "Initial findings may be discussed the same day; biopsy results take longer",
    "relatedDiseases": [
      "Gastritis",
      "Gastroesophageal Reflux Disease",
      "Peptic Ulcer Disease"
    ],
    "prices": []
  },
  "uric-acid": {
    "name": "Uric Acid Test",
    "category": "Blood Test",
    "purpose": "Measures uric acid in the blood and may help evaluate gout or conditions that affect uric acid levels.",
    "sampleType": "Blood",
    "fastingRequired": "May be requested",
    "fastingHours": "Follow laboratory instructions",
    "preparation": [
      "Ask whether fasting is required.",
      "Tell the healthcare professional about medicines and supplements."
    ],
    "duration": "5–10 minutes",
    "resultTime": "Usually same day or next day",
    "relatedDiseases": [
      "Gout",
      "Kidney Disorders"
    ],
    "prices": []
  }
} as const;