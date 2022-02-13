import styled from "styled-components";

const base = 4;
const red = "crimson";

const Colors = styled.div`
  display: flex;
`;

const Color = styled.div`
  width: ${8 * base}px;
  height: ${8 * base}px;
  border-radius: 50%;
  border: ${base}px solid ${(props: { color: string }) => props.color};
  box-sizing: border-box;

  &:not(:last-child) {
    margin-right: ${base}px;
  }

  &:hover {
    cursor: pointer;
  }

  ${(props: { selected: boolean; color: string }) =>
    props.selected && `background: ${props.color};`}
`;

const ErrorMessage = styled.div`
  line-height: 15px;
  margin: 0;
  color: ${red};
  font-size: 14px;
  height: 15px;
`;

const colors = ["#7f87b2", "#83b2d0", "#95dab6", "#f2e6b1", "#dc8580"];

type Props = {
  value: string | null;
  onChange: (color: string) => void;
  error: string | null;
};

function ColorPicker({ value, onChange, error }: Props) {
  return (
    <>
      <Colors>
        {colors.map((color) => (
          <Color
            color={color}
            key={color}
            onClick={() => onChange(color)}
            selected={color === value}
          />
        ))}
      </Colors>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </>
  );
}

export default ColorPicker;
