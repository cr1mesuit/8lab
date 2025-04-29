import React from 'react';
import labContent from '../labContent';
import { useParams } from 'react-router-dom';
import Counter from "./Counter";
import FeedbackForm from "./FeedbackForm";
import FeedbackList from "./FeedbackList";

const Content = () => {
    const { labId } = useParams();
    const selectedLab = labId ? `Лабораторная работа ${labId}` : '';
    return (
        <main style={{ padding: "10px", flexGrow: 1 }}>
            <h2>{selectedLab || "Выберите лабораторную работу"}</h2>
            {selectedLab ? (
                <p>{labContent[selectedLab]}</p>
            ) : null}
            <Counter />
            <FeedbackForm />
            <FeedbackList />
        </main>
    );
};

export default Content;
