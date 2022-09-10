using Extension.File;

namespace Reader {
  public static class SystemReader { 
    public static TreeNode CreateDirTree()
    {
      var fileStack = new Stack<TreeNode>();
      var rootNode = new TreeNode(Constants.ROOT);

      fileStack.Push(rootNode);

      while (fileStack.Any())
      {
        var currentNode = fileStack.Pop();
        var directory = new DirectoryInfo(currentNode.Path);

        try
        {
          foreach (var filePath in directory.EnumerateFileSystemInfos())
          {
            var fileInfo = new FileInfo(filePath.FullName);

            if (fileInfo.IsSymbolic())
            {
              continue;
            }

            var newNode = new TreeNode(filePath.FullName);

            if (fileInfo.IsDirectory())
            {
              fileStack.Push(newNode);
            }

            rootNode.AppendChild(newNode);
          }
        }
        catch (UnauthorizedAccessException)
        {
          continue;
        }
      }

      return rootNode;
    }
  }
}