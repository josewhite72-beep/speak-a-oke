export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text } = req.body;
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Missing text' });
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        max_tokens: 1000,
        messages: [
          {
            role: 'system',
            content: 'You are a translator. Translate English to Spanish (Latin American). Return ONLY the translation, no explanations, no quotes.'
          },
          {
            role: 'user',
            content: text
          }
        ]
      })
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(response.status).json({ error: 'DeepSeek error: ' + err });
    }

    const data = await response.json();
    const translation = data.choices?.[0]?.message?.content || '';
    return res.status(200).json({ translation });

  } catch (err) {
    return res.status(500).json({ error: 'Server error: ' + err.message });
  }
}
