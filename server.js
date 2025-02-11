import express from 'express';
import { createClient } from '@supabase/supabase-js';
import path from 'path';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('dist'));

const supabaseUrl = 'https://zizekiouuwzpgvpmqjxy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppemVraW91dXd6cGd2cG1xanh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkzMDAxODMsImV4cCI6MjA1NDg3NjE4M30.c9SmfhjQeQQuAIk1q7b-59vpUY3QrqjpEk2DNlzt7Vc';
const supabase = createClient(supabaseUrl, supabaseKey);

async function initializeDatabase() {
  try {
    const { data, error } = await supabase
      .from('rules')
      .select('*');

    if (error) {
      console.error('Error fetching initial rules:', error);
      return;
    }

    if (data.length === 0) {
      const initialRules = {
        main: 'قوانین اصلی سرور GameLandMC در اینجا قرار می‌گیرد...',
        job: 'قوانین مربوط به شغل‌های سرور در اینجا قرار می‌گیرد...',
        robbery: 'قوانین مربوط به رابری در سرور در اینجا قرار می‌گیرد...',
        gang: 'قوانین مربوط به گنگ‌ها در سرور در اینجا قرار می‌گیرد...'
      };

      for (const name in initialRules) {
        const { error } = await supabase
          .from('rules')
          .insert([{ name: name, content: initialRules[name] }]);

        if (error) {
          console.error('Error inserting initial rule:', name, error);
        }
      }
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

initializeDatabase();

app.get('/rules.json', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('rules')
      .select('*')

    if (error) {
      console.error('Error fetching rules:', error);
      return res.status(500).json({ message: 'Failed to fetch rules' });
    }

    const rules = {};
    data.forEach(row => {
      rules[row.name] = row.content;
    });
    res.json(rules);
  } catch (error) {
    console.error('Error fetching rules:', error);
    res.status(500).json({ message: 'Failed to fetch rules' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve('dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
