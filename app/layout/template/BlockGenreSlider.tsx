import React, { useEffect } from "react";
import { BlockBasicSlider } from "../organism/BlockBasicSlider";
import { useDispatch, useSelector } from "react-redux";
import { fetchGenre } from "../../lib/redux/reducer/genre";
import { RootState } from "../../lib/redux";

export const BlockGenreSlider: React.FC<Api.Genre> = ({ id, name }) => {
    const dispatch = useDispatch();
    const { genreResults } = useSelector((state: RootState) => state.genre);

    const movies = genreResults[id];

    useEffect(() => {
        dispatch(fetchGenre({ id }));
    }, []);

    if (!movies) return null;

    return <BlockBasicSlider title={name} movies={movies} />;
};