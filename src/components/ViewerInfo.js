import React from "react";
import { observer } from "mobx-react";
import FaEye from "react-icons/lib/fa/eye";
import FaUser from "react-icons/lib/fa/user";
import FaHeart from "react-icons/lib/fa/heart";
import styled from "styled-components";

const BREAKPOINT_TINY = "530px";
const BREAKPOINT_WIDE = "1000px";

const headerSizePx = 80;
const headerSize = `${headerSizePx}px`;
const spacing = "20px";

const User = styled(FaUser)`
  color: black;
  padding: 0 4px;
`;
const Heart = styled(FaHeart)`
  color: #ff0080;
  padding: 0 4px;
`;
const Eye = styled(FaEye)`
  color: black;
  padding: 0 4px;
`;
const GreyText = styled.span`color: grey`;
const WhiteText = styled.span`color: #ecf0f1`;

const ViewContainer = styled.div`
  margin: 0 ${spacing};
  float: right;
  display: flex;

  flex-direction: column;
  line-height: ${headerSizePx / 3}px;
  @media (min-width: ${BREAKPOINT_WIDE}) {
    & {
      flex-direction: row;
      line-height: ${headerSize};
    }
  }
  @media (max-width: ${BREAKPOINT_TINY}) {
    & {
      display: none;
    }
  }
`;

const Grouping = styled.div`
  @media (min-width: ${BREAKPOINT_WIDE}) {
    margin-left: 12px;
  }
`;

export default observer(({ store: { channelViewInfo, channel } }) => {
  if (channelViewInfo && channel && channelViewInfo[channel]) {
    return (
      <ViewContainer>
        <Grouping>
          <User />
          <WhiteText>{channelViewInfo[channel].viewers}</WhiteText>
        </Grouping>
        <Grouping>
          <Heart />
          <GreyText>{channelViewInfo[channel].followers}</GreyText>
        </Grouping>
        <Grouping>
          <Eye />
          <GreyText>{channelViewInfo[channel].views}</GreyText>
        </Grouping>
      </ViewContainer>
    );
  }
  return null;
});
