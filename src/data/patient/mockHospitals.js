//  지금은 프론트에서만 쓰는 임시 데이터
//  메인에 있는 빠른 병원 찾기에서 사용중
//    나중에 Spring에서 DB/오픈API로 가져오면 이 파일은 삭제하거나 무시해도 됨

const mockHospitals = [
  {
    id: 1,
    name: "서울대학교병원",
    departments: ["내과", "외과", "소아과"],
    address: "서울시 종로구 대학로 101",
    phone: "02-2072-2114",
    hours: "평일 09:00 - 18:00",
    distance: "0.5km",
    rating: 4.8,
  },
  {
    id: 2,
    name: "연세세브란스병원",
    departments: ["외과", "정형외과", "내과"],
    address: "서울시 서대문구 연세로 50-1",
    phone: "02-2228-5800",
    hours: "평일 08:30 - 17:30",
    distance: "1.2km",
    rating: 4.7,
  },
  {
    id: 3,
    name: "삼성서울병원",
    departments: ["내과", "외과", "안과"],
    address: "서울시 강남구 일원로 81",
    phone: "02-3410-2114",
    hours: "평일 09:00 - 18:00",
    distance: "2.3km",
    rating: 4.9,
  },
  {
    id: 4,
    name: "아산정형외과",
    departments: ["정형외과"],
    address: "서울시 송파구 올림픽로 43길",
    phone: "02-3010-3114",
    hours: "평일 09:00 - 20:00",
    distance: "0.8km",
    rating: 4.6,
  },
  {
    id: 5,
    name: "아름다운피부과",
    departments: ["피부과"],
    address: "서울시 강남구 테헤란로 123",
    phone: "02-555-1234",
    hours: "평일 09:00 - 18:00",
    distance: "1.5km",
    rating: 4.5,
  },
  {
    id: 6,
    name: "키즈소아과의원",
    departments: ["소아과"],
    address: "서울시 마포구 월드컵로 45",
    phone: "02-333-5678",
    hours: "평일 09:00 - 18:00",
    distance: "0.9km",
    rating: 4.7,
  },
];

export default mockHospitals;
