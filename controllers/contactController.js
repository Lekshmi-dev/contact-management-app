const asyncHandler = require("express-async-handler");
const Contacts = require("../models/contactModel");


//@desc Get All Contacts
//@route GET /api/contacts
//@access private
const getContacts = async (req, res) => {
    const contact = await Contacts.find({ user_id: req.user.id });
    res.status(200).json(contact);
}
//@desc Create new Contacts
//@route GET /api/contacts
// @access private
const createContact = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory");

    }
    const contact = await Contacts.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });
    res.status(201).json({ contact });
});
//@desc get a Contact by id
//@route GET /api/contacts
// @access private
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contacts.findById(req.params.id);
    console.log(contact);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});
//@desc Update a Contact by id
//@route PUT /api/contacts
// @access private
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contacts.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    const updatedContact = await Contacts.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (contact.user_id != req.user.id) {
        res.status(404);
        throw new Error("User don't have permission to update the contact that doesn't belongs to them");
    }
    res.status(201).json(updatedContact);
});
//@desc DELETE a Contact by id
//@route DELETE /api/contacts
// @access private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contacts.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if (req.user.id != contact.user_id) {
        res.status(403);
        throw new Error("User don't have permission to delete the contact which doesn't belongs to them")
    }
    await contact.deleteOne({ _id: req.params.id });
    res.status(201).json(contact);
});

module.exports = { getContacts, createContact, getContact, updateContact, deleteContact };