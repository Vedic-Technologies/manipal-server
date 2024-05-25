const mongoose = require("mongoose");

const soulderSchema = new mongoose.Schema({
patientId : String,
  painAndStiffness: {
    side: {
      type: String,
      // enum: ["Right", "Left"],
    },
    duration: {
      years: Number,
      months: Number,
      weeks: Number,
      days: Number,
    },
  },
  Hopi: {
    durationOfPain: {
      years: Number,
      months: Number,
      weeks: Number,
      days: Number,
    },
    natureOfPain: {
      type: String,
      // enum: ["Continuous", "On Activity"],
    },
    symptoms: {
      type: String,
      // enum: ["Improving", "Worsening", "Remain Same"],
    },
    onset: {
      type: String,
      // enum: ["Gradual", "Sudden"],
    },
    injury: {
      type: Boolean,
    },
    relievingFactor: {
      type: String,
      // enum: ["Rest", "Medication"],
      required: function () {
        return this.Hopi && this.Hopi.injury;
      },
    },
    injuryType: {
      type: String,
      // enum: [
      //   "Fall",
      //   "RTA",
      //   "Throwing",
      //   "Lifting",
      //   "Any Movement of Shoulder Joint",
      // ],
      required: function () {
        return this.Hopi && this.Hopi.injury;
      },
    },
    aggravatingFactor: {
      type: String,
    },
    intensityOfPainAtNight: {
      type: String,
      // enum: ["Increased", "Decreased"],
    },
    sleepDisturbance: {
      type: Boolean,
    },
  },
  pastHistory: {
    HTN: {
      present: {
        type: Boolean,
      },
      medication: {
        type: String,
        required: function () {
          return (
            this.pastHistory &&
            this.pastHistory.HTN &&
            this.pastHistory.HTN.present
          );
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
        required: function () {
          return (
            this.pastHistory &&
            this.pastHistory.DM2 &&
            this.pastHistory.DM2.present
          );
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
  onExamination: {
    shoulderSide: {
      type: String,
      // enum: ["Right", "Left"],
    },
    neurologicalDeficit: {
      present: {
        type: Boolean,
      },
      type: {
        type: String,
        // enum: ["Motor", "Sensory"],
        required: function () {
          return (
            this.onExamination &&
            this.onExamination.neurologicalDeficit &&
            this.onExamination.neurologicalDeficit.present
          );
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
          // enum: [
          //   "Supraspinatus",
          //   "Infraspinatus",
          //   "Subscapularis",
          //   "Teres Minor",
          //   "Deltoid",
          //   "Pectoral",
          // ],
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
  physiotherapyManagement: {
    thumbDropTest: {
      type: String,
      // enum: ["Positive", "Negative"],
    },
    painfulArcTest: {
      type: String,
      // enum: ["Positive", "Negative"],
    },
    functionalAssessment: {
      type: String,
      // enum: ["Dependent", "Independent"],
    },
    difficultyIn: [
      {
        activity: {
          type: String,
          // enum: [
          //   "Clothing",
          //   "Combing",
          //   "Lifting Objects",
          //   "Overhead activities",
          //   "Grip & Pinch",
          // ],
        },
      },
    ],
    modalities: [
      {
        modality: {
          type: String,
          // enum: [
          //   "Moist Heat",
          //   "SWD",
          //   "Shock Wave",
          //   "Combination Therapy",
          //   "LASER",
          //   "TENS",
          //   "IFT",
          //   "US",
          // ],
        },
      },
    ],
  },
  exercisesPlan: {
    gradedMobilization: Boolean,
    strengtheningOfRotatorCuffMuscles: Boolean,
    capsularStretchingExercises: Boolean,
    avoidJerkyMovements: Boolean,
    homeProgramGiven: Boolean,
    prognosisWellExplainedInPatientsWords: Boolean,
  },
});

const Soulder = mongoose.model("Soulder", soulderSchema);

module.exports = Soulder;
