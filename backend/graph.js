const LinkedList = require('./LinkedList');

class Graph {
  constructor() {
    this.vertecies = []; // 정점들의 ID 정보
    this.edges = {}; // 특정 정점으로부터 어느 정점으로 갈 수 있는지 간선에 대한 정보 (인접 리스트)
    this.foundCycle = false; // DFS 알고리즘 수행중에 사이클을 찾은 경우에 true로 되고 순회를 종료한다.
  }

  // from 정점으로부터 to 정점으로의 간선을 추가함.
  addEdge(from, to) {
    // from, to 정점들이 아직 추가되지 않은 상태이면 정점 정보 저장
    if (!this.vertecies.includes(from)) {
      this.vertecies.push(from); // 정점 추가
      this.edges[from] = new LinkedList(); // 간선 정보를 기록할 수 있는 LinkedLisk 객체 생성
    }
    if (!this.vertecies.includes(to)) {
      this.vertecies.push(to);
      this.edges[to] = new LinkedList();
    }

    // from에서 to로 가는 간선 정보 저장
    this.edges[from].insertLast(to);
  }

  // 사이클을 찾는 깊이 우선 탐색 알고리즘 로직.
  // 사이클을 찾으면 this.foundCycle이 true가 되고 사이클을 이루는 노드들은 traced에 저장된다.
  DFSUtil(v, start, visited, traced) {
    // 맨 처음 방문할때를 제외하고, 시작점으로 다시 돌아올때까지 반복해서 순회한다. 중복된 길로는 가지 않도록 하기 위해 visited 배열 변수도 사용한다.
    if (traced.length <= 0 || v !== start) {
      visited[v] = true; // 방문한 정점을 중복 순회하지 않도록 visited에 추가
      traced.push(v); // 정점들이 어떻게 이어지는지 경로를 파악하기 위해서 지금까지 방문한 정점들은 traced에 기록
    }

    // v 정점과 연결 되어 있는 모든 정점들을 대상으로 DFS 수행
    while (this.edges[v].hasNext()) {
      let n = this.edges[v].next().data;

      // 아직 방문하지 않은 노드면 해당 노드를 시작 노드로 하여 DFS 수행
      if (!visited[n]) {
        this.DFSUtil(n, start, visited, traced);
      // 맨 처음 방문한 정점을 다시 방문하게 되면 사이클을 찾은것임.
      } else if (n === start) {
        this.foundCycle = true;
        // console.log(n + ' 탐색중에 사이클 찾음');
      }
    }

    this.edges[v].resetCurrent();
    return null;
  }

  // 주어진 노드를 시작 노드로 DFS 탐색. 사이클을 찾으면 사이클을 구성하는 정점의 방문 순서를 반환한다.
  GetCycle(start) {
    let visited = []; // 노드의 방문 여부 판단하는 boolean 배열 변수
    let traced = []; // 이미 방문한 정점들을 기록하는 int 배열 변수
    this.foundCycle = false; // 사이클 발견 여부를 알아내는 boolean 변수

    this.vertecies.includes(start) ? this.DFSUtil(start, start, visited, traced) : null;
    return this.foundCycle ? traced : null;
  }

  // 모든 노드를 시작 노드로 DFS 탐색
  GetCycleFromAllVertex() {
    for (let i = 0; i < this.vertecies.length; i++) {
      let result = this.GetCycle(this.vertecies[i]);
      
      console.log(`${this.vertecies[i]}를 시작점으로 하는 사이클: ${result}`);
    }
  }
}

module.exports = Graph;