import bcrypt from 'bcryptjs';
import { connectDB } from './mongoose';
import User from './models/User';

async function seed() {
  try {
    console.log('🌱 Seeding database...');
    
    await connectDB();
    console.log('✅ Connected to MongoDB');
    const userData: Record<string, string> = {
      email: 'admin@email.com',
      password: 'Admin@123',
      name: 'Admin User',
    };

    // Check if user already exists
    const existingUser = await User.findOne({ email: userData.email });
    
    if (existingUser) {
      console.log('ℹ️  User already exists');
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(`${userData.password}`, 12);
    userData.password = hashedPassword;

    // Create user
    const user = await User.create(userData);

    console.log('✅ User created successfully:');
    console.log('   Email:', user.email);
    console.log('   Name:', user.name);
    console.log('\n🎉 Seeding completed!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seed();

