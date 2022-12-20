const { readFile, writeFile } = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const contact = await readFile(contactsPath, "utf-8");
    return JSON.parse(contact);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  return await contacts.find((contact) => contact.id === contactId);
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const i = contacts.findIndex((contact) => contact.id === contactId);
  const res = contacts.splice(i, 1);

  await writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
  return res;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = contacts.push({ name, email, phone, id: uuidv4() });
  await writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
