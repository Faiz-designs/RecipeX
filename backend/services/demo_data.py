DEMO_DATA = {
  "scan_summary": {
    "total_vegetables_detected": 5,
    "items": [
      {
        "id": "veg_01",
        "common_name": "Tomato",
        "scientific_name": "Solanum lycopersicum",
        "estimated_quantity": "3 medium",
        "estimated_weight_grams": 450,
        "freshness_status": "Fresh",
        "confidence_level": "High",
        "flag": None
      },
      {
        "id": "veg_02",
        "common_name": "Spinach",
        "scientific_name": "Spinacia oleracea",
        "estimated_quantity": "2 cups",
        "estimated_weight_grams": 60,
        "freshness_status": "Fresh",
        "confidence_level": "High",
        "flag": None
      },
      {
        "id": "veg_03",
        "common_name": "Carrot",
        "scientific_name": "Daucus carota",
        "estimated_quantity": "2 medium",
        "estimated_weight_grams": 120,
        "freshness_status": "Fresh",
        "confidence_level": "High",
        "flag": None
      },
      {
        "id": "veg_04",
        "common_name": "Broccoli",
        "scientific_name": "Brassica oleracea",
        "estimated_quantity": "1 head",
        "estimated_weight_grams": 300,
        "freshness_status": "Fresh",
        "confidence_level": "High",
        "flag": None
      },
      {
        "id": "veg_05",
        "common_name": "Bell Pepper",
        "scientific_name": "Capsicum annuum",
        "estimated_quantity": "2 medium",
        "estimated_weight_grams": 240,
        "freshness_status": "Fresh",
        "confidence_level": "High",
        "flag": None
      }
    ]
  },
  "recipes": {
    "easy": {
      "name": "Garden Fresh Salad Bowl",
      "total_time_minutes": 15,
      "prep_time_minutes": 15,
      "cook_time_minutes": 0,
      "servings": 2,
      "additional_ingredients_required": ["lemon", "honey", "sesame seeds"],
      "steps": [
        "Wash and chop tomatoes, bell peppers, and broccoli into bite-sized pieces. Grate carrots. Keep spinach leaves whole.",
        "Blanch broccoli florets in boiling water for 1 minute, then plunge into ice water.",
        "In a bowl, whisk lemon juice with honey for the dressing.",
        "Toss all vegetables with the dressing. Top with sesame seeds.",
        "Serve immediately at room temperature."
      ],
      "plating_suggestion": "Serve in a wide wooden bowl with dressing drizzled in a spiral pattern."
    },
    "intermediate": {
      "name": "Roasted Vegetable Medley with Garlic Herb Sauce",
      "total_time_minutes": 40,
      "prep_time_minutes": 15,
      "cook_time_minutes": 25,
      "servings": 4,
      "additional_ingredients_required": ["garlic", "yogurt", "mixed herbs", "lemon"],
      "steps": [
        "Preheat oven to 200°C. Cut tomatoes in half, chop carrots, broccoli, and bell peppers into even chunks.",
        "Toss all vegetables with olive oil, salt, and pepper. Spread evenly on a large baking tray.",
        "Roast for 25 minutes until carrots are tender and edges are caramelized.",
        "Blend yogurt with roasted garlic, herbs, and lemon juice for the sauce.",
        "Arrange roasted vegetables on a platter and drizzle with herb sauce."
      ],
      "plating_suggestion": "Arrange roasted vegetables on a large white platter with sauce drizzled artistically."
    },
    "advanced": {
      "name": "Stuffed Bell Peppers with Broccoli-Carrot Rice",
      "total_time_minutes": 55,
      "prep_time_minutes": 20,
      "cook_time_minutes": 35,
      "servings": 2,
      "additional_ingredients_required": ["arborio rice", "onion", "garlic", "vegetable stock", "parmesan", "butter", "white wine", "breadcrumbs"],
      "steps": [
        "Preheat oven to 190°C. Slice tops off bell peppers and remove seeds. Blanch for 3 minutes.",
        "Finely dice onion and garlic. Sauté in butter until translucent.",
        "Add arborio rice, toast for 2 minutes. Deglaze with white wine.",
        "Add warm stock one ladle at a time, stirring continuously for 18 minutes.",
        "In the last 5 minutes, stir in finely chopped broccoli, grated carrot, and chopped spinach.",
        "Fold in parmesan and butter. Stuff mixture into bell pepper cups.",
        "Top with breadcrumbs and bake for 15 minutes until golden.",
        "Serve with tomato salad on the side."
      ],
      "plating_suggestion": "Place stuffed bell pepper in the center of a plate surrounded by a ring of fresh tomato salad and microgreens."
    }
  },
  "nutrition": [
    {
      "vegetable_id": "veg_01",
      "vegetable_name": "Tomato",
      "per_100g": {
        "calories_kcal": 18,
        "carbohydrates_g": 3.9,
        "dietary_fibre_g": 1.2,
        "protein_g": 0.9,
        "fat_g": 0.2,
        "vitamin_c_mg": 14,
        "iron_mg": 0.3,
        "potassium_mg": 237,
        "calcium_mg": 10,
        "sodium_mg": 5
      },
      "glycemic_index": 15,
      "glycemic_load": "Low",
      "health_score_out_of_10": 9,
      "health_score_reason": "Low calorie, rich in lycopene and vitamin C",
      "data_confidence": "USDA Verified"
    },
    {
      "vegetable_id": "veg_02",
      "vegetable_name": "Spinach",
      "per_100g": {
        "calories_kcal": 23,
        "carbohydrates_g": 3.6,
        "dietary_fibre_g": 2.2,
        "protein_g": 2.9,
        "fat_g": 0.4,
        "vitamin_c_mg": 28,
        "iron_mg": 2.7,
        "potassium_mg": 558,
        "calcium_mg": 99,
        "sodium_mg": 79
      },
      "glycemic_index": 1,
      "glycemic_load": "Low",
      "health_score_out_of_10": 10,
      "health_score_reason": "Nutrient-dense superfood, high in iron and calcium",
      "data_confidence": "USDA Verified"
    },
    {
      "vegetable_id": "veg_03",
      "vegetable_name": "Carrot",
      "per_100g": {
        "calories_kcal": 41,
        "carbohydrates_g": 9.6,
        "dietary_fibre_g": 2.8,
        "protein_g": 0.9,
        "fat_g": 0.2,
        "vitamin_c_mg": 5.9,
        "iron_mg": 0.3,
        "potassium_mg": 320,
        "calcium_mg": 33,
        "sodium_mg": 69
      },
      "glycemic_index": 39,
      "glycemic_load": "Low",
      "health_score_out_of_10": 8,
      "health_score_reason": "Excellent source of beta-carotene and fibre",
      "data_confidence": "USDA Verified"
    },
    {
      "vegetable_id": "veg_04",
      "vegetable_name": "Broccoli",
      "per_100g": {
        "calories_kcal": 34,
        "carbohydrates_g": 6.6,
        "dietary_fibre_g": 2.6,
        "protein_g": 2.8,
        "fat_g": 0.4,
        "vitamin_c_mg": 89,
        "iron_mg": 0.7,
        "potassium_mg": 316,
        "calcium_mg": 47,
        "sodium_mg": 33
      },
      "glycemic_index": 10,
      "glycemic_load": "Low",
      "health_score_out_of_10": 10,
      "health_score_reason": "Packed with vitamin C, fibre, and sulforaphane — a true superfood",
      "data_confidence": "USDA Verified"
    },
    {
      "vegetable_id": "veg_05",
      "vegetable_name": "Bell Pepper",
      "per_100g": {
        "calories_kcal": 26,
        "carbohydrates_g": 6.0,
        "dietary_fibre_g": 2.1,
        "protein_g": 1.0,
        "fat_g": 0.3,
        "vitamin_c_mg": 128,
        "iron_mg": 0.4,
        "potassium_mg": 211,
        "calcium_mg": 9,
        "sodium_mg": 3
      },
      "glycemic_index": 10,
      "glycemic_load": "Low",
      "health_score_out_of_10": 9,
      "health_score_reason": "Extremely high in vitamin C, low calorie, great for immunity",
      "data_confidence": "USDA Verified"
    }
  ],
  "allergy_report": [
    {
      "vegetable_id": "veg_01",
      "vegetable_name": "Tomato",
      "risk_groups": [
        { "group": "Diabetics", "severity": "SAFE", "reason": "Low GI, minimal impact on blood sugar", "recommendation": "Can be consumed freely" },
        { "group": "Thyroid Patients (Hypo)", "severity": "SAFE", "reason": "No known interaction", "recommendation": "Safe for consumption" },
        { "group": "Thyroid Patients (Hyper)", "severity": "SAFE", "reason": "No known interaction", "recommendation": "Safe for consumption" },
        { "group": "IBS / Digestive Disorders", "severity": "CAUTION", "reason": "Acidity may trigger heartburn or reflux in sensitive individuals", "recommendation": "Consume in moderation, avoid on empty stomach" },
        { "group": "Pregnant Women", "severity": "SAFE", "reason": "Rich in folate and vitamin C", "recommendation": "Beneficial during pregnancy" },
        { "group": "Infants & Children Under 5", "severity": "SAFE", "reason": "Soft, easy to digest when cooked", "recommendation": "Introduce after 12 months, serve cooked" },
        { "group": "Elderly (65+)", "severity": "SAFE", "reason": "Easy to chew, nutrient-rich", "recommendation": "Beneficial, serve cooked for easier digestion" },
        { "group": "Kidney Disease Patients", "severity": "CAUTION", "reason": "Moderate potassium content (237mg/100g)", "recommendation": "Consult nephrologist for portion limits" },
        { "group": "Blood Thinner Users (e.g. Warfarin)", "severity": "SAFE", "reason": "Low vitamin K content, minimal interaction", "recommendation": "Safe for regular consumption" }
      ]
    },
    {
      "vegetable_id": "veg_02",
      "vegetable_name": "Spinach",
      "risk_groups": [
        { "group": "Diabetics", "severity": "SAFE", "reason": "Very low GI, high fibre", "recommendation": "Excellent for blood sugar control" },
        { "group": "Thyroid Patients (Hypo)", "severity": "CAUTION", "reason": "Contains goitrogens that may interfere with thyroid function when consumed raw in large quantities", "recommendation": "Cook thoroughly to reduce goitrogen content" },
        { "group": "Thyroid Patients (Hyper)", "severity": "SAFE", "reason": "Goitrogens may be beneficial for hyperthyroid", "recommendation": "Safe for consumption" },
        { "group": "IBS / Digestive Disorders", "severity": "SAFE", "reason": "High fibre content aids digestion", "recommendation": "Introduce gradually to avoid bloating" },
        { "group": "Pregnant Women", "severity": "SAFE", "reason": "Rich in folate and iron", "recommendation": "Highly beneficial, cook thoroughly" },
        { "group": "Infants & Children Under 5", "severity": "SAFE", "reason": "Soft when cooked, nutrient-dense", "recommendation": "Blend into purees for babies from 8 months" },
        { "group": "Elderly (65+)", "severity": "SAFE", "reason": "Easy to digest when cooked", "recommendation": "Beneficial for bone health due to vitamin K" },
        { "group": "Kidney Disease Patients", "severity": "AVOID", "reason": "Very high potassium (558mg/100g) and oxalates", "recommendation": "Avoid or consume in very small quantities after consultation" },
        { "group": "Blood Thinner Users (e.g. Warfarin)", "severity": "AVOID", "reason": "Very high vitamin K content interferes with warfarin effectiveness", "recommendation": "Maintain consistent intake; consult doctor for dosage adjustment" }
      ]
    },
    {
      "vegetable_id": "veg_03",
      "vegetable_name": "Carrot",
      "risk_groups": [
        { "group": "Diabetics", "severity": "SAFE", "reason": "Low GI, moderate natural sugars", "recommendation": "Consume in moderation as part of balanced meal" },
        { "group": "Thyroid Patients (Hypo)", "severity": "SAFE", "reason": "No known interaction", "recommendation": "Safe for consumption" },
        { "group": "Thyroid Patients (Hyper)", "severity": "SAFE", "reason": "No known interaction", "recommendation": "Safe for consumption" },
        { "group": "IBS / Digestive Disorders", "severity": "SAFE", "reason": "Cooked carrots are easy to digest", "recommendation": "Cook before eating for easier digestion" },
        { "group": "Pregnant Women", "severity": "SAFE", "reason": "Rich in beta-carotene and vitamin A", "recommendation": "Beneficial for fetal development" },
        { "group": "Infants & Children Under 5", "severity": "SAFE", "reason": "Soft when cooked, naturally sweet", "recommendation": "Steam and mash for babies from 6 months" },
        { "group": "Elderly (65+)", "severity": "SAFE", "reason": "Soft texture when cooked", "recommendation": "Beneficial for eye health" },
        { "group": "Kidney Disease Patients", "severity": "CAUTION", "reason": "Moderate potassium content (320mg/100g)", "recommendation": "Consult nephrologist for appropriate portion size" },
        { "group": "Blood Thinner Users (e.g. Warfarin)", "severity": "SAFE", "reason": "Low vitamin K content", "recommendation": "Safe for regular consumption" }
      ]
    },
    {
      "vegetable_id": "veg_04",
      "vegetable_name": "Broccoli",
      "risk_groups": [
        { "group": "Diabetics", "severity": "SAFE", "reason": "Low GI, high fibre content helps stabilize blood sugar", "recommendation": "Excellent choice for blood sugar control" },
        { "group": "Thyroid Patients (Hypo)", "severity": "CAUTION", "reason": "Contains goitrogens that may interfere with thyroid function when consumed raw in large amounts", "recommendation": "Cook thoroughly to reduce goitrogen content" },
        { "group": "Thyroid Patients (Hyper)", "severity": "SAFE", "reason": "Goitrogens may be beneficial for hyperthyroidism", "recommendation": "Moderate consumption is safe" },
        { "group": "IBS / Digestive Disorders", "severity": "CAUTION", "reason": "High fibre and raffinose may cause gas and bloating in sensitive individuals", "recommendation": "Cook well and introduce gradually" },
        { "group": "Pregnant Women", "severity": "SAFE", "reason": "Rich in folate, vitamin C, and calcium", "recommendation": "Highly recommended, cook thoroughly" },
        { "group": "Infants & Children Under 5", "severity": "SAFE", "reason": "Soft when steamed, nutrient-dense", "recommendation": "Steam and puree for babies from 8 months" },
        { "group": "Elderly (65+)", "severity": "SAFE", "reason": "Easy to digest when cooked, rich in calcium and vitamin K", "recommendation": "Beneficial for bone health" },
        { "group": "Kidney Disease Patients", "severity": "CAUTION", "reason": "Moderate potassium content (316mg/100g)", "recommendation": "Consult nephrologist for portion limits" },
        { "group": "Blood Thinner Users (e.g. Warfarin)", "severity": "CAUTION", "reason": "Contains moderate vitamin K which may interfere with blood thinners", "recommendation": "Maintain consistent intake; consult doctor" }
      ]
    },
    {
      "vegetable_id": "veg_05",
      "vegetable_name": "Bell Pepper",
      "risk_groups": [
        { "group": "Diabetics", "severity": "SAFE", "reason": "Low GI, very low sugar content", "recommendation": "Excellent for blood sugar management" },
        { "group": "Thyroid Patients (Hypo)", "severity": "SAFE", "reason": "No known interaction", "recommendation": "Safe for consumption" },
        { "group": "Thyroid Patients (Hyper)", "severity": "SAFE", "reason": "No known interaction", "recommendation": "Safe for consumption" },
        { "group": "IBS / Digestive Disorders", "severity": "SAFE", "reason": "Low FODMAP, generally well tolerated", "recommendation": "Usually safe in moderate amounts" },
        { "group": "Pregnant Women", "severity": "SAFE", "reason": "Exceptionally high vitamin C aids iron absorption", "recommendation": "Highly beneficial during pregnancy" },
        { "group": "Infants & Children Under 5", "severity": "SAFE", "reason": "Soft when cooked, naturally sweet", "recommendation": "Roast and puree for babies from 8 months" },
        { "group": "Elderly (65+)", "severity": "SAFE", "reason": "Easy to chew, rich in antioxidants", "recommendation": "Beneficial for immune health" },
        { "group": "Kidney Disease Patients", "severity": "SAFE", "reason": "Low potassium content (211mg/100g)", "recommendation": "Generally safe for kidney patients" },
        { "group": "Blood Thinner Users (e.g. Warfarin)", "severity": "SAFE", "reason": "Very low vitamin K content", "recommendation": "Safe for regular consumption" }
      ]
    }
  ],
  "substitutions": [
    {
      "original_vegetable_id": "veg_02",
      "original_vegetable_name": "Spinach",
      "risk_reason": "High vitamin K contraindicated for blood thinner users; high oxalates and potassium for kidney patients",
      "affected_groups": ["Kidney Disease Patients", "Blood Thinner Users (e.g. Warfarin)"],
      "substitute_vegetable": "Zucchini (courgette)",
      "why_safer": "Zucchini is low in vitamin K (safe for warfarin users), low in potassium (safe for kidney patients), and contains no oxalates. It offers similar mild flavor and soft texture when cooked.",
      "nutritional_equivalence": "Moderate",
      "recipe_update": {
        "replaces_in_recipe": "all",
        "updated_ingredient_line": "Replace spinach with diced zucchini in all recipes"
      }
    }
  ],
  "integration_check": [
    {
      "vegetable_id": "veg_01",
      "vegetable_name": "Tomato",
      "detection_complete": True,
      "nutrition_complete": True,
      "allergy_checked": True,
      "substitute_evaluated": True,
      "overall_status": "FULLY PROCESSED"
    },
    {
      "vegetable_id": "veg_02",
      "vegetable_name": "Spinach",
      "detection_complete": True,
      "nutrition_complete": True,
      "allergy_checked": True,
      "substitute_evaluated": True,
      "overall_status": "FULLY PROCESSED"
    },
    {
      "vegetable_id": "veg_03",
      "vegetable_name": "Carrot",
      "detection_complete": True,
      "nutrition_complete": True,
      "allergy_checked": True,
      "substitute_evaluated": True,
      "overall_status": "FULLY PROCESSED"
    },
    {
      "vegetable_id": "veg_04",
      "vegetable_name": "Broccoli",
      "detection_complete": True,
      "nutrition_complete": True,
      "allergy_checked": True,
      "substitute_evaluated": True,
      "overall_status": "FULLY PROCESSED"
    },
    {
      "vegetable_id": "veg_05",
      "vegetable_name": "Bell Pepper",
      "detection_complete": True,
      "nutrition_complete": True,
      "allergy_checked": True,
      "substitute_evaluated": True,
      "overall_status": "FULLY PROCESSED"
    }
  ],
  "improvements": {
    "nutritional_gaps": ["Vitamin B12", "Omega-3 fatty acids", "Complete protein", "Vitamin D"],
    "suggested_add_ons": [
      { "ingredient": "Chickpeas or lentils", "reason": "Adds plant-based protein and fibre for satiety", "nutrient_it_adds": "Protein, Iron, Folate" },
      { "ingredient": "Avocado", "reason": "Provides healthy monounsaturated fats and creamy texture", "nutrient_it_adds": "Healthy fats, Vitamin E, Potassium" },
      { "ingredient": "Bell peppers", "reason": "Adds color variety and boosts vitamin C content significantly", "nutrient_it_adds": "Vitamin C, Antioxidants" }
    ],
    "cooking_technique_upgrades": {
      "easy": "Blanch the carrots for 30 seconds to enhance color and nutrient absorption",
      "intermediate": "Add a finishing touch of smoked paprika or sumac for depth of flavor",
      "advanced": "Use sous-vide carrots for precise texture, then glaze with honey-thyme butter"
    },
    "meal_balance_score_out_of_10": 8,
    "meal_balance_justification": "The 5-vegetable selection covers an excellent range of vitamins A, C, K, fibre, and antioxidants. Broccoli and bell pepper are standout additions. The main gaps are protein and healthy fats — a serving of legumes would bring this to 10/10.",
    "next_scan_suggestion": "Pair this vegetable plate with chickpeas or grilled tofu for a complete meal with protein and healthy fats",
    "overall_verdict": "Excellent 5-vegetable selection with high nutritional density. Tomato, spinach, carrot, broccoli, and bell pepper cover a wide spectrum of vitamins, minerals, and antioxidants. Broccoli stands out for its vitamin C and sulforaphane content, while bell pepper delivers the highest vitamin C per gram. The main gaps are protein, healthy fats, and vitamin B12. Adding lentils, avocado, or grilled paneer would make this a perfectly balanced meal."
  }
}
