import OpenAI from 'openai';
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey : process.env.OPEN_API_KEY
});

app.get('/ping', (req,res)=>{
  res.send('pong') ;
})

app.post("/chat", async (req, res) => {
  const question = req.body.question;
console.log(question) ;
  const stream = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: question }],
    stream: true,
    max_tokens:50
  },{})

  let s = "";
  for await (const chunk of stream) {
    s += chunk.choices[0]?.delta?.content || ''
  }

  res.json({ans:s})
});

const PORT = process.env.PORT || 3000 ;

app.listen(PORT, () => {
  console.log("Server is listening on port 3000");
});