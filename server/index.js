import express from 'express'
import cors from 'cors'
import bodyParser from "body-parser"
import env from 'dotenv'
import { Configuration,OpenAIApi } from "openai"

const app = express();

env.config();

app.use(cors())
app.use(bodyParser.json());

const configuration = new Configuration({
    organization : "org-96Nb5jbp42jb0ub5GLcTusy6",
    apiKey : process.env.API_KEY
})

const openai = new OpenAIApi(configuration);

const PORT = 3080;

app.listen(PORT,(req,res)=>{
    console.log('server is running on port..',PORT);
})

app.get('/',(req,res)=>{
    res.send("Hello world..... ")
})

app.post('/',async (req,res)=>{
const {message} = req.body 

try {
    const response = await openai.createCompletion({
        model : "text-davinci-003",
        prompt : `${message}`,
        max_tokens : 100,
        temperature : .5

    })

    res.json({message:response.data.choices[0].text})


} catch (error) {
    console.log(error);
    res.send(e).status(400)
}

})







