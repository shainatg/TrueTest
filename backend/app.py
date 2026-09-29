from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# -----------------------------------
# TrueTest Demo Provider Database
# -----------------------------------
# IMPORTANT:
# These prices are DEMONSTRATION DATA
# for the TrueTest student project.
# They are not verified current prices.


def provider(hospital, provider_type, price, rating, available=True):
    return {
        "hospital": hospital,
        "city": "Hyderabad",
        "type": provider_type,
        "price": price,
        "rating": rating,
        "available": available
    }


hospital_data = {

    # ==============================
    # CBC
    # ==============================

    "cbc": [
        provider("Government General Hospital", "government", 180, 4.1),
        provider("Osmania General Hospital", "government", 220, 4.2),
        provider("Apollo Hospitals", "private", 450, 4.8),
        provider("Yashoda Hospitals", "private", 380, 4.7),
        provider("KIMS Hospitals", "private", 420, 4.6),
        provider("TrueTest Demo Diagnostic Lab", "clinic", 280, 4.3),
        provider("TrueTest Demo Local Clinic", "clinic", 300, 4.2),
    ],

    # ==============================
    # HbA1c
    # ==============================

    "hba1c": [
        provider("Government General Hospital", "government", 300, 4.1),
        provider("Osmania General Hospital", "government", 350, 4.2),
        provider("Apollo Hospitals", "private", 700, 4.8),
        provider("Medicover Hospitals", "private", 620, 4.5),
        provider("TrueTest Demo Diagnostic Lab", "clinic", 480, 4.3),
        provider("TrueTest Demo Local Clinic", "clinic", 450, 4.2),
    ],

    # ==============================
    # Lipid Profile
    # ==============================

    "lipid": [
        provider("Government General Hospital", "government", 280, 4.1),
        provider("Osmania General Hospital", "government", 320, 4.2),
        provider("Care Hospitals", "private", 650, 4.4),
        provider("Apollo Hospitals", "private", 780, 4.8),
        provider("TrueTest Demo Diagnostic Lab", "clinic", 450, 4.3),
        provider("TrueTest Demo Local Clinic", "clinic", 420, 4.2),
    ],

    # ==============================
    # Thyroid Profile
    # ==============================

    "thyroid": [
        provider("Government General Hospital", "government", 380, 4.1),
        provider("Osmania General Hospital", "government", 420, 4.2),
        provider("Yashoda Hospitals", "private", 820, 4.7),
        provider("AIG Hospitals", "private", 760, 4.6),
        provider("TrueTest Demo Diagnostic Lab", "clinic", 550, 4.3),
        provider("TrueTest Demo Local Clinic", "clinic", 520, 4.2),
    ],

    # ==============================
    # Liver Function Test (LFT)
    # ==============================

    "lft": [
        provider("Government General Hospital", "government", 350, 4.1),
        provider("Osmania General Hospital", "government", 400, 4.2),
        provider("Apollo Hospitals", "private", 850, 4.8),
        provider("Yashoda Hospitals", "private", 780, 4.7),
        provider("KIMS Hospitals", "private", 800, 4.6),
        provider("TrueTest Demo Diagnostic Lab", "clinic", 520, 4.3),
        provider("TrueTest Demo Local Clinic", "clinic", 480, 4.2),
    ],

    # ==============================
    # Kidney / Renal Function Test
    # ==============================

    "kft": [
        provider("Government General Hospital", "government", 320, 4.1),
        provider("Osmania General Hospital", "government", 380, 4.2),
        provider("Apollo Hospitals", "private", 820, 4.8),
        provider("Care Hospitals", "private", 740, 4.4),
        provider("KIMS Hospitals", "private", 780, 4.6),
        provider("TrueTest Demo Diagnostic Lab", "clinic", 500, 4.3),
        provider("TrueTest Demo Local Clinic", "clinic", 460, 4.2),
    ],

    # ==============================
    # Vitamin D
    # ==============================

    "vitamin-d": [
        provider("Government General Hospital", "government", 700, 4.1),
        provider("Osmania General Hospital", "government", 750, 4.2),
        provider("Apollo Hospitals", "private", 1600, 4.8),
        provider("Yashoda Hospitals", "private", 1450, 4.7),
        provider("Medicover Hospitals", "private", 1350, 4.5),
        provider("TrueTest Demo Diagnostic Lab", "clinic", 950, 4.3),
        provider("TrueTest Demo Local Clinic", "clinic", 900, 4.2),
    ],

    # ==============================
    # Vitamin B12
    # ==============================

    "vitamin-b12": [
        provider("Government General Hospital", "government", 500, 4.1),
        provider("Osmania General Hospital", "government", 550, 4.2),
        provider("Apollo Hospitals", "private", 1100, 4.8),
        provider("Yashoda Hospitals", "private", 1000, 4.7),
        provider("Medicover Hospitals", "private", 950, 4.5),
        provider("TrueTest Demo Diagnostic Lab", "clinic", 700, 4.3),
        provider("TrueTest Demo Local Clinic", "clinic", 650, 4.2),
    ],

    # ==============================
    # Fasting Blood Sugar
    # ==============================

    "fbs": [
        provider("Government General Hospital", "government", 60, 4.1),
        provider("Osmania General Hospital", "government", 80, 4.2),
        provider("Apollo Hospitals", "private", 180, 4.8),
        provider("Yashoda Hospitals", "private", 160, 4.7),
        provider("KIMS Hospitals", "private", 170, 4.6),
        provider("TrueTest Demo Diagnostic Lab", "clinic", 120, 4.3),
        provider("TrueTest Demo Local Clinic", "clinic", 100, 4.2),
    ],

    # ==============================
    # CRP
    # ==============================

    "crp": [
        provider("Government General Hospital", "government", 300, 4.1),
        provider("Osmania General Hospital", "government", 350, 4.2),
        provider("Apollo Hospitals", "private", 750, 4.8),
        provider("Yashoda Hospitals", "private", 680, 4.7),
        provider("Care Hospitals", "private", 650, 4.4),
        provider("TrueTest Demo Diagnostic Lab", "clinic", 480, 4.3),
        provider("TrueTest Demo Local Clinic", "clinic", 450, 4.2),
    ],

    # ==============================
    # ESR
    # ==============================

    "esr": [
        provider("Government General Hospital", "government", 100, 4.1),
        provider("Osmania General Hospital", "government", 120, 4.2),
        provider("Apollo Hospitals", "private", 280, 4.8),
        provider("Yashoda Hospitals", "private", 250, 4.7),
        provider("KIMS Hospitals", "private", 260, 4.6),
        provider("TrueTest Demo Diagnostic Lab", "clinic", 180, 4.3),
        provider("TrueTest Demo Local Clinic", "clinic", 160, 4.2),
    ],

    # ==============================
    # Urine Routine
    # ==============================

    "urine": [
        provider("Government General Hospital", "government", 80, 4.1),
        provider("Osmania General Hospital", "government", 100, 4.2),
        provider("Apollo Hospitals", "private", 250, 4.8),
        provider("Yashoda Hospitals", "private", 220, 4.7),
        provider("Medicover Hospitals", "private", 200, 4.5),
        provider("TrueTest Demo Diagnostic Lab", "clinic", 150, 4.3),
        provider("TrueTest Demo Local Clinic", "clinic", 130, 4.2),
    ],

    # ==============================
    # Creatinine
    # ==============================

    "creatinine": [
        provider("Government General Hospital", "government", 100, 4.1),
        provider("Osmania General Hospital", "government", 120, 4.2),
        provider("Apollo Hospitals", "private", 300, 4.8),
        provider("Yashoda Hospitals", "private", 280, 4.7),
        provider("KIMS Hospitals", "private", 260, 4.6),
        provider("TrueTest Demo Diagnostic Lab", "clinic", 180, 4.3),
        provider("TrueTest Demo Local Clinic", "clinic", 160, 4.2),
    ],

    # ==============================
    # Iron Profile
    # ==============================

    "iron": [
        provider("Government General Hospital", "government", 400, 4.1),
        provider("Osmania General Hospital", "government", 450, 4.2),
        provider("Apollo Hospitals", "private", 950, 4.8),
        provider("Yashoda Hospitals", "private", 880, 4.7),
        provider("Care Hospitals", "private", 820, 4.4),
        provider("TrueTest Demo Diagnostic Lab", "clinic", 600, 4.3),
        provider("TrueTest Demo Local Clinic", "clinic", 550, 4.2),
    ],
}


# -----------------------------------
# Home API
# -----------------------------------

@app.route("/")
def home():
    return jsonify({
        "message": "TrueTest Backend is Running"
    })


# -----------------------------------
# Health Check
# -----------------------------------

@app.route("/api/health")
def health():
    return jsonify({
        "status": "Backend Connected"
    })


# -----------------------------------
# Available Tests API
# -----------------------------------

@app.route("/api/tests")
def get_tests():
    return jsonify({
        "success": True,
        "tests": list(hospital_data.keys())
    })


# -----------------------------------
# Price Comparison API
# -----------------------------------

@app.route("/api/prices")
def get_prices():

    test_name = request.args.get(
        "test", ""
    ).lower().strip()

    if test_name in hospital_data:

        return jsonify({
            "success": True,
            "test": test_name,
            "results": hospital_data[test_name]
        })

    return jsonify({
        "success": False,
        "message": "Test not found."
    }), 404


# -----------------------------------
# Start Flask Server
# -----------------------------------

if __name__ == "__main__":
    app.run(
        debug=True,
        port=5000
    )