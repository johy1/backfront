const Graph = require('./Graph');

const users = [
  {
    id: 0,
    username: '아이즈원팬'
  },
  {
    id: 1,
    username: '잘부탁해요'
  },
  {
    id: 2,
    username: '신규활동자'
  },
  {
    id: 3,
    username: '매운탕에소주'
  },
  {
    id: 4,
    username: 'BTS매니아'
  },
  {
    id: 5,
    username: '광팬'
  },
];

const goods = [
  {
    id: 0,
    title: '장원영'
  },
  {
    id: 1,
    title: '안유진'
  },
  {
    id: 2,
    title: '히토미'
  },
  {
    id: 3,
    title: '사쿠라'
  },
  {
    id: 4,
    title: '나코'
  },
  {
    id: 5,
    title: '김채원'
  },
  {
    id: 6,
    title: '조유리'
  },
  {
    id: 7,
    title: '권은비'
  },
  {
    id: 8,
    title: '김민주'
  },
  {
    id: 9,
    title: '최예나'
  },
  {
    id: 10,
    title: '강혜원'
  },
  {
    id: 11,
    title: '이채연'
  },
];

let trades; // 거래 요청 목록들

// 테스트, 정답 데이터 1
trades = [
  {
    id: 0,
    userId: 2,
    have: 5,
    want: 8,
    time: new Date('2014-6-4')
  },
  {
    id: 1,
    userId: 3,
    have: 10,
    want: 5,
    time: new Date('2014-6-6')
  },
  {
    id: 2,
    userId: 0,
    have: 1,
    want: 2,
    time: new Date('2014-6-7')
  },
  {
    id: 3,
    userId: 4,
    have: 8,
    want: 10,
    time: new Date('2014-6-5')
  },
  {
    id: 4,
    userId: 0,
    have: 4,
    want: 5,
    time: new Date('2014-6-3')
  },
  {
    id: 5,
    userId: 0,
    have: 4,
    want: 5,
    time: new Date('2014-6-3')
  },
  {
    id: 6,
    userId: 0,
    have: 1,
    want: 5,
    time: new Date('2014-6-1')
  },
  {
    id: 7,
    userId: 0,
    have: 11,
    want: 12,
    time: new Date('2014-6-1')
  },
  {
    id: 8,
    userId: 0,
    have: 21,
    want: 22,
    time: new Date('2014-6-1')
  },
  {
    id: 9,
    userId: 1,
    have: 5,
    want: 8,
    time: new Date('2014-5-1')
  },
  {
    id: 10,
    userId: 2,
    have: 5,
    want: 8,
    time: new Date('2017-5-1')
  },
];

function solution() {
  let g = new Graph();

  for (trade of trades) {
    g.addEdge(trade.have, trade.want);
  }
  
  // g.GetCycleFromAllVertex();
  let cycle = g.GetCycle(8);
  console.log("8를 시작으로 하는 사이클은: " + cycle);
  
  let deals = [];
  for (let i = 0; i < cycle.length; i++) {
    let have = cycle[i];
    let want = i === cycle.length - 1 ? cycle[0] : cycle[i + 1]; // 마지막 요소인 경우에는 마지막 요소 -> 첫번째 요소 로 이어져야 함.

    let filtered = trades.filter(trade => trade.have === have && trade.want === want); // DB에 저장된 거래 요청들 중에서 have -> want 인 녀석들만 찾아냄.
    filtered.sort((a, b) => a.time - b.time); // 먼저 등록해놓은 거래 요청부터 처리할 수 있게끔 정렬함.
    deals.push(filtered[0]); // have -> want 거래 중에서 가장 먼저 등록된 거래를 거래 처리 목록 deals에 저장함.

    console.log(`DB에서 have ${have} ->  want ${want} 인 거래들 조회 (등록 일자가 빠른 거래부터 정렬되어있음)`);
    console.log(filtered);
  }

  console.log();
  console.log("매칭 알고리즘의 처리 결과로 아래 거래들끼리 거래 처리를 해주면 된다는 계산이 나왔습니다. ==================");
  console.log(deals);
}

solution();