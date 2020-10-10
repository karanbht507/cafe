const express = require('express');
require('./db/mongoose');
const Cafe = require('./models/cafe');

const app = express();
const port = 3001;

app.use(express.json());

app.get('/', (req,res) => {
  res.send({ title: "Welcome to cafes" })
})

app.get('/cafes', (req,res) => {
  Cafe.find({}).then((users) => {
    res.send(users)
  }).catch(err => {
    res.status(400).send(err)
  })
})

app.get('/cafe/:id', (req, res) => {
  const _id = req.params.id;
  Cafe.findById(_id).then(cafe => {
    if(!cafe) {
      return res.status(404).send()
    }
    res.send(cafe)
  }).catch(err => {
    res.status(400).send(err)
  })
})

app.post('/create', (req, res) => {
  var name = req.body.name;
  Cafe.findOne({ name }, (err, item) => {
    if(err) return console.log(err);
    if(item) {
      res.status(400).send('Bad request');
    } else {
      const cafe = new Cafe(req.body);
      cafe.save().then(() => {
        return res.status(201).send(cafe);
      }).catch(err => {
        res.status(400).send(err)
      })
    }
  })
})

app.put('/cafe/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "description", "address", "costForTwo", "rating", "location"];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));
  if(!isValidOperation) {
    return res.status(400).send('invalid updates')
  }
  try {
    const cafe = await Cafe.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if(!cafe) {
      return res.status(404).send();
    }
    res.status(200).send(cafe);
  } catch(e) {
    res.status(400).send(e)
  }
})

app.delete('/cafe/:id', async(req, res) => {
  const _id = req.params.id;
  try {
    const cafe = await Cafe.findByIdAndDelete(_id);
    if(cafe) return res.status(200).send(user)
    res.status(404).send();
  } catch (error) {
    res.status(400).send(error)
  }
})

app.listen(port, () => {
  console.log('server listening on ', port)
})