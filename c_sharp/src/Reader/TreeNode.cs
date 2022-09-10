namespace Reader {
  public class TreeNode {
    public string Path { get; private set; }
    private int Size;
    private List<TreeNode> Children;
    
    public TreeNode(string path, int size = 0)
    {
      this.Path = path;
      this.Size = size;
      this.Children = new List<TreeNode>();
    }

    public void AppendChild(TreeNode node)
    {
      this.Children.Add(node);
    }
  }
}