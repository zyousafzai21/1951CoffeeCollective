import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class SQLiteConnector {
    // JDBC URL, username, and password of SQLite server
    private static final String JDBC_URL = "jdbc:sqlite:/test.db";
    // Note: In SQLite, there is no username or password like in other databases

    // JDBC variables for opening, closing, and managing the database connection
    private static Connection connection;

    // Method to establish a database connection
    public static Connection connect() {
        try {
            // Register the SQLite JDBC driver
            Class.forName("org.sqlite.JDBC");

            // Establish the connection
            connection = DriverManager.getConnection(JDBC_URL);

            return connection;
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to connect to the SQLite database.");
        }
    }

    // Method to close the database connection
    public static void close() {
        try {
            if (connection != null && !connection.isClosed()) {
                connection.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to close the database connection.");
        }
    }
}
