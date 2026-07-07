import mongoose from 'mongoose';

let mongod = null;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`MongoDB connection failed: ${error.message}`);
    console.log('Starting in-memory MongoDB...');
    try {
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      mongod = await MongoMemoryServer.create({
        instance: { dbName: 'fullstack-app' },
      });
      const uri = mongod.getUri();
      const conn = await mongoose.connect(uri);
      console.log(`In-memory MongoDB Connected: ${conn.connection.host}`);
    } catch (memError) {
      console.error(`Failed to start in-memory MongoDB: ${memError.message}`);
      process.exit(1);
    }
  }
};

export const getMongoD = () => mongod;

export default connectDB;
