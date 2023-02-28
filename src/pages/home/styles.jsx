import styled from "styled-components";
export const HomeContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3.7rem;
`;
export const CardContainer = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
export const Card = styled.div`
  display: flex;
  background: ${(props) => props.theme["violet-200"]};
  flex-direction: column;
  gap: 2rem 0;
  padding: 3rem 1.8rem;
  h2 {
    font-size: 1.5rem;
    font-weight: 600;
  }
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  width: ${(props) => props.width};
  height: ${(props) => (props.height ? props.height : "50px")};
`;
const cardVariants = {
  success: "#81FBB8",
};
export const CardBody = styled.div`
  height: 197px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  display: flex;
  h3 {
    color: ${(props) => props.theme["green"]};
  }
`;
export const Subtitles = styled.span`
  small {
    font-size: 0.875rem;
  }
  display: flex;
  gap: 0.625rem;
  align-items: center;
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

export const SummaryContainer = styled.div`
  width: 70rem;
  background: ${(props) => props.theme["violet-200"]};
  display: flex;
  padding: 1.813rem 3rem;
  border-radius: 1rem;
`;

export const SummaryResults = styled.div`
  display: flex;
  flex-direction: column;
`;
