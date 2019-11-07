import fs, { PathLike } from 'fs';
export class Utils {
  public static CapitalizeFirst(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  public static GetFileAsString(path: PathLike) {
    const buffer = fs.readFileSync(path);
    return buffer.toString('utf8');
  }
}