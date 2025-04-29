import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addReview, setReviews } from "../redux/feedbackSlice";

const FeedbackList = () => {
    const reviews = useSelector((state) => state.feedback.reviews);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/feedback');
                const data = await response.json();
                dispatch(setReviews(data));
            } catch (error) {
                console.error('Error fetching feedbacks:', error);
            }
        };

        fetchFeedbacks();
    }, [dispatch]);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/feedback/${id}`, {
                method: 'DELETE',
            });

            const result = await response.json();

            if (result.success) {
                // Обновляем список после удаления
                const updatedResponse = await fetch('http://localhost:5000/api/feedback');
                const updatedData = await updatedResponse.json();
                dispatch(setReviews(updatedData));
            }
        } catch (error) {
            console.error('Error deleting feedback:', error);
        }
    };

    return (
        <div style={{ marginTop: "30px" }}>
            <h2>Отзывы</h2>
            {reviews.length === 0 ? (
                <p>Нет отзывов</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {reviews.map((review) => (
                        <li key={review.id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
                            <div>
                                <strong>{review.name}</strong> ({new Date(review.date).toLocaleString()})
                            </div>
                            <div>{review.message}</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FeedbackList;