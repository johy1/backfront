class Node {
    constructor(data, next = null) {
      this.data = data;
      this.next = next;
    }
  }
  
  class LinkedList {
    constructor() {
      this.head = null;
      this.tail = null;
      this.current = null;
      this.size = 0;
    }
  
    // 리스트의 맨 앞에 data 추가.
    insertFirst(data) {
      let newNode = new Node(data);
  
      if (!this.head) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        newNode.next = this.head;
        this.head = newNode;
      }
  
      this.size++;
    }
  
    // 리스트의 맨 뒤에 data 추가.
    insertLast(data) {
      if (!this.tail) {
        this.insertFirst(data);
      } else {
        let newNode = new Node(data);
        this.tail.next = newNode;
        this.tail = newNode;
      }
  
      this.size++;
    }
  
    // 리스트에 저장된 다음 노드가 있는지 확인
    hasNext() {
      if (this.current)
        return this.current.next ? true : false;
      else
        return this.head ? true : false;
    }
  
    // 리스트에 저장된 다음 노드 반환
    next() {
      this.current = this.current ? this.current.next : this.head;
      return this.current;
    }
  
    // 현재 탐색중인 current 값을 처음부터 순회하도록 초기화시킴
    resetCurrent() {
      this.current = null;
    }
  }
  
  module.exports = LinkedList;