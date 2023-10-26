import fs from "fs"

export class FileCheck {
  constructor(filePath) {
    this.filePath = filePath;
  }

  isFileNotEmpty() {
    try {
      const data = fs.readFileSync(this.filePath, "utf-8")
      return data.trim() !== '' && data.trim() !== '[]';
    } catch (error) {
      return false;
    }
  }
}