const contactsOperations = require('./contacts');
const fs = require('fs/promises');
const path = require('path')
const { program } = require('commander')

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':
            const contacts = await contactsOperations.listContacts()
            console.table(contacts);

            break;

        case 'get':
            const contact = await contactsOperations.getContactById(id);
            console.log(contact);

            break;

        case 'add':
            // ... name email phone
            const addResult = await contactsOperations.addContact({ name, email, phone })
            console.log(addResult);

            break;

        case 'remove':
            const removeResult = await contactsOperations.removeContact(id);
            console.log(removeResult);

            break;

        default:
            console.warn('\x1B[31m Unknown action type!');
    }
}

program
    .option('-a, --action <type>', 'action')
    .option('-i, --id <type>', 'id')
    .option('-n, --name <type>', 'name')
    .option('-e, --email <type>', 'email')
    .option('-p, --phone <type>', 'phone')

program.parse(process.argv)

const options = program.opts()

invokeAction(options)

