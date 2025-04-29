const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;


app.use(cors());
app.use(bodyParser.json());

// database
let users = [
    { id: 1, name: 'Admin', email: 'admin@example.com', username: 'admin', password: 'admin', role: 'admin' }
];

let feedbacks = [];

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        res.json({ success: true, user: { id: user.id, name: user.name, email: user.email, username: user.username, role: user.role } });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

app.post('/api/register', (req, res) => {
    const { username, password, name, email } = req.body;

    const userExists = users.some(u => u.username === username);

    if (userExists) {
        return res.status(400).json({ success: false, message: 'Username already taken' });
    }

    const newUser = {
        id: users.length + 1,
        username,
        password,
        name: name || username,
        email: email || `${username}@example.com`,
        role: 'user'
    };

    users.push(newUser);
    res.json({
        success: true,
        user: {
            id: newUser.id,
            username: newUser.username,
            name: newUser.name,
            email: newUser.email
        }
    });
});

app.get('/api/users', (req, res) => {
    res.json(users);
});

app.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    users = users.filter(u => u.id !== parseInt(id));
    res.json({ success: true });
});

app.put('/api/users/:id/block', (req, res) => {
    const { id } = req.params;
    const user = users.find(u => u.id === parseInt(id));
    if (user) {
        user.role = 'blocked';
        res.json({ success: true, user });
    } else {
        res.status(404).json({ success: false });
    }
});

app.put('/api/profile/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    const userIndex = users.findIndex(u => u.id === parseInt(id));

    if (userIndex === -1) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    users[userIndex] = { ...users[userIndex], name, email };
    res.json({ success: true, user: users[userIndex] });
});


app.get('/api/feedback', (req, res) => {
    res.json(feedbacks);
});

app.post('/api/feedback', (req, res) => {
    const { name, message } = req.body;
    const newFeedback = {
        id: feedbacks.length + 1,
        name,
        message,
        date: new Date().toISOString()
    };

    feedbacks.push(newFeedback);
    res.json({ success: true, feedback: newFeedback });
});

app.delete('/api/feedback/:id', (req, res) => {
    const { id } = req.params;
    feedbacks = feedbacks.filter(f => f.id !== parseInt(id));
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});