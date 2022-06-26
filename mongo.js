const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.hyxmreu.mongodb.net/phonebook?retryWrites=true&w=majority`


if (process.argv.length === 5) {
  mongoose
    .connect(url)
    .then((result) => {
      const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
      })

      return person.save()
    })
    .then(() => {
      console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
      return mongoose.connection.close()
    })
    .catch((err) => console.log(err))
}

if (process.argv.length === 3) {
  console.log('phonebook')
  mongoose
    .connect(url)
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
    .catch((err) => console.log(err))
}