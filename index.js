const express = require('express');

const path = require('path');
const port = 8000;


const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

//middleware
//app.use(function(req, res, next) {
//    console.log('middleware called');
//    next();
//});





var contactList = [{
        name: "Aman",
        phone: "7808044299",
    },
    {
        name: "ayush",
        phone: "123456",
    }

]
app.get('/', (req, res) => {
    return res.render('home', {
        title: "Contact List",
        contact_list: contactList
    });
});
app.get('/', (req, res) => {
    return res.render('practice', {
        title: "all right"
    });
});
app.post('/create-contact', (req, res) => {
    //return res.redirect('/practice')
    contactList.push({
        name: req.body.name,
        phone: req.body.phone
    });
    return res.redirect('/');
});
//for deleting a contact
app.get('/delete-contact/', function(req, res) {
    //get the query from the url
    console.log(req.query);
    let phone = req.query.phone

    let contactindex = contactList.findIndex(contact => contact.phone == phone);

    if (contactindex != -1) {
        contactList.splice(contactindex, 1);
    }

    return res.redirect('back');
});




app.listen(port, function(err) {
    if (err) { console.log('Error in the server', err); }

    console.log('yup! my express server is running on the port: ', port);
});