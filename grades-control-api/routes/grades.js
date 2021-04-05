import express from "express";
import { promises as fs } from "fs";

const { readFile, writeFile } = fs;

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const grade = req.body;

    if (!grade.id || !grade.student || !grade.subject || !grade.type || !grade.value) {
      throw new Error("Todos os campos são obrigatórios");
    }

    const data = JSON.parse(await readFile(fileName));

    grade = {
      id: data.nextId++,
      student: grade.student,
      subject: grade.subject,
      type: grade.type,
      value: grade.value,
      timestamp: new Date()
    }
    data.grades.push(grade);

    await writeFile(fileName, JSON.stringify(data, null, 2));

    res.send(grade);
    logger.info(`POST /grade - ${JSON.stringify(data, null, 2)}`)
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(fileName));
    delete data.nextId;
    res.send(data);
    logger.info("GET /grade");
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(fileName));
    const grade = data.grades.find(
      grade => grade.id === parseInt(req.params.id));
    res.send(grade)
    logger.info("GET /grade/:id");
  } catch (err) {
    next(err);
  }
})

router.put("/", async (req, res, next) => {
  try {
    const grade = req.body;

    if (!grade.id || !grade.student || !grade.subject || !grade.type || !grade.value) {
      throw new Error("Todos os campos são obrigatórios");
    }

    const data = JSON.parse(await readFile(fileName));
    const index = data.grades.findIndex(gdr => gdr.id === grade.id);

    if (index === -1) {
      throw new Error("Registro não encontrado");
    }

    data.grades[index].grade = grade.student,
      data.grades[index].subject = grade.subject;
    data.grades[index].type = grade.type;
    data.grades[index].value = grade.value;

    await writeFile(fileName, JSON.stringify(data, null, 2));

    logger.info(`PUT /grade - ${JSON.stringify(data, null, 2)}`)
    res.send(grade);
  } catch (err) {
    next(err);
  }
})

router.delete("/:id", async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(fileName));
    data.grades = data.grades.filter(
      grade => grade.id !== parseInt(req.params.id));

    await writeFile(fileName, JSON.stringify(data, null, 2));
    res.end();
    logger.info(`DELETE /grade/:id - ${req.params.id}`);
  } catch (err) {
    next(err);
  }
})

router.get("/totalGrade/:student/:subject", async (req, res, next) => {
  try {

    const data = JSON.parse(await readFile(fileName));

    const grade = data.grades.filter(({ student, subject } = student) => {
      return student === req.params.student && subject === req.params.subject;
    });

    const total = grade.reduce((accumulator, current) => {
      return accumulator + current.value;
    }, 0);

    if (!req.params.student || !req.params.subject) {
      throw new Error("Os campos Student e Subject são obrigatórios");
    }

    logger.info(`GET /totalGrade/:student/:subject - ${total}`);
    return res.send({ total: total });
  } catch (err) {
    next(err);
  }
})

router.get("/average/:subject/:type", async (req, res, next) => {
  try {

    const data = JSON.parse(await readFile(fileName));

    const grade = data.grades.filter(({ subject, type } = subject) => {
      return subject === req.params.subject && type === req.params.type;
    });

    const average = grades.reduce((accumulator, current) => {
      return accumulator + current.value;
    }, 0);

    if (!req.params.subject || !req.params.type) {
      throw new Error("Os campos Subject e Type são obrigatórios");
    }

    logger.info(`GET /average/:subject/:type , ${average}`);
    return res.send({ average: average / grade.length });
  } catch (error) {
    next(error);
  }

})

router.get("/best/:subject/:type", async (req, res, next) => {
  try {

    const data = JSON.parse(await readFile(fileName));

    const first = data.grades.filter(({ subject, type } = grade) => {
      return subject === req.params.subject && type === req.params.type;
    })
      .sort((a, b) => b.value - a.value)
      .splice(0, 3);

    if (!req.params.subject || !req.params.type) {
      throw new Error("Os campos Subject e Type são obrigatórios");
    }

    logger.info(`GET /best/:subject/:type - ${first}`);
    return res.send(first);
  } catch (error) {
    next(error);
  }
});


router.use((err, req, res, next) => {
  console.log(`${req.method}` `${req.baseUrl}` `${err.message}`)
  res.status(400).send({ error: err.message });
})

export default router; 