import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { autorun } from "mobx";
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

@observer
export default class ViewerInfo extends React.Component {
  static contextTypes = {
    store: PropTypes.object
  };

  constructor() {
    super();

    this.state = {
      views: 0,
      followers: 0,
      viewers: 0
    };

    this.fetchInformation = this.fetchInformation.bind(this);
  }

  componentDidMount() {
    autorun(this.fetchInformation);
    setInterval(this.fetchInformation, 10000);
  }

  fetchInformation() {
    const { store: { channel, setOffline } } = this.context;
    const config = {
      headers: {
        "Client-ID": "gc6rul66vivvwv6qwj98v529l9mpyo"
      }
    };

    console.log("Fetching channel view info for", channel);

    fetch(`https://api.twitch.tv/kraken/streams/${channel}`, config)
      .then(res => res.json())
      .then(results => {
        if (results.stream)
          this.setState({
            viewers: results.stream.viewers,
            followers: results.stream.channel.followers,
            views: results.stream.channel.views
          });
        else {
          console.warn("It appears the current channel has gone offline");
          setOffline(channel);
        }
      })
      .catch(err =>
        console.error(
          "An error occurred during fetching channel viewer info",
          err
        )
      );
  }

  render() {
    const { views, viewers, followers } = this.state;

    return (
      <ViewContainer>
        <Grouping>
          <User />
          <WhiteText>{viewers}</WhiteText>
        </Grouping>
        <Grouping>
          <Heart />
          <GreyText>{followers}</GreyText>
        </Grouping>
        <Grouping>
          <Eye />
          <GreyText>{views}</GreyText>
        </Grouping>
      </ViewContainer>
    );
  }
}
