import BasicThreadList from "../components/BasicThreadList";
import React from "react";
import { Helmet } from "react-helmet";

const Home: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <h3>{"Welcome to LiveNUS! Here's a basic list of forum threads for you to experiment with."}</h3>
            <br />
            <BasicThreadList />
        </>
    );
};

export default Home;
