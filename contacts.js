const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.resolve("./db/contacts.json");
const { uid } = require("uid");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(id) {
  try {
    const contacts = await listContacts();

    if (contacts.every((contact) => contact.id !== id.toString())) {
      return console.log(`Contact with id:${id} was not found!`);
    }

    const contactById = contacts.find(
      (contact) => contact.id === id.toString()
    );

    return console.log("contactById: ", contactById);
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(id) {
  try {
    const contacts = await listContacts();
    const filteredContacts = contacts.filter(
      (contact) => contact.id !== id.toString()
    );

    // if (contacts.length === filteredContacts.length) {
    //   return console.log(`Contact with id:${id} was not found!`);
    // }

    if (contacts.every((contact) => contact.id !== id.toString()))
      return console.log(`Contact with id:${id} was not found!`);

    await fs.writeFile(
      contactsPath,
      JSON.stringify(filteredContacts),
      (err) => {
        if (err) console.log(err);
      }
    );
    console.log(`Contact with id:${id} has been removed!`);
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: uid().toString(),
      name,
      email,
      phone,
    };

    const newContactArr = [...contacts, newContact];

    fs.writeFile(contactsPath, JSON.stringify(newContactArr), (err) => {
      if (err) console.log(err);
    });
    console.log(`New contact with name:${newContact.name} has been added!`);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
