import React, { useEffect, useState } from 'react';

const FeedbackAdmin = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/feedback')
            .then(res => res.json())
            .then(data => setFeedbacks(data));
    }, []);

    const handleDelete = async (id) => {
        await fetch(`http://localhost:5000/api/feedback/${id}`, { method: 'DELETE' });
        setFeedbacks(feedbacks.filter(f => f.id !== id));
    };

    return (
        <div>
            <h2>Отзывы</h2>
            {feedbacks.length === 0 ? (
                <p>Нет отзывов</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {feedbacks.map((f) => (
                        <li key={f.id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                            <div><strong>{f.name}</strong> ({new Date(f.date).toLocaleString()})</div>
                            <div>{f.message}</div>
                            <button style={{ marginTop: '5px', padding: '5px 10px' }} onClick={() => handleDelete(f.id)}>Удалить</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FeedbackAdmin;
