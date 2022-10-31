package in.nirajkumar.MyMart.service;

import in.nirajkumar.MyMart.Model.Address;
import in.nirajkumar.MyMart.requests.NewUserRequest;

public interface UserService {
    public String createNewAccount(NewUserRequest newUserRequest);
    public String addAddressToUser(Address address, int userid);
    public String updateUserRecord(NewUserRequest newUserRequest, int userId);
}
