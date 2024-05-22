const mongoose = require("mongoose");

const soulderSchema = new mongoose.Schema({
  // pain And Stiffness
  painAndStiffness: {
    side: {
      type: String,
    //   enum: ["Right", "Left"],
    },
  },
  // HOPI Form
  Hopi: {
    durationOfPain: {
      years: Number,
      months: Number,
      weeks: Number,
      days: Number,
    },

    natureOfPain: {
      type: String,
    //   enum: ["Continuous", "On Activity"],
    },
    symptoms: {
      type: String,
    //   enum: ["Improving", "Worsening", "Remain Same"],
    },
    onset: {
      type: String,
    //   enum: ["Gradual", "Sudden"],
    },

    injury: {
      type: Boolean,
    },
    relievingFactor: {
      type: String,
    //   enum: ["Rest", "Medication"],
      // Only store if injury is true
      required: function () {
        return this.injury;
      },
    },
    injuryType: {
      type: String,
    //   enum: [
    //     "Fall",
    //     "RTA",
    //     "Throwing",
    //     "Lifting",
    //     "Any Movement of Shoulder Joint",
    //   ],
      // Only store if injury is true
      required: function () {
        return this.injury;
      },
    },
    aggravatingFactor: {
      type: String,
    },
    intensityOfPainAtNight: {
      type: String,
    //   enum: ["Increased", "Decreased"],
    },
    sleepDisturbance: {
      type: Boolean,
    },
  },

  // Past History Form
  pastHistory: {
    HTN: {
      present: {
        type: Boolean,
      },
      medication: {
        type: String,
        // Only store if HTN is present
        required: function () {
          return this.pastHistory.HTN.present;
        },
      },
    },
    DM2: {
      present: {
        type: Boolean,
      },
      medication: {
        type: String,
        // enum: ["On Regular Medications", "On Irregular Medications"],
        // Only store if DM2 is present
        required: function () {
          return this.pastHistory.DM2.present;
        },
      },
    },
    hypothyroidism: {
      present: {
        type: Boolean,
      },
    },
    rxHistory: String,
  },

  // On Examination Form
  onExamination: {
    shoulderSide: {
      type: String,
    //   enum: ["Right", "Left"],
    },
    neurologicalDeficit: {
      present: {
        type: Boolean,
      },
      type: {
        type: String,
        // enum: ["Motor", "Sensory"],
        // Only store if neurologicalDeficit is present
        required: function () {
          return this.onExamination.neurologicalDeficit.present;
        },
      },
    },
    swelling: {
      type: Boolean,
    },
    muscleWasting: {
      type: Boolean,
    },
    capsularPatternAltered: {
      type: Boolean,
    },
    musclesTightness: {
      type: Boolean,
    },
    muscles: [
      {
        name: {
          type: String,
        //   enum: [
        //     "Supraspinatus",
        //     "Infraspinatus",
        //     "Subscapularis",
        //     "Teres Minor",
        //     "Deltoid",
        //     "Pectoral",
        //   ],
        },
        tenderness: Boolean,
      },
    ],
    ROM: {
      side: {
        type: String,
      },
    },
    tone: {
      type: String,
    },
    musclePower: {
      type: String,
    },
    coordination: {
      type: String,
    },
    gripAndPinch: {
      type: String,
    },
  },
  // Physiotherapy Management Form
  physiotherapyManagement: {
    thumbDropTest: {
      type: String,
      //   enum: ["Positive", "Negative"],
    },

    painfulArcTest: {
      type: String,
      //   enum: ["Positive", "Negative"],
    },
    functionalAssessment: {
      type: String,
      //   enum: ["Dependent", "Independent"],
    },
    difficultyIn: [
      {
        activity: {
          type: String,
        //   enum: [
        //     "Clothing",
        //     "Combing",
        //     "Lifting Objects",
        //     "Overhead activities",
        //     "Grip & Pinch",
        //   ],
        },
      },
    ],
    modalities: [
      {
        modality: {
          type: String,
        //   enum: [
        //     "Moist Heat",
        //     "SWD",
        //     "Shock Wave",
        //     "Combination Therapy",
        //     "LASER",
        //     "TENS",
        //     "IFT",
        //     "US",
        //   ],
        },
      },
    ],
  },
  // Exercises Plan
  exercisesPlan: {
    gradedMobilization: Boolean,
    strengtheningOfRotatorCuffMuscles: Boolean,
    capsularStretchingExercises: Boolean,
    avoidJerkyMovements: Boolean,
    homeProgramGiven: Boolean,
    prognosisWellExplainedInPatientsWords: Boolean,
  },
});

const soulder = mongoose.model("soulder", soulderSchema);

module.exports = soulder;
