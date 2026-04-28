import mongoose from "mongoose";

export const connectDB =  async ()=>{
    let client = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`${client.connection.host}`)
}


//import mongoose from "mongoose";

// //? ===============================
// //?  CONNECT DATABASE FUNCTION
// //? ===============================

// export const connectDB = async () => {
//   try {
//     const client = await mongoose.connect(process.env.MONGODB_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     console.log(`📦 MongoDB Connected: ${client.connection.host}`);
//   } catch (err) {
//     console.error("❌ MongoDB Connection Failed:", err.message);
//     process.exit(1); // Stop server on DB failure
//   }
// };
