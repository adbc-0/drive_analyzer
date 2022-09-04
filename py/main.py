from time import time
from reader import FSReader

if __name__ == '__main__':
  start_time = time()

  FSReader().create_fs_tree()

  print("--- %s seconds ---" % (time() - start_time))
