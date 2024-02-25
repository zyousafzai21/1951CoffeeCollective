public class User {
    // Attributes
    private int userId;
    private String name;
    private String email;
    private String phoneNumber;
    private String address;
    private SubscriptionStatus subscriptionStatus;
    private CoffeeChoice coffeeChoice;
    private SubscriptionFrequency subscriptionFrequency;
    private SubscriptionDuration subscriptionDuration;

    // Constructor
    public User(int userId, String name, String email, String phoneNumber, String address,
                SubscriptionStatus subscriptionStatus, CoffeeChoice coffeeChoice,
                SubscriptionFrequency subscriptionFrequency, SubscriptionDuration subscriptionDuration) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.subscriptionStatus = subscriptionStatus;
        this.coffeeChoice = coffeeChoice;
        this.subscriptionFrequency = subscriptionFrequency;
        this.subscriptionDuration = subscriptionDuration;
    }

    // Getter and Setter methods for each attribute

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public SubscriptionStatus getSubscriptionStatus() {
        return subscriptionStatus;
    }

    public void setSubscriptionStatus(SubscriptionStatus subscriptionStatus) {
        this.subscriptionStatus = subscriptionStatus;
    }

    public CoffeeChoice getCoffeeChoice() {
        return coffeeChoice;
    }

    public void setCoffeeChoice(CoffeeChoice coffeeChoice) {
        this.coffeeChoice = coffeeChoice;
    }

    public SubscriptionFrequency getSubscriptionFrequency() {
        return subscriptionFrequency;
    }

    public void setSubscriptionFrequency(SubscriptionFrequency subscriptionFrequency) {
        this.subscriptionFrequency = subscriptionFrequency;
    }

    public SubscriptionDuration getSubscriptionDuration() {
        return subscriptionDuration;
    }

    public void setSubscriptionDuration(SubscriptionDuration subscriptionDuration) {
        this.subscriptionDuration = subscriptionDuration;
    }


}
