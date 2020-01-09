export class User {

  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  iban: string;
  token: string;

  // Get new user object from JSON values
  public static parseFromJson(id, username, hashedPassword, firstName, lastName, birthDate, iban, token?): User {
    let newUser = new User();
    newUser.id = id;
    newUser.username = username;
    newUser.password = hashedPassword;
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.birthDate = new Date(birthDate);
    newUser.iban = iban;
    newUser.token = token ? token : undefined;
    return newUser;
  }
}
