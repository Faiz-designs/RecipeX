DEMO_DATA = {
  "scan_summary": {
    "total_vegetables_detected": 3,
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
        "Wash and chop tomatoes into wedges. Grate carrots. Keep spinach leaves whole.",
        "In a bowl, whisk lemon juice with honey for the dressing.",
        "Toss all vegetables with the dressing. Top with sesame seeds.",
        "Serve immediately at room temperature."
      ],
      "plating_suggestion": "Serve in a wide wooden bowl with dressing drizzled in a spiral pattern."
    },
    "intermediate": {
      "name": "Roasted Vegetable Medley with Garlic Herb Sauce",
      "total_time_minutes": 35,
      "prep_time_minutes": 15,
      "cook_time_minutes": 20,
      "servings": 3,
      "additional_ingredients_required": ["garlic", "yogurt", "mixed herbs", "lemon"],
      "steps": [
        "Preheat oven to 200°C. Cut tomatoes in half, chop carrots into batons.",
        "Toss vegetables with oil, salt, and pepper. Spread on baking tray.",
        "Roast for 20 minutes until carrots are tender and tomatoes are blistered.",
        "Blend yogurt with minced garlic, herbs, and lemon juice for the sauce.",
        "Serve vegetables hot with the sauce drizzled on top."
      ],
      "plating_suggestion": "Arrange roasted vegetables on a white plate with sauce in a separate small bowl."
    },
    "advanced": {
      "name": "Stuffed Tomato Cups with Carrot-Spinach Risotto",
      "total_time_minutes": 55,
      "prep_time_minutes": 25,
      "cook_time_minutes": 30,
      "servings": 2,
      "additional_ingredients_required": ["arborio rice", "onion", "garlic", "vegetable stock", "parmesan", "butter", "white wine"],
      "steps": [
        "Slice tops off tomatoes. Scoop out pulp. Reserve pulp and invert tomatoes to drain.",
        "Finely dice onion and garlic. Sauté in butter until translucent.",
        "Add arborio rice, toast for 2 minutes. Deglaze with white wine.",
        "Add warm stock one ladle at a time, stirring continuously for 18 minutes.",
        "In the last 3 minutes, stir in finely chopped spinach and grated carrot.",
        "Fold in parmesan and butter. Stuff mixture into tomato cups.",
        "Bake at 180°C for 10 minutes. Serve with microgreens on top."
      ],
      "plating_suggestion": "Place stuffed tomato in the center of a ring of extra risotto. Garnish with microgreens and parmesan shavings."
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
    "meal_balance_score_out_of_10": 7,
    "meal_balance_justification": "The meal is rich in vitamins A, C, K, and fibre but lacks protein, healthy fats, and vitamin B12. Adding legumes or a protein source would bring this to a 9/10.",
    "next_scan_suggestion": "Add protein-rich vegetables like peas, edamame, or pair with mushrooms for umami and vitamin D",
    "overall_verdict": "Excellent vegetable selection with high nutritional density. The tomato, spinach, and carrot combination covers a wide range of vitamins and minerals. The main gaps are protein and healthy fats. Consider adding legumes, avocado, or nuts in your next meal for a complete nutritional profile."
  }
}
