import app from './app.js';
import './database/index.js';

app.listen(3001, () => {
  console.log('Aplication is running on port 3001');
});
