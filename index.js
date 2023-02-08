const argv = require("yargs").argv;

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const list = await listContacts();
      console.log("Contacts:", list);
      break;

    case "get":
      const contactById = await getContactById(id);
      console.log("contactById:", contactById);
      break;

    case "add":
      addContact(name, email, phone);

      break;

    case "remove":
      removeContact(id);

      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
