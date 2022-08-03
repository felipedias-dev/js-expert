class User {
  constructor({ id, name, profession, age }) {
    this.id = +id;
    this.name = name;
    this.profession = profession;
    this.age = +age;
  }
}

module.exports = User;