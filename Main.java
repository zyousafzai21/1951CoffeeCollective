public class Main {

    public static void main(String[] args) {
        // Your application logic goes here
        //add a user when this happens
        User cheryl = new User(1, "cheryl", "cheryltugade@berkeley.edu", "6096101047", "1234 happy way", "active", "decaf", "2 weeks", "6 months");
        UserDAO.addUser(cheryl);
    }
}

