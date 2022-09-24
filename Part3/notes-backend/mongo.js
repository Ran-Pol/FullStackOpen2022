const mongoose = require('mongoose')

if (process.argv.length < 4) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  )
  process.exit(1)
}

const username = process.argv[2]
const password = process.argv[3]

console.log(password, username)

const url = `mongodb+srv://${username}:${password}@cluster0.p4jcd5f.mongodb.net/noteApp?retryWrites=true&w=majority`

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

mongoose
  .connect(url)
  .then(() => {
    console.log('connected')

    // const note = new Note({
    //   content: "HTML is Easy",
    //   date: new Date(),
    //   important: true,
    // });

    // return note.save();
    Note.find({}).then((result) => {
      result.forEach((note) => {
        console.log(note)
      })
      mongoose.connection.close()
    })
  })
  .then(() => {
    // console.log("note saved!");
    // return mongoose.connection.close();
  })
  .catch((err) => console.log(err))
