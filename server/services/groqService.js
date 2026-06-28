const Groq = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const analyzeCode = async (code, language) => {
  const prompt = `
You are an expert code reviewer. Analyze the following ${language} code and respond ONLY with a valid JSON object. No explanation, no markdown, no backticks.

Code to review:
\`\`\`${language}
${code}
\`\`\`

Respond with exactly this JSON structure:
{
  "bugs": ["bug1", "bug2"],
  "suggestions": ["suggestion1", "suggestion2"],
  "complexity": "Low | Medium | High",
  "score": <number between 0 and 100>,
  "summary": "One sentence overall summary"
}
`;

  const response = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.3,
  });

  const raw = response.choices[0].message.content.trim();

  const cleaned = raw.replace(/```json|```/g, '').trim();

  const result = JSON.parse(cleaned);
  return result;
};

module.exports = { analyzeCode };