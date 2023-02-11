interface SpacerProps {
  size: number;
  axis?: 'horizontal' | 'vertical';
  style?: React.CSSProperties;
}


const Spacer = ({
  size,
  axis,
  style = {},
}: SpacerProps) => {
  const width = axis === 'vertical' ? 1 : size;
  const height = axis === 'horizontal' ? 1 : size;
  return (
    <span
      style={{
        display: 'block',
        width,
        minWidth: width,
        height,
        minHeight: height,
        ...style,
      }}
    />
  );
};

export default Spacer;