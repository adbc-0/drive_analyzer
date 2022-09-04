from typing import TypeVar, Generic

T = TypeVar('T')

class Stack(Generic[T]):
  def __init__(self) -> None:
    self.__items: list[T] = []

  def append(self, item) -> None:
    self.__items.append(item)

  def pop(self) -> T:
    return self.__items.pop()

  def isEmpty(self) -> bool:
    return not self.__items

  def peek(self) -> T:
    return self.__items[-1]
