import styled from "styled-components";
import { Link, useMatch } from "react-router-dom";
import { motion } from "framer-motion"

const Nav = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    top:0;
    font-size: 14px;
    padding: 20px 60px;
    background-color: black;
    color: white;
`;

const Item = styled.li`
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;  
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

const Circle = styled(motion.span)`
    position: absolute;
    width: 5px;
    height: 5px;
    border-radius: 5px;
    bottom: -5px;
    left: 0;
    right: 0;
    margin: 0 auto;
    background-color: ${(props) => props.theme.red};
`;

function Header() {
    const popularMatch = useMatch("/");
    const comingMatch = useMatch("/coming-soon");
    const nowMatch = useMatch("/now-playing");

    return (
        <Nav>
            <Item>
                <Link to="/">
                    POPULAR {popularMatch && <Circle layoutId="circle"/>}
                </Link>
            </Item>
            <Item>
                <Link to="/coming-soon">
                    COMING SOON {comingMatch && <Circle layoutId="circle"/>}
                </Link>
            </Item>
            <Item>
                <Link to="/now-playing">
                    NOW PLAYING {nowMatch && <Circle layoutId="circle"/>}
                </Link>
            </Item>
        </Nav>
    );
}

export default Header;