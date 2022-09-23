export type RoomsDataType = {
  name: string;
  id: string;
  imgUrl: string;
  activeInRoom: number;
};

export const roomsData: Array<RoomsDataType> = [
  {
    name: "Wariaci React",
    id: Math.random().toString().slice(2),
    imgUrl:
      "https://media.istockphoto.com/id/531734121/pl/zdj%C4%99cie/ogie%C5%84-na-czarnym-tle-litera.webp?s=612x612&w=is&k=20&c=HD2iHAoA047GF7CFUtLzFTxiccIokAZkQWHcBXG6_ig=",
    activeInRoom: 13,
  },
  {
    name: "Eksperci JS",
    id: Math.random().toString().slice(2),
    imgUrl:
      "https://media.istockphoto.com/vectors/yellow-lines-geometric-vector-logo-letter-j-vector-id1171091309",
    activeInRoom: 22,
  },
  {
    name: "Miłośnicy ExpressJS",
    id: Math.random().toString().slice(2),
    imgUrl:
      "https://media.istockphoto.com/vectors/letter-e-vector-design-template-vector-id1181190850",
    activeInRoom: 19,
  },
];
