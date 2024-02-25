public class Main {

    public static void main(String[] args) {
        // Your application logic goes here
        //add a user when this happens
        User testUser = new User(
                1,                  // userId
                "John Doe",         // name
                "john@example.com", // email
                "123456789",        // phoneNumber
                "123 Main St",      // address
                "Active",           // subscriptionStatus
                "Espresso",         // coffeeChoice
                "Daily",            // subscriptionFrequency
                "10 minutes"        // subscriptionDuration
        );
        UserDAO.addUser(testUser);
    }
}

