const express = require('express');
const router = express.Router();


//Models

const Movie = require('../models/Movie');

router.get('/',(req,res)=>{
  const promise = Movie.find({ });
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  })
})

router.get('/top10',(req,res)=>{
  const promise = Movie.find({ }).limit(10).sort({imdb_score:-1});
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  })
})

router.post('/', (req, res, next)=> {
  //const {title,category,country,year,imbd_score} = req.body;

  const movie = new Movie(req.body);
  // movie.save((err,data)=>{
  //   if(err)
  //     res.json(err);
  //   res.json(data);
  // });

  const promise = movie.save();
  promise.then((data)=>{
    res.json({status:1})
  })
  .catch((err)=>{
    res.json(err);
  })

});


router.get('/:movie_id',(req,res,next) =>{
  const promise = Movie.findById(req.params.movie_id);
  promise.then((movie)=>{
    if(!movie)
      next({message:"The movie was not found",code:1})
      else{
        res.json(movie);
      }
    
  });

});


router.put('/:movie_id',(req,res,next) =>{
  const promise = Movie.findByIdAndUpdate(
    req.params.movie_id,
    req.body,
    {
      new:true
    }
    );
  promise.then((movie)=>{
    if(!movie)
      next({message:"The movie was not found",code:1})
      else{
        res.json(movie);
      }
    
  });

});


router.delete('/:movie_id',(req,res,next) =>{
  const promise = Movie.findByIdAndRemove(req.params.movie_id);
  promise.then((movie)=>{
    if(!movie)
      next({message:"The movie was not found",code:1})
      else{
        res.json({status:1});
      }
    
  });

});

module.exports = router;
