public class Main {

    public static void main(String[] args) {
        // Your application logic goes here
        //add a user when this happens
<<<<<<< HEAD
        User cheryl = new User(1, "cheryl", "cheryltugade@berkeley.edu", "6096101047", "1234 happy way", "active", "decaf", "2 weeks", "6 months");
        UserDAO.addUser(cheryl);
=======
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
>>>>>>> 9999f50d5ddb77653a1fe9d9b361750bf52d19d5
    }
}

