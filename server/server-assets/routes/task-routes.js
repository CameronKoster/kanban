let router = require('express').Router()
let Tasks = require('../models/task')

//GET
router.get('/', (req, res, next) => {
  Tasks.find({ authorId: req.session.uid })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})


//POST
router.post('/', (req, res, next) => {
  req.body.authorId = req.session.uid
  req.body.name = req.session.name
  Tasks.create(req.body)
    .then(newList => {
      res.send(newList)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})


//tasks/:taskId/comments
router.post('/:taskId/comments', (req, res, next) => {
  let newComment = {
    authorId: req.session.uid,
    name: req.session.name,
    description: req.body.description
  }
  Tasks.findOneAndUpdate({ _id: req.params.taskId, authorId: req.session.uid }, { $push: { 'comments': newComment } }, { new: true })
    .then(task => {
      res.send(task)
    })
    .catch(err => {
      console.log(err)
      next(err)
    })

  // Tasks.findById(req.params.taskId)
  //   .then(task => {
  //     
  //     task.comments.push(newComment)
  //     task.save(err => {
  //       if (err) {
  //         return next(err)
  //       }
  //       res.send('added succesful comment')
  //     })
  //   })
  //   .catch(err => {
  //     console.log(err)
  //     next()
  //   })
})

//PUT
router.put('/:id', (req, res, next) => {
  Tasks.findById(req.params.id)
    .then(list => {
      if (!list.authorId.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED!")
      }
      list.update(req.body, (err) => {
        if (err) {
          console.log(err)
          next()
          return
        }
        res.send("Successfully Updated")
      });
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//DELETE
router.delete('/:id', (req, res, next) => {
  Tasks.findById(req.params.id)
    .then(list => {
      if (!list.authorId.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED!")
      }
      list.remove(err => {
        if (err) {
          console.log(err)
          next()
          return
        }
        res.send("Successfully Deleted")
      });
    })
})

router.delete('/:taskId/comments/:commentId', (req, res, next) => {
  Tasks.findById({ _id: req.params.taskId, authorId: req.session.uid })
    .then(task => {
      let comment = task.comments.id(req.params.commentId)
      if (comment) {
        comment.remove()
      }
      task.save(err => {
        if (err) {
          return next(err)
        }
        res.send({ message: "comment deleted" })
      })
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
})
module.exports = router