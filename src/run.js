import { UserRepository } from './UserRepository.js';
import { UserService } from './UserService.js';

async function runDemonstration() {
  // Shared repository instance
  const userRepository = new UserRepository();

  console.log('=== PART 1: UserRepository (RAW DATA) ===');
  try {
    const rawUsers = await userRepository.getUsers();
    console.table(rawUsers);
    console.log(`\nTotal raw users retrieved: ${rawUsers.length}`);
  } catch (error) {
    console.error('Error in Part 1:', error.message);
  }

  console.log('\n=== PART 2: UserService (FORMATTED DATA: id, name, email) ===');
  const userService = new UserService(userRepository);
  try {
    const formattedUsers = await userService.getUsers();
    console.table(formattedUsers);
    console.log(`\nTotal formatted users: ${formattedUsers.length}`);
  } catch (error) {
    console.error('Error in Part 2:', error.message);
  }

  console.log('\n=== PART 3: UserService (GET USER BY ID) ===');
  try {
    // const userService = new UserService(userRepository);
    const userId = 1;
    const user = await userService.getUsersById(userId);
    
    user ? console.log(`User found (ID ${userId}):`, user) : console.log(`User with ID ${userId} not found.`);

  } catch (error) {
    console.error('Error in Part 3:', error.message);
  }
}

(async () => {
  try {
    await runDemonstration();
  } catch (criticalError) {
    console.error('Critical failure in execution:', criticalError.message);
  }
})();
