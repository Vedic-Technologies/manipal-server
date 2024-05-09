const Payment = require("../models/patientPaymentSchema");
const Patient = require("../models/registerPatient");

async function handleNewPayment(req, res) {
  const body = req.body;
  if (!body || !body.patientId || !body.paymentType || !body.amount) {
    return res.status(400).json({
      msg: "All fields are required and amount should be greater than 0",
    });
  }

  try {
    // Attempt to create the payment
    const result = await Payment.create({
      patientId: body.patientId,
      paymentType: body.paymentType,
      amount: body.amount,
      paymentDate: body.paymentDate,
    });

    return res.status(201).json({ msg: "success", patient_id: result._id });
  } catch (error) {
    // Handle the error
    if (error.name === "ValidationError") {
      return res.status(400).json({ msg: "Validation error: id not found " });
    } else {
      console.error("Error creating payment:", error);
      return res.status(500).json({ msg: "Internal server error" });
    }
  }
}

// async function GetAllPayment(req, res) {
//   try {
//     // Step 1: Retrieve data from both tables
//     const allPayments = await Payment.find({});
//     const allPatients = await Patient.find({});

//     // Step 2: Combine data with a loop
//     const combinedData = [];

//     for (const payment of allPayments) {
//       const patient = await Patient.findById(payment.patientId);
//       if (patient) {
//         // Construct paymentInfo object with patient information
//         const paymentInfo = {
//           ...payment,
//           patientInfo: {
//             patientName: patient.patientName || "",
//             contact: patient.contact || "",
//             active: patient.active || "",
//             image: patient.image || "",
//           },
//         };
//         combinedData.push(paymentInfo);
//       }
//     }
//     const combinedDataToSend = combinedData.map((item) => ({
//       payment: item._doc,
//       patientInfo: item.patientInfo,
//     }));

//     return res.json(combinedDataToSend);

//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }

// async function GetAllPayment_2(req, res) {
//   //checking
//   try {
//     // Step 1: Retrieve data from both tables

//     // const Data = [];
//     // // Step 2: Combine data using a more optimized approach
//     // const combinedData = allPayments.map((payment) => {
//     //   const patient = allPatients.filter(
//     //     (patient) => patient.patientId === payment.patientId
//     //   );
//     //   if (patient) {
//     //     const data = {
//     //       name: patient.patientName,
//     //     };

//     //     Data.push(data);
//     //     console.log(Data);
//     //   }
//     // });
//     const allPayments = await Payment.find({});
//     console.log(allPayments.length);
//     const allPatients = await Patient.find({});
//     const Data = [];
//     // Step 2: Combine data using a more optimized approach
//     // const combinedData = allPatients.map((payment) =>
//     //   allPayments.find((patient) => patient.patientId === payment.patientId)
//     // );

//     const combinedData = allPayments
//       .filter((payment) =>
//         allPatients.some((patient) => patient.patientId === payment.patientId)
//       )
//       .map((payment) => {
//         const patient = allPatients.find(
//           (patient) => patient.patientId === payment.patientId
//         );
//         return {
//           payment,
//           patient,
//         };
//       });

//     return res.json(combinedData);
//   } catch (err) {
//     console.error("Error:", err);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// }

async function GetAllPayment(req, res) {
  console.log(Patient);
  const allPayments = await Payment.find({});

  try {
    const allPayments = await Payment.find({}).populate({
      path: "patientId",
      model: "patient",
      select: "patientName contact image active", // Choose the fields you want to include
    });

    console.log(allPayments);

    // Optionally, enhance data format here if needed
    const paymentsWithPatientInfo = allPayments.map((payment) => ({
      _id: payment._id,
      paymentType: payment.paymentType,
      amount: payment.amount,
      paymentDate: payment.paymentDate,
      patient: {
        name: payment.patientId?.patientName,
        active: payment.patientId?.active,
        contact: payment.patientId?.contact,
        image: payment.patientId?.image,
      },
    }));

    return res.json(paymentsWithPatientInfo);
  } catch (error) {
    console.error("Failed to retrieve payments:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
}


async function GetPaymentById(req, res) {
  const patient = await Patient.findById(req.params.id);

  const payment = await Payment.find({ patientId: req.params.id });
  // console.log(payment)
  if (!patient) return res.status(404).json({ error: "user not found" });

  const data = {
    ...patient._doc,
    ...payment,
  };
  console.log(data);
  return res.json(data);
}

async function deletePaymentById(req, res) {
  await Payment.findByIdAndDelete(req.params.id);
  res.json({ status: "deleted successfully" });
}

module.exports = {
  handleNewPayment,
  GetAllPayment,
  deletePaymentById,
};
