import mongoose from "mongoose";
export const dbConnection = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Database connected');
    } catch (error) {
      console.error('Error connecting to the database:', error);
      process.exit(1);
    }
  };