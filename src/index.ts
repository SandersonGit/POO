import express, { Request, Response } from "express";
import cors from "cors";
import { db } from "./database/knex";
import { Tvideos } from "./types";
import { Videos } from "./models/videos";
import { title } from "process";

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3003, () => {
  console.log(`Servidor rodando na porta ${3003}`);
});

app.get("/ping", async (req: Request, res: Response) => {
  try {
    res.status(200).send({ message: "Pong!" });
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

app.get("/videos", async (req: Request, res: Response) => {
  try {
    const result = await db("videos").select("*");

    const videos = result.map((video) => {
      return new Videos(
        video.id,
        video.title,
        video.duration,
        video.created_at
      );
    });

    console.log(videos);

    res.status(200).send(videos);
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

app.post("/videos", async (req: Request, res: Response) => {
  try {
    const { id, title, duration, created_at } = req.body;

    

    if (typeof id !== "string") {
      res.status(400);
      throw new Error("'id' inválido, deve ser string");
    }

    if (typeof title !== "string") {
      res.status(400);
      throw new Error("'Title' inválido, deve ser string");
    }

    if (typeof duration !== "number") {
      res.status(400);
      throw new Error("'duration' inválido, deve ser string");
    }

   const result = await db.insert({id, title, duration}).into("videos")

   const NewVideos = result.map((video) => {
    return new Videos(
      id,
      title,
      duration,
      created_at
      
    );
  });
    console.log(NewVideos);
    
    res.status(201).send(NewVideos)

  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

app.delete("/videos/:id",async (req: Request, res:Response)=>{
    try {
        
        const id = req.params.id

        

        const [video] = await db("videos").where({id})

        
        if(!video){
            res.status(404)
            throw new Error ("Id não existente!")

        }
        
        

        const videoToDelete = new Videos(
            video.id,
            video.title,
            video.duration,
            video.created_at
          )

          await db("videos").where({id:videoToDelete.getId()}).del()

        
          res.status(200).send("Id deletado com  sucesso")  

        
       
    
      } catch (error) {
        console.log(error);
    
        if (req.statusCode === 200) {
          res.status(500);
        }
    
        if (error instanceof Error) {
          res.send(error.message);
        } else {
          res.send("Erro inesperado");
        }
      }
})

app.put("/videos/:id", async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const { title, duration } = req.body;
  
      if (title && typeof title !== "string") {
        res.status(400);
        throw new Error("'Title' inválido, deve ser string");
      }
  


      if (duration && typeof duration !== "number") {
        res.status(400);
        throw new Error("'duration' inválido, deve ser um number");
      }
  
      const [video] = await db("videos").where({ id });
  
      if (!video) {
        res.status(404);
        throw new Error("ID não encontrado!");
      }
  
      const updatedVideo = {
        id: video.id,
        title: title || video.title,
        duration: duration || video.duration,
        created_at: video.created_at,
      };
  
      await db("videos").where({ id }).update(updatedVideo);
  
      const updatedVideos = new Videos(
        updatedVideo.id,
        updatedVideo.title,
        updatedVideo.duration,
        updatedVideo.created_at
      );
  
      res.status(200).send(updatedVideos);

    } catch (error) {
      console.log(error);
  
      if (req.statusCode === 200) {
        res.status(500);
      }
  
      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  });
  