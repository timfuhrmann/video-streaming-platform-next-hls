import React, { useRef } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useSlider } from "../../lib/slider";
import { SliderCard } from "../molecule/SliderCard";
import { aspectRatio, Content } from "../../css/content";
import { HeadlineS } from "../../css/typography";

const SliderWrapper = styled.div<{ $hidden: boolean }>`
    overflow: hidden;
    visibility: ${p => p.$hidden && "hidden"};
`;

const SliderContainer = styled.div`
    overflow: visible;
`;

const CardWrapper = styled.a`
    position: relative;
    ${aspectRatio(1.5)};
`;

const CardInner = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

const SliderTitle = styled(HeadlineS)`
    margin-bottom: 0.8rem;
`;

interface BlockBasicSliderProps {
    title?: string;
    movies: Api.Movie[];
}

export const BlockBasicSlider: React.FC<BlockBasicSliderProps> = ({ title, movies }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    const { mounted } = useSlider(containerRef, {
        slidesPerView: 6,
    });

    return (
        <SliderWrapper $hidden={!mounted}>
            <Content>
                {title && <SliderTitle>{title}</SliderTitle>}
                <SliderContainer ref={containerRef} className="keen-slider">
                    {movies.map(movie => (
                        <Link key={movie.id} href={"/watch/" + movie.id} passHref>
                            <CardWrapper className="keen-slider__slide">
                                <CardInner>
                                    <SliderCard {...movie} />
                                </CardInner>
                            </CardWrapper>
                        </Link>
                    ))}
                </SliderContainer>
            </Content>
        </SliderWrapper>
    );
};