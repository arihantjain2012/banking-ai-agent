import requests

BASE_URL = "http://localhost:5000/api/customers"


def get_loan_targets():
    try:
        res = requests.get(f"{BASE_URL}/loan-targets")
        return res.json()
    except Exception as e:
        return {"error": str(e)}


def get_customer_details(name: str):
    try:
        res = requests.get(f"{BASE_URL}/customer/{name}")

        if res.status_code == 404:
            return {"error": "Customer not found"}

        return res.json()
    except Exception as e:
        return {"error": str(e)}