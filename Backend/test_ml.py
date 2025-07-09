import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from ml_service import LoanApprovalMLService
import json

# Test the ML service
ml_service = LoanApprovalMLService()

# Load data and train model
df = ml_service.load_and_prepare_data("../loan_approval_dataset.csv")
if df is not None:
    print("✅ Data loaded successfully")
    train_result = ml_service.train_models(df)
    print(f"✅ Training result: {train_result}")
    
    # Test prediction
    test_data = {
        "monthly_income": 30000,
        "loan_amount": 500000,
        "dependents": 2,
        "self_employed": False,
        "education": "Graduate",
        "shg_membership": 1
    }
    
    prediction = ml_service.predict_credit_score(test_data)
    print(f"✅ Prediction result: {json.dumps(prediction, indent=2)}")
else:
    print("❌ Failed to load data")
