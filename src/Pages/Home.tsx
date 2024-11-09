import styled from "styled-components";
import { useQuery } from "react-query";
import { getPopular, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";
import { motion, AnimatePresence } from "framer-motion";
import {useMatch, PathMatch, useNavigate} from "react-router-dom";

const Wrapper = styled.div`
    height: 100%;
`;

const Loader = styled.div`
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Row = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    position: absolute;
    place-items: center;
    width: 100%;
`;

const Box = styled.div`
    display: flex;
    flex-direction: column;
`;

const Poster = styled(motion.div)<{ bgPhoto: string }>`
    background-color: white;
    background-image: url(${props => props.bgPhoto});
    background-size: cover;
    background-position: center;
    height: 200px;
    width: 150px;
    cursor: pointer;
    border-radius: 15px;
    &:first-child {
        transform-origin: center left;
    }
    &:last-child {
        transform-origin: center right;
    }
`;



const Title = styled.h2`
    color: white;
    width: 150px;
`;

const Overlay = styled(motion.div)`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;

function Home() {
    const { data, isLoading } = useQuery<IGetMoviesResult>(["movies", "popular"], getPopular);
    const popularMatch: PathMatch<string> | null = useMatch("/popular/:id");
    const navigate = useNavigate();

    const onBoxClicked = (movieId: number) => {
        navigate(`/popular/${movieId}`);
    };

    const clickedMovie = popularMatch?.params.id &&
        data?.results.find((movie) => movie.id === +popularMatch.params.id!);

    return (
        <>
            <Wrapper>{isLoading ? <Loader>Loading...</Loader>:
                <>
                    <Row>
                          {data?.results.map((movie) => (
                        <Box>
                            <Poster
                                onClick={() => onBoxClicked(movie.id)}
                                bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                            ></Poster>
                            <Title>{movie.title}</Title>
                        </Box>
                    ))}
                    </Row>
                </>
            }
            <AnimatePresence>
                {popularMatch ? (
                    <>
                        <Overlay
                            exit={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        />
                        <BigMovie
                            layoutId={popularMatch.params.movieId}
                        >
                            {clickedMovie && (
                                <>
                                    <BigCover
                                        style={{
                                            backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                                                clickedMovie.backdrop_path,
                                                "w500"
                                            )})`,
                                        }}
                                    />
                                    <BigTitle>{clickedMovie.title}</BigTitle>
                                    <BigOverview>{clickedMovie.overview}</BigOverview>
                                </>
                            )}
                        </BigMovie>
                    </>
                ):null}
            </AnimatePresence>
            </Wrapper>
        </>
    );
}

export default Home;