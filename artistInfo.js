class ArtistInfo {
  constructor(name, infoText, birthYear) {
    this.Name = name;
    this.infoText = infoText;
    this.birthYear = birthYear;
  }

  static showInfo(artist) {
    console.log(`Name: ${artist.Name}`);
    console.log(`Infotext: ${artist.infoText}`);
    console.log(`Birthyear: ${artist.birthYear}`);
  }
}