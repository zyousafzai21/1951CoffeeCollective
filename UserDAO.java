import java.sql.*;


public class UserDAO {

    // Method to insert a new user into the database
    public static void addUser(User user) {
        try (Connection connection = SQLiteConnector.connect()) {
            String sql = "INSERT INTO users (name, email, phone_number, address, " +
                    "subscription_status, coffee_choice, subscription_frequency, " +
                    "subscription_duration) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

            try (PreparedStatement statement = connection.prepareStatement(sql)) {
                statement.setString(1, user.getName());
                statement.setString(2, user.getEmail());
                statement.setString(3, user.getPhoneNumber());
                statement.setString(4, user.getAddress());
                statement.setString(5, user.getSubscriptionStatus());
                statement.setString(6, user.getCoffeeChoice());
                statement.setString(7, user.getSubscriptionFrequency());
                statement.setString(8, user.getSubscriptionDuration());

                statement.executeUpdate();
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to add user to the database.");
        }
    }

    // Method to retrieve a user by ID from the database


    // Method to retrieve all users from the database


    // Method to map a ResultSet to a User object


    // Add other methods for update and delete operations as needed
}
