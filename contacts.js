const fs = require('fs/promises');
const path = require('path')
const shortid = require('shortid');

const contactsPath = path.join(__dirname, `db/contacts.json`)


async function listContacts() {

    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data)

    console.log('End of listContacts()');

    return contacts
}

async function getContactById(contactId) {

    const contacts = await listContacts()

    const contactsRequired = contacts.filter(({ id }) => {
        return id === contactId
    })

    console.log('End of getContactById()');

    if (!contactsRequired) return null

    return contactsRequired
}

async function removeContact(contactId) {
    const contacts = await listContacts()


    const newContacts = contacts.filter(({ id }) => {
        return id != contactId
    })

    if (newContacts.length === contacts.length) {
        console.log("Contact not find");
        return null

    } else {
        console.log("Contact removed");
        updateContacts(newContacts)

        return newContacts
    }
}

async function updateContacts(newContacts) {

    await fs.writeFile(contactsPath, JSON.stringify(newContacts))

}

async function addContact({ name = "", email = "", phone = "" }) {
    const id = shortid.generate()

    const contacts = await listContacts()

    contacts.push({ id, name, email, phone })
    updateContacts(contacts)

    return contacts
}


module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}