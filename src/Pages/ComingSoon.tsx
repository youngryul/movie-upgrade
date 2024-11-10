import styled from "styled-components";
import { useQuery } from "react-query";
import {getComing, getPopular, IGetMoviesResult} from "../api";
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

const Box = styled(motion.div)`
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

const Close = styled.svg`
    position: relative;
    width: 20px;
    height: 20px;
    left: 350px;
    top: 10px;
`;

const boxVar = {
    show: {
        y: 20,
        opacity: 0
    },
    hide: (index:number) => ({
        y: 0,
        opacity: 1,
        transition: {
            delay: index * 0.2,
            duration: 0.5
        }
    }),
    hover: {
        scale: 1.2
    }
}


function ComingSoon() {
    const { data, isLoading } = useQuery<IGetMoviesResult>(["movies", "coming"], getComing);
    const popularMatch: PathMatch<string> | null = useMatch("/coming/:id");
    const navigate = useNavigate();

    const onBoxClicked = (movieId: number) => {
        navigate(`/coming/${movieId}`);
    };

    const clickedMovie = popularMatch?.params.id &&
        data?.results.find((movie) => movie.id === +popularMatch.params.id!);

    const onClose = () => navigate("/coming-soon");

    return (
        <>
            <Wrapper>{isLoading ? <Loader>Loading...</Loader>:
                <>
                    <Row>
                        {data?.results.map((movie, index) => (
                            <Box
                                custom={index}
                                variants={boxVar}
                                initial="show"
                                animate="hide"
                                whileHover="hover"
                                layoutId={movie.id+""}
                                key={movie.id}
                            >
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
                                layoutId={popularMatch.params.id}
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
                                        >
                                            <Close
                                                onClick={onClose}
                                                data-slot="icon" fill="currentColor" viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path clip-rule="evenodd" fill-rule="evenodd"
                                                      d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z"></path>
                                            </Close>
                                        </BigCover>
                                        <BigTitle>{clickedMovie.title}</BigTitle>
                                        <BigOverview>{clickedMovie.overview}</BigOverview>
                                    </>
                                )}
                            </BigMovie>
                        </>
                    ) : null}
                </AnimatePresence>
            </Wrapper>
        </>
    );
}

export default ComingSoon;