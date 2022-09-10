namespace Extension.File
{
  public static class FileExtension
  {
    public static bool IsDirectory(this FileInfo file)
    {
      return file.Attributes.HasFlag(FileAttributes.Directory);
    }
    public static bool IsSymbolic(this FileInfo file)
    {
      return file.Attributes.HasFlag(FileAttributes.ReparsePoint);
    }
  }
}