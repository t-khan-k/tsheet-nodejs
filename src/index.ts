import app from './App'

const port = process.env.PORT || 7777;

app.listen(port, (err) => {
  if (err) {
    return console.log(err)
  }

  return console.log(`server is listening on ${port}`)
});
