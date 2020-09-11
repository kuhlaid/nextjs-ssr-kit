import styled from "styled-components";

const Flex = styled.div<{
  direction?: string;
  justify?: string;
  wrap?: boolean;
  width?: string;
}>`
  flex-direction: ${({ direction }) => direction || "row"};
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width || "100%"};
  flex-wrap: ${({ wrap }) => (wrap ? "wrap" : "nowrap")};
  justify-content: ${({ justify }) => justify || "start"};
`;

export default Flex;
