import prompt from "prompt-sync";
const promptSync = prompt();

export class Menu {
  constructor() {
    this.promptSync = prompt();
  }

  mainMenu() {
    while (true) {
      // console.clear();
      console.log("-----> Welcome to your artist and band collection <-----");
      console.log("\nMain Menu\n");
      console.log("1. Manage Artists");
      console.log("2. Manage Bands");
      console.log("3. Exit");

      const mainMenuChoice = this.promptSync('Enter your choice:')

      switch (mainMenuChoice) {
        case "1":
          this.artistMenu();
          break;
        case "2":
          this.bandMenu();
          break;
        case "3":
          console.log("-----> Thank you for using the program <----- \n Now exiting program!");
          return;
        default:
          console.log("Invalid choice. Please select a number between 1 - 3");
      }
    }
  }
  artistMenu() {
    while (true) {
      // console.clear();
      console.log("Artist Menu\n");
      console.log("1. Add Artist");
      console.log("2. Remove Artist");
      console.log("3. Show Artists");
      console.log("4. Go back to Main Menu");

      const artistMenuChoice = this.promptSync('Enter your choice: ')

      switch (artistMenuChoice) {
        case "1":
          console.log("You selected Add Artist");
          break;
        case "2":
          console.log("You selected Remove Artist");
          break;
        case "3":
          console.log("You selected Show Artists");
          break;
        case "4":
          return;
        default:
          console.log("Invalid choice. Please select a number between 1 - 4");
      }
    }
  }

  bandMenu() {
    while (true) {
      // console.clear();
      console.log("Band Menu\n");
      console.log("1. Add Band");
      console.log("2. Remove Band");
      console.log("3. Show Bands");
      console.log("4. Go back to Main Menu");

      const bandMenuChoice = this.promptSync('Enter your choice: ')

      switch (bandMenuChoice) {
        case "1":
          console.log("You selected Add Band");
          break;
        case "2":
          console.log("You selected Remove Band");
          break;
        case "3":
          console.log("You selected Show Bands");
          break;
        case "4":
          return;
        default:
          console.log("Invalid choice. Please select a number between 1 - 4");
      }
    }
  }
}