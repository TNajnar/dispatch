interface ILine {
  id?: string;
  nameLine?: string;
}

const Line = ({ id, nameLine }: ILine) => {
  return <div>{nameLine}</div>;
};

export default Line;
